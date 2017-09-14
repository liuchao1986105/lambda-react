import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import { ModalTrigger, Button, Modal } from 'amazeui-react';
import * as Actions from '../../actions'
import { formatDate } from '../../utils'
import { limtPage, HOST, qiniuImageUrl } from '../../config'
import Comment from '../../components/Article/comment'
import { Link } from 'react-router'
import ShareButtons from '../../components/ShareButtons'
import { saveCookie } from '../../utils/authService'
import './article.scss'

const mapStateToProps = state =>{
  return {                                                         
    articleDetail: state.articleDetail.toJS(),
    commentList: state.commentList.toJS(),
    auth: state.auth.toJS()
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)

export default class Articles extends Component {
  constructor(props){
    super(props);
  }

  static propTypes = {
    articleDetail: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    commentList: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    location: PropTypes.object
  }

  static fetchData({id}){
    return [
     // Actions.getArticleDetail(id, {from: 'front'}),
     // Actions.getCommentList(false, {page: 1, limit: 100000, articleId: id})
    ]
  }

  componentDidMount() {
    const { params: { id }, actions, articleDetail, auth } = this.props
    //if(!articleDetail._id || articleDetail._id !== id){
      this.fetchArticleData(id)
    //}
  }

  // componentWillReceiveProps(nextProps){
  //   if (nextProps.params.id !== this.props.params.id){
  //     this.fetchArticleData(nextProps.params.id)
  //   }
  // }

  fetchArticleData(id){

    const { actions} = this.props
    if(id){
      //获取文章详情
      actions.getArticleDetail(id, {from: 'front'})
      //获取评论
      actions.getCommentList(false, {page: 1, limit: 100000, articleId: id})
    }
  }

  toggleLike(){
    const {actions, articleDetail,  params: { id }, auth} = this.props

    if(auth.token){
      if(!articleDetail.isLike){
        actions.toggleArticleLike(id, articleDetail.collect_count + 1)
      }else{
        actions.toggleArticleDeLike(id, articleDetail.collect_count - 1)
      }
    }else{
      saveCookie('returnUrl', '/articles/doc/'+id)
      actions.toPage('/login')
    }
  }

  toPay(sns){
    window.open('https://sns.io/sell/' + sns)
  }

  editArticle(id){
    this.props.actions.toPage('/post/edit/' +id)
  }


  render() {
    const { articleDetail, auth, commentList, actions, location, params: { id } } = this.props
    document.title = articleDetail.title  ? (articleDetail.title + ' - Lambda') : 'Lambda - 程序员学习社区'
    let isLike = false
    //let isExpired = false
    if(auth.user){
      auth.user.collectedArticles.map(item=>{
        if(item.toString() === id){
          isLike = true
        }
      })
    }

    let price;
    console.log("articleDetail:"+JSON.stringify(articleDetail))
    if(articleDetail.single){
      price = articleDetail ? articleDetail.price : ''
    }else{
      price = articleDetail.topicId ? articleDetail.topicId.price : ''
    }

    let isShowBaidu = auth.user && auth.user.isPayed;

    // if(auth.user){
    //   isExpired = (moment().diff(moment(auth.user.payTime), 'years') >= 1 ) ? true : false
    // }
    const modal = (<Modal title="扫码付款">
                <div id="QR" style={{display:'block'}}>
                    <div style={{color:'red'}}>支付后请联系Lambda，并附上购买的视频名称的留言</div>
                    <div style={{color:'red'}}>(QQ:32571992,微信:liuchao1986105)</div>
                    
                    <div id="wechat" style={{display: 'inline-block'}}>
                        <img id="wechat_qr" src={( qiniuImageUrl + 'wx_class.png')}/>
                        <p>微信付款</p>
                    </div>
                    <div id="alipay" style={{display: 'inline-block'}}>
                        <img id="alipay_qr" src={(qiniuImageUrl + 'alipay_class.png')}/>
                        <p>支付宝付款</p>
                    </div>
                </div>
            </Modal>)

    return (
      <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="c-content-blog-post-1-view">
                        <div className="c-content-blog-post-1">
                            <div className="c-title c-font-bold article_title">
                                {articleDetail.title}
                                <ShareButtons 
                                  sites={["wechat", "weibo", "qq"]}
                                  url = {HOST + location.pathname}
                                  title = {articleDetail.title}
                                  description = {articleDetail.title}
                                />
                            </div>
                            
                            <div className="c-panel c-margin-b-30">
                                <div className="c-author">
                                    <Link to={'/users/'+(articleDetail.authorId && articleDetail.authorId._id)}>
                                        <span>{articleDetail.authorId ? articleDetail.authorId.name : ''}</span>
                                    </Link>
                                </div>
                                <div className="c-date">
                                    <span>{articleDetail.created_at ? formatDate(articleDetail.created_at) : ''}</span>
                                </div>
                                
                                <ul className="c-tags c-theme-ul-bg">
                                    {/*
                                      articleDetail.tags && 
                                      articleDetail.tags.map((tag,i)=>
                                        <li key={i}>{tag.name}</li>
                                      )
                                      */}
                                      {
                                        articleDetail.topicId &&
                                        (<li>
                                          <Link to={`/topics/${ articleDetail.topicId._id}`}><span className="doctags">{articleDetail.topicId.title}</span></Link>
                                        </li>)
                                      }
                                </ul>
                                <div className="c-comments">
                                  {
                                    (auth.user && articleDetail.type == 'post' && articleDetail.authorId && articleDetail.authorId.name == auth.user.name) &&
                                    (<a href="javascript:;" onClick={this.editArticle.bind(this, articleDetail._id)} title='编辑' style={{marginRight:'10px'}}>
                                      <span className="am-icon-pencil-square-o"></span>
                                    </a>)
                                  }
                                  
                                  <a href="javascript:;" onClick={this.toggleLike.bind(this)} title= {(articleDetail.isLike) ? '取消收藏' : '收藏' }>
                                    <i className={"fa fa-heart " + (isLike && 'c-font-red')} style={{position:'static'}}></i> {articleDetail.collect_count}
                                  </a>

                                </div>
                            </div>
                            { (articleDetail.type != 'video' )?
                              <div className="c-desc">
                              {((articleDetail.type != 'blog') && (articleDetail.type != 'post') && (articleDetail.type != 'book')) &&
                                (articleDetail.type &&
                                 <div className="cbp-l-loadMore-button" style={{marginBottom:'25px'}}>
                                  <a target='_blank' href={articleDetail.shareurl} className="cbp-l-loadMore-link btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase">阅读原文</a>
                                </div>)
                              }
                              
                                <div className="markdown-content" dangerouslySetInnerHTML={{__html: articleDetail.description}} />
                                {(articleDetail.type == 'book') &&
                                (<div className="payDiv">
                                  <div>
                                    如有需要，请加入微信公众号获取
                                  </div>
                                    <div id="QR" style={{display:'block'}}>
                                      <div id="wechat" style={{display: 'inline-block'}}>
                                          <img id="wechat_qr" src={(qiniuImageUrl + 'Lambda.jpg')}/>
                                      </div>
                                    </div>
                                </div>)
                              }
                              </div>
                              :
                              <div className="c-desc">
                                <div className='pay_button'>
                                  {articleDetail.single 
                                  ?
                                  <button type="button" onClick={this.toPay.bind(this, articleDetail.url)} className="btn c-btn btn-lg c-font-bold c-font-white c-theme-btn c-btn-square c-font-uppercase">购买</button>
                                   :
                                  <button type="button" onClick={this.toPay.bind(this, articleDetail.topicId.sns)} className="btn c-btn btn-lg c-font-bold c-font-white c-theme-btn c-btn-square c-font-uppercase">购买</button>
                                  }
                                  {/*<ModalTrigger modal={modal}>
                                    <Button className="btn c-btn btn-lg c-font-bold c-font-white c-theme-btn c-btn-square c-font-uppercase">{price}元 购买</Button>
                                  </ModalTrigger>*/}
                                </div>
                                <div className="markdown-content" dangerouslySetInnerHTML={{__html: articleDetail.description}} />
                              </div>
                            }

                            <Comment commentList={commentList} auth={auth}
                              article_id={id}
                              authorId={articleDetail.authorId && articleDetail.authorId._id.toString()}
                              commentNum={articleDetail.comments ? articleDetail.comments.length : 0}
                              actions={actions} />
                        </div>
                    </div>
                </div>
            </div>
      </div>
    )
  }
}