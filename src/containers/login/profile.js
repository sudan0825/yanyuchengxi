import React, { Component } from 'react';
import Input from '../../UIs/input';
import Submitandcancel from '../../UIs/submitandcancelbutton';

class Profile extends Component {
    state = {
        user: {
            Username:{
                elemType:'input',
                elemConfig:{
                    type:'email',
                    placeholder:'User name',
                    autoComplete:'email'
                },
                value:'',
                validation:{
                    required:true,
                    email:true
                },
                valid:false,
                touched:false
            },
            Password:{
                elemType:'input',
                elemConfig:{
                    type:'password',
                    placeholder:'password',
                    autoComplete:'current-password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6,

                },
                valid:false,
                touched:false
            },
            Birthday: {
                elemType: 'input',
                elemConfig: {
                    type: 'date',
                    name: 'bday'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            Height: {
                elemType: 'select',
                elemConfig: {
                    option: ['5\'0"', '5\'1"', '5\'2"', '5\'3"', '5\'4"', '5\'5"', '5\'6"',
                        '5\'7"', '5\'8"', '5\'9"', '5\'10"', '5\'11"', '6\'0"']
                }
            },
            BodyShape: {
                elemType: 'select',
                elemConfig: {
                    option: ['Slender', 'Normal', 'Fat']
                }
            },
            Salary: {
                elemType: 'input',
                elemConfig: {
                    type: 'string',
                    placeholder:'Salary'
                }
            },
            Hobbies: {
                elemType: 'inputcheckbox',
                elemConfig: {
                    type: 'checkbox',
                    option: ['Reading', 'Working', 'Cooking', 'Drawing', 'Hiking']
                }
            },
            Whoareyou: {
                elemType: 'textarea',
                elemConfig: {
                    type: 'string',
                    placeholder: "Please introduce yourself. What's your hobbies?" +
                        "What makes you happy? What kind of relationship are you looking for?"
                }

            },
            Whatareyoulookingfor: {
                elemType: 'textarea',
                elemConfig: {
                    type: 'string',
                    placeholder: "Characters? Personalities? Hobbies?"
                }

            }

        }
    }
    inputchangeHandler() {

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
                    label={elem.id}
                    changed={this.inputchangeHandler}>
                </Input>
            })
            }
           <Submitandcancel></Submitandcancel>

        </form>)
        return (
            <div className="editfile" >
                <div>
                    <div className="pic"></div>
                    <div></div>
                </div>
                <p >Edit Profile</p>
                <div>
                    {form} 
                </div>

                </div>
        )
    }
}

export default Profile;
