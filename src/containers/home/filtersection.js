import React, { Component } from 'react';
import SelectUI from '../../UIs/selectUI';
import mystyle from './home.module.css';
import Submitandcancel from '../../UIs/submitandcancelbutton';


class Filtersection extends Component {
    state = {
        searchFor: {
            Age: {
                elemType: 'select',
                elemConfig: {
                    option: [18, 80],
                    name: 'age'
                },
                value:18,
                nestedLabel: ['From', 'To'],
                class: 'filter'

            },
            Distance: {
                elemType: 'select',
                elemConfig: {
                    option: [0, 100],
                    name: 'distance'
                },
                value:0,
                nestedLabel: ['From', 'To'],

            },
            Gender: {
                elemType: 'input',
                elemConfig: {
                    type: 'radio',
                    name: 'gender',
                },
                nestedLabel: ['Male', 'Female']
            },
            Height: {
                elemType: 'select',
                elemConfig: {
                    option: ['5\'0"', '5\'1"', '5\'2"', '5\'3"', '5\'4"', '5\'5"', '5\'6"',
                        '5\'7"', '5\'8"', '5\'9"', '5\'10"', '5\'11"', '6\'0"'],
                    name: 'height'

                },
                value:'5\'0"',
                class: 'selectUI'
            },
            Income: {
                elemType: 'select',
                elemConfig: {
                    option: ['~$50,000', '$50,000~$100,000', '$100,000~$150,000',
                        '$150,000~200,000', '$200,000~$300,000', '$300,000~'],
                    name: 'income',
                    multiple: true
                }
            }
           

        },
        query: {
            ageFrom: null,
            ageTo: null,
            distanceFrom: null,
            distanceTo: null,
            gender: null,
            height: null,
            income: []
        },
        errorMessage: {
            wrongAge: "",
            wrongDistance: ""
        },
        filterInfo: [],
        

    }
    componentDidMount() {
        this.init()
    }
   
 
    init() {
        let filterInfo = [];
        let searchFor = this.state.searchFor
        for (let i in searchFor) {

            filterInfo.push(<SelectUI key={i} elemType={searchFor[i].elemType}
                elemConfig={searchFor[i].elemConfig}
                label={i}
                nestedLabel={searchFor[i].nestedLabel}
                changevalue={(e) => this.changevalue(e)}>
            </SelectUI>)
        }
        this.setState({ filterInfo: filterInfo })

    }
    changevalue(e) {
        let name;
        let error = { ...this.state.errorMessage };
        for (let err in error) {
            error[err] = ""
        }
        this.setState({ errorMessage: error })
        if (e.target.name === "age" || e.target.name === "distance") {
            name = e.target.name + e.target.parentNode.id;
        } else {
            name = e.target.name;
        }
        let newqueries = { ...this.state.query };
        if (e.target.name === "gender") {
            newqueries[name] = e.target.parentNode.id.toLowerCase();
        } else if (e.target.name === 'income') {
            let options = e.target.options;
            newqueries[name] = []
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    newqueries[name].push(options[i].value)
                }
            }

        } else {
            newqueries[name] = e.target.value;
        }

        this.setState({ query: newqueries })


    }
    submit() {

        let data = { ...this.state.query };

        let error = { ...this.state.errorMessage };

        if (data['ageFrom'] !== null) {

            if (data['ageTo'] === null) {
                data['ageTo'] = 99;
            } else {
                if (Number(data['ageTo']) < Number(data['ageFrom'])) {


                    error['wrongAge'] = "Please input a valid age range"
                    this.setState({ errorMessage: error })
                    return
                }
            }
        } else {
            if (data['ageTo'] !== null) {
                data['ageFrom'] = 18
            }
        }
        if (data['distanceFrom'] !== null) {
           
            if (data['distanceTo'] === null) {
                data['distanceTo'] = 100;
            } else {
                if (Number(data['distanceTo']) < Number(data['distanceFrom'])) {
                    error['wrongDistance'] = "Please input a valid distance range";
                    
                    this.setState({ errorMessage: error })
                    return
                }
            }
        } else {
            if (data['distanceTo'] !== null) {
                data['distanceFrom'] = 0;
            }
        }

        let str = "";

        for (let i in data) {
            if (data[i] === null || data[i].length === 0) continue;
            str += i + " : " + data[i] + " "
        }

        if( window.confirm("query is\n" + str)){
           
            setTimeout(()=>{window.alert("information is sent")},500);
        }else{
            setTimeout(()=>{window.alert("your request is canceled")},500)
        }
       
        this.cancel()

    }

    cancel() {
        let newqueries = { ...this.state.query };
        for (let q in newqueries) {
            newqueries[q] = null
        }
        document.getElementById('filtersection').style.height = 0;
        document.getElementById('filtersection').style["boxShadow"] = '';
        this.setState({ query: newqueries})
       
    }
    render() {


        return (
            <div>
                <div id="selections"
                    className={mystyle.selections}>
                    {this.state.filterInfo}


                </div>
                <div><Submitandcancel
                    submit={() => this.submit()}
                    cancel={() => this.cancel()}>
                </Submitandcancel></div>
                <div>{this.state.errorMessage.wrongAge.length ? this.state.errorMessage.wrongAge : null}</div>
                <div>{this.state.errorMessage.wrongDistance.length ? this.state.errorMessage.wrongDistance : null}</div>
            </div>

        )
    }
}

export default Filtersection;