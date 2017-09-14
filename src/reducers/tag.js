import { TAG_LIST_REQUEST, TAG_LIST_SUCCESS, TAG_LIST_FAILURE, ADD_TAG_SUCCESS, TAG_DETAIL_SUCCESS, TAG_DETAIL_FAILURE } from '../actions/types'
import { createReducer } from 'redux-immutablejs'
import {fromJS} from 'immutable'
import _ from 'lodash'

const initialState = fromJS({
  isFetching: false,
  items: []
})


export const tagList =  createReducer(initialState, {
  [TAG_LIST_REQUEST]: (state) => state.set('isFetching',true),
  [TAG_LIST_SUCCESS]: (state,action)=>{
    return state.merge({
      isFetching:false,
      items: action.json.data
    })
  },
  [TAG_LIST_FAILURE]: (state,action)=>state.set('isFetching',false),
  [ADD_TAG_SUCCESS]: (state,action)=>{
    return state.mergeDeep({
      items: state.get('items').unshift(action.tag)
    })
  }
})

export const tagDetail = createReducer(fromJS({}),{
  [TAG_DETAIL_SUCCESS]:(state,action)=>state.merge(action.tagDetail),
  [TAG_DETAIL_FAILURE]:(state,action)=>state
})