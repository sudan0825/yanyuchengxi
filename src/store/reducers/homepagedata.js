import * as actionTypes from '../actions/actionType';
import { updateState } from '../../updatestate';

const initialState = {
    userInfo:{},
    error:false
}

const loadUserInfoSuccess = (state, action)=>{
    return updateState(state,{userInfo:action.userInfo})
}
const loadUserInfoFail = (state, action)=>{
  
    return updateState(state,{error:true})
}
const homepageloadingReducer = (state = initialState, action)=>{

    switch(action.type){
        case actionTypes.LOAD_USER_INFO_SUC: return loadUserInfoSuccess(state, action);
        case actionTypes.LOAD_USER_INFO_FAIL: return loadUserInfoFail(state, action);



        default:
        return state;
    }

}
export default homepageloadingReducer
