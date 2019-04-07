import * as actionTypes from './actionType';

import axios from '../../axios'

export const loadUserInfoSuc= (userInfo)=>{
    return {
        type:actionTypes.LOAD_USER_INFO_SUC,
        userInfo:userInfo
    }
}

export const loadUserInfoFail = ()=>{
    return {
        type:actionTypes.LOAD_USER_INFO_FAIL
    }
}

export const loadingUserData = ()=>{
    return dispatch => {
        axios.get('/userInfo.json')
        .then((res)=>{
            
            dispatch(loadUserInfoSuc(res.data));

        })
        .catch((err)=>{
            console.log(err);
            dispatch(loadUserInfoFail())
        })

    }
   
}