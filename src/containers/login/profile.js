import React, { Component } from 'react';
import Input from '../../UIs/input';
import Submitandcancel from '../../UIs/submitandcancelbutton';
import mystyle from './login.module.css';

//connect to redux

import { connect } from 'react-redux';
import * as action from '../../store/actions/auth';


class Profile extends Component {
    state = {
        user: {
            Username: {
                elemType: 'input',
                elemConfig: {
                    type: 'email',
                    placeholder: 'User name',
                    autoComplete: 'email',

                },
                class: 'inputUI',
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
                    autoComplete: 'current-password',

                },
                class: 'inputUI',
                value: '',
                validation: {
                    required: true,
                    minLength: 6,

                },
                valid: false,
                touched: false
            },
            Birthday: {
                elemType: 'input',
                elemConfig: {
                    type: 'date',
                    name: 'bday',

                },
                class: 'selectUI',
                value: '',
                validation: {

                },
                valid: false,
                touched: false
            },
            Height: {
                elemType: 'select',
                elemConfig: {
                    option: ['5\'0"', '5\'1"', '5\'2"', '5\'3"', '5\'4"', '5\'5"', '5\'6"',
                        '5\'7"', '5\'8"', '5\'9"', '5\'10"', '5\'11"', '6\'0"'],

                },
                class: 'selectUI'
            },
            BodyShape: {
                elemType: 'select',
                elemConfig: {
                    option: ['Slender', 'Average', 'Athletic', 'Heavyset', 'any'],

                },
                class: 'selectUI',
                labelvalue: 'Body Shape'
            },
            Salary: {
                elemType: 'input',
                elemConfig: {
                    type: 'string',
                    placeholder: 'Salary',

                },
                value:'',
                class: "inputUI"
            },
            City: {
                elemType: 'input',
                elemConfig: {
                    type: 'string',
                    placeholder: 'City Name',
                },
                value:'',
                class: "inputUI"
            },
            Education: {
                elemType: 'select',
                elemConfig: {
                    option: ['Some college', 'Associates degree', 'Bachelors degree',
                        'Graduate degree', 'PhD/Post Doctoral', 'No Answer'],

                },
                class: 'selectUI'

            },
            Hobbies: {
                elemType: 'inputcheckbox',
                elemConfig: {
                    type: 'checkbox',
                    option: ['Reading', 'Working', 'Cooking', 'Drawing', 'Hiking'],

                },
                class: 'checkbox'
            },
            Whoareyou: {
                elemType: 'textarea',
                elemConfig: {
                    type: 'string',
                    placeholder: "Please introduce yourself. What's your hobbies?" +
                        "What makes you happy? What kind of relationship are you looking for?",

                },
                labelvalue: 'Who are you',
                class: "textarea"

            },
            Whatareyoulookingfor: {
                elemType: 'textarea',
                elemConfig: {
                    type: 'string',
                    placeholder: "Characters? Personalities? Hobbies?",

                },
                labelvalue: 'What are you looking for',
                class: "textarea"

            },


        },
        err: ''
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
    submit(e) {

        e.preventDefault();
        let name = this.state.user.Username.value;
        let pw = this.state.user.Password.value;
        let bd = this.state.user.Birthday.value;
        let height = this.state.user.Height.value;
        let bshape = this.state.user.BodyShape.value;
        let income = this.state.user.Salary.value;
        let degree = this.state.user.Education.value;
        let me = this.state.user.Whoareyou;
        let you = this.state.user.Whatareyoulookingfor;
        console.log('create a new file')
        if (!this.chechValidity(name, this.state.user.Username.validation)) {
            let err = 'please input a valid Username value ';
            this.setState({ err: err })
        } else if (!this.chechValidity(pw, this.state.user.Password.validation)) {
            let err = 'please input a valid Password value ';
            this.setState({ err: err })
        } else {
            this.props.auth({
                Username: name, Password: pw, isSignUp: true,
                Birthday: bd, Height: height, BodyShape: bshape,
                Salary: income, Degree: degree, Me: me, You: you
            })
        }
    }
    cancel() {
        let user = this.state.user;
        for (let elem in user) {
            user[elem].value = ''
        }
        this.setState({ user: user })
    }
    render() {
        const formElementArray = [];
        for (let elem in this.state.user) {
            formElementArray.push({
                id: elem,
                config: this.state.user[elem]
            });
        }

        let form = (<form>
            {formElementArray.map(elem => {
                return <Input key={elem.id}
                    elemType={elem.config.elemType}
                    elemConfig={elem.config.elemConfig}
                    value={elem.config.value}
                    valid={elem.config.valid}
                    touched={elem.config.touched}
                    label={elem.config.labelvalue ? elem.config.labelvalue : elem.id}
                    class={elem.config.class}
                    from={'profile'}
                    changed={(e) => this.inputchangeHandler(e, elem.id)}>

                </Input>
            })
            }
            {this.state.err ? <div id="errorInput">{this.state.err}</div> : null}
            {this.props.error ? <div id="errorInput">{this.props.error}</div> : null}
            <Submitandcancel submit={(e) => this.submit(e)} cancel={() => this.cancel()}></Submitandcancel>

        </form>)
        return (
            <div className={mystyle.editfile} >
                <div>
                    <div className={mystyle.pic}></div>
                    <div></div>
                </div>
                <p >Edit Profile</p>
                <div></div>
                <div>
                    {form}
                </div>

            </div>
        )
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
        deleteError: (data) => dispatch(action.deleteError()),

    }
}
export default connect(mapStateToProps, mapActionToProps)(Profile);
