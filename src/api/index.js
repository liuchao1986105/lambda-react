import {OrderResource, UserResource,PostResource,FeedResource,AuthResource,ArticleResource,TagResource,MobileResource,CommentResource,TemplateResource, TopicResource, ImageResource, MessageResource} from './resources'

export default {
  localLogin: function (data) {
    return AuthResource('post', 'local/signin', data)
  },
  signUp: function (data) {
    return UserResource('post', 'signup', data)
  },
  sendResetMail: function (data) {
    return UserResource('post', 'sendResetMail', data)
  },
  sendResetPassword : function (data) {
    return UserResource('post', 'sendResetPassword', data)
  },
  getSnsLogins: function () {
    return UserResource('get', 'snsLogins')
  },
  getMe: function (data) {
    return UserResource('get', 'me', data)
  },
  mdUser: function (data) {
    return UserResource('put', 'mdUser', data)
  },

  getApps:function () {
    return MobileResource('get','getApps')
  },
  //tag
  getTagList:function (data) {
    return TagResource('get','',{params:data})
  },
  addNewTag:function (data) {
    return TagResource('post', '', data)
  },
  updateTag:function (tag_id,data) {
    return TagResource('put', tag_id, data)
  },
  deleteTag:function (tag_id) {
    return TagResource('delete', tag_id)
  },
  getTagDetail:function (tag_id) {
    return TagResource('get', tag_id)
  },

  //order
  getOrderList:function (data) {
    return OrderResource('get','',{params:data})
  },
  addNewOrder:function (data) {
    return OrderResource('post', '', data)
  },
  updateOrder:function (order_id,data) {
    return OrderResource('put', order_id, data)
  },
  deleteOrder:function (order_id) {
    return OrderResource('delete', order_id)
  },
  getOrderDetail:function (order_id) {
    return OrderResource('get', order_id)
  },

  //image
  getSkillmapList:function () {
    return ImageResource('get', 'skillmap')
  },

  //topic
  getIndexImage:function () {
    return TopicResource('get', 'getIndexImage')
  },
  getTopicList:function (options) {
    return TopicResource('get', '', null, {params:options})
  },
  addNewTopic:function (data) {
    return TopicResource('post', '', null, data)
  },
  updateTopic:function (topic_id,data) {
    return TopicResource('put', topic_id, null, data)
  },
  deleteTopic:function (topic_id) {
    return TopicResource('delete', topic_id)
  },
  getTopicDetail:function (topic_id) {
    return TopicResource('get', topic_id)
  },
  toggleTopicLike:function (topic_id) {
    return TopicResource('put', topic_id, 'collect')
  },
  toggleTopicDeLike:function (topic_id) {
    return TopicResource('put', topic_id, 'decollect')
  },

  // Article
  getArticleList:function (options) {
    return ArticleResource('get', '', null, {params:options})
  },
  addNewArticle:function (data) {
    return ArticleResource('post', '', null, data)
  },
  updateArticle:function (article_id,data) {
    return ArticleResource('put', article_id, null, data)
  },
  deleteArticle:function (article_id) {
    return ArticleResource('delete', article_id)
  },
  getArticleDetail:function (article_id, data) {
    return ArticleResource('get', article_id, null,  {params: data})
  },
  toggleArticleLike:function (article_id) {
    return ArticleResource('put', article_id, 'collect')
  },
  toggleArticleDeLike:function (article_id) {
    return ArticleResource('put', article_id, 'decollect')
  },

  //comment
  getCommentList:function (options) {
    return CommentResource('get','',null, {params:options})
  },
  addNewComment:function (article_id, data) {
    return CommentResource('post', article_id, 'addNewComment', data)
  },
  addNewReply: function (id,data) {
    return CommentResource('post', id, 'addNewReply', data)
  },
  deleteComment:function (id,article_id) {
    return CommentResource('delete', id, 'delComment/' + article_id)
  },
  deleteReply: function (comment_id,reply_id) {
    return CommentResource('delete', comment_id, 'delReply/' + reply_id)
  },
  getCommentDetail: function (id) {
    return CommentResource('get', id)
  },

  // feed post
  getRencentPostList:function (options) {
    return PostResource('get', 'recent', {params:options})
  },
  togglePostReaded:function (post_id, data) {
    return PostResource('put', post_id, data)
  },
  getFeedPostList:function (options) {
    return PostResource('get', '', {params:options})
  },

  // feed
  getMyFeeds:function (options) {
    return FeedResource('get', 'my', {params:options})
  },
  addFeed:function (data) {
    return FeedResource('post', '', data)
  },
  getFeedsList:function (options) {
    return FeedResource('get', '', {params:options})
  },
  subcribeFeed:function (feed_id,data) {
    return FeedResource('put', feed_id, data)
  },
  unsubcribeFeed:function (feed_id) {
    return FeedResource('delete', feed_id)
  },
  getFeedDetail:function (feed_id) {
    return FeedResource('get', feed_id)
  },

    //user
  getUserList:function (options) {
    return UserResource('get','', {params:options})
  },
  addNewUser:function (user_id, data) {
    return UserResource('post', user_id, 'addNewUser', data)
  },
  deleteUser:function (user_id) {
    return UserResource('delete', user_id)
  },
  getUserDetail: function (id) {
    return UserResource('get', id)
  },
  updateUser:function (user_id,data) {
    return UserResource('put', user_id, data)
  },
  changePayedStatus: function (user_id) {
    return UserResource('put', user_id+'/changePayedStatus')
  },

  //Message
  getMessageList:function (options) {
    return MessageResource('get','',null, {params:options})
  },
  getMessageDetail: function (id) {
    return MessageResource('get', id)
  },
  getUnreadMessageCount: function () {
    return MessageResource('get', '', 'unMsgsCount')
  },
  sendInfo:function (data) {
    return MessageResource('post','','sendinfo', data)
  },
}