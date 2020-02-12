import VKConnect from "@vkontakte/vk-connect";

import {store} from "../../index";

import {setColorScheme, setAccessToken} from "../store/vk/actions";

const APP_ID = 6984089;
const API_VERSION = '5.92';

export const initApp = () => (dispatch) => {
    const VKConnectCallback = (e) => {
        if (e.detail.type === 'VKWebAppUpdateConfig') {
            VKConnect.unsubscribe(VKConnectCallback);

            dispatch(setColorScheme(e.detail.data.scheme));
        }
    };

    VKConnect.subscribe(VKConnectCallback);
    return VKConnect.send('VKWebAppInit', {}).then(data => {
        return data;
    }).catch(error => {
        return error;
    });
};

export const getAuthToken = (scope) => (dispatch) => {
    VKConnect.send("VKWebAppGetAuthToken", {
        "app_id": APP_ID,
        "scope": scope.join(',')
    }).then(data => {
        dispatch(setAccessToken(data.access_token));
    }).catch(() => {
        dispatch(setAccessToken(null));
    });
};

export const closeApp = () => {
    return VKConnect.send("VKWebAppClose", {
        "status": "success"
    }).then(data => {
        return data;
    }).catch(error => {
        return error;
    });
};

export const swipeBackOn = () => {
    return VKConnect.send("VKWebAppEnableSwipeBack", {}).then(data => {
        return data;
    }).catch(error => {
        return error;
    });
};

export const swipeBackOff = () => {
    return VKConnect.send("VKWebAppDisableSwipeBack", {}).then(data => {
        return data;
    }).catch(error => {
        return error;
    });
};

export const groupsGet = () => {
    return APICall('groups.get', {
        "extended": "1",
        "fields": "description",
        "count": "100"
    });
};

export const APICall = (method, params) => {
    params['access_token'] = store.getState().vkui.accessToken;
    params['v'] = params['v'] === undefined ? API_VERSION : params['v'];

    return VKConnect.send("VKWebAppCallAPIMethod", {
        "method": method,
        "params": params
    }).then(data => {
        return data.response;
    }).catch(error => {
        return error;
    });
};
