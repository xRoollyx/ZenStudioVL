import React from 'react';
import classes from "./SelectDate.module.css"

import {Button, Div, Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui';
import {getMonthData, getMonthDay} from "../resurses/CalendarData";

const SelectDate = props => {
    const {years, monthNames, weekDayNames} = getMonthDay();
    const monthData=getMonthData(props.selectedDate.getFullYear(),props.selectedDate.getMonth());

    const  classesSelect = (day) => {
        let cls = props.store.checkWithCurrentDate(day);
        if (cls === 'today') {
            return classes.today
        }else if (cls === 'selected'){
            return classes.selected
        }else if (cls === 'previous'){
            return classes.previous
        }
        return classes.next
    }

    const test = () => {
        console.log(props.selectedDate)
    }
    return (
        <Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
            >
                Выберите дату
            </PanelHeader>
            <Div className={classes.navigation}>
                <button onClick={()=>props.store.handlePrevMonthButtonClick()}>{`<`}</button>
                <select
                    value={props.selectedDate.getMonth()}
                    onChange={(event)=>props.store.handleSelectMonth(event)}
                >
                    {monthNames.map((monthName, index) =>
                    <option key={monthName} value={index}>
                        {monthName}
                    </option>)}
                </select>
                <select
                    value={props.selectedDate.getFullYear()}
                    onChange={(event)=>props.store.handleSelectYear(event)}
                >
                    {years.map((year, index) =>
                        <option key={index} value={year}>
                            {year}
                        </option>)}
                </select>
                <button onClick={()=>props.store.handleNextMonthButtonClick()}>{`>`}</button>
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
                                className={classesSelect(day)}
                                onClick={()=>props.store.checkedSelectedDate(day)}>{day.getDate()}</td>:
                            <td key={index} className={classes.none}>{''}</td>
                        )}
                        </tr>
                    )}
                    </tbody>
                </table>
            </Div>
            <Button className={classes.btn} onClick={props.go} data-to="selectedTime">
                Выбрать время
            </Button>
            <Button className={classes.btn} onClick={test} >
                Выбрать время
            </Button>

        </Panel>
    );
}
export default SelectDate;