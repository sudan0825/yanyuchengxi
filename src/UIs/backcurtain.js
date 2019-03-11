import React from 'react';
import './input.css'


const Backcurtain = (props)=>{


    return (<div id="curtain" onClick={props.click}> {props.children}</div>)
}
export default Backcurtain;