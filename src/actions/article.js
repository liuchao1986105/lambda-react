import * as types from './types'
import api from '../api'
import { push } from 'react-router-redux'
import { showMsg } from './other'
import { getUserInfo } from './auth'
import { getUnreadMessageCount } from './message'
import { getTagList } from './tag'


export function changeDesc(description){
  return (dispatch, getState) => {
    return dispatch({
      type: types.CHANGE_ARTICLE_DESC,
      description: description
    })
  }
}

//切换Like
function receiveToggleLike(json, collect_count) {
  return {
    type: types.TOGGLE_ARTICLE_LIKE_SUCCESS,
    isLike: json.isCollected,
    collect_count:  collect_count
  }
}

export function toggleArticleLike(article_id,collect_count) {
  return (dispatch,getState)=>{
    return api.toggleArticleLike(article_id)
    .then(response => ({json: response.data, status: response.statusText}))
    .then(({json,status}) => {
      if(status !== 'OK'){
        return dispatch(showMsg(json.error_msg || '已经收藏过'))
      }
      dispatch(getUserInfo())
      dispatch(getUnreadMessageCount())
      return dispatch(receiveToggleLike(json, collect_count))
    })
    .catch(error => {
      //return dispatch({ type: types.TOGGLE_ARTICLE_LIKE_FAILURE })
      return dispatch(showMsg(error.data.error_msg || '收藏失败'))
    })
  }
}

export function toggleArticleDeLike(article_id, collect_count) {
  return (dispatch,getState)=>{
    return api.toggleArticleDeLike(article_id)
    .then(response => ({json: response.data, status: response.statusText}))
    .then(({json,status}) => {
      dispatch(getUserInfo())
      return dispatch(receiveToggleLike(json, collect_count))
    })
    .catch(error => {
      // return dispatch({ type: types.TOGGLE_TOPIC_LIKE_FAILURE })
      return dispatch(showMsg(error.data.error_msg || '取消收藏失败'))
    })
  }
}


/*获取文章列表*/
export const getArticleList = (isAdd = true, otherOption, from) =>{
  return (dispatch,getState) => {
    const options = otherOption ? otherOption : getState().options.toJS();
    const auth = getState().auth.toJS()
    if(from == 'dashboard'){
      options.from = 'dashboard'
    }

    if(auth.token){
        dispatch(getUnreadMessageCount())
    }
    return dispatch({
      type: types.ARTICLE_LIST,
      page: options.page,
      promise: api.getArticleList(options),
      isAdd: isAdd
    })
  }
}

export const getVideoList = (isAdd = true, otherOption) =>{
  return (dispatch,getState) => {
    const options = otherOption ? otherOption : getState().options.toJS();
    const auth = getState().auth.toJS()
    if(auth.token){
        dispatch(getUnreadMessageCount())
    }

    return dispatch({
      type: types.VIDEO_LIST,
      page: options.page,
      promise: api.getArticleList(options),
      isAdd: isAdd
    })
  }
}

export const getTedList = (isAdd = true, otherOption) =>{
  return (dispatch,getState) => {
    const options = otherOption ? otherOption : getState().options.toJS();
    return dispatch({
      type: types.TED_LIST,
      page: options.page,
      promise: api.getArticleList(options),
      isAdd: isAdd
    })
  }
}

export const getDocList = (isAdd = true, otherOption) =>{
  return (dispatch,getState) => {
    const options = otherOption ? otherOption : getState().options.toJS();
    return dispatch({
      type: types.DOC_LIST,
      page: options.page,
      promise: api.getArticleList(options),
      isAdd: isAdd
    })
  }
}

export const getPostList = (isAdd = true, otherOption) =>{
  return (dispatch,getState) => {
    const options = otherOption ? otherOption : getState().options.toJS();
    return dispatch({
      type: types.POST_LIST,
      page: options.page,
      promise: api.getArticleList(options),
      isAdd: isAdd
    })
  }
}

export const getBookList = (isAdd = true, otherOption) =>{
  return (dispatch,getState) => {
    const options = otherOption ? otherOption : getState().options.toJS();
    return dispatch({
      type: types.BOOK_LIST,
      page: options.page,
      promise: api.getArticleList(options),
      isAdd: isAdd
    })
  }
}

export const getHotVideoList = (isAdd = true, otherOption) =>{
  return (dispatch,getState) => {
    const options = otherOption ? otherOption : getState().options.toJS();
    return dispatch({
      type: types.HOT_VIDEO_LIST,
      page: options.page,
      promise: api.getArticleList(options),
      isAdd: isAdd
    })
  }
}

export const getHotDocList = (isAdd = true, otherOption) =>{
  return (dispatch,getState) => {
    const options = otherOption ? otherOption : getState().options.toJS();
    return dispatch({
      type: types.HOT_DOC_LIST,
      page: options.page,
      promise: api.getArticleList(options),
      isAdd: isAdd
    })
  }
}

export const getWeekHotList = (isAdd = true, otherOption) =>{
  return (dispatch,getState) => {
    const options = otherOption ? otherOption : getState().options.toJS();
    return dispatch({
      type: types.WEEK_HOT_LIST,
      page: options.page,
      promise: api.getArticleList(options),
      isAdd: isAdd
    })
  }
}

export const getMonthHotList = (isAdd = true, otherOption) =>{
  return (dispatch,getState) => {
    const options = otherOption ? otherOption : getState().options.toJS();
    return dispatch({
      type: types.MONTH_HOT_LIST,
      page: options.page,
      promise: api.getArticleList(options),
      isAdd: isAdd
    })
  }
}

//获取文章详情
export const getArticleDetail = (id, data) =>{
  return (dispatch, getState) => {
    const auth = getState().auth.toJS()
    return api.getArticleDetail(id, data)
    .then(response => ({json: response.data, status: response.statusText}))
    .then(({json,status}) => {
      let isLike = false
      let article = json.data
      // if(auth.user){
      //   auth.user.collectedArticles.map(item=>{
      //     if(item.toString() === article._id){
      //       isLike = true
      //     }
      //   })
      // }
      if(auth.token){
        dispatch(getUnreadMessageCount())
      }

      if(article.topicId ){
        dispatch(getTagList({type:'article', topicId:article.topicId._id }))
      }
      
      return dispatch({
        type: types.ARTICLE_DETAIL_SUCCESS,
        articleDetail: {...article, isLike:isLike, collect_count:article.collectCount}
      })
    })
    .catch(error => {
      return dispatch({
        type: types.ARTICLE_DETAIL_FAILURE
      })
    })
  }
}

export function changeArticleTopicId(article){
  return (dispatch, getState) => {
    return dispatch({
      type: types.ARTICLE_DETAIL_SUCCESS,
      articleDetail: {...article}
    })
  }
}

//添加主题
function receiveAddArticle(article) {
  return {
    type: types.ADD_ARTICLE_SUCCESS,
    article: article
  }
}

export function addArticle(article, from) {
  return (dispatch,getState)=>{
    const options = getState().options.toJS()
    return api.addNewArticle(article)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.error_msg || '添加文章失败'))
        }
        //dispatch(receiveAddArticle(json.data))
        dispatch(getUserInfo())
        if(from == 'share'){
          dispatch(push('/'))
        }else if(from == 'post'){
          dispatch(push('/bbs'))
        }else{
          dispatch(push('/dashboard/articles'))
        }
        
      }).catch(e=>{
        return dispatch(showMsg(e.data.error_msg || '添加文章失败'))
      })
  }
}

export function updateArticle(article_id, article, from) {
  return (dispatch,getState)=>{
    const options = getState().options.toJS()
    return api.updateArticle(article_id, article)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.error_msg || '更新文章失败'))
        }
        dispatch({
          type: types.ARTICLE_LIST,
          page: options.page, 
          promise: api.getArticleList(options),
          isAdd: false
        })
        if(from == 'front'){
            dispatch(push('/articles/doc/'+article_id))
        }else{
          dispatch(push('/dashboard/articles'))
        }
        
      }).catch(e=>{
        return dispatch(showMsg(e.data.error_msg || '更新文章失败'))
      })
  }
}

export function deleteArticle(article_id, from){
  return (dispatch,getState)=>{
    const options = getState().options.toJS()
    return api.deleteArticle(article_id)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.error_msg || '删除文章失败'))
        }

        dispatch({
          type: types.ARTICLE_LIST,
          page: options.page, 
          promise: api.getArticleList(options),
          isAdd: false
        })

      }).catch(e=>{
        return dispatch(showMsg(e.data.error_msg || '删除文章失败'))
      })
  }
}

