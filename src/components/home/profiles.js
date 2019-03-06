import React from 'react';


const Profile = (props) => {

    return <div className="column">
        <img src={require('../../assets/elsa_frozen.jpg')} alt={props.name}></img>
        <p> Name</p>
        <p>{props.gender}</p>
        <p>Age</p>

    </div>
}

export default Profile;