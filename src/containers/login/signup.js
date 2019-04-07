import React, { Component } from 'react';
import mystyle from './login.module.css';
import Input from '../../UIs/input';
import Submitandcancel from '../../UIs/submitandcancelbutton';

import { Link } from 'react-router-dom';

//connect to redux
import { connect } from 'react-redux';
import * as action from '../../store/actions/auth';
import { Redirect } from 'react-router-dom'


class Register extends Component {

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
                class: 'inputUI',
                
                touched: false,

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
                class: 'inputUI',
                
                touched: false,

            },

        },
        err: ""

    }
    componentDidUpdate(){
       
    }
    submit(e) {
        
        e.preventDefault();
        let name = this.state.user.Username.value;
        let pw = this.state.user.Password.value;

        if (!this.chechValidity(name, this.state.user.Username.validation)) {
            let err = 'please input a valid Username value ';
            this.setState({ err: err })
        }else if (!this.chechValidity(pw, this.state.user.Password.validation)) {
            let err = 'please input a valid Password value ';
            this.setState({ err: err })
        }else{
           this.props.auth({username:name, password:pw,isSignUp: true})
        } 
    }
   cancel(e){
     e.preventDefault();
     if(this.props.isAutheticated){
         window.location='/'
     }else{
        window.location='/signin'
     }

   }
    chechValidity = (value, rules) => {
        if (!rules) return true;
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = (value.trim().length >= rules.minLength) && isValid;
        }
       

        return isValid;
    }
    inputchangeHandler(e, elem) {

        if (this.props.error) {
            this.props.deleteError();
        }
        const updateState = {
            ...this.state.user,
            [elem]: {
                ...this.state.user[elem],
                value: e.target.value,
                touched: true
            }
        }

        this.setState({ user: updateState });

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
                from='login'
                changed={(e) => this.inputchangeHandler(e, elem)}>
            </Input>)

        }


        return (<div className={mystyle.loginpage}>
            {this.props.isAutheticated? <Redirect to = {this.props.authRedirectPath}/>:null}
            <form > 
                <h1>Register</h1>

                {formfield}
                {this.state.err ? <div id="errorInput">{this.state.err}</div> : null}
                {this.props.error?<div id="errorInput">{this.props.error}</div> : null}

                <Submitandcancel submit={(e)=>this.submit(e)} cancel={(e)=>this.cancel(e)}></Submitandcancel>
                

            </form>


        </div>)
    }
}

const mapStateToProps = state => {

    return {

        error: state.authReducer.error,
        isAutheticated: state.authReducer.isAuthed,
        authRedirectPath: state.authReducer.redirecPath

    }
}

const mapActionToProps = dispatch => {
    return {
        auth: (data) => dispatch(action.auth(data)),
        deleteError: () => dispatch(action.deleteError())

    }
}
export default connect(mapStateToProps, mapActionToProps)(Register);