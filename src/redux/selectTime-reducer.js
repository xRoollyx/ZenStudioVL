const regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
const number = /^(0|[1-9]\d*)$/;
const SET_FIRST_NAME_VALUE = 'SET-FIRST-NAME-VALUE';
const SET_LAST_NAME_VALUE = 'SET-LAST-NAME-VALUE';
const SET_PHONE_NUMBER = 'SET-PHONE-NUMBER';
const SET_AMOUNT = 'SET-AMOUNT'
const SET_TIMES = 'SET-TIMES'
const SET_VK_ID = 'SET-VK-ID'

const initialState = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    amount:'',
    times: [],
    vk_ID: '',
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
            state.firstName = action.firstName;
            return state;
        case SET_LAST_NAME_VALUE:
            action.lastName.length > 4 ?state.validate.lN = true:state.validate.lN = false;
            state.lastName = action.lastName;
            return state;
        case SET_PHONE_NUMBER:
            regex.test(action.phoneNumber)?state.validate.pN = true:state.validate.pN = false;
            state.phoneNumber = action.phoneNumber;
            return state;
        case SET_AMOUNT:
            number.test(action.amount)&&action.amount<25?state.validate.aT = true:state.validate.aT = false;
            state.amount = action.amount;
            return state;
        case SET_TIMES:
            action.times.length>0?state.validate.tS = true:state.validate.tS = false;
            state.times = action.times
            return state;
        case SET_VK_ID:
            state.vk_ID = action.id;
            return state;
        default:
            return state;
    }
}

export default selectTimeReducer

export const setFirstNameAC = (firstName) => ({type: SET_FIRST_NAME_VALUE, firstName});
export const setLastNameAC = (lastName) => ({type: SET_LAST_NAME_VALUE, lastName});
export const setPhoneNumberAC = (phoneNumber) => ({type: SET_PHONE_NUMBER, phoneNumber});
export const setAmountAC = (amount) => ({type:SET_AMOUNT, amount});
export const setTimesAC = (times) => ({type:SET_TIMES, times});
export const setVkId = (id) => ({type:SET_VK_ID, id})