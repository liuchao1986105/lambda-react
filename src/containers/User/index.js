import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import LoadMore from '../../components/LoadMore'
import Loding from '../../components/Loding'
import * as Actions from '../../actions'
import { limtPage, qiniuImageUrl} from '../../config'
import ArticleList from '../../components/Article/article_list'
import moment from 'moment'
import './user.scss'

const mapStateToProps = state =>{
  return {
    globalVal: state.globalVal.toJS(),
    articleList: state.articleList.toJS(),
    topicList: state.topicList.toJS(),
    docList: state.docList.toJS(),
    postList: state.postList.toJS(),
    commentList: state.commentList.toJS(),
    userDetail: state.userDetail.toJS(),
    auth: state.auth.toJS()
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)

export default class Users extends Component {
  constructor(props){
    super(props)
    this.state = {
      article_page: 1,
      doc_page: 1,
      comment_page: 1,
      message_page: 1,
      post_page: 1
    }
  }

  static propTypes = {
    userDetail: PropTypes.object.isRequired,
    articleList: PropTypes.object.isRequired,
    topicList: PropTypes.object.isRequired,
    docList: PropTypes.object.isRequired,
    commentList: PropTypes.object.isRequired,
    postList: PropTypes.object.isRequired,
    globalVal: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  static fetchData({id}){
    return [
      Actions.getUserDetail(id),
      Actions.getArticleList(false, {page: 1, limit: limtPage, user_id:id}),
      Actions.getTopicList(false, {page: 1, user_id:id}),
      Actions.getDocList(false, {page: 1, limit: limtPage, type:'all', author_id:id}),
      Actions.getCommentList(false, {page: 1, limit: limtPage, author_id: id}),
      Actions.getPostList(false, {page: 1, limit: limtPage,type:'post', author_id: id})
    ]
  }

  componentDidMount() {
    const { params: { id }, actions} = this.props
    actions.getUserDetail(id)
    actions.getArticleList(false, {page: 1, limit: limtPage,  user_id:id})
    actions.getTopicList(false, {page: 1, user_id:id})
    actions.getDocList(false, {page: 1, limit: limtPage, type:'all', author_id:id})
    actions.getCommentList(false, {page: 1, limit: limtPage, author_id: id})
    actions.getPostList(false, {page: 1, limit: limtPage,author_id: id, type:'post'})
    
  }

  componentWillReceiveProps(nextProps){
    const { actions } = this.props
    if (nextProps.params.id !== this.props.params.id){
      actions.getUserDetail(nextProps.params.id)
      actions.getArticleList(false, {page: 1, limit: limtPage, user_id:nextProps.params.id})
      actions.getTopicList(false, {page: 1, user_id:nextProps.params.id})
      actions.getDocList(false, {page: 1, limit: limtPage, type:'all', author_id:nextProps.params.id})
      actions.getCommentList(false, {page: 1, limit: limtPage, author_id: nextProps.params.id})
      actions.getPostList(false, {page: 1, limit: limtPage,author_id: nextProps.params.id, type:'post'})
    }
  }

  handleMessagePageClick = (option) => {
    const { params: { id }, actions } = this.props
    const page = option.page
    this.setState({message_page: page })
    let messageoption = {page: page, limit: limtPage, user_id:id}

    actions.getMessageList(true, messageoption)
  };

  handleCollectPageClick = (option) => {
    const { params: { id }, actions } = this.props
    const page = option.page
    this.setState({article_page: page })
    let articleoption = {page: page, limit: limtPage, user_id:id}

    actions.getArticleList(true, articleoption)
  };

  handleDocPageClick = (option) => {
    const { params: { id }, actions } = this.props
    const page = option.page
    this.setState({doc_page: page })
    let docoption = {page: page, type:'all', limit: limtPage, author_id:id}

    actions.getDocList(true, docoption)
  };

  handleCommentPageClick = (option) => {
    const { params: { id }, actions } = this.props
    const page = option.page
    this.setState({comment_page: page })
    let commentoption = {page: page, limit: limtPage, author_id:id}

    actions.getCommentList(true, commentoption)
  };

  handlePostPageClick= (option) => {
    const { params: { id }, actions } = this.props
    const page = option.page
    this.setState({post_page: page })
    let postoption = {page: page, limit: limtPage, author_id:id, type:'post'}

    actions.getPostList(true, postoption)
  };

  information(message){
    if(message.type=='collect'){
        return (
            <a className="reply" target="_blank" href={`/articles/doc/${message.articleId._id}`}>查看</a>                        
            )
    }else if(message.type=='comment' || message.type=='reply'){
        return (
            <a className="reply" target="_blank" href={`/articles/doc/${message.articleId._id}#comment-${message.commentId}`}>查看</a>                        
            )
    }
  }

  toTopic(topic_id){
    this.props.actions.toPage('/topics/'+topic_id)
  }

  render() {
    const { userDetail, actions, articleList, topicList, docList, postList, commentList, auth, params: { id }, } = this.props
    //document.title = userDetail.name  ? (userDetail.name + ' - Lambda') : 'Lambda';

    const info = {
        comment: '评论',
        collect: '收藏',
        reply: '回复'
    }
    return (
      <div className="c-layout-page">
        <div className="userbanner">
            <img className="avatar" src={userDetail.headimgurl}/>
                            
            <span className="userTitle c-btn" >{userDetail.name}</span>
            <div>
              <span className="userScore c-btn-uppercase" >L币:{userDetail.score}</span>
              {/*
                userDetail.payTime && userDetail.isPayed &&
                <span className="userScore c-btn-uppercase" style={{marginLeft:'40px'}}>会员到期: {moment(userDetail.payTime).add(1, 'year').format('YYYY-MM-DD')}</span>
              */}
            </div>
        </div>

        <div className="c-content-box c-size-md c-no-padding">
            <div className="c-shop-product-tab-1" role="tabpanel">
                <div className="container">
                    <ul className="nav nav-justified" role="tablist">                  
                        <li className="active">
                            <a className="c-font-bold" href="#tab-2" data-toggle="tab" role="tab">关注 ({topicList.items.length})</a>
                        </li>
                        <li>
                            <a className="c-font-bold" href="#tab-3" data-toggle="tab" role="tab">收藏 ({userDetail.collectedArticles ? userDetail.collectedArticles.length : 0})</a>
                        </li>
                        <li>
                            <a className="c-font-bold" href="#tab-4" data-toggle="tab" role="tab">分享 ({docList.total})</a>
                        </li>
                        <li>
                            <a className="c-font-bold" href="#tab-7" data-toggle="tab" role="tab">帖子 ({postList.total})</a>
                        </li>
                        <li >
                            <a className="c-font-bold" href="#tab-5" data-toggle="tab" role="tab">评论 ({commentList.total})</a>
                        </li>
                        <li >
                            <a className="c-font-bold" href="#tab-6" data-toggle="tab" role="tab" style={{paddingLeft:'0px',paddingRight:'0px'}}>本月会员邀请 ({userDetail.inviteds ? userDetail.inviteds.length : 0})</a>
                        </li>
                    </ul>
                </div>
                <div className="tab-content">
                    <div role="tabpanel" className="tab-pane fade in active" id="tab-2">
                        <div className="container" style={{height:'500px'}}>
                            <div className="cbp-l-filters-buttonCenter" >
                                {!topicList.isFetching ?
                                  topicList.items.map((topic,i)=>
                                    <div onClick={this.toTopic.bind(this, topic._id)} className={'cbp-filter-item'} key={i}> 
                                      {topic.title}
                                    </div>
                                  )
                                  :
                                  <Loding/>
                                }

                            </div> 
                        </div>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="tab-3">
                        <div className={'container ' + (articleList.items && articleList.items.length == 0 && 'defaultHeight')} >
                            <div className="tab-pane active" id="follow_topics">
                              <ArticleList location={location}  auth={auth} actions={actions} handleArticle={this.handleCollectPageClick.bind(this)} current_page={this.state.article_page} objectList={articleList}/>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="tab-4">
                        <div className={'container ' + (docList.items && docList.items.length == 0 && 'defaultHeight')} >
                            <div className="tab-pane active" id="follow_topics">
                              <ArticleList  location={location} auth={auth} actions={actions} handleArticle={this.handleDocPageClick.bind(this)} current_page={this.state.doc_page} objectList={docList}/>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="tab-7">
                        <div className={'container ' + (postList.items && postList.items.length == 0 && 'defaultHeight')} >
                            <div className="tab-pane active" id="follow_topics">
                              <ArticleList  location={location} auth={auth} actions={actions} handleArticle={this.handlePostPageClick.bind(this)} current_page={this.state.post_page} objectList={postList}/>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="tab-5">
                        <ul className={'timeline-content ' + ( commentList.items.length == 0 && 'defaultHeight')} >
                        {commentList.items.length > 0 &&
                            commentList.items.map((comment,i)=>
                                <li key={i} className="comment">
                                  <div className="avatar-container">
                                    <div className="avatar">
                                      {/*<a target="_blank" href={`/users/${userDetail._id}`}>*/}
        
                                       <img  src={(comment.authorId.headimgurl)}/>
                                      {/*</a>*/}
                                    </div>
                                  </div>
                                  <p>
                                     <a target="_blank" href={`/users/${comment.authorId._id}`}>{comment.authorId.name}</a> 评论了文章 <a target="_blank" href={`/articles/doc/${comment.articleId._id}`}>{comment.articleId.title}</a>
                                  </p>
                                  <p className="comment-content">
                                    <i className="fa fa-quote-left"></i>
                                    <span dangerouslySetInnerHTML={{__html: comment.content}} />
                                    <i className="fa fa-quote-right"></i>
                                  </p>
                                  <div className="meta">
                                    <a className="reply" target="_blank" href={`/articles/doc/${comment.articleId._id}#comment-${comment._id}`}>查看</a>
                                    <time>{moment(comment.created_at).format('YYYY-MM-DD HH:mm:ss')}</time>
                                  </div>
                                </li>
                            )
                          }
                        </ul>
                        {(commentList.items.length > 0)&&<LoadMore options={{page: this.state.comment_page}} isMore={commentList.isMore} isFetching={commentList.isFetching} addData={this.handleCommentPageClick.bind(this)} />}
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="tab-6">
                        <ul className={'timeline-content ' + ( userDetail.inviteds && userDetail.inviteds.length == 0 && 'defaultHeight')} >
                        {userDetail.inviteds && userDetail.inviteds.length > 0 &&
                            userDetail.inviteds.map((invited,i)=>
                                <li key={i} className="comment">
                                  <div className="avatar-container">
                                    <div className="avatar">
                                       <img  src={(userDetail.headimgurl)}/>
                                    </div>
                                  </div>
                                  <p>
                                     成功邀请了会员<Link to={`/users/${invited.user_id}`}>{invited.user_name}</Link>，获得10元现金奖励
                                  </p>
                                  
                                  <div className="meta">
                                    <time>{moment(invited.created).format('YYYY-MM-DD HH:mm:ss')}</time>
                                  </div>
                                </li>
                            )
                          }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}