import React, { Component } from 'react';
import Profile from '../../components/home/profiles';
import mystyle from './home.module.css';
import Filters from './filtersection';



class Homepage extends Component {
    state = {
        employee: new Array(30).fill(),
        profiles: [],
        isSelectionShow: false

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
            return <Profile key={i} name={i} title={i} description={i} gender={g}></Profile>
        });
        this.setState({ profiles: newprofiles })
    }


    showfilters() {
        let filters = document.getElementById('filtersection');

        filters.style.height = 320 + 'px';
        filters.style["boxShadow"] = '1px 1px 5px 2px rgb(214, 211, 207)';
        this.setState({ isSelectionShow: true })
        this.hide(filters)

    }


    hide(filters) {
            filters.addEventListener('mouseleave', () => {
                if (this.state.isSelectionShow) {
                    filters.style.height = 0;
                    filters.style["boxShadow"] = '';
                    this.setState({ isSelectionShow: false })
                }
                filters.addEventListener('mouseenter', () => {
                    this.showfilters()
                })
            })
           
    }
    render() {

        return (
            <div id="homepage" className={mystyle.homepage}>
                <div id="showselection" className={mystyle.showselection}>
                    <div onMouseOver={() => this.showfilters()}>&#x25BC;</div>
                </div>

                <div id="filtersection" className={mystyle.filtersection} >
                    <h1>Selection</h1>
                    <Filters></Filters>



                </div>

                <div className={mystyle.gridcontainer}>

                    {this.state.profiles}
                </div>
            </div>

        )
    }

}
export default Homepage;