import * as types from './types'
import api from '../api'
import { push } from 'react-router-redux'
import { showMsg } from './other'
import { getUserInfo } from './auth'
import { getUnreadMessageCount } from './message'

export const getUserList = (isAdd = true, otherOption) =>{
  return (dispatch,getState) => {
    const options = otherOption ? otherOption : getState().options.toJS();
    return dispatch({
      type: types.USER_LIST,
      page: options.page,
      promise: api.getUserList(options),
      isAdd: isAdd
    })
  }
}

export const getUserDetail = (id) =>{
  return (dispatch, getState) => {
    return api.getUserDetail(id)
    .then(response => ({json: response.data, status: response.statusText}))
    .then(({json,status}) => {
      let user = json.data
      return dispatch({
        type: types.USER_DETAIL_SUCCESS,
        userDetail: {...user}
      })
    })
    .catch(error => {
      return dispatch({
        type: types.USER_DETAIL_FAILURE
      })
    })
  }
}


function receiveAddUser(user) {
  return {
    type: types.ADD_USER_SUCCESS,
    user: user
  }
}

export function addUser(user, otherOption) {
  return (dispatch,getState)=>{
    const options = otherOption ? otherOption : getState().options.toJS();
    return api.addNewUser(user)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.error_msg || '添加用户失败'))
        }
        //dispatch(receiveAddArticle(json.data))
        dispatch(push('/dashboard/users')) 
      }).catch(e=>{
        return dispatch(showMsg(e.data.error_msg || '添加用户失败'))
      })
  }
}

//修改用户资料
function successUpdateUser(user) {
  return {
    type: types.UPDATE_USER_SUCCESS,
    user:user
  }
}


export function setUser(userInfo, isEmailBind) {
  return (dispatch,getState)=>{
    return api.mdUser(userInfo)
    .then(response => ({json: response.data, status: response.statusText}))
    .then(({json,status}) => {
      if(status !== 'OK'){
        return dispatch(showMsg(json.data && json.data.error_msg || '资料设置失败'))
      }
      
      if(!isEmailBind){
        dispatch(showMsg('资料设置成功','success'))
      }else{
        dispatch(showMsg('邮箱绑定成功','success'))
      }
      //return dispatch(successUpdateUser(json.data))
      dispatch(getUserInfo())
      if(isEmailBind){
        dispatch(push('/'))
      }
    }).catch(err=>{
      return dispatch(showMsg(err.data.error_msg || '资料设置失败'))
    })
  }
}

export function updateUser(user_id, user, from) {
  return (dispatch,getState)=>{
    const options = getState().options.toJS()
    return api.updateUser(user_id, user)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.error_msg || '更新用户资料失败'))
        }
        dispatch({
          type: types.USER_LIST,
          page: options.page, 
          promise: api.getUserList(options),
          isAdd: false
        })
        dispatch(getUnreadMessageCount())
        dispatch(getUserInfo())
        if(from){
          dispatch(push('/dashboard/users'))
        }
        
      }).catch(e=>{
        return dispatch(showMsg(e.data.error_msg || '更新用户资料失败'))
      })
  }
}



export function deleteUser(user_id, otherOption){
  return (dispatch,getState)=>{
    const options = otherOption ? otherOption : getState().options.toJS();
    return api.deleteUser(user_id)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.error_msg || '删除用户失败'))
        }
        dispatch({
          type: types.USER_LIST,
          page: options.page, 
          promise: api.getUserList(options),
          isAdd: false
        })
      }).catch(e=>{
        return dispatch(showMsg(e.data.error_msg || '删除用户失败'))
      })
  }
}


export function changePayedStatus(user_id){
  return (dispatch,getState)=>{
    return api.changePayedStatus(user_id)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.error_msg || '支付状态更新失败'))
        }
      }).catch(e=>{
        return dispatch(showMsg(e.data.error_msg || '支付状态更新失败'))
      })
  }
}

