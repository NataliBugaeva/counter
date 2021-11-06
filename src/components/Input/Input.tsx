import React, {ChangeEvent} from "react";
import s from "./Input.module.css";
import {InputType} from "../../App";

export type InputPropsType = {
    id: string,
    label: string,
    value: string,
    callback: (inputId: string, inputName: string, value: string) => void,
    class: string
}

export const Input = (props: InputPropsType) => {

    const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
        props.callback(e.currentTarget.id, e.currentTarget.name, e.currentTarget.value);
    }


    return (
        <div className={s.block_with_input}>
            <label htmlFor={props.id}>{props.label}</label>
                <input className={s[props.class]}
                       type='number'
                       id={props.id}
                       value={props.value}
                       name={props.label}
                       onChange={changeValue}/>

        </div>
    )
}
