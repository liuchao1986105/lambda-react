import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as Actions from '../../actions'
import { limtPage, limitBbsPage, limitHot} from '../../config'
import ArticleList from '../../components/Article/article_list'
import Loding from '../../components/Loding'
import { saveCookie } from '../../utils/authService'
import { customTime } from '../../utils'
import '../Topics/topic.scss'
import './bbs.scss'

const mapStateToProps = state =>{
  return {
    globalVal: state.globalVal.toJS(),
    articleList: state.articleList.toJS(),
    docList: state.docList.toJS(),
    videoList: state.videoList.toJS(),
    bookList: state.bookList.toJS(),
    postList: state.postList.toJS(),
    // tedList: state.tedList.toJS(),
    auth: state.auth.toJS(),
    weekHotList: state.weekHotList.toJS(),
    monthHotList: state.monthHotList.toJS(),
  }
}


const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)

export default class Bbs extends Component {
  constructor(props){
    super(props)
    this.state = {
      article_page: 1,
      video_page: 1,
      doc_page: 1,
      post_page: 1,
      ted_page: 1,
      book_page: 1,
      firstLoad: true,
      showModal: false
    }
  }

  static propTypes = {
    articleList: PropTypes.object.isRequired,
    docList: PropTypes.object.isRequired,
    videoList: PropTypes.object.isRequired,
    postList: PropTypes.object.isRequired,
   // tedList: PropTypes.object.isRequired,
    bookList: PropTypes.object.isRequired,
    weekHotList: PropTypes.object.isRequired,
    monthHotList: PropTypes.object.isRequired,
    globalVal: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }

  static fetchData({id}){
    return [
      Actions.getArticleList(false, {page: 1, limit: limtPage, type:'all'}), 
      Actions.getDocList(false, {page: 1, limit: limitBbsPage,type:'doc'}), 
      Actions.getVideoList(false, {page: 1, limit: limitBbsPage,type:'video'}),
      // Actions.getTedList(false, {page: 1, limit: limitBbsPage,type:'ted'}),
      Actions.getBookList(false, {page: 1, limit: limitBbsPage, type:'book'}),
      Actions.getWeekHotList(false, {page: 1, limit: limtPage, recommend: 'week'}),
      Actions.getMonthHotList(false, {page: 1, limit: limtPage, recommend: 'month'}),
      Actions.getPostList(false, {page: 1, limit: limitBbsPage,type:'post'})
    ]
  }

  componentDidMount() {
    const { actions} = this.props
    actions.getArticleList(false, {page: 1, limit: limtPage, type:'all'})
    actions.getDocList(false, {page: 1, limit: limitBbsPage,type:'doc'})
    actions.getVideoList(false, {page: 1, limit: limitBbsPage,type:'video'})
    // actions.getTedList(false, {page: 1, limit: limitBbsPage,type:'ted'})
    actions.getBookList(false, {page: 1, limit: limitBbsPage,type:'book'})
    actions.getWeekHotList(false, {page: 1, limit: limtPage, recommend: 'week'})
    actions.getMonthHotList(false, {page: 1, limit: limtPage, recommend: 'month'})
    actions.getPostList(false, {page: 1, limit: limitBbsPage,type:'post'})
  }

  handleArticlePageClick = (option) => {
    const { actions } = this.props
    const page = option.page
    this.setState({article_page: page, firstLoad: false })
    let articleoption = {page: page, limit: limitBbsPage, type:'all'}
    actions.getArticleList(true, articleoption)
  };

  handleBookPageClick = (option) => {
    const { actions } = this.props
    const page = option.page
    this.setState({book_page: page})
    let bookoption = {page: page, limit: limitBbsPage, type:'book'}
    actions.getBookList(true, bookoption)
  };

  handleTedPageClick = (option) => {
    const { actions } = this.props
    const page = option.page
    this.setState({ted_page: page })
    let articleoption = {page: page, limit: limitBbsPage, type:'ted'}
    actions.getTedList(true, articleoption)
  };

  handleDocPageClick = (option) => {
    const { actions } = this.props
    const page = option.page
    this.setState({doc_page: page})
    let docoption = {page: page, limit: limitBbsPage, type:'doc'}
    actions.getDocList(true, docoption)
  };

  handleVideoPageClick = (option) => {
    const { actions } = this.props
    const page = option.page
    this.setState({video_page: page, firstLoad: false })
    let videooption = {page: page, limit: limitBbsPage, type:'video'}
    actions.getVideoList(true, videooption)
  };

  handlePostPageClick = (option) => {
    const { actions } = this.props
    const page = option.page
    this.setState({post_page: page})
    let postoption = {page: page, limit: 1, type:'post'}
    actions.getPostList(true, postoption)
  }

  createPost(){
    this.props.actions.toPage('/post')
  }


  render() {
    const {actions, articleList, docList, videoList, postList, bookList, tedList, auth, weekHotList, monthHotList } = this.props
    document.title=  'Lambda - 程序员学习社区'
    return (
      <div className="c-layout-page">
       <div className="c-content-box" style={{marginBottom:'15px'}}>
          <div className="container">
            {/*<div style={{position:'absolute', top:'100px', right:'50px'}}>
              <button className="cbp-l-loadMore-link btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase"><i className="fa fa-pencil" style={{fontSize:'20px'}}></i>发布问题</button>
            </div>*/}
            <div className="row">
                <div className="col-md-12">
                  <div className="col-md-8">
                    <div className="c-content-blog-post-card-1-grid">
                      <div className="c-content-tab-1 c-theme c-margin-t-30">
                              <ul className="nav nav-tabs nav-justified">
                                  {/*<li >
                                      <a href="#all_posts" data-toggle="tab"><h4 className="c-font-bold">全部</h4></a>
                                  </li>*/}
                                  <li className="active">
                                      <a href="#video_posts" data-toggle="tab"><h4 className="c-font-bold">视频教程</h4></a>
                                  </li>
                                  <li>
                                      <a href="#doc_posts" data-toggle="tab"><h4 className="c-font-bold">文章</h4></a>
                                  </li>

                                  <li>
                                      <a href="#book_posts" data-toggle="tab"><h4 className="c-font-bold">书籍</h4></a>
                                  </li>
                                  <li>
                                      <a href="#question_posts" data-toggle="tab"><h4 className="c-font-bold">帖子</h4></a>
                                  </li>
                                  {/*<li >
                                      <a href="#ted_posts" data-toggle="tab"><h4 className="c-font-bold">演讲</h4></a>
                                  </li>*/}
                              </ul>
                              <div className="tab-content">
                                  {/*<div className="tab-pane active" id="all_posts">
                                    {
                                      (articleList.isFetching  && this.state.firstLoad) ?
                                      <Loding/>
                                      :
                                      <ArticleList location={location} auth={auth}  actions={actions} handleArticle={this.handleArticlePageClick.bind(this)} current_page={this.state.article_page} objectList={articleList}/>
                                    }
                                  </div>*/}
                                  <div className="tab-pane  active" id="video_posts">
                                    {
                                      (videoList.isFetching  && this.state.firstLoad) ?
                                      <Loding/>
                                      :
                                      <ArticleList location={location} auth={auth}  actions={actions} handleArticle={this.handleVideoPageClick.bind(this)} current_page={this.state.video_page}  objectList={videoList}/>
                                    }
                                  </div>

                                  <div className="tab-pane"  id="doc_posts">
                                      <ArticleList location={location} auth={auth}  actions={actions} handleArticle={this.handleDocPageClick.bind(this)} current_page={this.state.doc_page} objectList={docList}/>
                                  </div>

                                  <div className="tab-pane" id="book_posts">
                                    <ArticleList location={location} auth={auth}  actions={actions} handleArticle={this.handleBookPageClick.bind(this)} current_page={this.state.book_page} objectList={bookList}/>
                                  </div>
                                  <div className="tab-pane" id="question_posts">
                                    <ArticleList location={location} auth={auth}  actions={actions} handleArticle={this.handlePostPageClick.bind(this)} current_page={this.state.post_page}  objectList={postList}/>
                                  </div>
                                  {/*<div className="tab-pane" id="ted_posts">
                                    <ArticleList location={location} auth={auth}  actions={actions} handleArticle={this.handleTedPageClick.bind(this)} current_page={this.state.ted_page}  objectList={tedList}/>
                                  </div>*/}
                              </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    {
                      auth.token &&
                      (
                        <div className="c-content-blog-post-card-1-grid">
                          <div className="c-content-title-1 c-theme c-title-md c-margin-t-50">
                              <h3 className="c-font-bold c-font-uppercase">个人信息</h3>
                              <div className="c-line-left c-theme-bg"></div>

                              <div>
                                <div>
                                <a href="javascript:;" bsRole="toggle" >
                                  <img className="avatarheader" src={ auth.user && auth.user.headimgurl}/>
                                </a>
                                <span style={{marginLeft:'10px'}}>{ auth.user && auth.user.name}</span>
                                </div>
                                <div style={{marginLeft:'12px',marginTop:'10px',fontSize:'14px'}}>
                                  <p>L币: { auth.user && auth.user.score}</p>
                                </div>
                                { (auth.user && auth.user.sign) && 
                                  <div style={{marginLeft:'12px',marginTop:'10px',fontSize:'14px'}}>
                                    <p> 个性签名: {auth.user.sign}</p>
                                  </div>
                                }
                                <div style={{marginTop:'20px'}}>
                                  <button onClick={this.createPost.bind(this)} type="button" className="cbp-l-loadMore-link btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase">
                                    发布帖子
                                  </button>
                                </div>
                              </div>
                          </div>  
                        </div>
                      )
                    }
                    <div className="c-content-ver-nav">
                      <div className="c-content-title-1 c-theme c-title-md c-margin-t-40">
                        <h3 className="c-font-bold c-font-uppercase">热议资源</h3>
                        <div className="c-line-left c-theme-bg"></div>

                        <div className="c-content-tab-1 c-theme">
                          <div className="nav-justified">
                              <ul className="nav nav-tabs nav-justified">
                                  <li  className="active">
                                      <a href="#newest_articles" data-toggle="tab">最新</a>
                                  </li>
                                  <li>
                                      <a href="#blog_recent_posts" data-toggle="tab">本周最热</a>
                                  </li>
                                  <li>
                                      <a href="#blog_popular_posts" data-toggle="tab">本月最热</a>
                                  </li>

                              </ul>
                              <div className="tab-content">
                                  <div className="tab-pane active" id="newest_articles">
                                      <ul className="c-content-recent-posts-1 hotarticle">
                                        {articleList.items.length > 0 &&
                                          articleList.items.map((item,i)=>
                                            <li key={item._id}>
                                              <div className="c-post">
                                                <a  href={'/articles/doc/'+item._id} target="_blank" style={{fontSize:'14px', fontWeight:'bold'}}>{item.title}</a>
                                                <div style={{fontSize:'12px'}}>
                                                  { customTime(item.created_at) }
                                                  <span title='收藏' style={{marginLeft:'10px'}}><i className={"fa fa-heart"} ></i>{item.collectCount}</span>
                                                  <span title='评论' style={{marginLeft:'10px'}}><i className={"fa fa-comment"}></i>{item.comments.length}</span>
                                                </div>                  
                                              </div>
                                            </li>
                                          )
                                        }
                                      </ul>
                                  </div>
                                  <div className="tab-pane" id="blog_recent_posts">
                                      <ul className="c-content-recent-posts-1 hotarticle">
                                        {weekHotList.items.length > 0 &&
                                          weekHotList.items.map((item,i)=>
                                            <li key={item._id}>
                                              <div className="c-post">
                                                <a  href={'/articles/doc/'+item._id} target="_blank" style={{fontSize:'14px', fontWeight:'bold'}}>{item.title}</a>
                                                <div style={{fontSize:'12px'}}>
                                                  { customTime(item.created_at) }
                                                  <span title='收藏' style={{marginLeft:'10px'}}><i className={"fa fa-heart"} ></i>{item.collectCount}</span>
                                                  <span title='评论' style={{marginLeft:'10px'}}><i className={"fa fa-comment"}></i>{item.comments.length}</span>
                                                </div>                  
                                              </div>
                                            </li>
                                          )
                                        }
                                      </ul>
                                  </div>
                                  <div className="tab-pane" id="blog_popular_posts">
                                     <ul className="c-content-recent-posts-1 hotarticle">
                                        {monthHotList.items.length > 0 &&
                                          monthHotList.items.map((item,i)=>
                                            <li key={item._id}>
                                              <div className="c-post">
                                                <a to={'/articles/doc/'+item._id} target="_blank"  style={{fontSize:'14px', fontWeight:'bold'}}>{item.title}</a>
                                                <div style={{fontSize:'12px'}}>
                                                  { customTime(item.created_at) }
                                                  <span title='收藏' style={{marginLeft:'10px'}}><i className={"fa fa-heart"} ></i>{item.collectCount}</span>
                                                  <span title='评论' style={{marginLeft:'10px'}}><i className={"fa fa-comment"}></i>{item.comments.length}</span>
                                                </div>
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
                    </div>

                    <div className="c-content-ver-nav">
                          <div className="c-content-title-1 c-theme c-title-md c-margin-t-40">
                              <h3 className="c-font-bold c-font-uppercase">精选社区</h3>
                              <div className="c-line-left c-theme-bg"></div>
                              <ul className="bbsul">
                                  <li className="bbsli">                                
                                    <a href="http://cnodejs.org/" target="_blank" title="CNode：Node.js中文社区">
                                      <img className="bbsimg" src={"https://dn-phphub.qbox.me/assets/images/friends/cnodejs.png"}/>
                                    </a>
                                  </li>

                                  <li className="bbsli">                                
                                    <a href="http://react-china.org/" target="_blank" title="React China中文社区">
                                      <img className="bbsimg" src={"http://react-china.org/uploads/default/38/c4b96a594bd352e0.png"}/>
                                    </a>
                                  </li>
                                  
                                  <li className="bbsli">
                                    <a title="Laravel China社区" href="http://phphub.org/" target="_blank">
                                      <img className="bbsimg" src={"//o4j806krb.qnssl.com/public/images/phphub-logo.png"}/>
                                    </a>
                                  </li>

                                  <li className="bbsli">
                                    <a title="Ruby China社区" target='_blank' href="https://ruby-china.org/">
                                      <img className="bbsimg" src={'//o4j806krb.qnssl.com/public/images/ruby-china-20150529.png'}/>
                                    </a>
                                  </li>

                                  <li className="bbsli">
                                    <a htitle="Golang 中国" ref="http://golangtc.com/" target="_blank">
                                      <img className="bbsimg" src={"//o4j806krb.qnssl.com/public/images/golangtc-logo.png"}/>
                                    </a>
                                  </li>
                                  <li className="bbsli">
                                    <a htitle="TesterHome 测试技术社区" href="https://testerhome.com/" target="_blank">
                                      <img className="bbsimg" src={"//dn-cnode.qbox.me/FjLUc7IJ2--DqS706etPQ1EGajxK"}/>
                                    </a>
                                  </li>
                                  <li className="bbsli">
                                    <a title="Ionic中文社区" href="http://ionichina.com/" target="_blank">
                                      <img className="bbsimg" src={"http://cms.csdnimg.cn/article/201312/16/52ae93a042fb3.jpg"}/>
                                    </a>
                                  </li>
                              </ul>
                          </div>  
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}