import React from 'react';
import classes from "./SelectDate.module.css"
import {
    Button, ButtonGroup,
    Calendar,
    FormItem,
    FormLayout,
    Panel,
    PanelHeader,
    PanelHeaderBack,
} from '@vkontakte/vkui';
import {
    resetSelectedDate,
    setSelectedDateAC
} from "../redux/selectDate-reducer";
import {setActivePanelAC} from "../redux/main-reducer";


const SelectDate = props => {

    const selectedDate = props.state.selectedDate;


    const setDate = (event) => {
        props.dispatch(setSelectedDateAC(event))
    }


    const handleClick = (e) => props.dispatch(setActivePanelAC(e.currentTarget.dataset.to))
    const handleClickBack = (e) => {
        props.dispatch(resetSelectedDate())
        props.dispatch(setActivePanelAC(e.currentTarget.dataset.to))
    }



    return (
        <Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={handleClickBack} data-to="home"/>}
            >
                Выберите дату
            </PanelHeader>

            <FormLayout>
                <FormItem>
                    <Calendar
                        value={selectedDate}
                        className={classes.calendar}
                        disablePast={true}
                        onChange={setDate}
                    >

                    </Calendar>
                </FormItem>
            </FormLayout>
            <ButtonGroup
                className={classes.btnContainer}
                mode="vertical">
                <Button
                    onClick={handleClick}
                    data-to="selectedTime"
                >
                    Выбрать: {selectedDate.toLocaleDateString()}
                </Button>

            </ButtonGroup>

        </Panel>
    );
}
export default SelectDate;