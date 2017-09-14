import {
  TOPIC_LIST_REQUEST,
  TOPIC_LIST_SUCCESS,
  TOPIC_LIST_FAILURE,
  TOPIC_DETAIL_SUCCESS,
  TOPIC_DETAIL_FAILURE,
  TOGGLE_TOPIC_LIKE_SUCCESS,
  TOGGLE_TOPIC_LIKE_FAILURE,
  ADD_TOPIC_SUCCESS
} from '../actions/types'
import { createReducer } from 'redux-immutablejs'
import {fromJS} from 'immutable'

const initialState = fromJS({
  isFetching: false,
  isMore: true,
  items: [],
  pagecount: 0
})

export const topicList = createReducer(initialState,{
  [TOPIC_LIST_REQUEST]: (state,action)=>state.set('isFetching',true),
  [TOPIC_LIST_SUCCESS]: (state,action)=>{
    return state.merge({
      isFetching:false,
      // isMore: !(action.json.data.length < action.page),
      isMore:  action.page < action.json.count,
      items: action.isAdd?state.get('items').concat(action.json.data):action.json.data,
      pagecount:action.json.count
    })
  },
  [TOPIC_LIST_FAILURE]: (state,action)=>state.set('isFetching',false),
  [ADD_TOPIC_SUCCESS]: (state,action)=>{
    return state.mergeDeep({
      errMsg:null,
      items: state.get('items').unshift(action.topic)
    })
  },
})

export const topicDetail = createReducer(fromJS({}),{
  [TOPIC_DETAIL_SUCCESS]:(state,action)=>state.merge(action.topicDetail),
  [TOPIC_DETAIL_FAILURE]:(state,action)=>state,
  [TOGGLE_TOPIC_LIKE_SUCCESS]:(state,action)=>{
    return state.merge({
      isLike:action.isLike, 
      collect_count:action.collect_count
    })
  },
  [TOGGLE_TOPIC_LIKE_FAILURE]:(state,action)=>state
})
