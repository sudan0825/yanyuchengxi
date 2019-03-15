import React from 'react';
import mystyle from './sliderImages.module.css';


const Slider = (props) => {
    let srcs= [require('../../assets/1.JPG'),require('../../assets/2.JPG'),require('../../assets/3.JPG'),
    require('../../assets/4.JPG'),require('../../assets/5.JPG')]
    return (<div className={mystyle.slider}>test
        <div>
            <div>
                <img className={mystyle.img} src={srcs[0]} alt="ss"></img>
                <img className={mystyle.img} src={srcs[1]} alt="ss"></img>

            </div>
            <div> <img className={mystyle.img} src={props.srcs[2]} alt="ss"></img></div>
            <div>
                <img className={mystyle.img} src={srcs[4]} alt="ss"></img>
                <img className={mystyle.img} src={srcs[3]} alt="ss"></img>
                
            </div>
           

        </div>

        <div className={mystyle.slideCover}>

            <p className={mystyle.prev} onClick={props.prev}>&#10094;</p>
            <p className={mystyle.next} onClick={props.next}>&#10095;</p>
        </div>

    </div>)
}
export default Slider;