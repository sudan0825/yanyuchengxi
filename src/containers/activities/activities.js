import React, { Component } from 'react';
import Backcurtain from '../../UIs/backcurtain';
import Input from '../../UIs/input';
import mystyle from './activities.module.css';
import Submitandcancel from '../../UIs/submitandcancelbutton';
import axios from '../../axios'



class Activities extends Component {

    state = {
        th: ["Activity/Event name", "Date", "City", "Zip", "Participants"],
        td: [["Grocery Shopping", "05/06/2019", "Sunnyvale", "94086", 10],
        ["Drawing Class", "03/30/2019", "Santa Clara", "95051", 31],
        ["10 miles Hiking", "04/03/2019", "Mountain view", " 95003", 18],
        ["15 miles Hiking", "04/20/2019", "Sunnyvale", "94087", 20],
        ["Cooking class with Chef", "09/12/2019", "Cupertino", "94028", 30],
        ["Video Game together", "12/31/2019", "Fremont", "93048", 10]],

        ascending: true,
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
                label: 'Event Name',
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
        showCurtain: false

    }
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

    sorttable(e) {

        let n = this.state.th.indexOf(e.target.innerText.trim());

        let tabledata = this.state.td.slice();
        let sequence = this.state.ascending;

        if (sequence) {
            if (n === 4) {
                tabledata.sort((a, b) => a[n] - b[n])

            } else {
                tabledata.sort((a, b) => (a[n] + "").trim().localeCompare((b[n] + "").trim()))

            }


        } else {
            if (n === 4) {
                tabledata.sort((a, b) => b[n] - a[n])

            } else {
                tabledata.sort((a, b) => (b[n] + "").trim().localeCompare((a[n] + "").trim()))

            }

        }
        this.setState({ td: tabledata, ascending: !sequence })
    }
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
    addNewEvent() {

        this.setState({ showCurtain: true })
    }
    hideCurtain(e) {

        if (e.currentTarget === e.target) {
            this.setState({ showCurtain: false })
        }

    }
    cancel(e) {
        e.preventDefault();
        let clearObj = {...this.state.newEvent};
        for(let elem in clearObj){
           
            clearObj[elem].value = ''
        }
       this.setState({newEvent:clearObj}, ()=>{
           console.log(this.state.newEvent)
       })

    }
    submit(e) {

        e.preventDefault();

        axios.post('/event.json',this.state.newEvent)
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
     
       
    }
    render() {
       

        let ths = this.state.th.map((head) => {
            return <th columnname={head} key={head}>{head}</th>
        })
        let tds = this.state.td.map((tr, idx) => {
            let datas = tr.map((d, i) => {
                return <td data={d} key={d + i}>{d}</td>
            })
            return <tr key={idx + tr.join('')}>{datas}</tr>
        })
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

            <div id={mystyle.plussign} onClick={() => this.addNewEvent()}>
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
                <thead onClick={(e) => this.sorttable(e)}>
                    <tr>{ths}</tr>
                </thead>
                <tbody>
                    {tds}
                </tbody>


            </table>
        </div>)
    }
}

export default Activities;