import React from 'react';
import classes from './Home.module.css'
import {Panel, PanelHeader, Button, Group, Div} from '@vkontakte/vkui';
import {setActivePanelAC} from "../redux/homePage-reducer";

const Home = props => {
    const Test = () => {

    }
    const Test1 = () => {

    }
    const handleClick = (e) => props.dispatch(setActivePanelAC(e.currentTarget.dataset.to))

    return (
        <Panel id={props.id}>
            <PanelHeader>Фотостудия ZEN</PanelHeader>
            <Group>
                <Div> Информация о студии

                </Div>
            </Group>
            <Button className={classes.Btn} onClick={handleClick} data-to="selectDate">
                Выберите дату записи
            </Button>
            <Button className={classes.Btn} onClick={Test} >
                ТЕСТ
            </Button>
            <Button className={classes.Btn} onClick={Test1} >
                ТЕСТ1
            </Button>
        </Panel>
    )
};

export default Home;
