const regex = /^(\+7|7|8)?[\s\-]?\(?[489]\d{2}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
const number = /^(0|[1-9]\d*)$/;
const SET_FIRST_NAME_VALUE = 'SET-FIRST-NAME-VALUE';
const SET_LAST_NAME_VALUE = 'SET-LAST-NAME-VALUE';
const SET_PHONE_NUMBER = 'SET-PHONE-NUMBER';
const SET_AMOUNT = 'SET-AMOUNT'
const SET_TIMES = 'SET-TIMES'

const initialState = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    amount:'',
    times: [],
    validation: false,
    validate:{
        fN:false,
        lN:false,
        pN:false,
        aT:false,
        tS:false
    }
};

const selectTimeReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_FIRST_NAME_VALUE:
            action.firstName.length > 4 ?state.validate.fN = true:state.validate.fN = false;
            setValidation()
            state.firstName = action.firstName;
            return state;
        case SET_LAST_NAME_VALUE:
            action.lastName.length > 4 ?state.validate.lN = true:state.validate.lN = false;
            setValidation()
            state.lastName = action.lastName;
            return state;
        case SET_PHONE_NUMBER:
            regex.test(action.phoneNumber)?state.validate.pN = true:state.validate.pN = false;
            setValidation()
            state.phoneNumber = action.phoneNumber;
            return state;
        case SET_AMOUNT:
            number.test(action.amount)&&action.amount<25?state.validate.aT = true:state.validate.aT = false;
            setValidation()
            state.amount = action.amount;
            return state;
        case SET_TIMES:
            action.times.length>0?state.validate.tS = true:state.validate.tS = false;
            setValidation()
            state.times = action.times
            return state;
        default:
            return state;
    }
    function setValidation() {
        state.validation = state.validate.fN&&state.validate.lN&&state.validate.pN&&state.validate.aT&&state.validate.tS
    }
}



export default selectTimeReducer

export const setFirstNameAC = (firstName) => ({type: SET_FIRST_NAME_VALUE, firstName});
export const setLastNameAC = (lastName) => ({type: SET_LAST_NAME_VALUE, lastName});
export const setPhoneNumberAC = (phoneNumber) => ({type: SET_PHONE_NUMBER, phoneNumber});
export const setAmountAC = (amount) => ({type:SET_AMOUNT, amount});
export const setTimesAC = (times) => ({type:SET_TIMES, times});
