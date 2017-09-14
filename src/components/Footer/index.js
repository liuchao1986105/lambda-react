import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import "./footer.scss"
import "../../containers/Tour/tour.scss"
import { qiniuImageUrl } from '../../config'

export default class Footer extends Component{
  constructor(props){
    super(props)
  }

  static propTypes = {
  }      

  render(){
    return (
      <div>
        <footer className="c-layout-footer c-layout-footer-7">
            <div className="container">
                <div className="c-prefooter"  style={{paddingTop:'30px', paddingBottom:'20px'}}>
                    <div className="c-body">
                        <div className="row">
                            <div className="col-md-4 col-sm-6 col-xs-12">
                                <div className="c-content-title-1 c-title-md">
                                    <h3 className="c-title c-font-uppercase c-font-bold">Lambda</h3>
                                    <div className="c-line-left hide"></div>
                                </div>
                                <ul className="c-links c-theme-ul">
                                    <li>
                                        <a href="/articles/doc/589c9589d7d9c632482c703e">关于Lambda</a>
                                    </li>
                                    <li>
                                        <Link to="/bbs">社区</Link>
                                    </li>
                                    <li>
                                        <a href="/blogs">博客</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-5 col-sm-6 col-xs-12">
                                <div className="c-content-title-1 c-title-md">
                                    <h3 className="c-title c-font-uppercase c-font-bold">友链</h3>
                                    <div className="c-line-left hide"></div>
                                </div>
                                <div className="c-twitter">
                                  <ul className="c-links c-theme-ul">
                                    <li>
                                      <a target='_blank' href='http://www.liaoxuefeng.com/'>廖雪峰的官方网站</a>
                                    </li>
                                    <li>
                                      <a target='_blank' href='http://www.ruanyifeng.com/home.html'>阮一峰的个人网站</a>
                                    </li>
                                    <li>
                                      <a target='_blank' href='https://zhuanlan.zhihu.com/FrontendMagazine'>前端外刊评论</a>
                                    </li>
                                  </ul>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-12 col-xs-12">
                                <div className="c-content-title-1 c-title-md">
                                    <h3 className="c-title c-font-uppercase c-font-bold">联系方式</h3>
                                    <div className="c-line-left hide"></div>
                                </div>

                                <ul className="list-unstyled">
                                    <li>
                                      <div className="social-share_foot" style={{marginBottom:'10px'}}>
                                        <a className='share_title_foot icon-wechat_foot' target='_blank' href='javascript:'>
                                          微信: liuchao1986105
                                          <div className='wechat-qrcode_foot'>
                                            <h4>{'微信扫码加我'}</h4>
                                            <div className='qrcode_foot'>
                                               <img style={{width:'150px',height:'150px'}} src={(qiniuImageUrl + 'me.png?imageslim')}/>
                                            </div>
                                          </div>
                                        </a>
                                      </div>
                                    </li>
                                    <li><p className="c-copyright c-font-grey">QQ: 32571992</p></li>
                                    <li>
                                    <div className="social-share_foot" style={{marginBottom:'10px'}}>
                                        <a className='share_title_foot icon-wechat_foot' target='_blank' href='javascript:'>
                                          微信小程序: Lambda学习
                                          <div className='wechat-qrcode_foot'>
                                            <h4>{'微信扫码访问'}</h4>
                                            <div className='qrcode_foot'>
                                               <img style={{width:'150px',height:'150px'}} src={(qiniuImageUrl + 'lambda-smallwx.jpg?imageslim')}/>
                                            </div>
                                          </div>
                                        </a>
                                      </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                              <p className="c-copyright c-font-grey">申明：本站资源全部来自与互联网，如果发现本站有侵权行为，请告知，我们会在第一时间处理</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="c-postfooter c-bg-dark-2" style={{paddingTop:'20px', paddingBottom:'20px'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 c-col">
                            <p className="c-copyright c-font-grey">Copyright &copy; 2016 Lambda
                                <span className="c-font-grey-3">沪ICP备16045677号</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
      </div>
    )
  }
}