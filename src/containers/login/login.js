import React, { Component } from 'react';
import './login.css'

class Login extends Component {


    render() {
        return (<div id="loginpage">
                <form>
                    <fieldset>
                        <legend>Log in</legend>
                    <div>Username <input value="user name"></input></div>
                    <div>PassWord <input value= "password"></input></div>
                    <div id='loginbt'><button>Submit</button> <button>Cancel</button></div>
                    </fieldset>
                    
                </form>

        </div>)
    }
}

export default Login;