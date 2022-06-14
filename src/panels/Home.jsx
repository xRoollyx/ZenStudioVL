import React from 'react';
import classes from './Home.module.css'
import {Panel, PanelHeader, Button, ButtonGroup, Div} from '@vkontakte/vkui';
import {setActivePanelAC} from "../redux/main-reducer";

const Home = props => {

    const test = () => {
        console.log(props.state.main.dataBase)
    }
    const handleClick = (e) => props.dispatch(setActivePanelAC(e.currentTarget.dataset.to))

    return (
        <Panel id={props.id}>
            <PanelHeader>Фотостудия ZEN</PanelHeader>
            <Div className={classes.group}>
                <Div className={classes.body}>
                    <Div className={classes.imgSlider} >1</Div>
                    <Div className={classes.info}>
                        Слайдеры — аксессуары, устанавливаемые на мотоцикл
                        для защиты хрупких деталей от разбивания и протирания
                        при падении машины. Обычно устанавливаются по бокам двигателя.
                        Также слайдеры устанавливаются на маятник заднего колеса,
                        на ручки руля и даже на выхлопные трубы. Википедия
                    </Div>
                </Div>
            </Div>

            <ButtonGroup
                className={classes.btnContainer}
                mode="vertical">
                <Button
                    onClick={handleClick}
                    data-to="selectDate"
                >
                    Выберите дату записи
                </Button>
                <Button
                    onClick={handleClick}
                    data-to="adminPanel"
                >
                    Админ
                </Button>
                <Button
                    onClick={test}
                >
                    Тест
                </Button>
            </ButtonGroup>



        </Panel>
    )
};

export default Home;
