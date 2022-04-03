import React, {useEffect} from 'react';
import classes from "./SelectTime.module.css"
import InputTime from "../components/InputTime";
import {
    Panel, Button, PanelHeader, PanelHeaderBack, FormLayoutGroup, FormItem, Input, FormLayout
} from "@vkontakte/vkui";
import {setActivePanelAC, setDataBaseAC} from "../redux/homePage-reducer";
import {getDateFormat} from "../function/Function";
import {getServerBase, setServerBase, updateServerBase} from "../components/crud/crud";
import {setAmountAC, setFirstNameAC, setLastNameAC, setPhoneNumberAC, setTimesAC} from "../redux/selectTime-reducer";

const RECORD_TIMES = [
    '10:00-11:00', '11:00-12:00', '12:00-13:00',
    '13:00-14:00', '14:00-15:00', '15:00-16:00',
    '16:00-17:00', '17:00-18:00', '18:00-19:00'
]

const SelectTime = props => {
    const {firstName,lastName,phoneNumber, amount} = props.state.recordTime
    const id = props.state.homepage.fetchedUser.id
    const {fN, lN, pN, aT, tS} = props.state.recordTime.validate
    const date = getDateFormat(props.state.selectedDate)
    const busyTime = props.state.homepage.dataBase[date]?Object.keys(props.state.homepage.dataBase[date]):[]
    const validate = fN&&lN&&pN&&aT&&tS
    let times = props.state.recordTime.times

    const test = () => {
        console.log(fN, lN, pN, aT, tS)
    }

    const handleFirstName = (e) =>props.dispatch(setFirstNameAC(e.target.value));
    const handleLastName = (e) =>props.dispatch(setLastNameAC(e.target.value));
    const handlePhoneNumber = (e) =>props.dispatch(setPhoneNumberAC(e.target.value));
    const handleAmount = (e) =>props.dispatch(setAmountAC(e.target.value));
    const handleClick = (e) => {
        const data = {firstName,lastName,phoneNumber,amount,id}
        times.map((time) =>{
            updateServerBase(date,time,data)
        })
        getServerBase().then((response) => {
            return props.dispatch(setDataBaseAC(response))
        })
        props.dispatch(setAmountAC(''))
        props.dispatch(setTimesAC([]))
        props.dispatch(setActivePanelAC(e.currentTarget.dataset.to))
    }
    const handleClickBack = (e) => {
        props.dispatch(setAmountAC(''))
        props.dispatch(setTimesAC([]))
        props.dispatch(setActivePanelAC(e.currentTarget.dataset.to))
    }
    const handleOnChange = (e) => {
        if (times.includes(e.target.value)) {
            times = times.filter(function(f) { return f !== e.target.value })
            props.dispatch(setTimesAC(times))
        } else {
            times.push(e.target.value)
            props.dispatch(setTimesAC(times))
        }
    }

    return (
        <Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={handleClickBack} data-to="home"/>}
            >
                Выберите время
            </PanelHeader>
            <FormLayout className={classes.form}>
                <FormLayoutGroup className={classes.inputGroup} mode='vertical'>
                    {RECORD_TIMES.map((value, index) => {
                        return <InputTime
                            key={index}
                            value={value}
                            disabled={busyTime.includes(value)}
                            onChange={handleOnChange}
                        />
                    })}
                </FormLayoutGroup>
                <FormLayoutGroup mode="horizontal">
                    <FormItem top="Имя">
                        <Input
                            onChange={handleFirstName}
                            value={firstName}
                        />
                    </FormItem>
                    <FormItem top="Фамилия">
                        <Input
                            onChange={handleLastName}
                            value={lastName}
                        />
                    </FormItem>
                </FormLayoutGroup>
                <FormLayoutGroup mode="horizontal">
                    <FormItem top="Количество людей">
                        <Input
                            onChange={handleAmount}
                            value={amount}
                        />
                    </FormItem>
                    <FormItem top="Телефон">
                        <Input
                            onChange={handlePhoneNumber}
                            value={phoneNumber}
                        />
                    </FormItem>
                </FormLayoutGroup>
            </FormLayout>

            <Button className={classes.btn} onClick={handleClick} disabled={!validate} data-to="home">Записаться</Button>
            <Button className={classes.btn} onClick={test} >Тест</Button>


        </Panel>
    );
}
export default SelectTime;