import React from 'react';
import { Link } from 'react-router-dom'
import mystyle from '../../containers/home/home.module.css'

const Profile = (props) => {

    return <div className={mystyle.column}>
        <Link to={"personalprofile?id=" + props.name}>
            <img src={require('../../assets/elsa_frozen.jpg')} alt={props.name}></img>
        </Link>
        <p> Name</p>
        <p>{props.gender}</p>
        <p>Age</p>

    </div>
}

export default Profile;