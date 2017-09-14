import { SKILLMAP_LIST_REQUEST, SKILLMAP_LIST_SUCCESS, SKILLMAP_LIST_FAILURE} from '../actions/types'
import { createReducer } from 'redux-immutablejs'
import {fromJS} from 'immutable'
import _ from 'lodash'

const initialState = fromJS({
  isFetching: false,
  items: []
})


export const skillmapList =  createReducer(initialState, {
  [SKILLMAP_LIST_REQUEST]: (state) => state.set('isFetching',true),
  [SKILLMAP_LIST_SUCCESS]: (state,action)=>{
    return state.merge({
      isFetching:false,
      items: action.json.data
    })
  },
  [SKILLMAP_LIST_FAILURE]: (state,action)=>state.set('isFetching',false),
})
