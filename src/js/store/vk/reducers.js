import {SET_ACCESS_TOKEN, SET_COLOR_SCHEME} from './actionTypes';

const initialState = {
    accessToken: undefined,
    colorScheme: 'client_light'
};

export const vkuiReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_COLOR_SCHEME: {
            return {
                ...state,
                colorScheme: action.payload,
            };
        }

        case SET_ACCESS_TOKEN: {
            return {
                ...state,
                accessToken: action.payload,
            };
        }

        default: {
            return state;
        }
    }
};