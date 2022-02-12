import React from "react";

const Input = props =>{

    return(
        <div>
            <input
                type="checkbox"
                id={props.id}
                onChange={props.onChange}
                value={props.value}
                disabled={props.disabled}/>
            <label id={props.id}>
                {props.value}
            </label>
        </div>
    )
}
export default Input