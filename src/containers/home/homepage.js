import React, { Component } from 'react';
import Profile from '../../components/home/profiles';
import { Link } from 'react-router-dom'
import './home.css';


class Homepage extends Component {
    state = {
        employee: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        profiles: [],

    }


    componentDidMount() {
        this.init()
    }
    init() {
        let newprofiles = this.state.employee.map((e, i) => {
            let g
            if (i % 2 === 0) {
                g = "female"
            } else {
                g = "male"
            }
            return <Link to={"personalprofile?id=" + i} key={i} ><Profile name={i} title={i} description={i} gender={g}></Profile></Link>
        });
        this.setState({ profiles: newprofiles })
    }

    filtergender(e) {
        let left;

        if (e.target.value === 'female') {
            left = 0;

        } else if (e.target.value === 'male') {
            left = 1;
        } else {
            return
        }

        let newprofiles = this.state.employee.map((e, i) => {

            if (i % 2 === left) {
                let g;
                if (left === 0) g = "female";
                else {
                    g = "male"
                }
                return <Profile name={i} key={i} title={i} description={i} gender={g}></Profile>
            }



        })
        this.setState({ profiles: newprofiles })

    }
    showfilters() {

        let filters = document.getElementById('filtersection');
        filters.style.height = 350 + 'px';

    }

    hidefilters() {

        document.body.addEventListener('mouseover', hide);
        let filters = document.getElementById('filtersection');
        function hide(e) {

            if (e.target === filters || e.target.parentNode === filters || e.target.parentNode.parentNode === filters) {

                filters.style.height = 350;
                filters.style["boxShadow"]= '1px 1px 5px 2px rgb(214, 211, 207)';

            } else {
                filters.style.height = 0;
                filters.style["boxShadow"]=''
            }
        }
    }
    render() {

        return (
            <div id="homepage">
                <div id="showselection" onMouseOver={this.showfilters} onMouseLeave={() => this.hidefilters()}>
                    <div></div>
                    <div></div>
                    <div></div>


                </div>

                <div id="filtersection">
                    <h1>Selection</h1>

                    <div id="bts" onClick={(e) => this.filtergender(e)}>
                        <input type="radio" name="gender" value="female" />female
                        <input type="radio" name="gender" value="male" />male
                    </div>
                </div>

                <div className="gridcontainer">

                    {this.state.profiles}
                </div>
            </div>

        )
    }

}
export default Homepage;