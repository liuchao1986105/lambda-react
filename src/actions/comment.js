import * as types from './types'
import api from '../api'
import { showMsg } from './other'
import { getUnreadMessageCount } from './message'

//更改comment options
export const changeCommentOptions = (option) => ({ type: types.CHANGE_COMMENT_OPTIONS, option: option})


//获取评论
export const getCommentList = (isAdd = true, otherOption) =>{
  return (dispatch,getState) => {
    let options = otherOption ? otherOption : getState().commentOptions.toJS();
    return dispatch({
      type: types.COMMENT_LIST,
      page: options.page, 
      promise: api.getCommentList(options),
      isAdd: isAdd
    })
  }
}


//添加评论
function receiveAddComment(comment) {
  return {
    type: types.ADD_COMMENT_SUCCESS,
    comment: comment
  }
}

export function addComment(article_id, comment) {
  return (dispatch,getState)=>{
    return api.addNewComment(article_id, {content:comment})
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.data.error_msg || '添加评论失败'))
        }
        //dispatch(showMsg('添加评论成功','success'))
        //const article = json.article
        dispatch(getUnreadMessageCount())
        // dispatch({
        //   type: types.ARTICLE_DETAIL_SUCCESS,
        //   articleDetail: {...article}
        // })
        return dispatch(receiveAddComment(json.data))
      }).catch(e=>{
        return dispatch(showMsg(e.data.error_msg || '添加评论失败'))
      })
  }
}

//添加回复
function receiveAddReply(cid,replys) {
  return {
    type: types.ADD_REPLY_SUCCESS,
    cid:cid,
    replys: replys
  }
}

export function addReply(cid,reply) {
  return (dispatch,getState)=>{
    return api.addNewReply(cid,reply)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.data.error_msg || '添加回复失败'))
        }
        dispatch(getUnreadMessageCount())
        dispatch(showMsg('添加回复成功','success'))
        return dispatch(receiveAddReply(cid,json.data))
      }).catch(e=>{
        return dispatch(showMsg(e.data.error_msg || '添加回复失败'))
      })
  }
}


export function deleteComment(comment_id, article_id, from){
  return (dispatch,getState)=>{
    const options = getState().commentOptions.toJS()
    return api.deleteComment(comment_id,article_id)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.error_msg || '删除评论失败'))
        }
        if(from !='article'){
          dispatch({
            type: types.COMMENT_LIST,
            page: options.page, 
            promise: api.getCommentList(options),
            isAdd: false
          })
        }
      }).catch(e=>{
        return dispatch(showMsg(e.data.error_msg || '删除评论失败'))
      })
  }
}

export function deleteReply(comment_id,reply_id){
  return (dispatch,getState)=>{
    return api.deleteReply(comment_id,reply_id)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.error_msg || '删除回复失败'))
        }
        let comment = json.data
        dispatch({
          type: types.COMMENT_DETAIL_SUCCESS,
          commentDetail: {...comment}
        })
        
      }).catch(e=>{
        return dispatch(showMsg(e.data.error_msg || '删除回复失败'))
      })
  }
}


export const getCommentDetail = (id) =>{
  return (dispatch, getState) => {
    return api.getCommentDetail(id)
    .then(response => ({json: response.data, status: response.statusText}))
    .then(({json,status}) => {
      let comment = json.data
      return dispatch({
        type: types.COMMENT_DETAIL_SUCCESS,
        commentDetail: {...comment}
      })
    })
    .catch(error => {
      return dispatch({
        type: types.COMMENT_DETAIL_FAILURE
      })
    })
  }
}