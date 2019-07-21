import {SET_PAGE, GO_BACK, OPEN_POPOUT, CLOSE_POPOUT, OPEN_MODAL, CLOSE_MODAL, SET_STORY} from './actionTypes';

import * as VK from "../../services/VK";

const initialState = {
    activeStory: null,
    activeView: null,
    activePanel: null,

    panelsHistory: [],
    viewsHistory: [],
    storiesHistory: [],

    activeModals: [],
    modalHistory: [],
    popouts: []
};

export const routerReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_PAGE: {
            let View = action.payload.view;
            let Panel = action.payload.panel;

            window.history.pushState({View: View, Panel: Panel}, View);

            let panelsHistory = state.panelsHistory[View] || [];
            let viewsHistory = state.viewsHistory[state.activeStory] || [];

            const viewIndexInHistory = viewsHistory.indexOf(View);

            if (viewIndexInHistory !== -1) {
                viewsHistory.splice(viewIndexInHistory, 1);
            }

            if (panelsHistory.indexOf(Panel) === -1) {
                panelsHistory = [...panelsHistory, Panel];
            }

            if (panelsHistory.length > 1) {
                VK.swipeBackOn();
            }

            return {
                ...state,
                activeView: View,
                activePanel: Panel,

                panelsHistory: {
                    ...state.panelsHistory,
                    [View]: panelsHistory,
                },
                viewsHistory: {
                    ...state.viewsHistory,
                    [state.activeStory]: [...viewsHistory, View]
                }
            };
        }

        case SET_STORY: {
            window.history.pushState(null, null, window.location.url);

            let viewsHistory = state.viewsHistory[action.payload.story] || [action.payload.story];
            let activeView = viewsHistory[viewsHistory.length - 1];

            let panelsHistory = state.panelsHistory[activeView] || [action.payload.initial_panel];
            let storiesHistory = state.storiesHistory;

            let activePanel = panelsHistory[panelsHistory.length - 1];

            if (action.payload.story === state.activeStory && panelsHistory.length > 1) {
                activePanel = panelsHistory[panelsHistory.length - 2];

                panelsHistory.pop();
            }

            const storiesIndexInHistory = storiesHistory.indexOf(action.payload.story);

            if (storiesIndexInHistory !== -1 && storiesIndexInHistory !== 0) {
                storiesHistory.splice(storiesIndexInHistory, 1);
            }

            if (viewsHistory.indexOf(action.payload.story) === -1) {
                viewsHistory = [...viewsHistory, action.payload.story];
            }

            return {
                ...state,
                activeStory: action.payload.story,
                activeView: activeView,
                activePanel: activePanel,

                storiesHistory: [...storiesHistory, action.payload.story],
                panelsHistory: {
                    ...state.panelsHistory,
                    [activeView]: panelsHistory
                },
                viewsHistory: {
                    ...state.viewsHistory,
                    [action.payload.story]: viewsHistory
                }
            };
        }

        case GO_BACK: {
            let setView = state.activeView;
            let setPanel = state.activePanel;
            let setStory = state.activeStory;

            let popoutsData = state.popouts;

            if (popoutsData[setView]) {
                popoutsData[setView] = null;

                return {
                    ...state,
                    popouts: {
                        ...state.popouts, popoutsData
                    }
                };
            }

            let viewModalsHistory = state.modalHistory[setView];

            if (viewModalsHistory !== undefined && viewModalsHistory.length !== 0) {
                let activeModal = viewModalsHistory[viewModalsHistory.length - 2] || null;

                if (activeModal === null) {
                    viewModalsHistory = [];
                } else if (viewModalsHistory.indexOf(activeModal) !== -1) {
                    viewModalsHistory = viewModalsHistory.splice(0, viewModalsHistory.indexOf(activeModal) + 1);
                } else {
                    viewModalsHistory.push(activeModal);
                }

                return {
                    ...state,
                    activeModals: {
                        ...state.activeModals,
                        [setView]: activeModal
                    },
                    modalHistory: {
                        ...state.modalHistory,
                        [setView]: viewModalsHistory
                    }
                };
            }

            let panelsHistory = state.panelsHistory[setView] || [];
            let viewsHistory = state.viewsHistory[state.activeStory] || [];
            let storiesHistory = state.storiesHistory;

            if (panelsHistory.length > 1) {
                panelsHistory.pop();

                setPanel = panelsHistory[panelsHistory.length - 1];
            } else if (viewsHistory.length > 1) {
                viewsHistory.pop();

                let newView = viewsHistory[viewsHistory.length - 1];
                let panelsHistoryNew = state.panelsHistory[newView];

                setView = newView;
                setPanel = panelsHistoryNew[panelsHistoryNew.length - 1];
            } else if (storiesHistory.length > 1 && action.payload.from === 'Android') {
                storiesHistory.pop();

                setStory = storiesHistory[storiesHistory.length - 1];
                setView = state.viewsHistory[setStory][state.viewsHistory[setStory].length - 1];

                let panelsHistoryNew = state.panelsHistory[setView];

                if (panelsHistoryNew.length > 1) {
                    setPanel = panelsHistoryNew[panelsHistoryNew.length - 1];
                } else {
                    setPanel = panelsHistoryNew[0];
                }
            } else {
                VK.closeApp();
            }

            if (panelsHistory.length === 1 && action.payload.from === 'iOS') {
                VK.swipeBackOff();
            }

            return {
                ...state,
                activeView: setView,
                activePanel: setPanel,
                activeStory: setStory,

                panelsHistory: {
                    ...state.panelsHistory,
                    [state.activeView]: panelsHistory
                },
                viewsHistory: {
                    ...state.viewsHistory,
                    [state.activeView]: viewsHistory
                }
            };
        }

        case OPEN_POPOUT: {
            window.history.pushState(null, null, window.location.url);

            return {
                ...state,
                popouts: {
                    ...state.popouts,
                    [state.activeView]: action.payload.popout
                }
            };
        }

        case CLOSE_POPOUT: {
            return {
                ...state,
                popouts: {
                    ...state.popouts,
                    [state.activeView]: null
                }
            };
        }

        case OPEN_MODAL: {
            window.history.pushState(null, null, window.location.url);

            let activeModal = action.payload.id || null;
            let modalsHistory = state.modalHistory[state.activeView] ? [...state.modalHistory[state.activeView]] : [];

            if (activeModal === null) {
                modalsHistory = [];
            } else if (modalsHistory.indexOf(activeModal) !== -1) {
                modalsHistory = modalsHistory.splice(0, modalsHistory.indexOf(activeModal) + 1);
            } else {
                modalsHistory.push(activeModal);
            }

            return {
                ...state,
                activeModals: {
                    ...state.activeModals,
                    [state.activeView]: activeModal
                },
                modalHistory: {
                    ...state.modalHistory,
                    [state.activeView]: modalsHistory
                }
            };
        }

        case CLOSE_MODAL: {
            let activeModal = state.modalHistory[state.activeView][state.modalHistory[state.activeView].length - 2] || null;
            let modalsHistory = state.modalHistory[state.activeView] ? [...state.modalHistory[state.activeView]] : [];

            if (activeModal === null) {
                modalsHistory = [];
            } else if (modalsHistory.indexOf(activeModal) !== -1) {
                modalsHistory = modalsHistory.splice(0, modalsHistory.indexOf(activeModal) + 1);
            } else {
                modalsHistory.push(activeModal);
            }

            return {
                ...state,
                activeModals: {
                    ...state.activeModals,
                    [state.activeView]: activeModal
                },
                modalHistory: {
                    ...state.modalHistory,
                    [state.activeView]: modalsHistory
                }
            };
        }

        default: {
            return state;
        }
    }
};