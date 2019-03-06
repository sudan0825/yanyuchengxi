import React, { Component } from 'react';
import Profile from '../../components/home/profiles';
import './home.css';


class Homepage extends Component {
    state = {
        employee: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        profile: [],

    }


   componentDidMount(){
       this.init()
   }
    init(){
        let newprofiles = this.state.employee.map((e, i) => {
            let g
            if (i % 2 === 0) {
                g = "female"
            } else {
                g = "male"
            }
            return <Profile name={i} key={i} title={i} description={i} gender={g}></Profile>
        });
        this.setState({profiles:newprofiles})
    }

    filtergender(e) {
        let left;
      
        if (e.target.value === 'female') {
            left = 0;

        } else if (e.target.value === 'male') {
            left = 1;
        }
       
        let newprofiles = this.state.employee.map((e, i) => {

            if (i % 2 === left){
                let g;
                if(left === 0) g="female";
                else{
                    g="male"
                }
                return <Profile name={i} key={i} title={i} description={i} gender={g}></Profile>
            }

        
                
        })
        this.setState({profiles:newprofiles})

    }
    render() {
        
        return (<div>
            <div id="bts" onClick={(e)=>this.filtergender(e)}>
            <input type="radio" name="gender" value="female" />female
            <input type="radio" name="gender" value="male"/>male
            </div>
            <div className="gridcontainer">

                {this.state.profiles}
            </div>
        </div>

        )
    }

}
export default Homepage;