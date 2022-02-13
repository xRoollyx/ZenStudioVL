import React from 'react';
import PropTypes from 'prop-types';

import {Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui';
import {getTableHeader} from "../function/Function";

import "./AdminPanel.css"

const AdminPanel = props => {
    const tableHeader = getTableHeader();
    const recordDate = Object.keys(props.base)
    function print(){
        recordDate.map(item => {
            item.split('-')

        })
    }



    return (
        <Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
            >
                Записи
            </PanelHeader>
            <div>
                <table id='adminPanel'>
                    <thead>
                        <tr>
                            {tableHeader.map(name =>
                                <th key={name}>{name}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {recordDate.map(date=>Object.keys(props.base[date]).map(time =>
                                <tr key={time}>
                                    <td>{date}<br/>{time}</td>
                                    <td>{props.base[date][time].firstName}<br/>{props.base[date][time].lastName}</td>
                                    <td>{props.base[date][time].phone}</td>
                                    <td>{props.base[date][time].amount}</td>
                                    <td><textarea cols='15'/></td>
                                    <td>3444</td>
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
            <div>
                <button onClick={print}/>
            </div>
        </Panel>
    );
}

AdminPanel.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default AdminPanel;