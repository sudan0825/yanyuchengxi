import React, { Component } from 'react';
import mystyle from './PersonalProfile.module.css';
import Slider from '../../../components/imagesDiv/slider';
import axios from "../../../axios";
import file from '../../../assets/userInfo'




class Personalprofile extends Component {
    state = {
        personID: '',
        images: [],
        srcs: [require('../../../assets/couple.jpg'), require('../../../assets/hand.jpg'), require('../../../assets/heart.jpeg'),
        require('../../../assets/c1.jpg'), require('../../../assets/c2.jpg')],
        imageslide: false,
        numOfImage: null,
        data: {}


    }


    componentDidMount() {
        this.setState({ personID: window.location.href.substring(window.location.href.indexOf("=") + 1) },
            function () {
                this.retrieveUserInfo(this.state.personID)
            })
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

    retrieveUserInfo(id) {
        axios.get('/userInfo.json')
            .then((res) => {
                for (let key in res.data) {
                    console.log(res.data[key], key, id)
                    if (res.data[key].id === id) {

                        this.setState({ data: res.data[key].data })
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
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
    adddata() {

        // for(let i in file){
        //     let id = i;
        //     let data = file[i];

        //     axios.post('/userInfo.json',{id:id,data:data}).then((res)=>{
        //         console.log(res)
        //       }).catch((err)=>{
        //           console.log(err)
        //       })
        // }

    }
    render() {

        console.log(this.state.data)
        return <div className={mystyle.personalProfile}>
            <div className={mystyle.top}>
                <div id="item1" className={mystyle.item1}>
                    <h1>{this.state.data.Name}</h1>
                </div>
                <div id="item2" className={mystyle.item2}>
                    <p><span> Gender:</span>{this.state.data.Gender}</p>
                    <p><span> Age:</span>{this.state.data.Age}</p>
                    <p><span> Height:</span>{this.state.data.Height}</p>
                    <p><span> Location:</span>{this.state.data.Location}</p>
                    <p><span> Occupation:</span>{this.state.data.Occupation}</p>
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
                {this.state.data.SelfIntro}
                {/* <button onClick={()=>this.adddata()}></button> */}


            </div>



        </div>
    }
}


export default Personalprofile;