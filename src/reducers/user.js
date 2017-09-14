import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAILURE,
  ADD_USER_SUCCESS
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

export const userList = createReducer(initialState,{
  [USER_LIST_REQUEST]: (state,action)=>state.set('isFetching',true),
  [USER_LIST_SUCCESS]: (state,action)=>{
    return state.merge({
      isFetching:false,
      isMore:  action.page < action.json.count,
      items: action.isAdd?state.get('items').concat(action.json.data):action.json.data,
      pagecount:action.json.count,
      total: action.json.total
    })
  },
  [USER_LIST_FAILURE]: (state,action)=>state.set('isFetching',false),
  [ADD_USER_SUCCESS]: (state,action)=>{
    return state.mergeDeep({
      errMsg:null,
      items: state.get('items').unshift(action.user)
    })
  },
})


export const userDetail = createReducer(fromJS({}),{
  [USER_DETAIL_SUCCESS]:(state,action)=>state.merge(action.userDetail),
  [USER_DETAIL_FAILURE]:(state,action)=>state
})
