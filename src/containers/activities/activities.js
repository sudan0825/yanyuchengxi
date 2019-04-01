import React, { Component } from 'react';
import Backcurtain from '../../UIs/backcurtain';
import Input from '../../UIs/input';
import mystyle from './activities.module.css';
import Submitandcancel from '../../UIs/submitandcancelbutton';
import axios from '../../axios';

import Tablehead from '../../components/activities/tablehead'

import { sortObjectByProperty } from '../../sortObjectByProperty'



class Activities extends Component {

    state = {
        th: ["Activity/Event name", "Date", "Place/City", "Zip", "Accommodaties", "Participants"],
        td: [],

        ascending: false,
        timer: null,
        newEvent: {
            Eventname: {
                elemType: 'input',
                elemConfig: {
                    type: 'string',
                    placeholder: "Please input an event name"
                },
                validation: {
                    required: true,
                },
                value:'',
                label: 'Activity/Event name',
            },
            Date: {
                elemType: 'input',
                elemConfig: {
                    type: 'date',
                    placeholder: "Please input an event name"
                },
                validation: {
                    required: true,
                },
                value:'',

            },
            City: {
                elemType: 'input',
                elemConfig: {
                    type: 'string',
                    placeholder: "Please input an event name"
                },
                validation: {
                    required: true,
                },
                value:'',
                label:'City/Place'

            },
            Zip: {
                elemType: 'input',
                elemConfig: {
                    type: 'string',
                    placeholder: "Please input an event name"
                },
                validation: {
                    required: true,
                },
                value:'',

            },
            Participants: {
                elemType: 'input',
                elemConfig: {
                    type: 'number',
                    placeholder: "Please input an event name"
                },
                validation: {
                    required: true,
                },
                value:'',

            },

        },
        showCurtain: false,
        err:""

    }
    componentDidMount(){
      console.log("activity mount")
       this.getEventsFromServer()
      
    }
    getEventsFromServer(){
        axios.get('/event.json')
        .then((res)=>{
           
            let now = new Date();
            let data = res.data;
            for(let d in data){
                let date = new Date(data[d]['Date'])
                
                if(date < now){
                    delete data[d]
                }
            }
          
            this.setState({td:sortObjectByProperty(data,'Eventname', 'ascending')})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    //seach an event by it's place or name
    search() {

        let filter, row, namedata, citydata, i, name, city;
        if (this.state.timer) {
            clearTimeout(this.state.timer)
        }
        filter = document.getElementById("search").value.toLowerCase();
        row = document.getElementById("activitytable").getElementsByTagName("tr");
        this.setState({
            timer: setTimeout(function () {

                for (i = 1; i < row.length; i++) {
                    name = row[i].getElementsByTagName('td')[0];
                    city = row[i].getElementsByTagName('td')[2];
                    namedata = name.textContent || name.innerText;
                    citydata = city.textContent || city.innerText;
                    if (namedata.toLowerCase().indexOf(filter) !== -1 ||
                        citydata.toLowerCase().indexOf(filter) !== -1) {
                        row[i].style.display = "";
                    } else {
                        row[i].style.display = "none"
                    }
                }


            }, 300)
        })
    }
   //sort table content by the clicked column name 
    sorttable(e) {

        let heads = ["Eventname", "Date", "City", "Zip", "Accommodaties", "Participants"];
        let index = this.state.th.indexOf(e.target.innerText.trim())
        let sequence = this.state.ascending;
        this.setState({ td: sortObjectByProperty(this.state.td,heads[index], sequence,index),
                        ascending: !sequence })
    }
    showCurtain() {

        this.setState({ showCurtain: true })
    }
    //check whether the input is valid or not
    chechValidity = (value, rules) => {
        if (!rules) return true;
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = (value.trim().length >= rules.minLength) && isValid;
        }
        return isValid;
    }
    //hand the new event input change
    inputchangeHandler(e,elem) {

        const updateState = {
            ...this.state.newEvent,
            [elem]: {
                ...this.state.newEvent[elem],
                value: e.target.value,
                touched: true
            }
        }

        this.setState({ newEvent: updateState });
    }
    //if click on the background, hide the drop back curtain
    hideCurtain(e) {

        if (e.currentTarget === e.target) {
            this.setState({ showCurtain: false })
        }

    }

    //clear input event field
    cancel(e) {
        e.preventDefault();
        let clearObj = {...this.state.newEvent};
        for(let elem in clearObj){
           
            clearObj[elem].value = ''
        }
       this.setState({newEvent:clearObj}, ()=>{
         
       })

    }
    //submit the new event
    submit(e) {

        e.preventDefault();
        let data = {};
       
        for(let d in this.state.newEvent){
            if(this.chechValidity(this.state.newEvent[d].value,this.state.newEvent[d].validation)){
                let errormessage = "Please in put a valid "+d
                this.setState({err:errormessage})

            }
            data[d]=this.state.newEvent[d].value
        }
        console.log(data)
        axios.post('/event.json',data)
        .then((res)=>{
            let oldState=[...this.state.td];
            oldState.push([res.data.name,data])
            console.log(oldState);
            this.setState({td:oldState})
        })
        .catch((err)=>{
            console.log(err)
        })
        this.cancel(e);
      
        this.setState({ showCurtain: false })
     
       
    }

    changeEventDetail(e){
        e.target.addEventListener('blur',(e)=>this.printchange(e))
   
    }

    printchange(e){
        
        console.log("call back", e.target);
     
    }
    //print the table content to HTML

    prepareTableContent(){
        let map = new Map();
        let heads = ["Eventname", "Date", "City", "Zip", "Accommodaties","Participants"];
        let tds = [];
        tds = this.state.td.map((record)=>{
            let participant = 0, accommodaties = 0;
            for(let d in record[1]){
                if(d === "Accommodaties"){
                    accommodaties = record[1][d]
                }
                if(d === "Participants"){
                    participant = record[1][d]
                }
                map.set(d,record[1][d]);
            }
            let moreParticipantAlert = false
            if(participant > accommodaties){
              
                moreParticipantAlert = true
            }
            let tdata = heads.map(head=>{
                return <td   key={head}>{map.get(head)}</td>
            })
            return (<tr key={record} 
                        className={moreParticipantAlert?[mystyle.datarow, mystyle.moreParticipantAlert].join(' '):mystyle.datarow}
                        onFocus={(e)=>this.changeEventDetail(e)}
                        title={moreParticipantAlert?"More Participant than space allowed":null}>
                        {tdata}  
                        
                        </tr>)
                
        })
        return tds;
    }
    render() {
       
     
      
        let tds = [];
        tds=this.prepareTableContent()
        
        let eventDetails = [];
        for (let i in this.state.newEvent) {
            eventDetails.push([i, this.state.newEvent[i]])
        }
        let newEvent = (
            <div className={mystyle.backcurtain}>

                <form>
                    <h2>New Activities</h2>
                    {eventDetails.map((eventDetail) => {
                        return <Input key={eventDetail[0]}
                            elemType={eventDetail[1].elemType}
                            elemConfig={eventDetail[1].elemConfig}
                            label={eventDetail[1].label ? eventDetail[1].label : eventDetail[0]}
                            value = {eventDetail[1].value}
                            from={'activity'}
                            changed={(e)=>this.inputchangeHandler(e,eventDetail[0])}>
                        </Input>

                    })}
                    <Submitandcancel submit={(e) => this.submit(e)}
                        cancel={(e) => this.cancel(e)}></Submitandcancel>

                </form>

                
            </div>)
       
        return (<div>
            {this.state.showCurtain ? <Backcurtain  click={(e) => this.hideCurtain(e)}>
                {newEvent}
            </Backcurtain> : null}

            <div id={mystyle.plussign} onClick={() => this.showCurtain()}>
                <img src={require('../../assets/plus-sign.jpg')}
                    alt="plussign" title="Add New Activities"></img>
                <p>Add New Activities</p>
            </div>
            <input
                id="search"
                className={mystyle.search}
                type="search"
                placeholder="search activity by name or city"
                onChange={() => this.search()} />
            <table id="activitytable" className={mystyle.activitytable}>
                <caption>Activities & Events</caption>
                
                {/* let ths = this.state.th.map((head) => {
            return <th columnname={head} key={head}>{head}</th>
        }); */}
                <thead onClick={(e) => this.sorttable(e)}>
                    <Tablehead columnname={this.state.th}></Tablehead>
                </thead>
                <tbody>
                    {tds}
                </tbody>
            </table>
           
        </div>)
    }
}

export default Activities;