import React from 'react';
import mystyle from './aboutus.module.css'

const Aboutus = (props) => {
  
   function checkmouse(e){
       console.log(document.activeElement.tagName)
      
   }
    return (<div id="ab" className={mystyle.aboutus} onClick={checkmouse}>
        <h1 id="why" >About Us</h1>
        <p>This project is starting at March 5th 2019. I want to build a website that helps people
            looking for the one. If you have any sugestion about how a social website like this should be,
        please email me: sudan0825@gmail.com. I would love to make your idea to the real world!   </p>
        <p>Nothing will be better than a couple meets each other at my website one day! :)</p>

        
    </div>)
}
export default Aboutus;