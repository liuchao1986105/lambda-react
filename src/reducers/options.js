import { CHANGE_OPTIONS, CHANGE_COMMENT_OPTIONS } from '../actions/types'
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

const initialState = fromJS({page: 1, limit: 12, sortName:'-created_at', tagId: '', topicId: '', type: '', search: ''})
const initialCommentState = fromJS({page: 1, limit: 10, sortName:'-created_at', from: 'dashboard', articleId: ''})

export const options = createReducer(initialState, {
  [CHANGE_OPTIONS]: (state, action) => state.merge(action.option)
})

export const commentOptions = createReducer(initialCommentState, {
  [CHANGE_COMMENT_OPTIONS]: (state, action) => state.merge(action.option)
})
