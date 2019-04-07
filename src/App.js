import React, { Component } from 'react';
import './App.css';
import NavList from './components/navigation/navList';
import { Route, Switch, BrowserRouter, Redirect, Link } from 'react-router-dom';
import Homepage from './containers/home/homepage';
import Activites from './containers/activities/activities';
import Aboutus from './components/aboutus/aboutus';
import Signin from './containers/login/signin';
import Profile from './containers/login/profile';
import  Signup from './containers/login/signup'
import Personalprofile from './containers/home/PersonalProfile/Personalprofile';
import * as action from './store/actions/auth';


//connect to redux
import { connect } from 'react-redux';
import Backcurtain from './UIs/backcurtain';


class App extends Component {
  state = {
    showalert: true,
  }

componentDidMount(){
  setTimeout(()=>this.removeAlert(), 5000)

  window.addEventListener('scroll',this.onwindowscroll)
}

removeAlert(){
  this.setState({showalert:false})
}
onwindowscroll(){
  if(window.pageYOffset>80){
    document.getElementById('logo').style.display = 'none';
    document.getElementsByClassName('logandsign')[0].style.display='none';
    document.getElementsByClassName('App-header')[0].style.height ='50px';
   
    if(document.getElementById('showselection')){
      document.getElementById('showselection').childNodes[0].style.position='fixed'
      document.getElementById('showselection').childNodes[0].style.top='51px';
    }
    
 

  }else{
    document.getElementById('logo').style.display = 'block';
    document.getElementsByClassName('logandsign')[0].style.display='block';
    document.getElementsByClassName('App-header')[0].style.height ='150px';
    if(document.getElementById('showselection')){
      document.getElementById('showselection').childNodes[0].style.position='fixed'
      document.getElementById('showselection').childNodes[0].style.top='151px';
    }
    
  }
 
}

  routes = (
    <Switch>
      <Route exact path="/" render={() => (
        this.props.isAutheticated ? (<Redirect to="/home" />) : (<Signin />)
      )} />
      <Route path="/aboutus" component={Aboutus}></Route>
      <Route path="/personalprofile" component={Personalprofile} ></Route>
      <Route path="/profile" exact component={Profile} ></Route>
      <Route path="/signup" component={Signup}></Route>
      <Route path="/signin" component={Signin} ></Route>
      <Route path="/home" exact component={Homepage}></Route>
      <Route path="/activities" component={Activites}></Route>

    </Switch>
  )
 
  cancel(){

    this.setState({isLogIn:true})
  }
  submit(){
    this.setState({isLogIn:true})
  }
  render() {
    return (<BrowserRouter>

     <div className="App"  >
  {this.state.showalert? <Backcurtain click={()=>this.removeAlert()}><div className="homepagealert">The site is created since March 5h, 2019. 
      It is still under on construction. Some UIs are placeholders. Check About us for detail</div></Backcurtain> :null}
        <header className="App-header">
          <p id="logo"><Link to="home">Love Talks</Link></p>
          <nav>
            <NavList />
          </nav>
          <div className="logandsign">
            {this.props.isAutheticated?null:<Link to="signin">Log in</Link>}
            <Link onClick={this.props.logout} to="/">Log out</Link>
          </div>
          {this.props.isAutheticated?
               <div id="userID">Welcome 
                  <Link to={'/personalprofile?id='+this.props.name}>
                    <span>{this.props.name}</span>
                   </Link>
                </div>:null}
        </header>
        <main>
          {this.routes}
        </main>
        <footer>

        </footer>
      </div> 
    </BrowserRouter>
    );
  }
}
const mapStateToProps = state => {

  return {

      isAutheticated: state.authReducer.isAuthed,
      name:state.authReducer.name,
      id:state.authReducer.id
  
  }
}

const mapActionToProps = dispatch => {
  return {
      logout: () => dispatch(action.logout()),
     

  }
}
export default connect(mapStateToProps, mapActionToProps)(App);
