import {compareLess, compareYear} from "../function/calendar";

const PREVIOUS_MONTH = 'PREVIOUS-MONTH';
const NEXT_MONTH = 'NEXT-MONTH';
const SELECT_MONTH = 'SELECT-MONTH';
const SELECT_YEAR = 'SELECT-YEAR';
const SELECT_DATE = 'SELECT-DATE';

const initialState = new Date();

const selectDateReducer = (state = initialState, action) => {
    let newState = new Date()
    switch (action.type) {
        case PREVIOUS_MONTH:
            newState = new Date(state.getFullYear(), state.getMonth()-1, state.getDate());
            !compareLess (newState, new Date())?state = newState:state = new Date();
            return state;
        case NEXT_MONTH:
            newState = new Date(state.getFullYear(), state.getMonth()+1, state.getDate());
            !compareYear(newState)?state = newState: null
            return state;
        case SELECT_MONTH:
            newState = new Date(state.getFullYear(), action.month, state.getDate());
            !compareLess (newState, new Date())?state = newState:state = new Date();
            return state;
        case SELECT_YEAR:
            newState = new Date(event.target.value , state.getMonth(), state.getDate())
            !compareLess (newState, new Date())?state = newState:state = new Date();
            return state;
        case SELECT_DATE:
            newState = action.date
            !compareLess (newState, new Date())?state = newState:state = new Date();
            return state;
        default:
            return state;
    }
}

export default selectDateReducer

export const previousMonthAC = () => ({type: PREVIOUS_MONTH});
export const nextMonthAC = () => ({type: NEXT_MONTH});
export const selectMonthAC = (month) =>({type: SELECT_MONTH, month});
export const selectYearAC = (year) =>({type: SELECT_YEAR, year});
export const selectDateAC = (date) =>({type: SELECT_DATE, date})