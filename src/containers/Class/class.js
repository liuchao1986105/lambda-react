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
import './class.scss'
import '../Articles/article.scss'

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
      Actions.getArticleDetail(id, {from: 'front'}),
      Actions.getCommentList(false, {page: 1, limit: limtPage, articleId: id})
    ]
  }

  componentDidMount() {
    const { params: { id }, actions, articleDetail, auth } = this.props
    //if(!articleDetail._id || articleDetail._id !== id){
      this.fetchArticleData(id)
    //}
    
  }

  fetchArticleData(id){
    const { actions} = this.props
    if(id){
      //获取文章详情
      actions.getArticleDetail(id, {from: 'front'})
      //获取评论
      actions.getCommentList(false, {page: 1, limit: limtPage, articleId: id})
    }
  }

  toLogin(){
    const {actions, params: { id }} = this.props
    saveCookie('returnUrl', '/articles/class/'+id)
    actions.toPage('/login')
  }

  toPay(url){
    window.open('https://sns.io/sell/' + url)
  }



  render() {
    const { articleDetail, auth, commentList, actions, location, params: { id } } = this.props
    document.title = articleDetail.title  ? articleDetail.title + ' - Lambda' : 'Lambda';
    const modal = (<Modal title="扫码付款">
                    <div id="QR" style={{display:'block'}}>
                        <div style={{color:'red'}}>支付后请联系Lambda，并附上留言：'注册用户名+课程名'</div>
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
                    <div className="c-content-blog-post-1">
                        <div className="c-content-box c-overflow-hide c-bg-white" style={{marginTop:'30px'}}>
                            <div>
                                <div className="c-shop-product-details-2">
                                    <div className="row">
                                        <div className="col-md-6">
                                          <div className="classTitleimg" style={{backgroundImage: `url(${articleDetail.classImg})`}}>
                                          {
                                            (articleDetail.classPeople == articleDetail.classJoined) ?
                                            <span className="stateSpan">众筹成功</span>
                                            :
                                            <span className="stateSpan">正在众筹中</span>
                                          }
                                          </div>

                                        </div>
                                        <div className="col-md-6">
                                            <div className="c-product-meta">
                                                <div className="c-content-title-1">
                                                    <h3 className="c-font-bold">{articleDetail.title}</h3>
                                                    <div className="c-line-left"></div>
                                                </div>

                                                <div className="c-product-review">
                                                    <div className="c-product-rating">
                                                        <span style={{color:'red', fontWeight:'bold'}}>{'¥ '+ (articleDetail.price ? articleDetail.price: 0) +'.00'}</span>
                                                    </div>
                                                    <div className="c-product-rating" style={{marginLeft:'15px'}} >
                                                        <i className="fa fa-star c-font-black"></i>
                                                        <i className="fa fa-star c-font-black"></i>
                                                        <i className="fa fa-star c-font-black"></i>
                                                        <i className="fa fa-star c-font-black"></i>
                                                        <i className="fa fa-star-half-o c-font-black"></i>
                                                    </div>
                                                    <div className="c-product-write-review">
                                                        <ShareButtons 
                                                          sites={["wechat", "weibo", "qq"]}
                                                          url = {HOST + location.pathname}
                                                          title = {articleDetail.title}
                                                          description = {articleDetail.title}
                                                        />
                                                        {/*<button className="btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase"><i className="fa fa-pencil fa-fw"></i>写笔记</button>*/}
                                                    </div>
                                                </div>
                                                <div className="c-product-short-desc"> {articleDetail.classDesc} </div>
                                                <div className="row c-product-variant">
                                                    <div className="col-sm-12 col-xs-12">
                                                        {/*<p className="c-product-meta-label c-product-margin-1 c-font-uppercase c-font-bold">目标金额: <span style={{color:'#32C5D2'}}>{articleDetail.price}元</span></p>*/}
                                                        <p className="c-product-meta-label c-product-margin-1 c-font-uppercase c-font-bold">已筹金额: <span style={{color:'#32C5D2'}}>{Math.ceil(articleDetail.price/articleDetail.classPeople) * articleDetail.classJoined}元</span></p>
                                                        <p className="c-product-meta-label c-product-margin-1 c-font-uppercase c-font-bold">目标人数: <span style={{color:'#32C5D2'}}>{articleDetail.classPeople}人</span></p>
                                                        <p className="c-product-meta-label c-product-margin-1 c-font-uppercase c-font-bold">已参与人数: <span style={{color:'#32C5D2'}}>{articleDetail.classJoined}人</span></p>
                                                        <p className="c-product-meta-label c-product-margin-1 c-font-uppercase c-font-bold">众筹价: <span style={{color:'#32C5D2'}}>{Math.ceil(articleDetail.price/articleDetail.classPeople)}元</span></p>
                                                        <p className="c-product-meta-label c-product-margin-1 c-font-uppercase c-font-bold">产品回报: <span style={{color:'#32C5D2'}}>众筹完成之后将以{Math.ceil(articleDetail.price/articleDetail.classPeople)}元售价在Lambda平台上进行出售；每售出一套，每个参与众筹者可获得{articleDetail.classRepay}%({Math.ceil(articleDetail.price/articleDetail.classPeople) * articleDetail.classRepay / 100}元)回报</span></p>
                                                    </div>
                                                </div>
                                                <div className="c-product-add-cart c-margin-t-20">
                                                    <div className="row">
                                                        <div className="col-sm-12 col-xs-12 c-margin-t-20">
                                                            {auth.token ? 
                                                                (articleDetail.classPeople == articleDetail.classJoined) ?
                                                                <button onClick={this.toPay.bind(this,articleDetail.url)} className="btn c-btn btn-lg c-font-bold c-font-white c-theme-btn c-btn-square c-font-uppercase">购买</button>
                                                                :
                                                                (<ModalTrigger modal={modal}>
                                                                    <Button className="btn c-btn btn-lg c-font-bold c-font-white c-theme-btn c-btn-square c-font-uppercase">参与众筹</Button>
                                                                </ModalTrigger>)
                                                                :
                                                                <button onClick={this.toLogin.bind(this)} className="btn c-btn btn-lg c-font-bold c-font-white c-theme-btn c-btn-square c-font-uppercase">参与众筹</button>
                                                            } 
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="c-content-box c-size-md">
                          <div className="c-desc">
                            <div className="markdown-content" dangerouslySetInnerHTML={{__html: articleDetail.description}} />
                          </div>
                        </div>
                        
                        <Comment commentList={commentList} auth={auth}
                          article_id={id}
                          authorId={articleDetail.authorId && articleDetail.authorId._id.toString()}
                          commentNum={articleDetail.comments ? articleDetail.comments.length : 0}
                          actions={actions} />
                    </div>
                </div>
            </div>
      </div>
    )   
  }
}