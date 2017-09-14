import {
  RENCENT_POST_LIST_REQUEST,
  RENCENT_POST_LIST_SUCCESS,
  RENCENT_POST_LIST_FAILURE,
  FEED_POST_LIST_REQUEST,
  FEED_POST_LIST_SUCCESS,
  FEED_POST_LIST_FAILURE,
  TOGGLE_POST_READED_SUCCESS,
  TOGGLE_POST_READED_FAILURE,
} from '../actions/types'
import { createReducer } from 'redux-immutablejs'
import {fromJS} from 'immutable'
import _ from 'lodash'

const initialState = fromJS({
  isFetching: false,
  isMore: true,
  items: [],
  pagecount: 0
})

export const recentPostList = createReducer(initialState,{
  [RENCENT_POST_LIST_REQUEST]: (state,action)=>state.set('isFetching',true),
  [RENCENT_POST_LIST_SUCCESS]: (state,action)=>{
    return state.merge({
      isFetching:false,
      // isMore: !(action.json.data.length < action.page),
      isMore:  action.page < action.json.count,
      items: action.isAdd?state.get('items').concat(action.json.data):action.json.data,
      pagecount:action.json.count
    })
  },
  [RENCENT_POST_LIST_FAILURE]: (state,action)=>state.set('isFetching',false),
  [TOGGLE_POST_READED_SUCCESS]:(state,action)=>{
    var result = state.get('items').filter((item)=>{
      return item.get("_id") != action.post_id
    })
    return state.set('items',result)
  },
  [TOGGLE_POST_READED_FAILURE]:(state,action)=>state,
})

// export const prenextArticle = createReducer(fromJS({
//   'next':{},'prev':{}
// }),{
//   [PRENEXT_ARTICLE_SUCCESS]:(state,{json})=>{
//     return state.merge(json.data)
//   },
//   [PRENEXT_ARTICLE_FAILURE]:(state,{json})=>state
// })

const postsState = fromJS({
  isFetching: false,
  isMore: true,
  items: [],
  pagecount: 0
})

export const feedPostList = createReducer(postsState,{
  [FEED_POST_LIST_REQUEST]: (state,action)=>state.set('isFetching',true),
  [FEED_POST_LIST_SUCCESS]: (state,action)=>{
    return state.merge({
      isFetching:false,
      // isMore: !(action.json.data.length < action.page),
      //isMore:  action.page < action.json.count,
      items: action.isAdd?state.get('items').concat(action.json.data):action.json.data,
      //pagecount:action.json.count
    })
  },
  [FEED_POST_LIST_FAILURE]: (state,action)=>state.set('isFetching',false),
})
