import React, { Component } from 'react';
import './App.css';
import NavList from './components/navigation/navList';
import { Route, Switch, BrowserRouter, Redirect, Link } from 'react-router-dom';
import Homepage from './containers/home/homepage';
import Activites from './containers/activities/activities';
import Aboutus from './components/aboutus/aboutus';
import Login from './containers/login/login';
import Profile from './containers/login/profile';
import Personalprofile from './containers/home/PersonalProfile/Personalprofile';
import * as action from './store/actions/auth';

//connect to redux
import { connect } from 'react-redux';


class App extends Component {
  state = {
    loggedin: true,
  
  }

componentDidMount(){
  window.addEventListener('scroll',this.onwindowscroll)
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
        this.state.loggedin ? (<Redirect to="/home" />) : (<Login />)
      )} />
      <Route path="/aboutus" component={Aboutus}></Route>
      <Route path="/personalprofile" component={Personalprofile} ></Route>
      <Route path="/profile" exact component={Profile} ></Route>
      <Route path="/login" component={Login} ></Route>
      <Route path="/home" exact component={Homepage}></Route>
      <Route path="/activities" component={Activites}></Route>

    </Switch>
  )
  alertwindow() {

    setTimeout(window.alert("why you leave me "), 1000)
  }
  cancel(){

    this.setState({isLogIn:true})
  }
  submit(){
    this.setState({isLogIn:true})
  }
  render() {
    return (<BrowserRouter>
     <div className="App"  >

        <header className="App-header">
          <p id="logo"><Link to="home">有我的日子，你不在孤单</Link></p>
          <nav>
            <NavList />
          </nav>
          <div className="logandsign">
            {this.props.isAutheticated?null:<Link to="login">Log in</Link>}
            <Link onClick={this.props.logout} to="/">Log out</Link>
          </div>
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

      isAutheticated: state.authReducer.isAuthed
    

  }
}

const mapActionToProps = dispatch => {
  return {
      logout: () => dispatch(action.logout()),
     

  }
}
export default connect(mapStateToProps, mapActionToProps)(App);
