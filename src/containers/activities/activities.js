import React, { Component } from 'react';
import Backcurtain from '../../UIs/backcurtain';
import Input from '../../UIs/input';
import mystyle from './activities.module.css';
import Submitandcancel from '../../UIs/submitandcancelbutton';



class Activities extends Component {

    state = {
        th: ["Activity/Event name", "Date", "City", "Zip", "Participants"],
        td: [["Grocery Shopping", "05/06/2019", "Sunnyvale", "94086", 10],
        ["Drawing Class", "03/30/2019", "Santa Clara", "95051", 31],
        ["10 miles Hiking", "04/03/2019", " Mountain view", " 95003", 18],
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
                label: 'Event Name',
            },
            Date: {
                elemType: 'input',
                elemConfig: {
                    type: 'date',
                    placeholder: "Please input an event name"
                },

            },
            City: {
                elemType: 'input',
                elemConfig: {
                    type: 'string',
                    placeholder: "Please input an event name"
                },

            },
            Zip: {
                elemType: 'input',
                elemConfig: {
                    type: 'string',
                    placeholder: "Please input an event name"
                },

            },
            Participants: {
                elemType: 'input',
                elemConfig: {
                    type: 'number',
                    placeholder: "Please input an event name"
                },

            },

        },
        showCurtain: false

    }
    search() {

        let filter, row, namedata, citydata, i, name, city;
        if (this.state.timer) {
            clearTimeout(this.state.timer)
        }
        this.setState({
            timer: setTimeout(function () {
                filter = document.getElementById("search").value.toLowerCase();
                row = document.getElementById("activitytable").getElementsByTagName("tr");
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


            }, 1000)
        })
    }

    sorttable(e) {

        let n = this.state.th.indexOf(e.target.innerText.trim());

        let tabledata = this.state.td.slice();
        let sequence = this.state.ascending;

        if (sequence) {

            tabledata.sort((a, b) => (a[n] + "").localeCompare(b[n] + ""))
        } else {
            tabledata.sort((a, b) => (b[n] + "").localeCompare(a[n] + ""))
        }
        this.setState({ td: tabledata, ascending: !sequence })
    }
    inputchangeHandler() {

    }
    addNewEvent() {
        this.setState({ showCurtain: true })
    }
    hideCurtain(e) {
     
        if (e.currentTarget === e.target) {
            this.setState({ showCurtain: false })
        }

    }
    cancel() {
        this.setState({ showCurtain: false })

    }
    submit() {
        this.setState({ showCurtain: false })
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
            <div>
                <div>
                    <form>
                        <h2>New Activities</h2>
                        {eventDetails.map((eventDetail) => {
                            return <Input key={eventDetail[0]}
                                elemType={eventDetail[1].elemType}
                                elemConfig={eventDetail[1].elemConfig}
                                label={eventDetail[1].label ? eventDetail[1].label : eventDetail[0]}
                                from={'activity'}
                                changed={this.inputchangeHandler}>
                            </Input>

                        })}

                    </form>
                </div>
                <div>
                    <Submitandcancel submit={() => this.submit()}
                        cancel={() => this.cancel()}></Submitandcancel>
                </div>
            </div>)
        return (<div>
            {this.state.showCurtain ? <Backcurtain click={(e) => this.hideCurtain(e)}>
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