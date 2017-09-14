import { 
  MESSAGE_LIST_REQUEST,
  MESSAGE_LIST_SUCCESS,
  MESSAGE_LIST_FAILURE,
  MESSAGE_DETAIL_REQUEST,
  MESSAGE_DETAIL_SUCCESS,
  MESSAGE_DETAIL_FAILURE,
  UNREAD_MESSAGE_COUNT,
  UNREAD_MESSAGE_COUNT_FAILURE
} from '../actions/types'
import { createReducer } from 'redux-immutablejs'
import {fromJS} from 'immutable'

const initialState = fromJS({
  isFetching: false,
  isMore: true,
  items: [],
  pagecount: 0,
  total: 0
})

export const messageList =  createReducer(initialState,{
  [MESSAGE_LIST_REQUEST]: (state,action)=>state.set('isFetching',true),
  [MESSAGE_LIST_SUCCESS]: (state,action)=>{
    return state.merge({
      isFetching:false,
      isMore:  action.page < action.json.count,
      items: action.isAdd?state.get('items').concat(action.json.data):action.json.data,
      pagecount:action.json.count,
      total: action.json.total
    })
  },
  [MESSAGE_LIST_FAILURE]: (state,action)=>state.set('isFetching',false)
})

export const messageDetail = createReducer(fromJS({}),{
  [MESSAGE_DETAIL_SUCCESS]:(state,action)=>state.merge(action.messageDetail),
  [MESSAGE_DETAIL_FAILURE]:(state,action)=>state
})

export const unreadMessage = createReducer(fromJS({}),{
  [UNREAD_MESSAGE_COUNT]:(state,action)=>state.merge(action.unreadMessage),
  [UNREAD_MESSAGE_COUNT_FAILURE]:(state,action)=>state
})