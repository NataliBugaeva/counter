import React from "react";
import s from "./Button.module.css";

export type ButtonPropsType = {
    name: string,
    counter: number,
    callback: () => void,
    buttonSetDisabled: boolean,
    error: string
}

export const Button = (props: ButtonPropsType) => {
    const disable: any =
        ((props.name === 'set') && (props.buttonSetDisabled))
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

