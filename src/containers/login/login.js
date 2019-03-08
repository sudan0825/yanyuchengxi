import React, { Component } from 'react';
import './login.css';
import Input from '../../UIs/input';
import Submitandcancel from '../../UIs/submitandcancelbutton';

class Login extends Component {
    state = {
        user: {
            Username: {
                elemType: 'input',
                elemConfig: {
                    type: 'email',
                    placeholder: 'User name',
                    autoComplete: 'email'
                },
                value: '',
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false
            },
            Password: {
                elemType: 'input',
                elemConfig: {
                    type: 'password',
                    placeholder: 'password',
                    autoComplete: 'current-password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,

                },
                valid: false,
                touched: false
            }
        }

    }

    inputchangeHandler() {

    }
    render() {
        let formfield = []
        for (let elem in this.state.user) {
            formfield.push(<Input key={elem}
                elemType={elem.elemType}
                elemConfig={elem.elemConfig}
                value={elem.value}
                valid={elem.valid}
                touched={elem.touched}
                label={elem}
                changed={this.inputchangeHandler}>
            </Input>)

        }


        return (<div id="loginpage">
            <form>
                <fieldset>
                    <legend>Log in</legend>
                    {formfield}
                    <Submitandcancel></Submitandcancel>
                </fieldset>

            </form>

        </div>)
    }
}

export default Login;