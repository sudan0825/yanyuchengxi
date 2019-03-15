import React from 'react';
import mystyle from './sliderImages.module.css'


const SliderImageContainer = (props)=>{
    return (<div className={mystyle.imagesContainer}>
         <img className={mystyle.img} src={props.img} alt = {props.name}></img>
         
    </div>)
}
export default SliderImageContainer;