import React,{Component,PropTypes} from 'react'
import {Modal, ModalTrigger, Button} from 'amazeui-react';
import { qiniuImageUrl, passpay } from '../../config'
import { saveCookie } from '../../utils/authService'
import { md5, randomString} from '../../utils'
import querystring from 'querystring';
import axios from 'axios'


export default class PayModal extends Component{
  constructor(props){
    super(props)
    this.state = {
      pay_type: 'code',
      code_tab: true,
      coin_tab: false,
      taobao_tab: false
    }
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object,
    topic: PropTypes.object,
    topic_id: PropTypes.string,
    price: PropTypes.string,
    topic_title: PropTypes.string,
    topic_tburl: PropTypes.string,
    topic_sns: PropTypes.string,
  }

  toPay(){
    const {actions, topic_id} = this.props
    saveCookie('returnUrl', '/topics/'+topic_id)
    actions.toPage('/login')
  }

  changePayType(type){
    this.setState({
      pay_type: type,
    })
    if(type=='coin'){
      this.setState({
        coin_tab: true,
        code_tab: false,
        taobao_tab: false
      })
    }else if(type=='code'){
      this.setState({
        coin_tab: false,
        code_tab: true,
        taobao_tab: false
      })
    }else{
      this.setState({
        coin_tab: false,
        code_tab: false,
        taobao_tab: true
      })
    }
  }

  toChangeTopic(){
    const {actions, auth, topic_id} = this.props
    if(auth.token){
      if(auth.user.score < 200){
        actions.showMsg('L币不足，请分享资源以获取L币')
      }else{
        let payedTopics = auth.user.payedTopics
        payedTopics.push(topic_id)

        let values = {
          payedTopics: payedTopics,
          score: auth.user.score - 200
        }
        actions.updateUser(auth.user._id, values)
         //window.location.href=''
      }
    }else{
      saveCookie('returnUrl', '/topics/'+topic_id)
      actions.toPage('/login')
    }
    
  }

  toPayOrder(){
    const {actions, auth, topic, topic_id} = this.props
    if(auth.token){
      const order = {
        subject:topic.title,
        type:'lambda',
        total_fee:topic.price,
      }
      actions.addOrder(order)

        //调用支付接口
        const order_id = randomString(); //'5960e4008c0578d4562f4192';
        console.log("order_id:"+order_id);
        let body = {
          body: 'pay',
          notify_url: 'https://www.lambda-study.com/orders/notify',
          out_order_no: order_id,
          partner: passpay.partner,
          return_url:'https://www.lambda-study.com/orders/return',
          subject: topic.title,
          total_fee: topic.price,
          user_seller: passpay.user_seller,
        }

        let prestr = querystring.stringify(body);
         console.log("prestr:"+prestr)

        const sign = md5(prestr + passpay.key)
        body.sign = sign;

        console.log("sign:"+sign)
        body.http_referer = 'www.lambda-study.com'

        axios.post(passpay.request_url, body)
        .then(function (response) {
          console.log("response:"+response);
        })
        .catch(function (error) {
          console.log("error:"+error);
        });
    }else{
      saveCookie('returnUrl', '/topics/'+topic_id)
      actions.toPage('/login')
    }
  }

  render(){
    const { auth, price, topic_title, topic_tburl, topic_sns, topic} = this.props
    let isShowBaidu = auth.user && auth.user.isPayed;

    const modal = (<Modal title="购买">
                    <div className="c-content-tab-1 c-theme">
                          <div className="nav-justified">
                              <ul className="nav nav-tabs nav-justified">
                                  <li className={this.state.code_tab && "active"}>
                                      <a href="#blog_recent_posts" data-toggle="tab" onClick={this.changePayType.bind(this,'code')}>扫码付款</a>
                                  </li>
                                  {/*<li className={this.state.taobao_tab && "active"}>
                                      <a href="#blog_taobao_posts" data-toggle="tab" onClick={this.changePayType.bind(this,'taobao')}>淘宝店铺</a>
                                  </li>*/}
                                  <li className={this.state.coin_tab && "active"}>
                                      <a href="#blog_popular_posts" data-toggle="tab" onClick={this.changePayType.bind(this,'coin')}>L币兑换</a>
                                  </li>
                              </ul>
                              <div className="tab-content">
                                  <div className="tab-pane active" id="blog_recent_posts">
                                      {this.state.pay_type == 'code' &&
                                        (
                                          <div id="QR" style={{display:'block'}}>
                                            {/*<div style={{color:'red'}}>支付后请联系Lambda</div>
                                            <div style={{color:'red'}}>(QQ:32571992,微信:liuchao1986105)</div>
                                            
                                            <div id="wechat" style={{display: 'inline-block'}}>
                                                <img id="wechat_qr" src={( qiniuImageUrl + 'wx_class.png')}/>
                                                <p>微信付款</p>
                                            </div>
                                            <div id="alipay" style={{display: 'inline-block'}}>
                                                <img id="alipay_qr" src={(qiniuImageUrl + 'alipay_class.png')}/>
                                                <p>支付宝付款</p>
                                            </div>*/}
                                            {/*<div style={{display:'block'}}>
                                              <div style={{margin:'20px 20px'}}>点击<a href='javascript:;' onClick={this.toPayOrder.bind(this, topic)} target='_blank' style={{color:"#38C5D2"}}><strong>支付</strong></a>，自动获取{topic_title}的百度网盘链接</div>
                                              
                                            </div>*/}
                                            <div style={{margin:'20px 20px'}}>点击<a href={`https://sns.io/sell/${topic_sns}`}  target='_blank' style={{color:"#38C5D2"}}><strong>扫码支付</strong></a>，自动获取{topic_title}的百度网盘链接</div>
                                            
                                          </div>
                                        )
                                      }
                                      {this.state.pay_type == 'coin' &&
                                        (
                                          <div>
                                            <p style={{marginTop:'20px'}}>兑换{topic_title} 需要200L币</p>
                                            <div>
                                              <Button onClick={this.toChangeTopic.bind(this)} className="btn c-btn btn-lg c-font-bold c-font-white c-theme-btn c-btn-square c-font-uppercase">兑换</Button>
                                            </div>
                                          </div>
                                        )
                                      }
                                     {/* {this.state.pay_type == 'taobao' &&
                                        (
                                          <div style={{display:'block'}}>
                                            <div style={{margin:'20px 20px'}}><strong>淘宝链接:</strong> <a target='_blank' href={topic_tburl}>{topic_tburl}</a></div>
                                          </div>
                                        )
                                      }*/}
                                  </div>
                                  <div className="tab-pane" id="blog_popular_posts">
                                  </div>
                              </div>
                          </div>
                        </div>
                </Modal>)

    return (
      <div >
          <div className="col-sm-12 col-xs-12 c-margin-t-10">
              {/*{auth.token ? */}
                  <ModalTrigger modal={modal}>
                      <Button className="btn c-btn btn-lg c-font-bold c-font-white c-theme-btn c-btn-square c-font-uppercase"><span style={{color:'#32C5D2', fontWeight:'bold'}}>{price}</span> 购买</Button>
                  </ModalTrigger>
                 {/* :
                  <button onClick={this.toPay.bind(this)} className="btn c-btn btn-lg c-font-bold c-font-white c-theme-btn c-btn-square c-font-uppercase"><span style={{color:'#32C5D2', fontWeight:'bold'}}>{price}</span> 购买</button>
              } */}
              
          </div>
      </div>
    )
  }
}

// { (isShowBaidu)?
//                                   <div className="c-bg-grey c-center">
//                                     <div>
//                                       <p className="c-product-tab-meta">
//                                       <strong>云盘地址:</strong> <a target='_blank' href={articleDetail.url}>{articleDetail.url}</a>
//                                       </p>
//                                       <p className="c-product-tab-meta">
//                                           <strong>密码:</strong> {articleDetail.password}
//                                       </p>
//                                     </div>
//                                   </div>
//                                   :
//                                   <div className="payDiv">
//                                     {/*<div>                                    
//                                       购买详情请至<Link style={{color:'#32C5D2',fontWeight:'bold'}}  to='/tour'>功能介绍</Link>查看
//                                     </div>*/}
//                                     <div>                                    
//                                       支付后请联系Lambda
//                                     </div>                                   
//                                     <div >(QQ:32571992,微信:liuchao1986105)</div>
//                                     <div id="QR" style={{display:'block'}}>
//                                       <div id="wechat" style={{display: 'inline-block'}}>
//                                         {/*<a href={require('../../assets/images/wx.png')} className="fancybox" rel="group">*/}
//                                           <img id="wechat_qr" src={(qiniuImageUrl + 'wx_class.png')}/>
//                                         <p>微信付款</p>
//                                       </div>
//                                       <div id="alipay" style={{display: 'inline-block'}}>
//                                           <img id="alipay_qr" src={(qiniuImageUrl + 'alipay_class.png')}/>
//                                         <p>支付宝付款</p>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 }           