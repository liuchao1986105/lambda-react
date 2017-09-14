import * as types from './types'
import api from '../api'
import { push } from 'react-router-redux'
import { showMsg, toPage } from './other'


//获取所有feed
export const getFeedsList = (isAdd = true, options) =>{
  return (dispatch,getState) => {
    return dispatch({
      type: types.FEEDS_LIST,
      page: options.page, 
      promise: api.getFeedsList(options),
      isAdd: isAdd
    })
  }
}

export function addFeed(feedlink){
  return (dispatch,getState)=>{
    return api.addFeed({feedlink: feedlink})
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.error_msg || '添加订阅源失败'))
        }
        //dispatch(getMyFeeds())
        dispatch(toPage(`/feed/show/${json.data}`))
        //dispatch(push('/dashboard/topics'))
      }).catch(e=>{
        return dispatch(showMsg(e.data.error_msg || '添加订阅源失败'))
      })
  }
}



//获取我的fedds
export const getMyFeeds = () =>{
  return (dispatch,getState) => {
    return dispatch({
      type: types.MY_FEEDS,
      promise: api.getMyFeeds()
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

export function subcribeFeed(feed_id) {
  return (dispatch,getState)=>{
    return api.subcribeFeed(feed_id)
    .then(response => ({json: response.data, status: response.statusText}))
    .then(({json,status}) => {
      if(status !== 'OK'){
        return dispatch(showMsg(json.error_msg || '已经订阅过'))
      }
      return dispatch(getMyFeeds())
    })
    .catch(error => {
      return dispatch(showMsg(error.data.error_msg || '订阅失败'))
    })
  }
}

export function unsubcribeFeed(feed_id) {
  return (dispatch,getState)=>{
    return api.unsubcribeFeed(feed_id)
    .then(response => ({json: response.data, status: response.statusText}))
    .then(({json,status}) => {
      return dispatch(getMyFeeds())
    })
    .catch(error => {
      return dispatch(showMsg(error.data.error_msg || '取消订阅失败'))
    })
  }
}



//获取订阅源详情
export const getFeedDetail = (feed_id) =>{
  return (dispatch, getState) => {
    const auth = getState().auth.toJS()
    return api.getFeedDetail(feed_id)
    .then(response => ({json: response.data, status: response.statusText}))
    .then(({json,status}) => {
      if(status !== 'OK'){
        return dispatch(showMsg(json.error_msg))
      }
      let feed = json.data
      return dispatch({
        type: types.FEED_DETAIL_SUCCESS,
        feedDetail: feed
      })
    })
    .catch(error => {
      return dispatch(showMsg(error.data.error_msg || '获取订阅源失败'))
    })
  }
}

