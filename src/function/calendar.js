export function getCalendarNames (){
    return {years: [2022, 2023, 2024],
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт' , 'Пт', 'Сб', 'Вс']}
}

// возвращает массив текущего месяца
export function getMonthData (year, month) {
    const DAYS_IN_WEEK = 7;
    const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const WEEK_DAYS_FROM_MONDAY = [6, 0, 1, 2, 3, 4, 5];
    const Month = {
        January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
        July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
    };
    function getDaysInMonth(date) {
        const month = date.getMonth();
        const year = date.getFullYear();
        const daysInMonth = DAYS_IN_MONTH[month];

        if (isLeapYear(year) && month === Month.February) {
            return daysInMonth + 1;
        } else {
            return daysInMonth;
        }
    }
    function getDayOfWeek(date) {
        const dayOfWeek = date.getDay();

        return WEEK_DAYS_FROM_MONDAY[dayOfWeek];
    }
    function isLeapYear(year) {
        return !((year % 4) || (!(year % 100) && (year % 400)));
    }
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

export function compareEquals (date1, date2) {
    if (date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()) {
        return true
    }
    return false

}
export function compareLess (date1, date2) {
    if (date1.getFullYear() < date2.getFullYear() ||
        (date1.getMonth() < date2.getMonth()&&
            date1.getFullYear() === date2.getFullYear())||
        (date1.getDate() < date2.getDate()&&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear())) {
        return true
    }
    return false
}
export  function compareYear (date1){
    if (date1.getFullYear() > 2024) return true
    return false
}