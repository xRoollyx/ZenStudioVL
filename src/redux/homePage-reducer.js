const SET_ACTIVE_PANEL = 'SET-ACTIVE-PANEL';
const SET_USER = 'SET-USER';
const SET_POPOUT = 'SET-POPOUT';
const SET_DATA_BASE = 'SET-DATA-BASE';

import {ScreenSpinner} from "@vkontakte/vkui";

const initialState = {
    dataBase: {},
    activePanel: 'home',
    fetchedUser: null,
    popout: <ScreenSpinner size='large' />
}

const homePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACTIVE_PANEL:
            state.activePanel = action.activePanel;
            return state;
        case SET_USER:
            state.fetchedUser = action.fetchedUser;
            return state;
        case SET_POPOUT:
            state.popout = action.popout;
            return state;
        case SET_DATA_BASE:
            state.dataBase = action.dataBase;
            return state;
        default:
            return state;
    }
}

export default homePageReducer

export const setActivePanelAC = (activePanel) => ({type: SET_ACTIVE_PANEL, activePanel});
export const setUserAC = (fetchedUser) => ({type: SET_USER, fetchedUser});
export const setPopoutAC = (popout) => ({type: SET_POPOUT, popout});
export const setDataBaseAC = (dataBase) => ({type: SET_DATA_BASE, dataBase})