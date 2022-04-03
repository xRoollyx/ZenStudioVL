import React from "react";
import classes from "./InputTime.module.css";

const InputTime = props =>{

    return(
        <div className={classes.input}>
            <input
                type="checkbox"
                onChange={props.onChange}
                value={props.value}
                disabled={props.disabled}
            />
            <label >
                {props.value}
            </label>
        </div>
    )
}
export default InputTime