import {
  ARTICLE_LIST_REQUEST,
  ARTICLE_LIST_SUCCESS,
  ARTICLE_LIST_FAILURE,
  VIDEO_LIST_REQUEST,
  VIDEO_LIST_SUCCESS,
  VIDEO_LIST_FAILURE,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAILURE,
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  BOOK_LIST_FAILURE,
  DOC_LIST_REQUEST,
  DOC_LIST_SUCCESS,
  DOC_LIST_FAILURE,
  TED_LIST_REQUEST,
  TED_LIST_SUCCESS,
  TED_LIST_FAILURE,
  QUESTION_LIST_REQUEST,
  QUESTION_LIST_SUCCESS,
  QUESTION_LIST_FAILURE,
  HOT_VIDEO_LIST_REQUEST,
  HOT_VIDEO_LIST_SUCCESS,
  HOT_VIDEO_LIST_FAILURE,
  HOT_DOC_LIST_REQUEST,
  HOT_DOC_LIST_SUCCESS,
  HOT_DOC_LIST_FAILURE,
  WEEK_HOT_LIST_REQUEST,
  WEEK_HOT_LIST_SUCCESS,
  WEEK_HOT_LIST_FAILURE,
  MONTH_HOT_LIST_REQUEST,
  MONTH_HOT_LIST_SUCCESS,
  MONTH_HOT_LIST_FAILURE,
  ARTICLE_DETAIL_SUCCESS,
  ARTICLE_DETAIL_FAILURE,
  CHANGE_ARTICLE_SUCCESS,
  TOGGLE_ARTICLE_LIKE_SUCCESS,
  TOGGLE_ARTICLE_LIKE_FAILURE,
  ADD_ARTICLE_SUCCESS,
  CHANGE_ARTICLE_DESC
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

export const articleList = createReducer(initialState,{
  [ARTICLE_LIST_REQUEST]: (state,action)=>state.set('isFetching',true),
  [ARTICLE_LIST_SUCCESS]: (state,action)=>{
    return state.merge({
      isFetching:false,
      isMore:  action.page < action.json.count,
      items: action.isAdd?state.get('items').concat(action.json.data):action.json.data,
      pagecount:action.json.count,
      total: action.json.total
    })
  },
  [ARTICLE_LIST_FAILURE]: (state,action)=>state.set('isFetching',false),
  [ADD_ARTICLE_SUCCESS]: (state,action)=>{
    return state.mergeDeep({
      errMsg:null,
      items: state.get('items').unshift(action.article)
    })
  },
})

export const tedList = createReducer(initialState,{
  [TED_LIST_REQUEST]: (state,action)=>state.set('isFetching',true),
  [TED_LIST_SUCCESS]: (state,action)=>{
    return state.merge({
      isFetching:false,
      isMore:  action.page < action.json.count,
      items: action.isAdd?state.get('items').concat(action.json.data):action.json.data,
      pagecount:action.json.count,
      total: action.json.total
    })
  },
  [TED_LIST_FAILURE]: (state,action)=>state.set('isFetching',false)
})

export const questionList = createReducer(initialState,{
  [QUESTION_LIST_REQUEST]: (state,action)=>state.set('isFetching',true),
  [QUESTION_LIST_SUCCESS]: (state,action)=>{
    return state.merge({
      isFetching:false,
      isMore:  action.page < action.json.count,
      items: action.isAdd?state.get('items').concat(action.json.data):action.json.data,
      pagecount:action.json.count,
      total: action.json.total
    })
  },
  [QUESTION_LIST_FAILURE]: (state,action)=>state.set('isFetching',false)
})

export const postList = createReducer(initialState,{
  [POST_LIST_REQUEST]: (state,action)=>state.set('isFetching',true),
  [POST_LIST_SUCCESS]: (state,action)=>{
    return state.merge({
      isFetching:false,
      isMore:  action.page < action.json.count,
      items: action.isAdd?state.get('items').concat(action.json.data):action.json.data,
      pagecount:action.json.count,
      total: action.json.total
    })
  },
  [POST_LIST_FAILURE]: (state,action)=>state.set('isFetching',false)
})

export const docList = createReducer(initialState,{
  [DOC_LIST_REQUEST]: (state,action)=>state.set('isFetching',true),
  [DOC_LIST_SUCCESS]: (state,action)=>{
    return state.merge({
      isFetching:false,
      isMore:  action.page < action.json.count,
      items: action.isAdd?state.get('items').concat(action.json.data):action.json.data,
      pagecount:action.json.count,
      total: action.json.total
    })
  },
  [DOC_LIST_FAILURE]: (state,action)=>state.set('isFetching',false)
})

export const videoList = createReducer(initialState,{
  [VIDEO_LIST_REQUEST]: (state,action)=>state.set('isFetching',true),
  [VIDEO_LIST_SUCCESS]: (state,action)=>{
    return state.merge({
      isFetching:false,
      isMore:  action.page < action.json.count,
      items: action.isAdd?state.get('items').concat(action.json.data):action.json.data,
      pagecount:action.json.count,
      total: action.json.total
    })
  },
  [VIDEO_LIST_FAILURE]: (state,action)=>state.set('isFetching',false)
})

export const bookList = createReducer(initialState,{
  [BOOK_LIST_REQUEST]: (state,action)=>state.set('isFetching',true),
  [BOOK_LIST_SUCCESS]: (state,action)=>{
    return state.merge({
      isFetching:false,
      isMore:  action.page < action.json.count,
      items: action.isAdd?state.get('items').concat(action.json.data):action.json.data,
      pagecount:action.json.count,
      total: action.json.total
    })
  },
  [BOOK_LIST_FAILURE]: (state,action)=>state.set('isFetching',false)
})

export const weekHotList = createReducer(initialState,{
  [WEEK_HOT_LIST_REQUEST]: (state,action)=>state.set('isFetching',true),
  [WEEK_HOT_LIST_SUCCESS]: (state,action)=>{
    return state.merge({
      isFetching:false,
      isMore:  action.page < action.json.count,
      items: action.isAdd?state.get('items').concat(action.json.data):action.json.data,
      pagecount:action.json.count,
      total: action.json.total
    })
  },
  [WEEK_HOT_LIST_FAILURE]: (state,action)=>state.set('isFetching',false)
})

export const monthHotList = createReducer(initialState,{
  [MONTH_HOT_LIST_REQUEST]: (state,action)=>state.set('isFetching',true),
  [MONTH_HOT_LIST_SUCCESS]: (state,action)=>{
    return state.merge({
      isFetching:false,
      isMore:  action.page < action.json.count,
      items: action.isAdd?state.get('items').concat(action.json.data):action.json.data,
      pagecount:action.json.count,
      total: action.json.total
    })
  },
  [MONTH_HOT_LIST_FAILURE]: (state,action)=>state.set('isFetching',false)
})

export const hotVideoList = createReducer(initialState,{
  [HOT_VIDEO_LIST_REQUEST]: (state,action)=>state.set('isFetching',true),
  [HOT_VIDEO_LIST_SUCCESS]: (state,action)=>{
    return state.merge({
      isFetching:false,
      isMore:  action.page < action.json.count,
      items: action.isAdd?state.get('items').concat(action.json.data):action.json.data,
      pagecount:action.json.count,
      total: action.json.total
    })
  },
  [HOT_VIDEO_LIST_FAILURE]: (state,action)=>state.set('isFetching',false)
})

export const hotDocList = createReducer(initialState,{
  [HOT_DOC_LIST_REQUEST]: (state,action)=>state.set('isFetching',true),
  [HOT_DOC_LIST_SUCCESS]: (state,action)=>{
    return state.merge({
      isFetching:false,
      isMore:  action.page < action.json.count,
      items: action.isAdd?state.get('items').concat(action.json.data):action.json.data,
      pagecount:action.json.count,
      total: action.json.total
    })
  },
  [HOT_DOC_LIST_FAILURE]: (state,action)=>state.set('isFetching',false)
})

export const articleDetail = createReducer(fromJS({}),{
  [ARTICLE_DETAIL_SUCCESS]:(state,action)=>state.merge(action.articleDetail),
  [ARTICLE_DETAIL_FAILURE]:(state,action)=>state,
  [TOGGLE_ARTICLE_LIKE_SUCCESS]:(state,action)=>{
    return state.merge({
      isLike:action.isLike, 
      collect_count:action.collect_count
    })
  },
  [TOGGLE_ARTICLE_LIKE_FAILURE]:(state,action)=>state,
  [CHANGE_ARTICLE_DESC]:(state,action)=>{
    return state.merge({
      description:action.description, 
    })
  },
})
