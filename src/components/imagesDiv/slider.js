import React from 'react';
import mystyle from './sliderImages.module.css';
import BackDrop from '../../UIs/backcurtain';


const Slider = (props) => {

    let images = props.srcs.map((image, i) => {
        return <img src={image} alt={i} id={i} key={i}></img>
    })

    return (<div id="slider" className={mystyle.slider}>
        <div onClick={props.showmodalImage}>

            {images}
        </div>

        <BackDrop click={props.closebackkdrop}>

            <div>
                <img id='slideImage' src={props.srcs[props.numOfImage]}
                    alt={props.numOfImage} className={mystyle.slideImage}></img>
            </div>

        </BackDrop>
        {props.numOfImage === null?  null:
        <div>
            <p className={mystyle.prev} onClick={props.prev}>&#10094;</p>
            <p className={mystyle.next} onClick={props.next}>&#10095;</p>
        </div>}
       




    </div>)
}
export default Slider;