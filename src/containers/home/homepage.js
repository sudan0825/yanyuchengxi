import React, { Component } from 'react';
import Profile from '../../components/home/profiles';
import mystyle from './home.module.css';
import Filters from './filtersection';
import { Link } from 'react-router-dom'

//connect to react-redux;
import { connect } from 'react-redux';
import * as action from '../../store/actions/homepagedata';
import { deepCompare } from '../../deepCompare'



class Homepage extends Component {
    state = {
        profiles: [],
        isSelectionShow: false

    }
    componentDidMount() {
        console.log("did mount")
        this.props.loadingUserData();
        if(this.state.profiles){
            this.populateDataToUI(this.props.userInfo)
        }
        
    }
    shouldComponentUpdate(nextProps, nextState){

        if(deepCompare(this.props,nextProps) && deepCompare(this.state,nextState)) return false;
        return true

    }
    componentDidUpdate(){
       this.populateDataToUI(this.props.userInfo)
        
    }
    populateDataToUI(userInfo) {
       let newprofiles = []
       for(let k in userInfo){
           newprofiles.push(
            <Link className={mystyle.homepageLink} key={k} to={"personalprofile?id=" + userInfo[k].id}>
               <Profile id={userInfo[k].id} data={userInfo[k].data}></Profile>
            </Link>
           )

           }
        this.setState({ profiles: newprofiles })
    }


    showfilters() {
        let filters = document.getElementById('filtersection');
        var x = window.matchMedia("(max-width: 500px)")
        if (x.matches) {
            filters.style.height = '95%';
            filters.style.top = 10 + 'px';
            filters.style.overflow = "auto"
            let selections = document.getElementById('selections');
            selections.style.flexDirection = "column"
            
        } else {
            filters.style.height = 320 + 'px';
            filters.style.top = 150+ 'px';
            
        }
        filters.style["boxShadow"] = '2px 2px 50px 10px rgb(214, 211, 207)';
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
                    <div  onMouseOver={() => this.showfilters()}>&#x25BC;</div>
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

const mapStateToProps = state => {

    return {

        error: state.homepageloadingReducer.error,
        userInfo:state.homepageloadingReducer.userInfo

    }
}

const mapActionToProps = dispatch => {
    return {
        loadingUserData: () => dispatch(action.loadingUserData()),
        

    }
}
export default connect(mapStateToProps,mapActionToProps)(Homepage);