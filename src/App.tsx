import React from 'react';
import './App.css';
import {Screen} from "./components/Screen/Screen";
import {Button} from "./components/Button/Button";
import {v1} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./redux/store";
import {
    setButtonSetDisabled, setCorrectValueButAnotherHasError,
    setCounter,
    setError, setIncorrectValue,
    setMaxValue,
    setMinValue, setMode, setTheSameOrCorrectValues,
    setValuesFromLS
} from "./redux/mainReducer";

//для второго варианта добавила useState mode
//изменила setValue
//отрисовку раскоменть
//в пропсы в button еще прокинула mode
//disabled изменила условия

export type InputType = {
    id: string,
    label: string,
    value: string,
    class: string
}
export type ModeType = 'counterMode' | 'settingsMode';

function App() {

    /*const [counter, setCounter] = React.useState<number>(0);
    const [inputs, setInputs] = React.useState<Array<InputType>>([
        {id: v1(), label: 'maxValue', value: '5', class: ''},
        {id: v1(), label: 'minValue', value: '0', class: ''}
    ]);
    const [error, setError] = React.useState<string>('');
    const [minValue, setMinValue] = React.useState<number>(0);
    const [maxValue, setMaxValue] = React.useState<number>(5);
    const [buttonSetDisabled, setButtonSetDisabled] = React.useState<boolean>(true);
    const [mode, setMode] = React.useState<ModeType>('counterMode')*/

    const inputs = useSelector<RootStateType, Array<InputType>>(state => state.mainReducer.inputs);
    const counter = useSelector<RootStateType, number>(state => state.mainReducer.counter);
    const error = useSelector<RootStateType, string>(state => state.mainReducer.error);
    const minValue = useSelector<RootStateType, number>(state => state.mainReducer.minValue);
    const maxValue = useSelector<RootStateType, number>(state => state.mainReducer.maxValue);
    const buttonSetDisabled = useSelector<RootStateType, boolean>(state => state.mainReducer.buttonSetDisabled);
    const mode = useSelector<RootStateType, string>(state => state.mainReducer.mode);

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (localStorage.getItem('minValue') && localStorage.getItem('maxValue')) {
            let newMax = JSON.parse(localStorage.getItem('maxValue') || '');
            let newMin = JSON.parse(localStorage.getItem('minValue') || '');
            // setInputs(inputs.map(e => e.label === 'maxValue' ? {...e, value: newMax} : {...e, value: newMin}));
            // setCounter(newMin);
            dispatch(setValuesFromLS(newMax, newMin));
            dispatch(setCounter(Number(newMin)));
        }
    }, [])

    //каждый раз, когда будет меняться стэйт инпутов, я буду сэтать новые значения (минимальное и максимальное)
    React.useEffect(() => {
        //setMinValue(Number(inputs.find(e => e.label === 'minValue')!.value));
        //setMaxValue(Number(inputs.find(e => e.label === 'maxValue')!.value));
        dispatch(setMinValue());
        dispatch(setMaxValue());
    }, [inputs])

//переменная для изменения аида инпута с ошибкой

    let inputView = '';
    //это меняет значение инпута и перерисовывает стэйт
    const changeInputValue = (inputId: string, inputName: string, value: string) => {
        console.log(value, inputName, minValue, maxValue);

        //если ошибки нет
        if ((inputName === 'maxValue' && minValue >= 0 && minValue < Number(value))
            || (inputName === 'minValue' && Number(value) >= 0 && Number(value) < maxValue)) {
            console.log('ошибка ушла')
            inputView = '';
           // setError('');
            dispatch(setError(''));
            //setButtonSetDisabled(false);
            dispatch(setButtonSetDisabled(false));
           /* setInputs(inputs.map(e => e.label === inputName ? {...e, value, class: inputView} : {
                ...e,
                class: inputView
            }))*/
            dispatch(setTheSameOrCorrectValues(inputName, inputView, value));
        } else {
            console.log('ошибка')
            //setError('Incorrect value!');
            dispatch(setError('Incorrect value!'));
            //setButtonSetDisabled(true);
            dispatch(setButtonSetDisabled(true));
            inputView = 'input_with_error';
            if ((inputName === 'minValue' && Number(value) === maxValue)
                || (inputName === 'maxValue' && Number(value) === minValue)) {
                /* setInputs(inputs.map(e => e.label === inputName ? {...e, value, class: inputView} : {
                     ...e,
                     class: inputView
                 }));*/
                dispatch(setTheSameOrCorrectValues(inputName, inputView, value));
                //если меняя какой-нибудь из инпутов вводим некорректное значение
            } else if ((inputName === 'minValue' && (Number(value) < 0 || Number(value) > maxValue))
                || (inputName === 'maxValue' && (Number(value) <= 0 || Number(value) < minValue))) {
                //setInputs(inputs.map(e => e.label === inputName ? {...e, value, class: inputView} : e));
                dispatch(setIncorrectValue(inputName, inputView, value));
                //если меняя один инпут вводим в него корректное значение, но другой при этом уже был подсвечен ошибкой
            } else if ((inputName === 'minValue' && Number(value) >= 0 && Number(value) < maxValue && error.length)
                || (inputName === 'maxValue' && Number(value) > 0 && Number(value) > minValue && error.length)) {
                //setInputs(inputs.map(e => e.label === inputName ? {...e, value, class: ''} : {...e, class: inputView}));
                dispatch(setCorrectValueButAnotherHasError(inputName, inputView, value));
                //если в инпутах получились одинаковые значения, то ошибкой подсветятся оба
            }
        }

    }

    //по нажатию на кнопку set в LS будут сохраняться два значения minValue и maxValue и меняется значение счетчика на minValue
    const setValue = () => {
        //здесьь сделала изменения с if-else Для второго случая
        //чтоб вернуть как было, оставьь только else
        // if (mode === 'counterMode') {
        //     setMode('settingsMode');
        // } else {
        //     localStorage.setItem('maxValue', JSON.stringify(maxValue));
        //     localStorage.setItem('minValue', JSON.stringify(minValue));
        //     setCounter(minValue);
        //     setButtonSetDisabled(true);
        //     setMode('counterMode');
        // }
        localStorage.setItem('maxValue', JSON.stringify(maxValue));
        localStorage.setItem('minValue', JSON.stringify(minValue));
        //setCounter(minValue);
       // setButtonSetDisabled(true);
       // setMode('counterMode');
        dispatch(setCounter(minValue));
        dispatch(setButtonSetDisabled(true));
        //dispatch(setMode('counterMode'));
    }

    //по нажатию на кнопку Inc будет увеличиваться счеткчик. кнопка д.б. задизэйблена, если счетчик равен maxValue
    const increaseCounter = () => {
        let maxCounterValue = Number(JSON.parse(localStorage.getItem('maxValue') || '5'));
        if (counter < maxCounterValue) {
           // setCounter(counter + 1);
            dispatch(setCounter(counter + 1));
        }
    }

    //при нажатии на кнопку reset будем сбрасывать счетчик до минимального значения
    const resetCounter = () => {
       // setCounter(Number(JSON.parse(localStorage.getItem('minValue') || '0')));
      dispatch(setCounter(Number(JSON.parse(localStorage.getItem('minValue') || '0'))));
    }

//следующая строка разворачивается!!!там разметка для второго варианта счетчика
    /*  const table = mode === 'counterMode' ? <div className='table'>
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
                      error={error}
              mode={mode}/>
              <Button name={'reset'}
                      counter={counter}
                      callback={resetCounter}
                      buttonSetDisabled={buttonSetDisabled}
                      error={error}
                      mode={mode}/>
              <Button name={'set'}
                      counter={counter}
                      callback={setValue}
                      buttonSetDisabled={buttonSetDisabled}
                      error={error}
                      mode={mode}/>
          </div>
      </div> : <div className='table'>
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
                      error={error}
                      mode={mode}/>

          </div>
      </div>*/

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
