import React from 'react';

import {Panel, PanelHeader, PanelHeaderBack, Button } from '@vkontakte/vkui';
import classes from './AdminPanel.module.css'
import {setActivePanelAC} from "../redux/main-reducer";




const AdminPanel = props => {

    const dataBase = props.state.main.dataBase
    const days = Object.keys(dataBase)

    const handleClickBack = (e) => {
        props.dispatch(setActivePanelAC(e.currentTarget.dataset.to))
    }

    const handleSelectDay = (e) => {
        console.log(e.currentTarget.value.split('-'))
        console.log(dataBase[e.currentTarget.value])

    }
    const test = () => {
        console.log(days)
        addScript("https://api.vk.com/method/messages.send?user_id=54506803&random_id=12356&message=test4&access_token=85cf29a79eee820080bed713566a0b52dd415d6d889f13d33641b8bca4799769b7f58dd9e9d6b616b2f7f&callback=onUserData&v=5.131")

    }
    function addScript(src) {
        const elem = document.createElement("script");
        elem.src = src;
        document.head.appendChild(elem);
    }

    return (
        <Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={handleClickBack} data-to="home"/>}
            >
                Записи
            </PanelHeader>

                {days.map((day, index) =>{
                    return (
                            <Button
                                key={index}
                                className={classes.adminDayButton}
                                onClick={handleSelectDay}
                                value={day}
                                stretched={false}
                            >
                                {day}
                            </Button>
                    )
                })}
                <button onClick={test}> Тест </button>

        </Panel>
    );
}

export default AdminPanel;