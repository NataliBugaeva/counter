import React from "react";
import s from "./Button.module.css";
import {ModeType} from "../../App";

export type ButtonPropsType = {
    name: string,
    counter: number,
    callback: () => void,
    buttonSetDisabled: boolean,
    error: string,
  //  mode: ModeType
}

export const Button = (props: ButtonPropsType) => {
    const disable: any =
        //эта строка была для перфгого варианта
        ((props.name === 'set') && (props.buttonSetDisabled))
       //а эта для второго
       // ((props.name === 'set') && (props.buttonSetDisabled)) && (props.mode === 'settingsMode')
        || ((props.name === 'inc') && ((props.counter === Number(JSON.parse(localStorage.getItem('maxValue') || '5'))) || !props.buttonSetDisabled || props.error.length))
        || ((props.name === 'reset') && ((!props.buttonSetDisabled) || props.error.length));

    const onButtonClick = () => {
        props.callback();
    }

    let buttonClass = disable ? 'disabledButton' : 'button';
    return (
        <button className={s[buttonClass]} onClick={onButtonClick} disabled={disable}>
            {props.name}
        </button>
    )
}

