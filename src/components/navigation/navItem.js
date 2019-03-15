import React from 'react';
import { NavLink } from 'react-router-dom';



const navItem = function (props){
    let classes = "navlink";
    if(window.location.pathname.substring(1) === props.item.split(' ').join('').toLowerCase()){
        classes += " activeLink"

    }
    return <NavLink className={classes} to={props.item.split(' ').join('').toLowerCase()}>{props.item}</NavLink>
}

export default navItem;