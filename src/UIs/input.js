import React from 'react';
import './input.css';
import mystyle from '../containers/login/login.module.css'



const input = (props) => {
    let inputElement = null;

    const inputClasses = [];
    if (props.from === 'profile' || props.from === 'login') {
        inputClasses.push(mystyle[props.class]);
       

    }

    if (props.invalid && props.shouldValidate && props.touched) {

        inputClasses.push('invalid');
    }
    let option = [];
    if (props.elemType === 'select') {
        let config = { ...props.elemConfig }

        option = config.option.map((o) => {

            return <option key={o} value={o} >{o}</option>
        })
    }
    if (props.elemType === 'inputcheckbox') {
        let config = { ...props.elemConfig }


        option = config.option.map((o) => {
            return (
                <div key={o} className={inputClasses.join(' ')}>
                    <label>{o}</label>
                    <input type={config.type} />
                </div>
            )
        })
    }
    switch (props.elemType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                id={props.label}
                {...props.elemConfig}
                value={props.value}
                onChange={props.changed} />
            break;
        case ('inputcheckbox'):
            inputElement = option.slice();
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                id={props.label}
                {...props.elemConfig}
                value={props.value}
                onChange={props.changed} />
            break;

        case ('select'):
            inputElement = <select
                className={inputClasses.join(' ')}
                id={props.label}
                {...props.elemConfig}
                value={props.value}
                onChange={props.changed}>{option}</select>
            break;

        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                id={props.label}
                {...props.elemConfig}
                value={props.value}
                onChange={props.changed} />
    }
    return (
        <div >
            <label >{props.label} 
            <br></br>
            {inputElement}
            </label>

        </div>
    )
}

export default input;
