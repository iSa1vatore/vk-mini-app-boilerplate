import {combineReducers} from "redux";
import {routerReducer} from './router/reducers';
import {vkuiReducer} from './vk/reducers';

export default combineReducers({
    vkui: vkuiReducer,
    router: routerReducer
});