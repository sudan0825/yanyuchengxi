import React from 'react';
import mystyle from './aboutus.module.css'

const Aboutus = (props) => {

    function checkmouse(e) {
        console.log(document.activeElement.tagName)

    }
    return (<div id="ab" className={mystyle.aboutus} onClick={checkmouse}>
        <div className={mystyle.backgroundimg1}>
            <div className={mystyle.caption}>
                <span className={mystyle.border}  >Hi! Welcome To Yanyuchengxi</span>
            </div>

        </div>
        <div className={mystyle.text}>
            <h1 id="why" >About Us</h1>
            <p>This project is starting at March 5th 2019. I want to build a website that helps people
                looking for the one. If you have any sugestion about how a social website like this should be,
        please email me: sudan0825@gmail.com. I would love to make your idea to the real world!   </p>
            <p>Nothing will be better than a couple meets each other at my website one day! :)</p>
        </div>

        <div className={mystyle.backgroundimg2}>
            <div  className={mystyle.caption}>
                <span className={mystyle.border} >Your one is looking for you too</span>
            </div>

        </div>
        <div className={mystyle.text}>
            <p>Life is hard if you handle everything by yourself. Find the one who stands for you when you 
                tired; Find the one who you want to shield. Life is short. We should try out best to live the way we want to live. 
                Don't afraid hurt. It always accompany by happiness. That makes a life colorful. </p>
            <p> </p>
        </div>

        <div className={mystyle.backgroundimg3}>
            <div className={mystyle.caption}>
                <span className={mystyle.border}  >Best Luck on the way to happy</span>
            </div>

        </div>

    </div>)
}
export default Aboutus;