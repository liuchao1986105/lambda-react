import * as types from './types'
import api from '../api'
import { push } from 'react-router-redux'
import { showMsg } from './other'
import { getMyFeeds } from './feed.js'

//获取评论
export const getRencentPostList = (isAdd = true, options) =>{
  return (dispatch,getState) => {
    return dispatch({
      type: types.RENCENT_POST_LIST,
      page: options.page, 
      promise: api.getRencentPostList(options),
      isAdd: isAdd
    })
  }
}

export const getFeedPostList = (isAdd = true, options) =>{
  return (dispatch,getState) => {
    return dispatch({
      type: types.FEED_POST_LIST,
      page: options.page, 
      promise: api.getFeedPostList(options),
      isAdd: isAdd
    })
  }
}


export const togglePostReaded = (id,data) =>{
  return (dispatch,getState) => {
    return api.togglePostReaded(id,data)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.error_msg || '标记文章已读失败'))
        }

        return dispatch({
          type: types.TOGGLE_POST_READED_SUCCESS,
          post_id: json.post_id
        })
      }).catch(e=>{
        return dispatch(showMsg(e.data.error_msg || '标记文章已读失败'))
      })
  }
}

export const togglePost = (id,data) =>{
  return (dispatch,getState) => {
    return api.togglePostReaded(id,data)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.error_msg || '标记文章已读失败'))
        }

        return dispatch()
      }).catch(e=>{
        return dispatch(showMsg(e.data.error_msg || '标记文章已读失败'))
      })
  }
}


export const updateRencentPostList = (id,data) =>{
  return (dispatch,getState) => {
    return api.togglePostReaded(id,data)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.error_msg || '标记文章已读失败'))
        }
        dispatch(getMyFeeds())
        return dispatch({
          type: types.RENCENT_POST_LIST,
          promise: api.getRencentPostList({}),
          isAdd: false
        })
      }).catch(e=>{
        return dispatch(showMsg(e.data.error_msg || '标记文章已读失败'))
      })
  }
}
