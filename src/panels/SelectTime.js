import React from 'react';
import PropTypes from 'prop-types';
import "./SelectTime.css"

import {Panel, PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";
import Input from "../components/Input";
import {getDateFormat, getRecordTimes} from "../function/Function";
import {sendMessage} from "../function/Server";


const SelectTime = props => {
    const base = props.base
    const selectedDate = getDateFormat(props.selectedDate);
    const busyTime = Object.keys({...base[getDateFormat(props.selectedDate)]});
    const recordTime = getRecordTimes();
    const selectedTime = [];

    let firstName = props.fetchedUser.first_name
    let lastName = props.fetchedUser.last_name
    let phone = null
    let amount = null

    function handleTime(e){
        const index = selectedTime.indexOf(e.target.value)
        if (index >= 0){
            selectedTime.splice(index, 1)
        }else {
            selectedTime.push(e.target.value)
        }
    }
    function handleFirstName(e){firstName = e.target.value}
    function handleLastName(e){lastName = e.target.value}
    function handlePhone(e){phone = e.target.value}
    function handleAmount(e){amount = e.target.value}

    function saveTimeRecords(){
        const tempBase = {...props.base[selectedDate]}
        const message = 'Вы записались ' + selectedDate + 'на' + selectedTime + 'в студию ZEN'
        selectedTime.map((value) => {
            tempBase[value]= {
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                vk_ID: props.fetchedUser.id,
                amount: amount,
                mySession: false,
                note:''
               }
       })
        base[selectedDate] = tempBase
        sendMessage(props.fetchedUser.id, Math.random()*34567, message).catch(err=>{
            console.log(err)
        })
        props.updateBase(base)

    }

    return (
        <Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
            >
                Выберите время
            </PanelHeader>
            <div className="SelectTime">
                <div className="time">{recordTime.map((value, index) => {
                    if (busyTime.includes(value)) {
                        return <Input
                            key={index}
                            id={index}
                            value={value}
                            disabled={true}
                        />
                    }
                    else
                        return <Input
                            key={index}
                            id={index}
                            value={value}
                            onChange={handleTime}
                        />
                })}
                </div>
            </div>
            <div>
                <div>
                    <label>Имя</label>
                    <input type="text" onChange={handleFirstName} defaultValue={props.fetchedUser.first_name}/>
                </div>
                <div>
                    <label>Фамилия</label>
                    <input type="text" onChange={handleLastName} defaultValue={props.fetchedUser.last_name}/>
                </div>
                <div>
                    <label>Телефон</label>
                    <input type="text" onChange={handlePhone} defaultValue='+7'/>
                </div>
                <div>
                    <label>Количество людей</label>
                    <input type="text" onChange={handleAmount} defaultValue=''/>
                </div>
            </div>

            <button onClick={saveTimeRecords}>Записаться</button>
        </Panel>
    );
}

SelectTime.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default SelectTime;