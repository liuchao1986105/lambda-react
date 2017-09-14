import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { limtPage, limitHot } from '../../config'
import ArticleList from '../../components/Article/article_list'
import HotArticle from '../../components/Article/hot_article'
import Tags from '../../components/Tags'
import Loding from '../../components/Loding'
import { saveCookie } from '../../utils/authService'
import Wxpub from '../../components/Wxpub'
import PayModal from '../../components/Modal/payModal'
import PayedModal from '../../components/Modal/payedModal'
import './topic.scss'

const mapStateToProps = state =>{
  return {
    globalVal: state.globalVal.toJS(),
    topicDetail: state.topicDetail.toJS(),
    tagList: state.tagList.toJS(),
    articleList: state.articleList.toJS(),
    videoList: state.videoList.toJS(),
    bookList: state.bookList.toJS(),
    hotDocList: state.hotDocList.toJS(),
    hotVideoList: state.hotVideoList.toJS(),
    auth: state.auth.toJS()
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)

export default class Topics extends Component {
  constructor(props){
    super(props)
    this.state = {
      article_page: 1,
      video_page: 1,
      book_page: 1,
      tagoption: {},
      isSearch:false,
      tagId: '',
      firstLoad: true
    }
  }

  static propTypes = {
    topicDetail: PropTypes.object.isRequired,
    articleList: PropTypes.object.isRequired,
    videoList: PropTypes.object.isRequired,
    bookList: PropTypes.object.isRequired,
    hotDocList: PropTypes.object.isRequired,
    hotVideoList: PropTypes.object.isRequired,
    globalVal: PropTypes.object.isRequired,
    tagList: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  static fetchData({id}){
    if(id && id != "undefined"){
      return [
        Actions.getIndexImage(), 
        Actions.getTopicDetail(id), 
        Actions.getArticleList(false, {page: 1, limit: limtPage,topicId: id, type:'doc'}), 
        Actions.getVideoList(false, {page: 1, limit: limtPage,topicId: id, type:'video'}),
        Actions.getBookList(false, {page: 1, limit: limtPage,topicId: id, type:'book'}),
        Actions.getHotVideoList(false, {page: 1, limit: limitHot, type:'video', recommend: 'hot'}),
        Actions.getHotDocList(false, {page: 1, limit: limitHot, type:'doc', recommend: 'hot'}),
        Actions.getTagList({type:'article',topicId: id})
      ]
    }
   
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.params.id !== this.props.params.id){
      this.props.actions.getTopicDetail(nextProps.params.id)
      this.props.actions.getArticleList(false, {topicId: id, type:'doc'})
      this.props.actions.getVideoList(false, {topicId: id, type:'video'})
      this.props.actions.getBookList(false, {topicId: id, type:'book'})
    }
  }

  componentDidMount() {
    const { params: { id }, actions, topicDetail, auth } = this.props
    actions.getIndexImage()
    
    //if(!topicDetail._id || topicDetail._id!== id){
      if(id && id != "undefined"){
        actions.getTopicDetail(id)
        actions.getArticleList(false, {page: 1, limit: limtPage, topicId: id, type:'doc'})
        actions.getVideoList(false, {page: 1, limit: limtPage, topicId: id, type:'video'})
        actions.getBookList(false, {page: 1, limit: limtPage,topicId: id, type:'book'})
        actions.getHotVideoList(false, {page: 1, limit: limitHot, type:'video', recommend: 'hot'})
        actions.getHotDocList(false, {page: 1, limit: limitHot, type:'doc', recommend: 'hot'})
        actions.getTagList({type:'article',topicId: id})
      }
   // }
  }

  _collectTopic(){
    const {actions, topicDetail, params: { id }, auth} = this.props
    if(auth.token){
      if(!topicDetail.isLike){
        actions.toggleTopicLike(id, topicDetail.collect_count + 1)
      }else{
        actions.toggleTopicDeLike(id, topicDetail.collect_count - 1)
      }

    }else{
      saveCookie('returnUrl', '/topics/'+id)
      actions.toPage('/login')
    }
  }

  handleDocPageClick = (option) => {
    const { actions } = this.props
    const page = option.page
    this.setState({article_page: page })
    let articleoption = {page: page, limit: limtPage,topicId: this.props.params.id, type:'doc'}
    if(this.state.tagId){
      articleoption.tagId = this.state.tagId
    }
    actions.getArticleList(true, articleoption)
  };

  handleVideoPageClick = (option) => {
    const { actions } = this.props
    const page = option.page
    this.setState({video_page: page, firstLoad: false})
    let videooption = {page: page, limit: limtPage,topicId: this.props.params.id, type:'video'}
    if(this.state.tagId){
      videooption.tagId = this.state.tagId
    }
    actions.getVideoList(true, videooption)
  };

  handleBookPageClick = (option) => {
    const { actions } = this.props
    const page = option.page
    this.setState({book_page: page})
    let bookoption = {page: page, limit: limtPage,topicId: this.props.params.id, type:'book'}
    if(this.state.tagId){
      bookoption.tagId = this.state.tagId
    }
    actions.getVideoList(true, bookoption)
  };

  handleTagArticle = (option) =>{
    const { actions, params: { id } } = this.props
    //actions.changeOptions(option)
    $(ReactDOM.findDOMNode(this.refs.all_docs)).click()
    option.topicId = id
    option.type = 'doc'
    this.setState({
      tagoption:option,
      article_page:1,
      tagId: option.tagId
    })
    actions.getArticleList(false, option)
  }

  render() {
    const { globalVal:{indexImg}, params: { id }, actions, topicDetail, articleList, videoList, bookList, hotVideoList, hotDocList, tagList, auth } = this.props
    const backgroundImage = 'https://' + indexImg + '?imageslim';
    const banner_img = topicDetail.img + '?imageslim';
    document.title = topicDetail.title  ? (topicDetail.title + ' - Lambda') : 'Lambda';

    let isLike = false;
    let isPayed = false;
    if(auth.user){
      auth.user.collectedTopics.map(item=>{
        if(item.toString() === id){
          isLike = true
        }
      })
      if(auth.user.payedTopics){
        auth.user.payedTopics.map(item=>{
          if(item.toString() === id){
            isPayed = true
          }
        })
      }

    }

    return (

      <div className="c-layout-page">
        <div className="banner" style={{backgroundImage: `url(${backgroundImage})`}}>
            <img
              className="avatar"
              src={banner_img}
            />
            <span className="topicTitle" >{topicDetail.title}</span>
            
            <div className="payDiv">                           
            <a href="javascript:;" style={{marginTop:'10px'}} onClick={this._collectTopic.bind(this)}  className="cbp-l-loadMore-link btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase">
              <span className="cbp-l-loadMore-defaultText" style={{color:'#fff'}}>{topicDetail.collect_count} 关注者 
                <span style={{marginRight:'10px',marginLeft:'10px'}}>|</span>
                <span style={{fontWeight:'bold',fontSize:'20px'}}>{(isLike) ?<span><i className="fa fa-check"></i>已关注</span>:'+关注'}</span>
              </span>
            </a>
            {!isPayed ?
              <PayModal actions={actions} auth={auth} topic={topicDetail}  topic_sns={topicDetail.sns} topic_id={id} topic_tburl={topicDetail.tburl} topic_title={topicDetail.title} price={'¥ '+ (topicDetail.price ? topicDetail.price: 0) +'.00'}></PayModal>
              :
              <PayedModal topic={topicDetail} ></PayedModal>
            }
            </div>
        </div>
        <div className="c-content-box c-size-md">
          <div className="container">
              <div className="row">
                  <div className="col-md-8">
                    <div>
                      <div className="c-content-tab-1 c-theme c-margin-t-30">
                        <ul className="nav nav-tabs nav-justified">
                            <li className="active">
                                <a href="#blog_popular_posts" data-toggle="tab"><h4 className="c-font-bold">视频教程</h4></a>
                            </li>
                            <li >
                                <a href="#blog_all_posts" ref="all_docs" data-toggle="tab"><h4 className="c-font-bold">文章</h4></a>
                            </li>

                            <li>
                                <a href="#book_posts" data-toggle="tab"><h4 className="c-font-bold">书籍</h4></a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active" id="blog_popular_posts">
                              { (videoList.isFetching && this.state.firstLoad) 
                                 ?
                                <Loding/>
                                :
                                <ArticleList location={location} auth={auth} actions={actions} handleArticle={this.handleVideoPageClick.bind(this)} current_page={this.state.video_page} banner_img={banner_img} objectList={videoList}/>
                              }
                            </div>
                            <div className="tab-pane" id="blog_all_posts">
                              {!articleList.isFetching &&
                                 <ArticleList  location={location} auth={auth} actions={actions} handleArticle={this.handleDocPageClick.bind(this)} current_page={this.state.article_page} banner_img={banner_img} objectList={articleList}/>
                              }
                            </div>
                            <div className="tab-pane" id="book_posts">
                              {!bookList.isFetching &&
                                 <ArticleList location={location} auth={auth} actions={actions} handleArticle={this.handleBookPageClick.bind(this)} current_page={this.state.book_page} banner_img={banner_img} objectList={bookList}/>
                              }
                              
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-1">
                  </div>
                  <div className="col-md-3">
                      {/*<div className="c-content-ver-nav">
                          <div className="c-content-title-1 c-theme c-title-md c-margin-t-40">
                              <h3 className="c-font-bold c-font-uppercase">
                                知识图谱&nbsp; 
                                <a href="#"><i className="fa fa-arrow-circle-right"></i></a>
                              </h3>
                              <div className="c-line-left c-theme-bg"></div>
                          </div>
                      </div>*/}
                      <div className="c-content-ver-nav">
                          <div className="c-content-title-1 c-theme c-title-md c-margin-t-40">
                              <h3 className="c-font-bold c-font-uppercase">知识点</h3>
                              <div className="c-line-left c-theme-bg"></div>
                          </div>
                          <Tags tagList={tagList.items} tagStyle={{textAlign:'left'}} options={this.state.tagoption} changeSort={this.handleTagArticle.bind(this)} />
                      </div>

                      <HotArticle actions={actions} hotlist={hotVideoList} title={'热门视频教程'}/>
                      <HotArticle actions={actions} hotlist={hotDocList} title={'热门文章'}/>
                  </div>
              </div>
          </div>
        </div>
        <Wxpub actions={actions}/>
      </div>

    )
  }
}