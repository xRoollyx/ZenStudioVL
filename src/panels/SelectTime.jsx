import React from 'react';
import classes from "./SelectTime.module.css"
import InputTime from "../components/InputTime";

import {
    Panel, Button, PanelHeader, PanelHeaderBack, FormLayoutGroup, FormItem, Input, FormLayout
} from "@vkontakte/vkui";

const SelectTime = props => {

    const test = () => {
        console.log(props.data)
    }

    return (
        <Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
            >
                Выберите время
            </PanelHeader>
            <FormLayout className={classes.form}>
                <FormLayoutGroup mode='vertical'>
                    <div className={classes.layoutGroup}>
                        <InputTime value='10:00-11:00'/>
                        <InputTime value='11:00-12:00'/>
                        <InputTime value='12:00-13:00'/>
                    </div>

                </FormLayoutGroup>
                <FormLayoutGroup mode='vertical'>
                    <div className={classes.layoutGroup}>
                        <InputTime value='13:00-14:00'/>
                        <InputTime value='14:00-15:00'/>
                        <InputTime value='15:00-16:00'/>
                    </div>
                </FormLayoutGroup>
                <FormLayoutGroup mode='vertical'>
                    <div className={classes.layoutGroup}>
                        <InputTime value='16:00-17:00'/>
                        <InputTime value='17:00-18:00'/>
                        <InputTime value='18:00-19:00'/>
                    </div>
                </FormLayoutGroup>

                <FormLayoutGroup mode="horizontal">
                    <FormItem top="Имя">
                        <Input/>
                    </FormItem>
                    <FormItem top="Фамилия">
                        <Input/>
                    </FormItem>
                </FormLayoutGroup>
                <FormLayoutGroup mode="horizontal">
                    <FormItem top="Количество людей">
                        <Input/>
                    </FormItem>
                    <FormItem top="Телефон">
                        <Input/>
                    </FormItem>
                </FormLayoutGroup>
            </FormLayout>

            <Button className={classes.btn} onClick={props.go} data-to="home">Записаться</Button>
            <Button className={classes.btn} onClick={test} >Записаться</Button>


        </Panel>
    );
}
export default SelectTime;