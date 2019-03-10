import React from 'react';

const Submitandcancel = (props)=>{
    return (
    <div id='subandcel'>
    <button onClick={props.submit}>Submit</button> 
    <button onClick={props.cancel}>Cancel</button>
    </div>)
}

export default Submitandcancel;