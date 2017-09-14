import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as Actions from '../../actions'
import { saveCookie } from '../../utils/authService'
import { qiniuImageUrl, headBgUrl} from '../../config'
import Wxpub from '../../components/Wxpub'
import "../../components/Header/header.scss"
import './tour.scss'

const mapStateToProps = state =>{
  return {
    globalVal: state.globalVal.toJS(),
    auth: state.auth.toJS(),
    options: state.options.toJS(),
    topicList: state.topicList.toJS(),
    hotVideoList: state.hotVideoList.toJS(),
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)

export default class Tour extends Component {
  constructor(props){
    super(props);
    this.state = {
        isToPay: false
    }
  }

  static propTypes = {
    globalVal: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    topicList: PropTypes.object.isRequired,
    hotVideoList: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  }

  static fetchData(params){
    return [
        Actions.getHotVideoList(false, {page: 1, limit: 1, type:'video'}),
        Actions.getTopicList(false,{page: 1, limit: 1})
    ]
  }

  componentWillReceiveProps(nextProps){
  }

  componentDidMount() {
    const { actions } = this.props
    actions.getHotVideoList(false, {page: 1, limit: 1, type:'video'})
    actions.getTopicList(false,{page: 1, limit: 1})
  }

  toPay(){
    // if(this.props.auth.token){
    //     this.setState({
    //         isToPay : !this.state.isToPay
    //     })
    // }else{
    //   saveCookie('returnUrl', '/tour')
    //   this.props.actions.toPage('/login')
    // }
    window.open('https://sns.io/sell/4CUXZ1DH')
  }

  _toSignup(){
    this.props.actions.toPage('/signup')
  }

  render() {
    const { hotVideoList, topicList, auth, actions } = this.props

    const article = hotVideoList.items[0]
    const topic = topicList.items[0]

    document.title=  'Lambda - 程序员学习社区'
    return (
      <div>
        <div className="bgimg" style={{backgroundImage: `url(${headBgUrl})`}}>
          <div className="am-container">
            <h1 className="am-animation-slide-right">成为更好的自己</h1>
            <h2 className="am-animation-scale-up">程序员的学习社区</h2>
            {!(auth.token) &&  
              <button type="button" onClick={this._toSignup.bind(this)} className="am-btn am-btn-secondary am-radius am-animation-slide-bottom">    
                <a href="javascript:;">
                   <b style={{color: '#ffffff'}}>注册</b>
                </a>
              </button>
            }
          </div>
        </div>
        <div className="c-content-box c-size-md">
                <div className="container">
                    <div className="c-content-feature-2-grid" data-auto-height="true" data-mode="base-height">
                        <div className="c-content-title-1">
                            <h3 className="c-font-uppercase c-center c-font-bold">基础服务</h3>
                            <div className="c-line-center"></div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-sm-6">
                                <div className="c-content-feature-2" data-height="height">
                                    <div className="c-icon-wrapper">
                                        <div className="c-content-line-icon c-theme c-icon-screen-chart"></div>
                                    </div>
                                    <h3 className="c-font-uppercase c-font-bold c-title">资源学习</h3>
                                    <p>视频分享、文章精选、PDF书籍下载，找到你想学习的技术知识</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="c-content-feature-2" data-height="height">
                                    <div className="c-icon-wrapper">
                                        <div className="c-content-line-icon c-theme c-icon-support"></div>
                                    </div>
                                    <h3 className="c-font-uppercase c-font-bold c-title">移动应用</h3>
                                    <p>移动端应用，随时随地查看最新的资源</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <div className="c-content-feature-2" data-height="height">
                                    <div className="c-icon-wrapper">
                                        <div className="c-content-line-icon c-theme c-icon-comment"></div>
                                    </div>
                                    <h3 className="c-font-uppercase c-font-bold c-title">现金激励</h3>
                                    <p>邀请好友加入社区并支付成为会员，将获得10元/人的现金奖励</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                {/*<div className="c-content-feature-2" data-wow-delay1="2s" data-height="height">
                                    <div className="c-icon-wrapper">
                                        <div className="c-content-line-icon c-theme c-icon-bulb"></div>
                                    </div>
                                    <h3 className="c-font-uppercase c-font-bold c-title">学习列表</h3>
                                    <p>将选中的课程加入学习列表，记录学习笔记</p>
                                </div>*/}
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <div className="c-content-v-center c-theme-bg wow bounceInUp" data-wow-delay1="2s" data-height="height">
                                    <div className="c-wrapper">
                                        <div className="c-body c-padding-20 c-center">
                                            <h3 className="c-font-19 c-line-height-28 c-font-uppercase c-font-white c-font-bold"> 为程序员提供最想要的服务</h3>
                                            <h3 className="c-font-19 c-line-height-28 c-font-uppercase c-font-white c-font-bold"> 技术博客订阅 </h3>
                                            <h3 className="c-font-19 c-line-height-28 c-font-uppercase c-font-white c-font-bold"> 学习进度看板 </h3>
                                            <h3 className="c-font-19 c-line-height-28 c-font-uppercase c-font-white c-font-bold"> L币 - 商城 </h3>
                                            <h3 className="c-font-19 c-line-height-28 c-font-uppercase c-font-white c-font-bold"> 未完，待续。。。</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                {/*<div className="c-content-feature-2" data-wow-delay1="2s" data-height="height">
                                    <div className="c-icon-wrapper">
                                        <div className="c-content-line-icon c-theme c-icon-globe"></div>
                                    </div>
                                    <h3 className="c-font-uppercase c-font-bold c-title">克服学习的拖延症</h3>
                                    <p>学习没有捷径</p>
                                </div>*/}
                            </div>
                        </div>
                    </div>
                </div>
        </div>

        <div className="c-content-box c-size-md c-bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="c-content-title-1 c-margin-b-60">
                                <h3 className="c-center c-font-uppercase c-font-bold"> 开始您的学习路程</h3>
                                <div className="c-line-center"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-sm-6 wow animate fadeInLeft">
                            <div className="c-content-step-1 c-opt-1">
                                <div className="c-icon">
                                    <span className="c-hr c-hr-first">
                                        <span className="c-content-line-icon c-icon-14 c-theme"></span>
                                    </span>
                                </div>
                                <div className="c-title c-font-20 c-font-bold c-font-uppercase">1. 浏览</div>
                                <div className="c-description c-font-17"> 进入专题或社区找到你想要的视频、文章、书籍资源 </div>
                                <Link className="btn c-btn-square c-theme-btn c-btn-border1-2x c-btn-uppercase c-btn-bold" to={'/'}><span>开始遨游</span></Link>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 wow animate fadeInLeft" data-wow-delay="0.2s">
                            <div className="c-content-step-1 c-opt-1">
                                <div className="c-icon">
                                    <span className="c-hr">
                                        <span className="c-content-line-icon c-icon-21 c-theme"></span>
                                    </span>
                                </div>
                                <div className="c-title c-font-20 c-font-bold c-font-uppercase">2. 关注专题</div>
                                <div className="c-description c-font-17"> 关注想学习的专题，系统会向您推送最新的学习资源</div>
                                <Link className="btn c-btn-square c-theme-btn c-btn-border1-2x c-btn-bold" to={topic ? ('/topics/'+topic._id) : ''}><span>{topic ? topic.title : ''}</span></Link>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12 wow animate fadeInLeft" data-wow-delay="0.4s">
                            <div className="c-content-step-1 c-opt-1">
                                <div className="c-icon">
                                    <span className="c-hr c-hr-last">
                                        <span className="c-content-line-icon c-icon-32 c-theme"></span>
                                    </span>
                                </div>
                                <div className="c-title c-font-20 c-font-bold c-font-uppercase">3. 收藏</div>
                                <div className="c-description c-font-17"> 收藏感兴趣的视频、文章、书籍，每天进步一点点</div>
                                <Link className="btn c-btn-square c-theme-btn c-btn-border1-2x c-btn-bold" to={article ? ('/articles/doc/'+article._id) : ''}><span>{article ? article.title : ''}</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
        </div>

        <div className="c-content-box c-size-md c-bg-white" id='payLambda' style={{paddingTop:'0px'}}>
            <div className="container">
                <div className="c-content-pricing-1 c-option-2">
                    <div className="c-content-title-1">
                        <h3 className="c-center c-font-uppercase c-font-bold">购买服务</h3>
                        <div className="c-line-center"></div>
                    </div>
                    <div className="c-content-title-1 c-tile-container">
                        <div className="col-md-4 col-sm-4">
                        </div>
                        <div className="c-tile c-theme-bg  c-bordered c-theme-border c-highlight">
                            <p className="c-price" style={{color:'#fff'}}>50
                                <sup style={{color:'#fff'}}><i className="fa fa-cny"></i>{/*<span className='buyTile'> / 年</span>*/}</sup>
                            </p>
                            <p className="c-font-uppercase">50元获得网站内除<span style={{color:'red'}}>"单售"</span>之外的所有视频资源</p>
                            <p className="c-font-uppercase">(付款成功后自动返回视频资源的链接)</p>
                            {/*<p className="c-font-uppercase">2.评论文章/投稿可获得L币, 当会员过期如若再次购买,5000L币可免费续费</p>*/}
                            {/*<p className="c-font-uppercase">3.若购买<Link style={{color:'red',fontWight:'bold',fontSize:'20px'}}  to='/class'>实战</Link>板块课程，在原有价格上优惠<span style={{fontWight:'bold',color:'red',fontSize:'20px'}}>59</span>元</p>*/}
                            <button type="button" onClick={this.toPay.bind(this)} className="btn btn-md c-btn-square c-btn-border-2x c-btn-white c-btn-uppercase c-btn-bold">购买</button>
                        </div>
                        <div className="col-md-4 col-sm-12">
                        </div>
                    </div>
                </div>
            </div>
          {
            this.state.isToPay &&
            <div>
               <div style={{color:'red',textAlign:'center',marginTop:'15px'}} >
                    支付后请联系Lambda
                </div>
                <div style={{color:'red',textAlign:'center'}}>
                    (QQ:32571992,微信:liuchao1986105)
                </div>
               <div className="payDiv">
                
                {/*<div id="QR" style={{display:'block'}}>
                  <div id="wechat" style={{display: 'inline-block'}}>
                      <img id="wechat_qr" src={(qiniuImageUrl + '30_weixin.png')}/>
                    <p>微信付款</p>
                  </div>
                  <div id="alipay" style={{display: 'inline-block'}}>
                      <img id="alipay_qr" src={(qiniuImageUrl + '30_taobao.png')}/>
                    <p>支付宝付款</p>
                  </div>
                </div>*/}
                <div className="snspay-content" data-hashid="K05YWPQW"></div>
                </div>
            </div>

          }
          
        </div>


        {/*<div className="c-content-box c-size-md c-bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="c-content-title-1 c-margin-b-60">
                                <h3 className="c-center c-font-uppercase c-font-bold"> 为什么选择Lambda </h3>
                                <div className="c-line-center"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="c-content-pricing-1 c-opt-2" >
                            <div className="col-md-3 c-sm-hidden">
                                <div className="c-content c-column-odd c-padding-adjustment" >
                                    <div className="c-row c-font-20 c-align-left">&nbsp;</div>
                                    <div className="c-row c-title c-font-17" style={{height:'100px',color:'#5C6873'}}>视频资源</div>
                                    <div className="c-row c-title c-font-17" style={{color:'#5C6873'}}>PDF书籍下载</div>
                                    <div className="c-row c-title c-font-17" style={{height:'120px',color:'#5C6873'}}>平台内容</div>
                                    <div className="c-row c-title c-font-17" style={{color:'#5C6873'}}>费用</div>
                                    <div className="c-row c-empty">&nbsp;</div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-4">
                                <div className="c-content c-column-even c-padding-adjustment">
                                    <div className="c-row c-font-20" style={{color:'#525E64'}}>极客学院</div>
                                    <div className="c-row c-font-17" style={{height:'100px',color:'#5C6873'}}> 课程零散,不系统,有拼凑起来的感觉
                                    </div>
                                    <div className="c-row c-font-17" style={{color:'#5C6873'}}>不支持书籍下载
                                    </div>
                                    <div className="c-row c-font-17" style={{height:'120px',color:'#5C6873'}}>收费课程(260元/年);实战课程,收费偏高;缺少最新技术的资源
                                    </div>
                                    <div className="c-row c-font-17" style={{color:'#5C6873'}}>260元/年
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-4">
                                <div className="c-content c-column-odd c-padding-adjustment">
                                    <div className="c-row c-font-20" style={{color:'#525E64'}}>慕课网</div>
                                    <div className="c-row c-font-17" style={{height:'100px',color:'#5C6873'}}>课程零散,有些课程过于基础
                                    </div>
                                    <div className="c-row c-font-17" style={{color:'#5C6873'}}>不支持书籍下载
                                    </div>
                                    <div className="c-row c-font-17" style={{height:'120px',color:'#5C6873'}}>免费课程过于基础，时长较短；缺少最新技术的资源
                                    </div>
                                    <div className="c-row c-font-17" style={{color:'#5C6873'}}>实战课程150元-600元不等
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-4">
                                <div className="c-content c-column-even c-padding-adjustment">
                                    <div className="c-row c-font-20" style={{color:'#525E64'}}>Lambda</div>
                                    <div className="c-row c-font-17" style={{height:'100px',color:'#5C6873'}}>每套课程由浅入深, 一套课程学完之后就可实战应用
                                    </div>
                                    <div className="c-row c-font-17" style={{color:'#5C6873'}}>支持书籍下载
                                    </div>
                                    <div className="c-row c-font-17" style={{height:'120px',color:'#5C6873'}}>按专题分类，有独立的视频/精选文章/PDF书籍，可系统学习；专注最新技术的资源
                                    </div>
                                    <div className="c-row c-font-17" style={{color:'#5C6873'}}>全部视频99元
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>*/}


        {/*<div className="c-content-box c-size-md c-bg-white">
                <div className="container">
                    <div className="c-content-counter-1 c-opt-1">
                        <div className="c-content-title-1">
                            <h3 className="c-center c-font-uppercase c-font-bold">学习资源</h3>
                            <div className="c-line-center"></div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="c-counter c-theme-border c-font-bold c-theme-font" data-counter="counterup">500</div>
                                <h4 className="c-title c-first c-font-uppercase c-font-bold">视频</h4>
                            </div>
                            <div className="col-md-4">
                                <div className="c-counter c-theme-border c-font-bold c-theme-font" data-counter="counterup">200</div>
                                <h4 className="c-title c-font-uppercase c-font-bold">精品文章</h4>
                            </div>
                            <div className="col-md-4">
                                <div className="c-counter c-theme-border c-font-bold c-theme-font" data-counter="counterup">99</div>
                                <h4 className="c-title c-font-uppercase c-font-bold">精品书籍</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>*/}
            <Wxpub actions={actions}/>
      </div>
    )
  }
}