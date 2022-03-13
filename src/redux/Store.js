import {getBase} from "../function/Server";

const store = {
    currentDate: new Date(),
    selectedDate: new Date(),
    recordsData: getBaseToServer(),
    data: null,
    selectDatePage:{
        handlePrevMonthButtonClick(){
            store.selectedDate = checkWithCurrentDate(new Date(store.selectedDate.getFullYear(), store.selectedDate.getMonth()-1, store.selectedDate.getDate()))
            store._rerenderTree(store)
        },
        handleNextMonthButtonClick () {
            store.selectedDate = new Date(store.selectedDate.getFullYear(), store.selectedDate.getMonth()+1, store.selectedDate.getDate())
            store._rerenderTree(store)
        },
        handleSelectMonth(event){
            store.selectedDate = new Date(store.selectedDate.getFullYear(), event.target.value, store.selectedDate.getDate())
            store._rerenderTree(store)
        },
        handleSelectYear(event){
            store.selectedDate = checkWithCurrentDate(new Date(event.target.value , store.selectedDate.getMonth(), store.selectedDate.getDate()))
            store._rerenderTree(store)
        },
        checkWithCurrentDate(date) {
            if (areEqual(date,store.selectedDate)){
                return 'selected'
            }
            if (areEqual(date, store.currentDate)) {
                return 'today'
            }
            if (date< store.currentDate) {
                return 'previous'
            }
            if (date > store.currentDate) {
                return 'next'
            }
        },
        checkedSelectedDate(date){
            store.selectedDate = checkWithCurrentDate(date)
            store._rerenderTree(store)
        }
    },
    selectTimePage:{

    },
    _rerenderTree(){
        console.log("Observer")},
    subscriber(observer){
        this._rerenderTree = observer;
    }
}

function areEqual(a, b) {
    if (!a || !b) return false;

    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}
function checkWithCurrentDate(selectedDate) {
    if (selectedDate > new Date()) {
        return selectedDate
    }else if (selectedDate.getMonth() === new Date().getMonth() &&
        selectedDate.getFullYear() === new Date().getFullYear() &&
        selectedDate.getDate() >= new Date().getDate()) {
        return selectedDate
    }else if (selectedDate.getMonth() <= new Date().getMonth() &&
        selectedDate.getFullYear() <= new Date().getFullYear() &&
        selectedDate.getDate() < new Date().getDate()) {
        return new Date()
    }
    return new Date()
}
async function getBaseToServer() {
    return await getBase().then((data) => {store.data = data})
}

export default store