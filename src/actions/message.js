import * as types from './types'
import api from '../api'
import { push } from 'react-router-redux'
import { showMsg } from './other'
import { getUserInfo } from './auth'

export const getMessageList = (isAdd = true, otherOption) =>{
  return (dispatch,getState) => {
    const options = otherOption ? otherOption : getState().options.toJS();
    dispatch({
      type: types.UNREAD_MESSAGE_COUNT,
      unreadMessage: {count:0}
    })
    return dispatch({
      type: types.MESSAGE_LIST,
      page: options.page,
      promise: api.getMessageList(options),
      isAdd: isAdd
    })
  }
}


export const getUnreadMessageCount = () =>{
  return (dispatch, getState) => {   
    return api.getUnreadMessageCount()
    .then(response => ({json: response.data, status: response.statusText}))
    .then(({json,status}) => {
      return dispatch({
        type: types.UNREAD_MESSAGE_COUNT,
        unreadMessage: {count:json.data}
      })
    })
    .catch(error => {
      return dispatch({
        type: types.UNREAD_MESSAGE_COUNT_FAILURE
      })
    })
  }
}



export const getMessageDetail = (id) =>{
  return (dispatch, getState) => {
    return api.getMessageDetail(id)
    .then(response => ({json: response.data, status: response.statusText}))
    .then(({json,status}) => {
      return dispatch({
        type: types.MESSAGE_DETAIL_SUCCESS,
        messageDetail: {...message}
      })
    })
    .catch(error => {
      return dispatch({
        type: types.MESSAGE_DETAIL_FAILURE
      })
    })
  }
}

export function deleteMessage(message_id){
  return (dispatch,getState)=>{
    const options = getState().options.toJS()
    return api.deleteMessage(message_id)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.error_msg || '删除通知失败'))
        }
        dispatch({
          type: types.MESSAGE_LIST,
          page: options.page, 
          promise: api.getMessageList(options),
          isAdd: false
        })
      }).catch(e=>{
        return dispatch(showMsg(e.data.error_msg || '删除通知失败'))
      })
  }
}
