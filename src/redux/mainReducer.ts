import {v1} from "uuid";
import {InputType} from "../App";

export type MainReducerType = {
    counter: number,
    inputs: Array<InputType>,
    error: string,
    minValue: number,
    maxValue: number,
    buttonSetDisabled: boolean,
    mode: string
}

const initialState: MainReducerType = {
    counter: 0,
    inputs: [
        {id: v1(), label: 'maxValue', value: '5', class: ''},
        {id: v1(), label: 'minValue', value: '0', class: ''}
    ],
    error: '',
    minValue: 0,
    maxValue: 5,
    buttonSetDisabled: true,
    mode: 'counterMode'
};

export const MainReducer = (state: MainReducerType = initialState, action: ActionsType): MainReducerType => {
    switch (action.type) {
        case 'SET-INPUTS': {
            return {
                ...state, inputs: state.inputs.map(e => e.label === 'maxValue' ? {...e, value: action.newMax}
                    : {...e, value: action.newMin})
            }
        }
        case 'SET-COUNTER': {
            return {...state, counter: action.counter}
        }
        case "SET-MIN-VALUE": {
            return {...state, minValue: Number(state.inputs.find(e => e.label === 'minValue')!.value)}
        }
        case "SET-MAX-VALUE": {
            return {...state, maxValue: Number(state.inputs.find(e => e.label === 'maxValue')!.value)}
        }
        case "SET-ERROR": {
            return {...state, error: action.errorValue}
        }
        case "SET-BUTTON-SET-DISABLED": {
                return {...state, buttonSetDisabled: action.disabled}
        }

        default:
            return state
    }

}

export type ActionsType = ReturnType<typeof setInputs>
    | ReturnType<typeof setCounter>
    | ReturnType<typeof setMinValue>
    | ReturnType<typeof setMaxValue>
    | ReturnType<typeof setError>
    | ReturnType<typeof setButtonSetDisabled>


export const setInputs = (newMax: string, newMin: string) => ({type: 'SET-INPUTS', newMax, newMin} as const);
export const setCounter = (counter: number) => ({type: 'SET-COUNTER', counter} as const);
export const setMinValue = () => ({type: 'SET-MIN-VALUE'} as const);
export const setMaxValue = () => ({type: 'SET-MAX-VALUE'} as const);
export const setError = (errorValue: string) => ({type: 'SET-ERROR', errorValue} as const);
export const setButtonSetDisabled = (disabled: boolean) => ({type: "SET-BUTTON-SET-DISABLED", disabled} as const);
