import React from "react";

const ADMIN_ID = 54506803



const RECORD_TIMES = ['10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00']

const TABLE_HEADER = ['Дата','Ф.И.О','Телефон','Колл','Заметка','Вид','Удалить']



export function getRecordTimes() {
    return RECORD_TIMES
}

export function getTableHeader(){
    return TABLE_HEADER
}

export function getAdminID(){
    return ADMIN_ID
}

export  function pastDate(a, b) {
    return !(a > b || areEqual(a, b));

}

export function areEqual(a, b) {
    if (!a || !b) return false;

    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}


export function getDateFormat (fullDate){
    let day = fullDate.getDate();
    let month = fullDate.getMonth();
    let year = fullDate.getFullYear();
    if (day < 10){
        day = "0" + day
    }
    if (month < 10){
        month = "0" + (month + 1)
    }
    return year + '-' + month + '-' + day;
}

