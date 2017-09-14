import {
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAILURE,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAILURE,
  ADD_ORDER_SUCCESS
} from '../actions/types'
import { createReducer } from 'redux-immutablejs'
import {fromJS} from 'immutable'

const initialState = fromJS({
  isFetching: false,
  isMore: true,
  items: [],
  pagecount: 0
})

export const orderList = createReducer(initialState,{
  [ORDER_LIST_REQUEST]: (state,action)=>state.set('isFetching',true),
  [ORDER_LIST_SUCCESS]: (state,action)=>{
    return state.merge({
      isFetching:false,
      // isMore: !(action.json.data.length < action.page),
      isMore:  action.page < action.json.count,
      items: action.isAdd?state.get('items').concat(action.json.data):action.json.data,
      pagecount:action.json.count
    })
  },
  [ORDER_LIST_FAILURE]: (state,action)=>state.set('isFetching',false),
  [ADD_ORDER_SUCCESS]: (state,action)=>{
    return state.mergeDeep({
      errMsg:null,
      items: state.get('items').unshift(action.order)
    })
  },
})

export const orderDetail = createReducer(fromJS({}),{
  [ORDER_DETAIL_SUCCESS]:(state,action)=>state.merge(action.topicDetail),
  [ORDER_DETAIL_FAILURE]:(state,action)=>state
})
