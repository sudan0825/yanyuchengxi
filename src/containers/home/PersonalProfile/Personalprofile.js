import React, { Component } from 'react';
import mystyle from './PersonalProfile.module.css';
import Slider from '../../../components/imagesDiv/slider';
import axios from "../../../axios";
import file from '../../../assets/userInfo';

//connect to react-redux;
import { connect } from 'react-redux';
import * as action from '../../../store/actions/homepagedata';







class Personalprofile extends Component {
    state = {
       
        images: [],
        srcs: [require('../../../assets/couple.jpg'), require('../../../assets/hand.jpg'), require('../../../assets/heart.jpeg'),
        require('../../../assets/c1.jpg'), require('../../../assets/c2.jpg')],
        imageslide: false,
        numOfImage: null,



    }


  componentWillUnmount(){
      
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

  
    showmodalImage(e) {

        this.setState({ numOfImage: e.target.alt }, () => {

            if (this.state.numOfImage !== null) {

                document.getElementById('curtain').style.display = "block"
            }
        })

    }
    closebackkdrop(e) {

        if (e.target === e.currentTarget) {
            document.getElementById('curtain').style.display = "none";
            this.setState({ numOfImage: null })
        }

    }
    prev() {
        let numberOfImage = this.state.numOfImage;

        numberOfImage--;
        if (numberOfImage < 0) {
            numberOfImage = this.state.srcs.length - 1;
        }
        this.setState({ numOfImage: numberOfImage })



    }
    next(a) {
        let numberOfImage = this.state.numOfImage;

        numberOfImage++;

        if (numberOfImage > this.state.srcs.length - 1) {
            numberOfImage = 0;
        }
        this.setState({ numOfImage: numberOfImage })


    }
    // adddata() {
    //         let id = "ggSHJb7pEuW3rYfx10XmnKBiGeJ2";
    //         let data = {
    //             Name: "Dan",
    //             Age: "36",
    //             Gender: "Male",
    //             Height: "5'10\"",
    //             Location: "Santa Clara",
    //             Occupation: "Hardware Engineer",
    //             image:"gs://yanyuchengxi.appspot.com/user1",
    //             SelfIntro: "Born and raised in Northern California.  I am very close to my family and friends and they mean the world to me.\nI've been described as laid-back, intelligent, and loyal.  I usually don't take myself too seriously.\nWork takes a lot of my time, but on weekends I like to hangout with friends, go out and have a few drinks, or explore new eateries."
    //         }
    //         axios.post('/userInfo.json',{id:id,data:data}).then((res)=>{
    //             console.log(res)
    //           }).catch((err)=>{
    //               console.log(err)
    //           })

    // }
    render() {
       console.log(this.props.userdata.Name)
        return <div className={mystyle.personalProfile}>
           
           <div className={mystyle.top}>
                <div id="item1" className={mystyle.item1}>
                  <img src={this.props.src}
                      ></img>
                    <h1>{this.props.userdata.Name}</h1>
                </div>
                <div id="item2" className={mystyle.item2}>
                    <p><span> Gender:</span>{this.props.userdata.Gender}</p>
                    <p><span> Age:</span>{this.props.userdata.Age}</p>
                    <p><span> Height:</span>{this.props.userdata.Height}</p>
                    <p><span> Location:</span>{this.props.userdata.Location}</p>
                    <p><span> Occupation:</span>{this.props.userdata.Occupation}</p>
                    {/* <div id="bar" className={mystyle.bar}>
                        <div id="control" className={mystyle.control} onMouseDown={() => this.moveButton()}
                            onMouseUp={() => this.removebarlistner()} ></div>
                    </div>
                    <div id="percent"></div> */}


                </div>
            </div>
            <div id="item3" className={mystyle.item3}>
                <Slider showmodalImage={(e) => this.showmodalImage(e)}
                    srcs={this.state.srcs}
                    prev={() => this.prev()}
                    next={() => this.next()}
                    numOfImage={this.state.numOfImage}
                    closebackkdrop={(e) => this.closebackkdrop(e)}></Slider>



            </div>

            <div id="item4" className={mystyle.item4}>
            <h2>Introduction</h2>
                {this.props.userdata.SelfIntro}
                {/* <button onClick={()=>this.adddata()}></button> */}


            </div>


        </div>
    }
}

const mapStateToProps = state => {

    return {

        src:state.homepageloadingReducer.thumnail,
        bigc:state.homepageloadingReducer.bigPic,
        userdata:state.homepageloadingReducer.clickedUserData
     

    }
}

const mapActionToProps = dispatch => {
    return {
       

    }
}
export default connect(mapStateToProps, mapActionToProps)(Personalprofile);