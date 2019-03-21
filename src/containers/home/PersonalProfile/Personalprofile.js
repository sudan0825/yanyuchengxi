import React, { Component } from 'react';
import mystyle from './PersonalProfile.module.css';
import Slider from '../../../components/imagesDiv/slider';





class Personalprofile extends Component {
    state = {
        personID: '',
        images: [],
        srcs: [require('../../../assets/1.JPG'), require('../../../assets/2.JPG'), require('../../../assets/3.JPG'),
        require('../../../assets/4.JPG'), require('../../../assets/5.JPG')],
        imageslide: false,
        numOfImage:null


    }


    componentDidMount() {
        this.setState({ personID: window.location.href.substring(window.location.href.indexOf("=") + 1) })
        let arr = new Array(5).fill(1)
        this.setState({ images: arr });


    }


    plus() {
        let meter = document.getElementsByTagName('meter')[0];
        if (meter.value < 100) {
            meter.value += 10;
        }



    }
    min() {
        let meter = document.getElementsByTagName('meter')[0];
        if (meter.value > 0) {
            meter.value -= 10;
        }


    }
    moveButton() {

        document.getElementById('bar').addEventListener('mousemove', this.mousepostion);

    }
    mousepostion(e) {
        let elem = document.getElementById('control');
        let bar = document.getElementById('bar');
        let barRect = bar.getBoundingClientRect();
        bar.addEventListener('mouseleave', this.removebarlistner)
        if (e.clientX - barRect.left >= 0 && e.clientX - barRect.left <= 483) {
            elem.style.left = e.clientX - barRect.left + 'px';
        }
        let percent = document.getElementById("percent");
        percent.innerHTML = ((e.clientX - barRect.left) / 5).toFixed(0) + "%"
    }

    removebarlistner() {

        document.getElementById('bar').removeEventListener('mousemove', this.mousepostion);
    }
    changeslider() {

    }
    componentDidUpdate(){
       
    }
    showmodalImage(e){
       
        this.setState({numOfImage: e.target.alt},()=>{
       
            if(this.state.numOfImage !== null){
               
                document.getElementById('curtain').style.display = "block"
            }
        })

    }
    closebackkdrop(e){

        if(e.target === e.currentTarget){
            document.getElementById('curtain').style.display = "none";
            this.setState({numOfImage:null})
        }

    }
    prev() {
       let numberOfImage = this.state.numOfImage;

       numberOfImage--;
        if(numberOfImage<0){
            numberOfImage=this.state.srcs.length-1;
        }
        this.setState({numOfImage:numberOfImage})
    


    }
    next(a) {
        let numberOfImage = this.state.numOfImage;
        
        numberOfImage++;
        
         if(numberOfImage > this.state.srcs.length-1){
             numberOfImage=0;
         }
         this.setState({numOfImage:numberOfImage})


    }
    render() {

      
        return <div className={mystyle.personalProfile}>
            <div className={mystyle.top}>
                <div id="item1" className={mystyle.item1}>
                    <h1> Image here</h1>
                </div>
                <div id="item2" className={mystyle.item2}>
                    <h1> Persona Information here</h1>
                    <p>{this.state.personID}</p>
                    <div id="bar" className={mystyle.bar}>
                        <div id="control" className={mystyle.control} onMouseDown={() => this.moveButton()}
                            onMouseUp={() => this.removebarlistner()} ></div>
                    </div>
                    <div id="percent"></div>


                </div>
            </div>
            <div id="item3" className={mystyle.item3}>
                <Slider showmodalImage={(e)=>this.showmodalImage(e)} 
                        srcs={this.state.srcs} 
                        prev={() => this.prev()}
                        next={() => this.next()}
                        numOfImage={this.state.numOfImage}
                        closebackkdrop={(e)=>this.closebackkdrop(e)}></Slider>



            </div>

            <div id="item4" className={mystyle.item4}>




            </div>



        </div>
    }
}


export default Personalprofile;