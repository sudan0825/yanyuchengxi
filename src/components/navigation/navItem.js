import React from 'react';
import { NavLink } from 'react-router-dom';



const navItem = function (props){

    return <NavLink className="navlink" to={props.item.split(' ').join('').toLowerCase()}>{props.item}</NavLink>
}

export default navItem;