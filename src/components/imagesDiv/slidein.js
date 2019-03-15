import React from 'react';
import mystyle from './sliderImages.module.css';


const Slidein = (props) => {
    let srcs= [require('../../assets/1.JPG'),require('../../assets/2.JPG'),require('../../assets/3.JPG'),
        require('../../assets/4.JPG'),require('../../assets/5.JPG')]
    let images = srcs.map((src) => {
        return <img className={mystyle.img} key={src} src={src} alt="ss"></img>
    })
    return (<div className={mystyle.slidein}>
        <div className={mystyle.slideCover}>
           <img className={mystyle.middle} src={props.srcs[0]} alt="ss"></img>

            <p className={mystyle.prev} onClick={props.prev}>&#10094;</p>
            <p className={mystyle.next} onClick={props.next}>&#10095;</p>
        </div>

        <div>
            {images}
        </div>
       




    </div>)
}
export default Slidein;