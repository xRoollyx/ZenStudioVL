import React from "react";

const ADMIN_ID = 54506803

const MONTH_DAY = {years: [ 2021, 2022, 2023, 2024],
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт' , 'Пт', 'Сб', 'Вс']}

const DAYS_IN_WEEK = 7;

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const WEEK_DAYS_FROM_MONDAY = [6, 0, 1, 2, 3, 4, 5];

const Month = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11
};

const RECORD_TIMES = ['10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-1400', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00']

const TABLE_HEADER = ['Дата','Ф.И.О','Телефон','Колл','Заметка','Вид','Удалить']

export function getMonthDay(){
    return MONTH_DAY
}

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

export function isLeapYear(year) {
    return !((year % 4) || (!(year % 100) && (year % 400)));
}

export function getDaysInMonth(date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    const daysInMonth = DAYS_IN_MONTH[month];

    if (isLeapYear(year) && month === Month.February) {
        return daysInMonth + 1;
    } else {
        return daysInMonth;
    }
}

export function getDayOfWeek(date) {
    const dayOfWeek = date.getDay();

    return WEEK_DAYS_FROM_MONDAY[dayOfWeek];
}

export function getMonthData(year, month) {
    const result = [];
    const date = new Date(year, month);
    const daysInMonth = getDaysInMonth(date);
    const monthStartsOn = getDayOfWeek(date);
    let day = 1;

    for (let i = 0; i < (daysInMonth + monthStartsOn) / DAYS_IN_WEEK; i++) {
        result[i] = [];

        for (let j = 0; j < DAYS_IN_WEEK; j++) {
            if ((i === 0 && j < monthStartsOn) || day > daysInMonth) {
                result[i][j] = undefined;
            } else {
                result[i][j] = new Date(year, month, day++);
            }
        }
    }

    return result;
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

export function checkWithCurrentDate(selectedDate) {
    if (selectedDate.getMonth() >= new Date().getMonth() &&
        selectedDate.getFullYear() >= new Date().getFullYear() ||
        selectedDate.getFullYear() > new Date().getFullYear()) {
        return selectedDate
    }
    if (selectedDate.getMonth() === new Date().getMonth() &&
        selectedDate.getFullYear() === new Date().getFullYear() &&
        selectedDate.getDate() < new Date().getDate()) {
        return new Date()
    }
    return new Date()
}