import React from 'react';

import mystyle from '../../containers/home/home.module.css'

const Profile = (props) => {
    return <div className={mystyle.column} onClick={props.click}>
    
        <p>My name is {props.data.Name}. I am {props.data.Gender} and {props.data.Age} years 
        old. {props.data.Height}. Live in {props.data.Location}
        </p>
        <p>{props.data.SelfIntro}</p>
        {/* <h1>{props.data.Name}</h1>
        <p><span> Gender:</span>{props.data.Gender}</p>
        <p><span> Age:</span>{props.data.Age}</p>
        <p><span> Height:</span>{props.data.Height}</p>
        <p><span> Location:</span>{props.data.Location}</p>
        <p><span> Occupation:</span>{props.data.Occupation}</p>
        <p><span> Introduction:</span>{props.data.SelfIntro}</p> */}
       
            {/* <img src={require('../../assets/elsa_frozen.jpg')} alt={props.name}></img> */}
    </div>
}

export default Profile;