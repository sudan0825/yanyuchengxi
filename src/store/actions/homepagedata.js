import * as actionTypes from './actionType';

import firebase from 'firebase/app';
import 'firebase/storage';

import axios from '../../axios'

export const loadUserInfoSuc= (userInfo)=>{
    return {
        type:actionTypes.LOAD_USER_INFO_SUC,
        userInfo:userInfo,
       
    }
}

export const loadUserInfoFail = ()=>{
    return {
        type:actionTypes.LOAD_USER_INFO_FAIL
    }
}

export const getclickedUserInfoSuc = (userinfo, src) =>{
    return {
        type:actionTypes.GET_CLICKED_USER_INFO_SUC,
        userinfo:userinfo,
        src:src
    }
}

export const getclickedUserInfoFail = () =>{
    return {
        type:actionTypes.GET_CLICKED_USER_INFO_Fail
    }
}
export const loadingUserData = ()=>{
    return dispatch => {
               let storage = firebase.storage();
                axios.get('/userInfo.json')
                .then((res)=>{
                    dispatch(loadUserInfoSuc(res.data));
                  
        
                })
                .catch((err)=>{
                    console.log(err);
                    dispatch(loadUserInfoFail())
                });
    }
   
}

export const getUserMeetRequirement =(query)=>{
    return dispatch =>{
        axios.get('/userInfo.json')
        .then((res)=>{
            let data = {};
            // for(let d in res.data){
            //     if(res.data[d].Age)
            // }
          
            dispatch(loadUserInfoSuc(data));

        })
        .catch((err)=>{
            console.log(err);
            dispatch(loadUserInfoFail())
        })

    }
}

export const retrieveUserInfo = (userInfo)=>{
    
    let storage = firebase.storage();
    let username = userInfo.data.Username;
    return dispatch =>{

        storage.ref(username+"/"+username + "small.jpg")
               .getDownloadURL()
               .then(url=>{
                console.warn(userInfo.data.Username, userInfo, url)
                dispatch(getclickedUserInfoSuc(userInfo,url))
               })
    }
}