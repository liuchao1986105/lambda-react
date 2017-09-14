import { 
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  COMMENT_LIST_FAILURE,
  COMMENT_DETAIL_REQUEST,
  COMMENT_DETAIL_SUCCESS,
  COMMENT_DETAIL_FAILURE,
  ADD_COMMENT_SUCCESS,
  ADD_REPLY_SUCCESS
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

export const commentList =  createReducer(initialState,{
  [COMMENT_LIST_REQUEST]: (state,action)=>state.set('isFetching',true),
  [COMMENT_LIST_SUCCESS]: (state,action)=>{
    return state.merge({
      isFetching:false,
      isMore:  action.page < action.json.count,
      items: action.isAdd?state.get('items').concat(action.json.data):action.json.data,
      pagecount: action.json.count,
      total: action.json.total
    })
  },
  [COMMENT_LIST_FAILURE]: (state,action)=>state.set('isFetching',false),
  [ADD_COMMENT_SUCCESS]:(state,action)=>{
    return state.mergeDeep({
      errMsg:null,
      //items: state.get('items').unshift(action.comment)
      items: state.get('items').push(action.comment)
    })
  },
  [ADD_REPLY_SUCCESS]: (state,action)=>{
    return state.mergeDeep({
      errMsg: null,
      items: state.get('items').map(item=>{
/*        if(item.get('_id') === action.cid){
          return item.set('replys',action.replys)
        }*/
        return item
      })
    })
  }
})

export const commentDetail = createReducer(fromJS({}),{
  [COMMENT_DETAIL_SUCCESS]:(state,action)=>state.merge(action.commentDetail),
  [COMMENT_DETAIL_FAILURE]:(state,action)=>state
})