import React,{Component,PropTypes} from 'react'
import { Link } from 'react-router'
import { Image} from 'amazeui-react';
export default class FeedSidebar extends Component {
  constructor(props){
    super(props)
    this.state = {
      linkText : ''
    }
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    myFeeds: PropTypes.object.isRequired,
  }

  onEnterDown(e){
    if(e.keyCode == 13){
      this.handleFeedLink(e)
    }
  }

  handleLinkContentChange(e){
    this.setState({
      linkText: e.target.value
    })
  }

  handleFeedLink(e){
    e.preventDefault()  
    const { actions, location, options } = this.props
    actions.addFeed(this.state.linkText)
    //actions.toPage(`/search?search=${this.state.serachText}`)
    this.setState({
      linkText: '',
    })
  }


  render() {
    const {myFeeds: { items, isFetching }} = this.props
    return (
      <div className="col-md-3">
          <form action="#" method="post">
              <div className="input-group">
                  <input ref='feedlinkContent' type="text" className="form-control c-square c-theme-border" onKeyDown={this.onEnterDown.bind(this)}  onChange={this.handleLinkContentChange.bind(this)}  placeholder="输入URL添加订阅源"/>
                  <span className="input-group-btn">
                      <button onClick={this.handleFeedLink.bind(this)}  className="btn c-theme-btn c-theme-border c-btn-square" type="button">Go!</button>
                  </span>

              </div>
          </form>
          <div><span style={{fontSize:'10px'}}>如:"http://www.ruanyifeng.com/blog/atom.xml"可添加"阮一峰的网络日志"</span></div>
         

          <div className="c-content-ver-nav">
              <div className="c-content-title-1 c-theme c-title-md c-margin-t-40">
                  <div className="c-line-left c-theme-bg"></div>
              </div>
              <ul className="c-content-list-1 c-theme c-separator-dot">
                  <li className="c-bg-before-blue"><Link to="/feed">仪表盘</Link></li>
                  {/*<li className="c-bg-before-yellow">未读文章</li>*/}
                  <li className="c-bg-before-green"><Link to="/feed/marked">收藏的文章</Link></li>
                  <li className="c-bg-before-purple"><Link to="/feed/explore">发现</Link></li>
                  {/*<li className="c-bg-before-red">全部标为可读</li>*/}
              </ul>
          </div>

          <div className="c-content-ver-nav">
              <div className="c-content-title-1 c-theme c-title-md c-margin-t-40">
                  <h3 className="c-font-bold c-font-uppercase">我的订阅源</h3>
                  <div className="c-line-left c-theme-bg"></div>
              </div>
              <ul className="c-menu c-arrow-dot1 c-theme">
                  {items.length > 0 &&
                    items.map((item,i)=>
                      <li key={item._id}>
                        <Image
                            src={item.favicon}
                            width="15"
                            height="15"
                            circle />
                        <Link to={`/feed/show/${item._id}`}>{item.title}({item.unread})</Link>
                      </li>
                    )
                  }
              </ul>
          </div>
          {/*<div className="c-content-tab-1 c-theme c-margin-t-30">
              <div className="nav-justified">
                  <ul className="nav nav-tabs nav-justified">
                      <li className="active">
                          <a href="#blog_recent_posts" data-toggle="tab">最新</a>
                      </li>
                      <li>
                          <a href="#blog_popular_posts" data-toggle="tab">热门</a>
                      </li>
                  </ul>
                  <div className="tab-content">
                      <div className="tab-pane active" id="blog_recent_posts">
                          <ul className="c-content-recent-posts-1">
                              <li>
                                  <div className="c-image">
                                      <img src="assets/base/img/content/stock/09.jpg" alt="" className="img-responsive"/> </div>
                                  <div className="c-post">
                                      <a href="" className="c-title"> UX Design Expo 2015... </a>
                                      <div className="c-date">27 Jan 2015</div>
                                  </div>
                              </li>
                              <li>
                                  <div className="c-image">
                                      <img src="assets/base/img/content/stock/08.jpg" alt="" className="img-responsive"/> </div>
                                  <div className="c-post">
                                      <a href="" className="c-title"> UX Design Expo 2015... </a>
                                      <div className="c-date">27 Jan 2015</div>
                                  </div>
                              </li>
                              <li>
                                  <div className="c-image">
                                      <img src="assets/base/img/content/stock/07.jpg" alt="" className="img-responsive"/> </div>
                                  <div className="c-post">
                                      <a href="" className="c-title"> UX Design Expo 2015... </a>
                                      <div className="c-date">27 Jan 2015</div>
                                  </div>
                              </li>
                              <li>
                                  <div className="c-image">
                                      <img src="assets/base/img/content/stock/32.jpg" alt="" className="img-responsive"/> </div>
                                  <div className="c-post">
                                      <a href="" className="c-title"> UX Design Expo 2015... </a>
                                      <div className="c-date">27 Jan 2015</div>
                                  </div>
                              </li>
                          </ul>
                      </div>
                      <div className="tab-pane" id="blog_popular_posts">
                          <ul className="c-content-recent-posts-1">
                              <li>
                                  <div className="c-image">
                                      <img src="assets/base/img/content/stock/34.jpg" className="img-responsive" alt="" /> </div>
                                  <div className="c-post">
                                      <a href="" className="c-title"> UX Design Expo 2015... </a>
                                      <div className="c-date">27 Jan 2015</div>
                                  </div>
                              </li>
                              <li>
                                  <div className="c-image">
                                      <img src="assets/base/img/content/stock/37.jpg" className="img-responsive" alt="" /> </div>
                                  <div className="c-post">
                                      <a href="" className="c-title"> UX Design Expo 2015... </a>
                                      <div className="c-date">27 Jan 2015</div>
                                  </div>
                              </li>
                              <li>
                                  <div className="c-image">
                                      <img src="assets/base/img/content/stock/32.jpg" className="img-responsive" alt="" /> </div>
                                  <div className="c-post">
                                      <a href="" className="c-title"> UX Design Expo 2015... </a>
                                      <div className="c-date">27 Jan 2015</div>
                                  </div>
                              </li>
                              <li>
                                  <div className="c-image">
                                      <img src="assets/base/img/content/stock/54.jpg" className="img-responsive" alt="" /> </div>
                                  <div className="c-post">
                                      <a href="" className="c-title"> UX Design Expo 2015... </a>
                                      <div className="c-date">27 Jan 2015</div>
                                  </div>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>*/}
      </div>
    );
  }
}