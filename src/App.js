import React, { Component } from 'react';
import './App.css';
import NavList from './components/navigation/navList';
import { Route, Switch, BrowserRouter, Redirect, Link } from 'react-router-dom';
import Homepage from './containers/home/homepage';
import Activites from './containers/activities/activities';
import Aboutus from './components/aboutus/aboutus';
import Login from './containers/login/login';
import Profile from './containers/login/profile';
import Personalprofile from './components/home/Personalprofile'
class App extends Component {
  state = {
    loggedin: true
  }



routes = (
  <Switch>
    <Route exact path="/" render={() => (
      this.state.loggedin ? (<Redirect to="/home" />) : (<Login/>)
    )} />
    <Route path="/aboutus" component={Aboutus}></Route>
    <Route path="/personalprofile" component={Personalprofile} ></Route>
    <Route path="/profile" exact component={Profile} ></Route>
    <Route path="/login" component={Login} ></Route>
    <Route path="/home" exact component={Homepage}></Route>
    <Route path="/activities" component={Activites}></Route>
 
  </Switch>
)
render() {
  return (
    <BrowserRouter>
      <div className="App">

        <header className="App-header">
          <p id="logo"><Link to="home">有我的日子，你不在孤单</Link></p>
          <nav>
            <NavList />
          </nav>
          <div className="logandsign">
            <Link to="profile">Sign Up</Link>
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

export default App;
