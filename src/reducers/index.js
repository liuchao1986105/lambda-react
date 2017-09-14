import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { postList, monthHotList, weekHotList, articleList, articleDetail, videoList, bookList, hotVideoList, hotDocList, docList, tedList, questionList } from './article'
import { tagList, tagDetail } from './tag'
import { commentList, commentDetail } from './comment'
import auth from './auth'
import {options, commentOptions} from './options'
import sns from './sns'
import showmsg from './showmsg'
import globalVal from './globalVal'
import { topicList, topicDetail } from './topic'
import { skillmapList } from './image'
import { messageList, messageDetail, unreadMessage } from './message'
import { userList, userDetail } from './user'
import { recentPostList, feedPostList } from './feedpost'
import { myFeeds, feedsList,feedDetail } from './feed'
import { orderList, orderDetail } from './order'

const rootReducer = combineReducers({
  globalVal,
  sns,
  tagList,
  tagDetail,
  articleList,
  articleDetail,
  videoList,
  docList,
  tedList,
  bookList,
  questionList,
  postList,
  hotVideoList,
  hotDocList,
  monthHotList, 
  weekHotList,
  commentList,
  commentDetail,
  messageList,
  messageDetail,
  userList,
  userDetail,
  unreadMessage,
  options,
  commentOptions,
  auth,
  showmsg,
  topicList,
  topicDetail,
  skillmapList,
  recentPostList,
  myFeeds,
  feedsList,
  feedDetail,
  feedPostList,
  orderList, 
  orderDetail,
  routing: routerReducer,
  form: formReducer
})

export default rootReducer
