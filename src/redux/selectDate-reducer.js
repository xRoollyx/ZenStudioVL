const RESET_SELECTED_DATE = 'RESET_SELECTED_DATE'
const SET_SELECTED_DATE = 'SET_SELECTED_DATE'

const initialState = new Date();

const selectDateReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECTED_DATE:
            state = action.date
            return state

        case RESET_SELECTED_DATE:
            state = new Date();
            return state;
        default:
            return state;
    }
}

export default selectDateReducer

export const resetSelectedDate = () =>({type: RESET_SELECTED_DATE});
export const setSelectedDateAC = (date) => ({type: SET_SELECTED_DATE, date})