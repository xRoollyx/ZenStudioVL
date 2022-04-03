import selectDateReducer from "./selectDate-reducer";

const store = {
    _state:{
        selectedDate: new Date(),
        dispatch (action) {
            this.selectedDate = selectDateReducer(this.selectedDate, action)
            store._callSubscribe(store)
        },

    },
    _callSubscribe(){
        console.log("Observer")},
    getState(){
        return this._state
    },
    subscribe(observer){
        this._callSubscriber = observer;
    }
}

export default store

