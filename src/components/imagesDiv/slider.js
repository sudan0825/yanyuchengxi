import React from 'react';
import mystyle from './sliderImages.module.css';
import BackDrop from '../../UIs/backcurtain';


const Slider = (props) => {

    let images = props.srcs.map((image, i) => {
        return <img src={image} alt={i} id={i} key={i}></img>
    })
    let image =<img className={mystyle.slideImage} src={props.srcs[props.numOfImage]}
            alt={props.numOfImage} ></img>
   
    return (<div id="slider" className={mystyle.slider}>

        <div onClick={props.showmodalImage}>

            {images}
        </div>


        {props.numOfImage === null ? null :
            <div>
                <BackDrop click={props.closebackkdrop}>
                    {image}
                    <p className={mystyle.prev} onClick={props.prev}>&#10094;</p>
                    <p className={mystyle.next} onClick={props.next}>&#10095;</p>
                </BackDrop>
                

            </div>}
    </div>)
}
export default Slider;