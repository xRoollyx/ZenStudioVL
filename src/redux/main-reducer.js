import {ScreenSpinner} from "@vkontakte/vkui";

const SET_ACTIVE_PANEL = 'SET_ACTIVE_PANEL';
const SET_USER = 'SET_USER';
const SET_POPOUT = 'SET_POPOUT';
const SET_DATA_BASE = 'SET_DATA_BASE';
const SET_ALLOW_MESSAGES = 'SET_ALLOW_MESSAGES'


const initialState = {
    activePanel: 'home',
    user: null,
    dataBase: {},
    popout: <ScreenSpinner size='large' />,
    allowMessages: false
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACTIVE_PANEL:
            state.activePanel = action.activePanel;
            return state;
        case SET_USER:
            state.user = action.user;
            return state;
        case SET_POPOUT:
            state.popout = action.popout;
            return state;
        case SET_DATA_BASE:
            state.dataBase = action.dataBase;
            return state;
        case SET_ALLOW_MESSAGES:
            state.allowMessages = action.allowMessages;
            return state;
        default:
            return state;
    }
};

export default mainReducer;

export const setActivePanelAC = (activePanel) => ({type: SET_ACTIVE_PANEL, activePanel});
export const setUserAC = (user) => ({type: SET_USER, user});
export const setPopoutAC = (popout) => ({type: SET_POPOUT, popout});
export const setDataBaseAC = (dataBase) => ({type: SET_DATA_BASE, dataBase});
export const setAllowMessagesAC = (allowMessages) => ({type: SET_ALLOW_MESSAGES, allowMessages})