import React from 'react';
import classes from './Home.module.css'

import {Panel, PanelHeader, Button, Group, Div} from '@vkontakte/vkui';

const Home = props => {
    return (
        <Panel id={props.id}>
            <PanelHeader>Фотостудия ZEN</PanelHeader>
            <Group>
                <Div> Информация о студии

                </Div>
            </Group>
            <Button className={classes.Btn} onClick={props.go} data-to="selectDate">
                Выберите дату записи
            </Button>
        </Panel>
    )
};

export default Home;
