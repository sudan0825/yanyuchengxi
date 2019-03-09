import React, { Component } from 'react';
import mystyle from './login.module.css';
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
                class:'inputUI',
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
                class:'inputUI',
                valid: false,
                touched: false
            }
        }

    }

    inputchangeHandler() {

    }
    render() {
        
        let formfield = []
        let user = this.state.user
        for (let elem in user) {
            
            formfield.push(<Input key={elem}
                elemType={user[elem].elemType}
                elemConfig={user[elem].elemConfig}
                value={user[elem].value}
                valid={user[elem].valid}
                touched={user[elem].touched}
                label={elem}
                class={user[elem].class}
                from = 'login'
                changed={this.inputchangeHandler}>
            </Input>)

        }


        return (<div className={mystyle.loginpage}>
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