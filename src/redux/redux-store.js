import {combineReducers, createStore} from "redux";
import selectDateReducer from "./selectDate-reducer";
import selectTimeReducer from "./selectTime-reducer";
import homePageReducer from "./homePage-reducer";
import mainReducer from "./main-reducer";

let reducers = combineReducers({
    main: mainReducer,
    selectedDate: selectDateReducer,
    recordTime: selectTimeReducer,
    homepage: homePageReducer
});

const store = createStore(reducers);

export default store;