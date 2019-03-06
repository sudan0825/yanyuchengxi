import React from 'react';
import NavItem from './navItem';
import './navigation.css'
const  NavList = function(props){
    let items = ['Home','Activities','About Us'];
let itemlist = items.map((elem)=><NavItem item={elem} key={elem}></NavItem>)

    return (
        <ul>
            {itemlist}
        </ul>
    )
}

export default NavList;