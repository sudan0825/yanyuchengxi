import * as actionTypes from './actionType';


import firebase from 'firebase/app';
import 'firebase/auth';



export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
       
    };
}

export const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        data:data
    }
}

export const authFail = (err) => {
    console.log(err)
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    }
}
export const deleteError = () => {
    return {
        type: actionTypes.DELETE_ERROR_REOPRT

    }
}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT_SUCCESS

    }
}


export const setRedirectPath = (path) => {
    return {
        type: actionTypes.SET_REDIRECT_PATH,
        path: path
    }
}
const setSessionPersistence = () => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function () {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            console.log("session persistence")

        })
        .catch(function (error) {
            // Handle Errors here.
            console.log(error.message)
        });
}
export const auth = (data) => {
    return dispatch => {
        const authData = {
            ...data
        };

        dispatch(authStart());
        if (authData.isSignUp) {
            return firebase.auth().createUserWithEmailAndPassword(authData.Username, authData.Password)
                .then(res => {
                    console.log('sign up')
                    setSessionPersistence();
                    dispatch(authSuccess(authData));
                    

                    
                })
                .catch((err) => {
                    let code = err.code;
                    if (code === "auth/email-already-in-use") {
                        console.log(err.message)
                        dispatch(setRedirectPath('/login'));
                        dispatch(authFail("The user email exists already"))
                    }
                    return 
                });

        } else {
            return firebase.auth().signInWithEmailAndPassword(authData.username, authData.password)
                .then(res => {
                   
                    setSessionPersistence()
                    dispatch(authSuccess());
                })
                .catch((error)=> {
                    let code = error.code;
                    console.log(error);
                    if (code === "auth/user-not-found") {

                        dispatch(setRedirectPath('/signup'));
                        dispatch(authFail("There is no user record corresponding to this identifier. The user may have been deleted"))
                    } else {
                        dispatch(authFail('The password is invalid.'))
                    }
                    return 
                });
        }
    }
}
