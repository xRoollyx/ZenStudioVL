
import PropTypes from 'prop-types';
import "./SelectTime.css"

import {Panel,Button, PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";
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

    function handleFirstName(e){firstName = e.target.value}
    function handleLastName(e){lastName = e.target.value}
    function handlePhone(e){
        phone = e.target.value
        validateForm()
    }
    function handleAmount(e){amount = e.target.value}
    function  validateForm(){
        let regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        props.setValidation(regex.test(phone),selectedTime.length > 0)
    }

    function saveTimeRecords(){
        const tempBase = {...props.base[selectedDate]}
        const message = 'Произведена запись ' + selectedDate + ' на ' + selectedTime + ' пользователь: ' + firstName + ' ' +  lastName + ' https://vk.com/id' +  props.fetchedUser.id
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
        sendMessage(props.adminVkID, Math.random()*34567, message).catch(err=>{
            console.log(err)
        })
        props.updateBase(base)

    }
    function tes(){
        console.log(!props.isValidate, props.selectedTime)

    }


    return (
        <Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
            >
                Выберите время
            </PanelHeader>
            <div className="SelectTime">
                <div className="time">
                {recordTime.map((value, index) =>{
                    if (index <= 2){
                        return (
                            <Input
                                key={index}
                                id={index}
                                onChange={props.changeSelectedTime}
                                value={value}
                                disabled={busyTime.includes(value)}
                            />
                        )
                    }
                })}
                </div>
                <div className="time">
                    {recordTime.map((value, index) =>{
                        if (index > 2 && index <= 5){
                            return (
                                <Input
                                    key={index}
                                    id={index}
                                    onChange={props.changeSelectedTime}
                                    value={value}
                                    disabled={busyTime.includes(value)}
                                />
                            )
                        }
                    })}
                </div>
                <div className="time">
                    {recordTime.map((value, index) =>{
                        if (index > 5){
                            return (
                                <Input
                                    key={index}
                                    id={index}
                                    onChange={props.changeSelectedTime}
                                    value={value}
                                    disabled={busyTime.includes(value)}
                                />
                            )
                        }
                    })}
                </div>


            </div>
            <div id='person'>
                <div id='form'>
                    <label id='la1'>Имя:</label>
                    <input id='in1' type="text" onChange={handleFirstName} defaultValue={props.fetchedUser.first_name}/>
                </div>
                <div>
                    <label id='la1'>Фамилия:</label>
                    <input id='in1' type="text" onChange={handleLastName} defaultValue={props.fetchedUser.last_name}/>
                </div>
                <div>
                    <label id='la1'>Телефон:</label>
                    <input id='in1' type="text" onChange={handlePhone} defaultValue='+7'/>
                </div>
                <div>
                    <label id='la1'>Количество людей:</label>
                    <input id='in1' type="text" onChange={handleAmount} defaultValue=''/>
                </div>
            </div>

            <Button  onClick={saveTimeRecords} disabled={!props.isValidate} >Записаться</Button>
            <Button  onClick={tes} >тест</Button>

        </Panel>
    );
}

SelectTime.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default SelectTime;