import React from 'react';
import mystyle from '../containers/home/home.module.css'

const SelectUI = (props) => {
    let inputElement = null;
    if (props.elemType === 'select') {
        let option = [];
        if (props.elemConfig.option.length === 2) {
            if (props.label === 'Age') {
                
                for (let start = props.elemConfig.option[0]; start <= props.elemConfig.option[1]; start++) {
                    option.push(<option key={start} value={start}>{start}</option>)
                }

            } else if (props.label === 'Distance') {
                for (let start = props.elemConfig.option[0]; start <= props.elemConfig.option[1]; start += 5) {
                    option.push(<option key={start} value={start}>{start}</option>)
                }
            }
        } else {
            option = props.elemConfig.option.map((o) => <option key={o} value={o}>{o}</option>)
        }
        inputElement = <select {...props.elemConfig}
                               onChange={props.changevalue}
                               >{option}</select>

    } else if (props.elemType === 'input') {
        inputElement = <input  onChange={props.changevalue}
                               {...props.elemConfig}>
                       </input>

    }
    let elementWithLabel = null
    if (props.nestedLabel) {
        elementWithLabel = <div>
           <div>
           <label id={props.nestedLabel[0]}>{props.nestedLabel[0]}
                {inputElement}
            </label>
           </div>
           <div>
           <label id={props.nestedLabel[1]}>{props.nestedLabel[1]}
                {inputElement}
            </label>
           </div>
        </div>
      

    } else {
        elementWithLabel = inputElement
    

    }

    return (<div className={mystyle.selectUIdiv}><p>{props.label}</p>
        {elementWithLabel}
    </div>)

}
export default SelectUI;