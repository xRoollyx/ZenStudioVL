const SET_POPOUT = 'SET-POPOUT';
const SET_DATA_BASE = 'SET-DATA-BASE';

import {ScreenSpinner} from "@vkontakte/vkui";

const initialState = {
    dataBase: {},
    popout: <ScreenSpinner size='large' />
}

const homePageReducer = (state = initialState, action) => {
    switch (action.type) {
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

export const setPopoutAC = (popout) => ({type: SET_POPOUT, popout});
export const setDataBaseAC = (dataBase) => ({type: SET_DATA_BASE, dataBase})