 import {
  MY_FEEDS_REQUEST,
  MY_FEEDS_SUCCESS,
  MY_FEEDS_FAILURE,
  FEEDS_LIST_REQUEST,
  FEEDS_LIST_SUCCESS,
  FEEDS_LIST_FAILURE,
  FEED_DETAIL_SUCCESS,
  FEED_DETAIL_FAILURE,
} from '../actions/types'
import { createReducer } from 'redux-immutablejs'
import {fromJS} from 'immutable'
import _ from 'lodash'

const initialState = fromJS({
  isFetching: false,
  items: [],
})

export const myFeeds= createReducer(initialState,{
  [MY_FEEDS_REQUEST]: (state,action)=>state.set('isFetching',true),
  [MY_FEEDS_SUCCESS]: (state,action)=>{
    return state.merge({
      isFetching:false,
      items: action.isAdd?state.get('items').concat(action.json.data):action.json.data,
    })
  },
  [MY_FEEDS_FAILURE]: (state,action)=>state.set('isFetching',false),
})


const initialFeedsState = fromJS({
  isFetching: false,
  isMore: true,
  items: [],
  pagecount: 0
})

export const feedsList = createReducer(initialFeedsState,{
  [FEEDS_LIST_REQUEST]: (state,action)=>state.set('isFetching',true),
  [FEEDS_LIST_SUCCESS]: (state,action)=>{
    return state.merge({
      isFetching:false,
      isMore:  action.page < action.json.count,
      items: action.isAdd?state.get('items').concat(action.json.data):action.json.data,
      pagecount:action.json.count
    })
  },
  [FEEDS_LIST_FAILURE]: (state,action)=>state.set('isFetching',false),
  // [ADD_TOPIC_SUCCESS]: (state,action)=>{
  //   return state.mergeDeep({
  //     errMsg:null,
  //     items: state.get('items').unshift(action.topic)
  //   })
  // },
})

export const feedDetail = createReducer(fromJS({}),{
  [FEED_DETAIL_SUCCESS]:(state,action)=>state.merge(action.feedDetail),
  [FEED_DETAIL_FAILURE]:(state,action)=>state
})
