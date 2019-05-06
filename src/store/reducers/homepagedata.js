import * as actionTypes from '../actions/actionType';
import { updateState } from '../../updatestate';

const initialState = {
    userInfo:{},
    error:false,
    thumnail:'',
    bigPic:'',
    clickedUserData:{}
}

const loadUserInfoSuccess = (state, action)=>{
    return updateState(state,{userInfo:action.userInfo})
}
const loadUserInfoFail = (state, action)=>{
  
    return updateState(state,{error:true})
}

const getclickedUserInfoSuc=(state, action)=>{
    return updateState(state,{clickedUserData:action.userinfo.data,
                               thumnail:action.src})
}
const homepageloadingReducer = (state = initialState, action)=>{

    switch(action.type){
        case actionTypes.LOAD_USER_INFO_SUC: return loadUserInfoSuccess(state, action);
        case actionTypes.LOAD_USER_INFO_FAIL: return loadUserInfoFail(state, action);
        case actionTypes.GET_CLICKED_USER_INFO_SUC:return getclickedUserInfoSuc(state, action)



        default:
        return state;
    }

}
export default homepageloadingReducer
