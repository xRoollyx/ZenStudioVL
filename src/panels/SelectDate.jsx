import React from 'react';
import classes from "./SelectDate.module.css"

import {Button, Div, Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui';
import {compareEquals, compareLess, getCalendarNames, getMonthData} from "../function/calendar";
import {nextMonthAC, previousMonthAC, selectDateAC, selectMonthAC, selectYearAC} from "../redux/selectDate-reducer";
import {setActivePanelAC} from "../redux/homePage-reducer";


const SelectDate = props => {
    const {years, monthNames, weekDayNames} = getCalendarNames();
    const selectedDate = props.state.selectedDate;
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const monthData = getMonthData(year, month);

    const handleSelectMonth = (event) => props.dispatch(selectMonthAC(event.target.value));
    const handleSelectYear = (event) => props.dispatch(selectYearAC(event.target.value));
    const handlePrevMonthButtonClick = () => props.dispatch(previousMonthAC());
    const handleNextMonthButtonClick = () => props.dispatch(nextMonthAC());
    const checkedSelectedDate = (day) => props.dispatch(selectDateAC(day));
    const handleClick = (e) => props.dispatch(setActivePanelAC(e.currentTarget.dataset.to))

    const classNameSelect = (day) => {
        if (compareEquals(day, selectedDate)) return classes.selected
        if (compareLess(day, new Date())) return classes.previous
        if (!compareLess(day, new Date())) return classes.next
    }

    return (
        <Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={handleClick} data-to="home"/>}
            >
                Выберите дату
            </PanelHeader>
            <Div className={classes.navigation}>
                <button onClick={handlePrevMonthButtonClick}>{`<`}</button>
                <select
                    value={parseInt(month)}
                    onChange={handleSelectMonth}
                >
                    {monthNames.map((monthName, index) =>
                    <option key={monthName} value={index}>
                        {monthName}
                    </option>)}
                </select>
                <select
                    value={year}
                    onChange={handleSelectYear}
                >
                    {years.map((year, index) =>
                        <option key={index}>
                            {year}
                        </option>)}
                </select>
                <button onClick={handleNextMonthButtonClick}>{`>`}</button>
            </Div>
            <Div className={classes.table}>
                <table>
                    <thead>
                    <tr>
                        {weekDayNames.map((dayName, index) =>
                            <th key={index}>
                                {dayName}
                            </th>
                        )}
                    </tr>
                    </thead>
                    <tbody >{monthData.map((week, index) =>
                        <tr key={index}>{week.map((day, index) => day ?
                            <td key={index}
                                className={classNameSelect(day)}
                                onClick={()=>checkedSelectedDate(day)}>{day.getDate()}</td>:
                            <td key={index} className={classes.none}>{''}</td>
                        )}
                        </tr>
                    )}
                    </tbody>
                </table>
            </Div>
            <Button className={classes.btn} onClick={handleClick} data-to="selectedTime">
                Выбрать: {selectedDate.toLocaleDateString()}
            </Button>
        </Panel>
    );
}
export default SelectDate;