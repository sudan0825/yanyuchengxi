import React from 'react';
import './input.css';



const input = (props) => {
    let inputElement = null;
    const inputClasses = [];

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
        inputClasses.push('checkbox')
      
        option = config.option.map((o) => {
            return (
                <div key={o} className={inputClasses}>
                <label>{o}</label>
                <input  type={config.type} />
                </div>
            )
        })
    }
    switch (props.elemType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
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
                {...props.elemConfig}
                value={props.value}
                onChange={props.changed} />
            break;

        case ('select'):
            inputElement = <select
                className={inputClasses.join(' ')}
                {...props.elemConfig}
                value={props.value}
                onChange={props.changed}>{option}</select>
            break;

        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elemConfig}
                value={props.value}
                onChange={props.changed} />
    }
    return (
        <div className="inputUI">
            <label>{props.label} </label>
            <br></br>
            {inputElement}

        </div>
    )
}

export default input;
