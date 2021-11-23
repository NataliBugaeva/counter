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
        case "SET-VALUES-FROM-LS": {
            return {
                ...state, inputs: state.inputs.map(e => e.label === 'maxValue' ? {...e, value: action.newMAx}
                    : {...e, value: action.newMin})
            }
        }
        case "SET-THE-SAME-OR-CORRECT-VALUES": {
            return {
                ...state, inputs: state.inputs.map(e => e.label === action.inputName ?
                    {...e, value: action.value, class: action.inputView} : {...e, class: action.inputView})
            }
        }
        case "SET-INCORRECT-VALUE": {
            return {
                ...state, inputs: state.inputs.map(e => e.label === action.inputName ?
                    {...e, value: action.value, class: action.inputView} : e)
            }
        }
        case "SET-CORRECT-VALUE-BUT-ANOTHER-HAS-ERROR": {
            return {
                ...state, inputs: state.inputs.map(e => e.label === action.inputName ?
                    {...e, value: action.value, class: ''} : {...e, class: action.inputView})
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
        case "SET-MODE": {
            return {...state, mode: action.mode}
        }

        default:
            return state
    }

}

export type ActionsType = ReturnType<typeof setValuesFromLS>
    | ReturnType<typeof setTheSameOrCorrectValues>
    | ReturnType<typeof setIncorrectValue>
    | ReturnType<typeof setCorrectValueButAnotherHasError>
    | ReturnType<typeof setCounter>
    | ReturnType<typeof setMinValue>
    | ReturnType<typeof setMaxValue>
    | ReturnType<typeof setError>
    | ReturnType<typeof setButtonSetDisabled>
    | ReturnType<typeof setMode>

export const setValuesFromLS = (newMAx: string, newMin: string) =>
    ({type: 'SET-VALUES-FROM-LS', newMAx, newMin} as const);
export const setTheSameOrCorrectValues = (inputName: string, inputView: string, value: string) =>
    ({type: "SET-THE-SAME-OR-CORRECT-VALUES", inputName, inputView, value} as const);
export const setIncorrectValue = (inputName: string, inputView: string, value: string) =>
    ({type: "SET-INCORRECT-VALUE", inputName, inputView, value} as const);
export const setCorrectValueButAnotherHasError = (inputName: string, inputView: string, value: string) =>
    ({type: "SET-CORRECT-VALUE-BUT-ANOTHER-HAS-ERROR", inputName, inputView, value} as const);
export const setCounter = (counter: number) => ({type: 'SET-COUNTER', counter} as const);
export const setMinValue = () => ({type: 'SET-MIN-VALUE'} as const);
export const setMaxValue = () => ({type: 'SET-MAX-VALUE'} as const);
export const setError = (errorValue: string) => ({type: 'SET-ERROR', errorValue} as const);
export const setButtonSetDisabled = (disabled: boolean) => ({type: "SET-BUTTON-SET-DISABLED", disabled} as const);

export const setMode = (mode: string) => ({type: "SET-MODE", mode} as const);
