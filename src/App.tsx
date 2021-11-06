import React from 'react';
import './App.css';
import {Screen} from "./components/Screen/Screen";
import {Button} from "./components/Button/Button";
import {v1} from "uuid";


export type InputType = {
    id: string,
    label: string,
    value: string,
    class: string
}

function App() {

    const [counter, setCounter] = React.useState<number>(0);
    const [inputs, setInputs] = React.useState<Array<InputType>>([
        {id: v1(), label: 'maxValue', value: '5', class: ''},
        {id: v1(), label: 'minValue', value: '0', class: ''}
    ]);
    const [error, setError] = React.useState<string>('');
    const [minValue, setMinValue] = React.useState<number>(0);
    const [maxValue, setMaxValue] = React.useState<number>(5);
    const [buttonSetDisabled, setButtonSetDisabled] = React.useState<boolean>(true);


    React.useEffect(() => {
        if (localStorage.getItem('minValue') && localStorage.getItem('maxValue')) {
            let newMax = JSON.parse(localStorage.getItem('maxValue') || '');
            let newMin = JSON.parse(localStorage.getItem('minValue') || '');
            setInputs(inputs.map(e => e.label === 'maxValue' ? {...e, value: newMax} : {...e, value: newMin}));
            setCounter(newMin);
        }
    }, [])

    //каждый раз, когда будет меняться стэйт инпутов, я буду сэтать новые значения (минимальное и максимальное)
    React.useEffect(() => {
        setMinValue(Number(inputs.find(e => e.label === 'minValue')!.value));
        setMaxValue(Number(inputs.find(e => e.label === 'maxValue')!.value));
    }, [inputs])

    //это меняет значение инпута и перерисовывает стэйт
    const changeInputValue = (inputId: string, inputName: string, value: string) => {
        setInputs(inputs.map(e => e.id === inputId ? {...e, value} : e));
        let inputView = '';
        console.log(value, inputName, minValue, maxValue);

        if (minValue <= 0 && inputName !== 'minValue') {
            console.log('ошибка')
            setError('Incorrect value!');
            setButtonSetDisabled(true);
            inputView = 'input_with_error';
            setInputs(inputs.map(e => e.label !== 'minValue' ? {...e, value} : {...e, class: inputView}));
        } else if (maxValue <= 0 && inputName !== 'maxValue') {
            console.log('ошибка')
            setError('Incorrect value!');
            setButtonSetDisabled(true);
            inputView = 'input_with_error';
            setInputs(inputs.map(e => e.label !== 'maxValue' ? {...e, value} : {...e, class: inputView}));
        } else if ((inputName === 'maxValue' || inputName === 'minValue') && Number(value) < 0) {
            console.log('ошибка')
            setError('Incorrect value!');
            setButtonSetDisabled(true);
            inputView = 'input_with_error';
            setInputs(inputs.map(e => e.id === inputId ? {...e, value, class: inputView} : e));
        } else if ((inputName === 'minValue' && Number(value) >= maxValue)
            || (inputName === 'maxValue' && Number(value) <= minValue)) {
            console.log('ошибка')
            setError('Incorrect value!');
            setButtonSetDisabled(true);
            inputView = 'input_with_error';
            setInputs(inputs.map(e => e.label === inputName ? {...e, value, class: inputView} : {
                ...e,
                class: inputView
            }));
        } else {
            console.log('ошибка ушла')
            inputView = '';
            setError('');
            setButtonSetDisabled(false);
            setInputs(inputs.map(e => e.id === inputId ? {...e, value, class: inputView} : {...e, class: inputView}));
        }
    }

    //по нажатию на кнопку set в LS будут сохраняться два значения minValue и maxValue и меняется значение счетчика на minValue
    const setValue = () => {
        localStorage.setItem('maxValue', JSON.stringify(maxValue));
        localStorage.setItem('minValue', JSON.stringify(minValue));
        setCounter(minValue);
        setButtonSetDisabled(true);
    }

    //по нажатию на кнопку Inc будет увеличиваться счеткчик. кнопка д.б. задизэйблена, если счетчик равен maxValue
    const increaseCounter = () => {
        let maxCounterValue = Number(JSON.parse(localStorage.getItem('maxValue') || '5'));
        if (counter < maxCounterValue) {
            setCounter(counter + 1);
        }
    }

    //при нажатии на кнопку reset будем сбрасывать счетчик до минимального значения
    const resetCounter = () => {
        setCounter(Number(JSON.parse(localStorage.getItem('minValue') || '0')));
    }

    //  console.log(minValue, maxValue, error, buttonSetDisabled)
    return (
        <div className="App">
            <div className='table'>
                <Screen inputs={inputs}
                        changeInputValue={changeInputValue}
                        error={error}
                        buttonSetDisabled={buttonSetDisabled}
                        maxValue={maxValue}/>
                <div className='block_with_buttons'>
                    <Button name={'set'}
                            counter={counter}
                            callback={setValue}
                            buttonSetDisabled={buttonSetDisabled}
                            error={error}/>

                </div>
            </div>

            <div className='table'>
                <Screen counter={counter}
                        inputs={inputs}
                        changeInputValue={changeInputValue}
                        error={error}
                        buttonSetDisabled={buttonSetDisabled}
                        maxValue={maxValue}/>
                <div className='block_with_buttons'>
                    <Button name={'inc'}
                            counter={counter}
                            callback={increaseCounter}
                            buttonSetDisabled={buttonSetDisabled}
                            error={error}/>
                    <Button name={'reset'}
                            counter={counter}
                            callback={resetCounter}
                            buttonSetDisabled={buttonSetDisabled}
                            error={error}/>
                </div>
            </div>
        </div>
    );
}

export default App;
