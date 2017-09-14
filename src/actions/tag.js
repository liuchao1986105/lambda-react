import * as types from './types'
import api from '../api'
import { push } from 'react-router-redux'
import { showMsg } from './other'

//获取标签列表.
export const getTagList = (data) =>{
  return {
    type: types.TAG_LIST,
    promise: api.getTagList(data)
  }
}

function receiveAddTag(tag) {
  return {
    type: types.ADD_TAG_SUCCESS,
    tag: tag
  }
}


export function addTag(tag) {
  return (dispatch,getState)=>{
    return api.addNewTag(tag)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.error_msg || '添加标签失败'))
        }
        dispatch(receiveAddTag(json.data))
        dispatch(push('/dashboard/tags'))
      }).catch(e=>{
        return dispatch(showMsg(e.data.error_msg || '添加标签失败'))
      })
  }
}

export function deleteTag(tag_id){
  return (dispatch,getState)=>{
    return api.deleteTag(tag_id)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        console.log("deleteTag")
        if(status !== 'OK'){
          return dispatch(showMsg(json.error_msg || '删除标签失败'))
        }
        dispatch({
          type: types.TAG_LIST,
          promise: api.getTagList()
        })
      }).catch(e=>{
        return dispatch(showMsg(e.data.error_msg || '删除标签失败'))
      })
  }
}

export const getTagDetail = (tag_id) =>{
  return (dispatch, getState) => {
    return api.getTagDetail(tag_id)
    .then(response => ({json: response.data, status: response.statusText}))
    .then(({json,status}) => {
      let tag = json.data
      return dispatch({
        type: types.TAG_DETAIL_SUCCESS,
        tagDetail: {...tag}
      })
    })
    .catch(error => {
      return dispatch({
        type: types.TAG_DETAIL_FAILURE
      })
    })
  }
}

export function updateTag(tag_id, tag) {
  return (dispatch,getState)=>{
    return api.updateTag(tag_id, tag)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.error_msg || '更新标签失败'))
        }
        dispatch({
          type: types.TAG_LIST,
          promise: api.getTagList()
        })
        dispatch(push('/dashboard/tags'))
      }).catch(e=>{
        return dispatch(showMsg(e.data.error_msg || '更新标签失败'))
      })
  }
}