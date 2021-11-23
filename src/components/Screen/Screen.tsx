import React from "react";
import s from './Screen.module.css';
import {Input} from "../Input/Input";
import {InputType} from "../../App";

type ScreenPropsType = {
    counter?: number,
    inputs: Array<InputType>,
    changeInputValue: (inputId: string, inputName: string, value: string) => void,
    error: string,
    buttonSetDisabled: boolean,
    maxValue: number
}

export const Screen = (props: ScreenPropsType) => {

    let counterColor = '';
    if (typeof props.counter === 'number') {
        counterColor = props.counter < props.maxValue ? 'counter' : 'disabledCounter';
    }

    let ui;

    if (typeof props.counter === 'number') {
console.log('отловили')
        if (!props.error.length && !props.buttonSetDisabled) {
            ui = <span style={{color: '#28b718', fontWeight: 'bold'}}>Enter values and press key!</span>
        }
        if (props.error.length && props.buttonSetDisabled) {
            ui = <span style={{color: 'rgba(155,71,252,0.7)', fontWeight: 'bold'}}>{props.error}</span>
        }
        if (!props.error.length && props.buttonSetDisabled) {
            ui = <div className={s[counterColor]}>{props.counter}</div>
        }
    } else {
        ui = props.inputs.map(e => <Input id={e.id} label={e.label} value={e.value}
                                          callback={props.changeInputValue} class={e.class}/>)
    }



    return (

        <div className={s.screen}>
            {ui}
        </div>
    )
}

