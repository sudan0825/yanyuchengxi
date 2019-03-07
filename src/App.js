import React, { Component } from 'react';
import './App.css';
import NavList from './components/navigation/navList';
import Homepage from './containers/home/homepage';

import { Route, Switch, BrowserRouter, Redirect, Link} from 'react-router-dom';
import Activites from './containers/activities/activities';
import Aboutus from './components/aboutus/aboutus';
import Login from './containers/login/login';
import Profile from './containers/login/profile';
import Personalprofile from './components/home/Personalprofile'
class App extends Component {

 
routes = (
  <Switch>
  <Route path="/" exact component={Homepage}></Route>
  <Route path="/home" exact component={Homepage}></Route>
  <Route path="/activities" component={Activites}></Route>
  <Route path="/aboutus" component={Aboutus}></Route>
 
  <Route path="/personalprofile" component={Personalprofile} ></Route>
  <Route path="/profile"  exact component={Profile} ></Route>
  <Route path="/login" component={Login} ></Route>
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
            {/* <div id="login">
              <Link to="login">Log in</Link>
            </div> */}
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
