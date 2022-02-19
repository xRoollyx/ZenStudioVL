import React from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";
import "./SelectDate.css"

import {Button, Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui';

import {getMonthDay, getMonthData, pastDate, areEqual, getDateFormat} from "../function/Function";


const SelectDate = props => {
    const {years, monthNames, weekDayNames} = getMonthDay();
    const monthData=getMonthData(props.selectedDate.getFullYear(),props.selectedDate.getMonth())
    const currentDate = new Date();

    return (
        <Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
            >
                Выберите дату
            </PanelHeader>
            <div className="Navigation">
                <header>
                    <button onClick={() => props.handlePrevMonthButtonClick(props.selectedDate)}>{'<'}</button>
                    <select
                        value={props.selectedDate.getMonth()}
                        onChange={props.handleSelectMonth}
                    >
                        {monthNames.map((name, index) =>
                            <option key={name} value={index}>
                                {name}
                            </option>)}
                    </select>
                    <select
                        value={props.selectedDate.getFullYear()}
                        onChange={props.handleSelectYear}
                    >
                        {years.map(year =>
                            <option key={year} value={year}>
                                {year}
                            </option>
                        )}
                    </select>
                    <button onClick={() => props.handleNextMonthButtonClick(props.selectedDate)}>{'>'}</button>
                </header>
            </div>
            <div className="SelectDate">
                <table>
                    <thead>
                    <tr>
                        {weekDayNames.map(name =>
                            <th key={name}>{name}</th>
                        )}
                    </tr>
                    </thead>

                    <tbody>
                    {monthData.map((week, index) =>
                        <tr key={index} className="week">
                            {week.map((date, index) => date ?
                                <td
                                    key={index}
                                    className={classnames('day', {
                                        'expired' : pastDate(date, currentDate),
                                        'today': pastDate(date, currentDate),
                                        'selected': areEqual(date, props.selectedDate),

                                    })}
                                    onClick={!(pastDate(date, currentDate))?() => props.onChange(date):null}
                                >{date.getDate()}</td>
                                :
                                <td key={index} />
                            )}
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <Button id='btn1' onClick={props.go} data-to="selectedTime">
                {getDateFormat(props.selectedDate)}
            </Button>
        </Panel>
    );
}

SelectDate.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default SelectDate;