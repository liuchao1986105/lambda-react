import * as types from './types'
import api from '../api'
import { push } from 'react-router-redux'

//显示提示消息
export const showMsg = (content, type='error')=>{
  return {
    type: types.SHOW_MSG,
    message: { content:content,type:type }
  }
}
export const hideMsg = ()=>({type: types.HIDE_MSG})

//获取apps
export const getApps = () =>{
  return {
    type: types.GET_APPS,
    promise: api.getApps()
  }
}

export function toPage(page) {
  return (dispatch,getState) =>{
    return dispatch(push(page))
  }
}

export const getIndexImage = () => {
  return {
    type: types.GET_INDEX_IMG,
    promise: api.getIndexImage()
  }
}

export function sendInfo(data) {
  return (dispatch,getState)=>{
    return api.sendInfo(data)
    .then(response => ({json: response.data, status: response.statusText}))
    .then(({json,status}) => {
      if(status !== 'OK'){
        return dispatch(showMsg(json.error_msg || '消息内容发送失败'))
      }
      return dispatch(push('/dashboard'))
    })
    .catch(error => {
      return dispatch(showMsg('消息内容发送失败'))
    })
  }
}