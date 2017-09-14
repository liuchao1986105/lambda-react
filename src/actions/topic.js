import * as types from './types'
import api from '../api'
import { push } from 'react-router-redux'
import { showMsg } from './other'
import { getUserInfo } from './auth'
import { getUnreadMessageCount } from './message'


//更改options
export const changeOptions = (option) => ({ type: types.CHANGE_OPTIONS, option: option})


//获取主题列表
export const getTopicList = (isAdd = true, otherOption) =>{
  return (dispatch,getState) => {
    const options = otherOption ? otherOption : getState().options.toJS();

    const auth = getState().auth.toJS()
    if(auth.token){
        dispatch(getUnreadMessageCount())
    }

    return dispatch({
      type: types.TOPIC_LIST,
      page: options.page, 
      promise: api.getTopicList(options),
      isAdd: isAdd
    })
  }
}

//添加主题
function receiveAddTopic(topic) {
  return {
    type: types.ADD_TOPIC_SUCCESS,
    topic: topic
  }
}


export function addTopic(topic) {
  return (dispatch,getState)=>{
    return api.addNewTopic(topic)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.error_msg || '添加主题失败'))
        }
        dispatch(receiveAddTopic(json.data))
        dispatch(push('/dashboard/topics'))
      }).catch(e=>{
        return dispatch(showMsg(e.data.error_msg || '添加主题失败'))
      })
  }
}

export function updateTopic(topic_id, topic) {
  return (dispatch,getState)=>{
    const options = getState().options.toJS()
    return api.updateTopic(topic_id, topic)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.error_msg || '更新主题失败'))
        }
        dispatch({
          type: types.TOPIC_LIST,
          page: options.page, 
          promise: api.getTopicList(options),
          isAdd: false
        })
        dispatch(push('/dashboard/topics'))
      }).catch(e=>{
        return dispatch(showMsg(e.data.error_msg || '更新主题失败'))
      })
  }
}


export function deleteTopic(topic_id){
  return (dispatch,getState)=>{
    const options = getState().options.toJS()
    return api.deleteTopic(topic_id)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.error_msg || '删除主题失败'))
        }
        dispatch({
          type: types.TOPIC_LIST,
          page: options.page, 
          promise: api.getTopicList(options),
          isAdd: false
        })
      }).catch(e=>{
        return dispatch(showMsg(e.data.error_msg || '删除主题失败'))
      })
  }
}

//获取主题详情
export const getTopicDetail = (topic_id) =>{
  return (dispatch, getState) => {
    const auth = getState().auth.toJS()
    
    return api.getTopicDetail(topic_id)
    .then(response => ({json: response.data, status: response.statusText}))
    .then(({json,status}) => {
      let isLike = false
      let topic = json.data

      if(auth.token){
        dispatch(getUnreadMessageCount())
      }
      return dispatch({
        type: types.TOPIC_DETAIL_SUCCESS,
        topicDetail: {...topic, isLike:isLike, collect_count:topic.numberOfCollects + topic.defaultCollects}
      })
    })
    .catch(error => {
      return dispatch({
        type: types.TOPIC_DETAIL_FAILURE
      })
    })
  }
}


//切换Like
function receiveToggleLike(json, collect_count) {
  return {
    type: types.TOGGLE_TOPIC_LIKE_SUCCESS,
    isLike: json.isCollected,
    collect_count:  collect_count
  }
}

export function toggleTopicLike(topic_id,collect_count) {
  return (dispatch,getState)=>{
    return api.toggleTopicLike(topic_id)
    .then(response => ({json: response.data, status: response.statusText}))
    .then(({json,status}) => {
      if(status !== 'OK'){
        return dispatch(showMsg(json.error_msg || '已经关注过'))
      }
      dispatch(getUserInfo())
      return dispatch(receiveToggleLike(json, collect_count))
    })
    .catch(error => {
      // return dispatch({ type: types.TOGGLE_TOPIC_LIKE_FAILURE })
      return dispatch(showMsg(error.data.error_msg || '关注失败'))
    })
  }
}

export function toggleTopicDeLike(topic_id, collect_count) {
  return (dispatch,getState)=>{
    return api.toggleTopicDeLike(topic_id)
    .then(response => ({json: response.data, status: response.statusText}))
    .then(({json,status}) => {
      dispatch(getUserInfo())
      return dispatch(receiveToggleLike(json, collect_count))
    })
    .catch(error => {
      // return dispatch({ type: types.TOGGLE_TOPIC_LIKE_FAILURE })
      return dispatch(showMsg(error.data.error_msg || '取消关注失败'))
    })
  }
}

export const markLike = () => ({ type: types.TOGGLE_TOPIC_LIKE_SUCCESS, isLike: true})
//export const markLikeCount = (num) => ({ type: types.TOGGLE_TOPIC_LIKE_SUCCESS, collect_count: num})
