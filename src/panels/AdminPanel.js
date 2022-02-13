import React from 'react';
import PropTypes from 'prop-types';

import {Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui';
import {getTableHeader} from "../function/Function";

import "./AdminPanel.css"

const AdminPanel = props => {
    const tableHeader = getTableHeader();
    const recordDate = Object.keys(props.base)

    function print(event,date,time){
        const saveNote = {...props.base[date][time], note: event.target.value}
        props.setNote(date, time , saveNote)
    }




    return (
        <Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
            >
                Записи
            </PanelHeader>
            <div >
                <table id='adminTable'>
                    <thead>
                        <tr>
                            {tableHeader.map(name =>
                                <th key={name}>{name}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {recordDate.map(date=>Object.keys(props.base[date]).map(time =>
                                <tr id={props.base[date][time].mySession?'checked':'noChecked'} key={time}>
                                    <td>{date}<br/>{time}</td>
                                    <td>{props.base[date][time].firstName}<br/>{props.base[date][time].lastName}</td>
                                    <td>{props.base[date][time].phone}</td>
                                    <td>{props.base[date][time].amount}</td>
                                    <td><textarea cols='15' defaultValue={props.base[date][time].note} onBlur={(event)=>{print(event, date, time)}}/></td>
                                    <td>
                                        <input
                                            name={date + time}
                                            type='checkbox'
                                            onChange={()=>{props.getMySession(date, time, props.base[date][time])}}
                                            checked={props.base[date][time].mySession}
                                        />

                                    </td>
                                    <td>
                                        <button id='deleteButton' onClick={() => props.deleteRecordFromBase(date,time)}>
                                            X
                                        </button>
                                    </td>
                                </tr>
                            )

                        )}
                    </tbody>
                </table>

            </div>

        </Panel>
    );
}

AdminPanel.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default AdminPanel;