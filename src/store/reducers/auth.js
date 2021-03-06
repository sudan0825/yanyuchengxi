import * as actionTypes from '../actions/actionType';
import { updateState } from '../../updatestate';

import firebase from "firebase/app";
import 'firebase/auth';




const initialState = {
    isAuthed:false,
    name:'',
    id:'',
    thumnail:'',
    error:'',
    loading:false,
    redirecPath:'/'

}
const authStart = (state, action) => {
   
    return updateState(state, { error: null, loading: true });
};

const authSuccess = (state, action) => { 
    return updateState(state, {
        isAuthed: true,
        name:action.name,
        id:action.id,
        thumnail:action.src
        
    });
};

const authFail = (state, action) => {
    

    return updateState(state, {
        error: action.error,
        loading: false
    });
};

const logout = (state, action) => {
    firebase.auth().signOut().then(function () {
    }).catch(function (error) {
        console.log("cannot log out")
    });
    return updateState(state, { isAuthed: false });
};

const deleteError = (state, action) => {
    return updateState(state, { error: null })
}

const setRedirectPath = (state, action) => {

    return updateState(state, { redirecPath: action.path })

}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);

        case actionTypes.SET_REDIRECT_PATH: return setRedirectPath(state, action);
        case actionTypes.DELETE_ERROR_REOPRT: return deleteError(state, action);
        case actionTypes.LOGOUT_SUCCESS: return logout(state, action);

        default:
            return state;
    }

}


export default authReducer;
