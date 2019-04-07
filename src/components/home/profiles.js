import React from 'react';

import mystyle from '../../containers/home/home.module.css'

const Profile = (props) => {
    return <div className={mystyle.column}>
        
        <p><span> Name: </span>{props.data.Name}</p>
        <p><span> Gender:</span>{props.data.Gender}</p>
        <p><span> Age:</span>{props.data.Age}</p>
        <p><span> Height:</span>{props.data.Height}</p>
        <p><span> Location:</span>{props.data.Location}</p>
        <p><span> Occupation:</span>{props.data.Occupation}</p>
        <p><span> Introduction:</span>{props.data.SelfIntro}</p>
       
            {/* <img src={require('../../assets/elsa_frozen.jpg')} alt={props.name}></img> */}
    </div>
}

export default Profile;