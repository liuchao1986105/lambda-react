import React,{Component,PropTypes} from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import { Image, Badge} from 'amazeui-react';
import LoadMore from '../../components/LoadMore'
import { limtPage } from '../../config'
import { timeago} from '../../utils/timeago'
import Loding from '../../components/Loding'
import './index.scss'

export default class FeedIndex extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    recentPostList:PropTypes.object.isRequired,
  }

  
  toggleReaded(id){
    const {actions, auth, location} = this.props
    actions.togglePostReaded(id,{type:'read'})

    // if(auth.token){
    //   window.open('/articles/doc/'+id)
    // }else{
    //   saveCookie('returnUrl', location.pathname)
    //   actions.toPage('/login')
    // }
  }

  _toArticle(id, link){
    const {actions} = this.props
    actions.updateRencentPostList(id,{type:'read'})
    window.open(link)
  }

  render() {
    const {recentPostList: { items, isFetching, pagecount}} = this.props
    return (
      <div className="col-md-9" style={{padding:'0px'}}>
          <div className="c-content-blog-post-card-1-grid">
            <div className="waterfall">
              {items.length > 0 &&
                items.map((item,i)=>
                    <div key={item._id}>
                      <div  className=" c-content-blog-post-card-1 c-option-2 c-bordered pin">
                        <Link to={`/feed/show/${item.feed_id}`} style={{textAlign:'left'}}>
                          <Image
                            src={item.favicon || ''}
                            width="15"
                            height="15"
                            circle />
                          <span style={{fontSize:'14px',fontWeight:'bold'}}>{item.feed_title}  ---  <Badge amStyle="warning" round>{item.unread}</Badge>篇未读</span>
                        </Link>
                        <img className="recentImg c-overlay-object img-responsive" src={item.description}/> 
                                                      
                        <div>
                          <div className="c-body" style={{padding:'15px 15px 0px 15px'}}>
                              <div className="c-title c-font-bold c-font-uppercase" style={{marginBottom:'0px'}}>
                                  <a href='javascript:;' onClick={this._toArticle.bind(this, item._id, item.link)}>{item.title}</a>
                              </div>
                              {/*<div className="c-panel">
                                  <ul className="c-tags c-theme-ul-bg">
                                      <li>ux</li>
                                      <li>web</li>
                                      <li>events</li>
                                  </ul>
                                  <div className="c-comments">
                                      <a href="#">
                                          <i className="icon-speech"></i> 30 comments</a>
                                  </div>
                              </div>*/}
                              <p style={{fontSize:'12px'}}>{item.summary} </p>

                              <div className="c-panel">
                                  <ul className="c-tags">
                                      {/*<li><i className={"fa fa-star-o "} ></i></li>
                                      <li><i className={"fa fa-thumbs-o-up "} ></i></li>
                                      <li>
                                        <a title="标记为已读" href="javascript:;" onClick={this.toggleReaded.bind(this, item._id)}>
                                          <i className={"fa fa-times "} ></i>
                                        </a>
                                      </li>*/}
                                  </ul>
                                  <div>
                                    <i className="fa fa-clock-o"></i><span style={{marginLeft:'10px',fontSize:'10px',fontColor:'#FFFFFF'}}>{timeago(item.pubdate)}</span>
                                  </div>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                )
              }

              </div>
          </div>

          <div className="c-content-blog-post-card-1-grid">
            <ul className="am-avg-sm-1 am-avg-md-2 am-avg-lg-2 am-thumbnails waterfall">
              {/*
               (items.length > 0&&
              items.map((item,i)=>
                <li key={item._id}>
                    <div className=" c-content-blog-post-card-1 c-option-2 c-bordered">
                          <div className="c-media c-content-overlay">
                              <div className="c-overlay-wrapper">
                                  <div className="c-overlay-content">
                                      <a href="#">
                                          <i className="icon-link"></i>
                                      </a>
                                      <a href="assets/base/img/content/stock2/04.jpg" data-lightbox="fancybox" data-fancybox-group="gallery">
                                          <i className="icon-magnifier"></i>
                                      </a>
                                  </div>
                              </div>
                              <img className="c-overlay-object img-responsive" src={item.description}/> 

                          </div>
                          <div className="c-body">
                              <div className="c-title c-font-bold c-font-uppercase">
                                  <a href="#">{item.title}</a>
                              </div>
                              <div className="c-author"> By
                                  <a href="#">
                                      <span className="c-font-uppercase">Nick Strong</span>
                                  </a> on
                                  <span className="c-font-uppercase">20 May 2015, 10:30AM</span>
                              </div>
                              <div className="c-panel">
                                  <ul className="c-tags c-theme-ul-bg">
                                      <li>ux</li>
                                      <li>web</li>
                                      <li>events</li>
                                  </ul>
                                  <div className="c-comments">
                                      <a href="#">
                                          <i className="icon-speech"></i> 30 comments</a>
                                  </div>
                              </div>
                              <p>{item.summary} </p>
                          </div>
                      </div>
                </li>
              )
            )
              */}


            </ul>
          </div>
      </div>
    );
  }
}