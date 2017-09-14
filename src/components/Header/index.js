import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import cookie from 'react-cookie'
import { Badge, PopoverTrigger, Popover} from 'amazeui-react'
import ReactDOM from 'react-dom'
import { Dropdown, MenuItem} from 'react-bootstrap'
import { qiniuImageUrl, ChatHOST } from '../../config'
import Storage from '../../utils/storage'
import "./header.scss"

export default class Header extends Component{
  constructor(props){
    super(props)
    this.state = {
      serachText : ''
    }
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    options: PropTypes.object,
    unreadMessage: PropTypes.object.isRequired,
  }

  _toDashboard(){
    window.location.href='/dashboard'
  }

  _toUser(user_id, isPhone){
    $(ReactDOM.findDOMNode(this.refs.headerdiv)).click()
    isPhone && $(ReactDOM.findDOMNode(this.refs.barsbutton)).click()
    this.props.actions.toPage(`/users/${user_id}`)
  }

  _toInvite(isPhone){
    $(ReactDOM.findDOMNode(this.refs.headerdiv)).click()
    isPhone && $(ReactDOM.findDOMNode(this.refs.barsbutton)).click()
    this.props.actions.toPage(`/invite`)
  }

  _toSetting(user_id, isPhone){
    $(ReactDOM.findDOMNode(this.refs.headerdiv)).click()
    isPhone && $(ReactDOM.findDOMNode(this.refs.barsbutton)).click()
    this.props.actions.toPage(`/setting/${user_id}`)
  }

  _toTour(){
    $(ReactDOM.findDOMNode(this.refs.barsbutton)).click()
    this.props.actions.toPage(`/tour`)
  }

  _toIndex(){
    $(ReactDOM.findDOMNode(this.refs.barsbutton)).click()
    this.props.actions.toPage(`/`)
  }

  _toBbs(){
    $(ReactDOM.findDOMNode(this.refs.barsbutton)).click()
    this.props.actions.toPage(`/bbs`)
  }

  _toBlog(){
    $(ReactDOM.findDOMNode(this.refs.barsbutton)).click()
    this.props.actions.toPage(`/blogs`)
  }

  _toClass(){
    $(ReactDOM.findDOMNode(this.refs.barsbutton)).click()
    this.props.actions.toPage(`/class`)
  }

  _toSearch(){
    $(ReactDOM.findDOMNode(this.refs.barsbutton)).click()
    this.props.actions.toPage(`/search`)
  }

  _toLogin(){
    $(ReactDOM.findDOMNode(this.refs.barsbutton)).click()
    this.props.actions.toPage(`/login`)
  }

  _toShare(){
    $(ReactDOM.findDOMNode(this.refs.barsbutton)).click()
    this.props.actions.toPage(`/articles/share`)
  }

  _toInfo(user_id){
    $(ReactDOM.findDOMNode(this.refs.barsbutton)).click()
    this.props.actions.toPage(`/info/${user_id}`)
  }

  _toFeed(){
    const {auth} = this.props
    $(ReactDOM.findDOMNode(this.refs.barsbutton)).click()
    
    if(auth.token && auth.user){
      this.props.actions.toPage(`/feed`)
    }else{
      this.props.actions.toPage(`/login`)
    }
  }

  logout(isPhone){
    //window.location.href = '/'
    Storage.clear()
    isPhone && $(ReactDOM.findDOMNode(this.refs.barsbutton)).click()
    this.props.logout()
  }

  handleSearchContentChange(e){
    this.setState({
      serachText: e.target.value
    })
  }

  handleSearch(e){
    e.preventDefault()  
    const { actions, location, options } = this.props
    $(ReactDOM.findDOMNode(this.refs.barsbutton)).click()
    
    if( location.pathname.indexOf("search") > 0 ){
      actions.getArticleList(false, {page: 1, limit: 20, type:'all', search: this.state.serachText})
      options.search = this.state.serachText
      actions.changeOptions(options)
    }else{
      actions.toPage(`/search?search=${this.state.serachText}`)
    }
    
    this.setState({
      serachText: '',
    })
  }

  onEnterDown(e){
    if(e.keyCode == 13){
      this.handleSearch(e)
    }
  }


/*<Link className={'navbar-item logo ' + (location.pathname !== '/apps'&&'active')} title="首页" to="/"></Link>
<a className="navbar-item change-mode" href="javascript:;" onClick={this.handleChangeMode}>
  {(styleMode === 'day-mode')?<i className="fa fa-sun-o"></i>:<i className="fa fa-moon-o"></i>}
</a>*/
/* <Link to="/settings" className="navbar-item expanded-avatar" title={auth.user.nickname}>          
          <img src={ auth.user.avatar || defaultAvatar} /> 
        </Link> */


  render(){
    const {auth,logout,location,unreadMessage} = this.props
   // console.log("user:"+JSON.stringify(auth.user))
   // const headimg = ' : './avatar.png'

    let  isPhone = false
    const width = (typeof window !== 'undefined') && window.innerWidth
    let dropdownStyle;
    if (width > 576 || (typeof window === 'undefined')){
      dropdownStyle = {marginTop:'10px',borderRadius:0};
    } else {
      dropdownStyle = {marginTop:'10px',borderRadius:0,float:'none',position:'relative',width:'100%'};
      isPhone = true
    }

    let headerClass;
    if(location.pathname.indexOf("/articles") > -1 
      || location.pathname.indexOf("/post") > -1 
      || location.pathname.indexOf("/invite") > -1 
      || location.pathname.indexOf("/users") > -1  
      || location.pathname.indexOf("/search") > -1 
      || location.pathname.indexOf("/info") > -1  
      || location.pathname.indexOf("/bbs") > -1 
      || location.pathname.indexOf("/blogs") > -1 
      || location.pathname.indexOf("/setting") > -1
      || location.pathname.indexOf("/skillmap") > -1
      || location.pathname.indexOf("/emailbind") > -1
      || location.pathname.indexOf("/feed") > -1
      || location.pathname.indexOf("showFeed") > -1
      || location.pathname.indexOf("orders/return") > 0 
      || location.pathname.indexOf("orders/notify") > 0 
    ){
      headerClass = "am-topbar  am-topbar-inverse  headerBackground"
    }else{
      if (width > 576 || (typeof window === 'undefined')){
        headerClass = "am-topbar am-topbar-inverse am-topbar-fixed-top headercolor"
      }else{
        headerClass = "am-topbar  am-topbar-inverse am-topbar-fixed-top headerBackground"
      }
      
    }

    return (
      <div ref='headerdiv'>
        <header className={headerClass} id="header">
          <div style={{marginLeft:'20px', marginRight:'20px'}}>
            <h1 className="am-topbar-brand">
              <Link  to="/">Lambda</Link>
            </h1>

            <button ref='barsbutton' className="am-topbar-btn am-topbar-toggle am-btn am-animation-slide-bottom" data-am-collapse="{target: '#doc-topbar-collapse'}">
              <span className="am-icon-bars"></span>
            </button>

            <div className="am-collapse am-topbar-collapse am-topbar-right" id="doc-topbar-collapse">
              <ul className="am-nav am-nav-pills am-topbar-nav headLi">
                <li className={(location.pathname == '/' && 'am-active')} >
                  {
                    isPhone ?
                    <a href='javascript:;' onClick={this._toIndex.bind(this)}>首页</a>
                    :
                    <Link to="/">首页</Link>
                  }
                </li>
                <li className={(location.pathname == '/tour' && 'am-active')}>
                  {
                    isPhone ?
                    <a href='javascript:;' onClick={this._toTour.bind(this)}>功能介绍</a>
                    :
                    <Link to="/tour">功能介绍</Link>
                  }  
                      
                </li>
               {/* <li className={((location.pathname.indexOf('/class') > -1) && 'am-active')} >
                  {
                    isPhone ?
                    <a href='javascript:;' onClick={this._toClass.bind(this)}>实战众筹</a>
                    :
                    <Link to="/class">实战众筹</Link>
                  } 
                </li>*/}
                <li className={((location.pathname.indexOf('/feed') > -1) && 'am-active')} >
                  {
                    isPhone ?
                    <a href='javascript:;' onClick={this._toFeed.bind(this)}>Rss订阅</a>
                    :
                    ((auth.token && auth.user) ?
                        <Link to="/feed">
                        Rss订阅
                       </Link>
                        :
                        <Link to="/login">
                        Rss订阅
                       </Link>
                    )
                  } 
                </li>

                <li className={((location.pathname.indexOf('/bbs') > -1) && 'am-active')} >
                  {
                    isPhone ?
                    <a href='javascript:;' onClick={this._toBbs.bind(this)}>社区</a>
                    :
                    <Link to="/bbs">社区</Link>
                  } 
                </li>
                <li className={((location.pathname.indexOf('/blogs') > -1) && 'am-active')} >
                  {
                    isPhone ?
                    <a href='javascript:;' onClick={this._toBlog.bind(this)}>博客</a>
                    :
                    <Link to="/blogs">博客</Link>
                  } 
                </li>
                <li>
                  {
                    !isPhone &&
                    (
                        (auth.token && auth.user) ?
                        <a target='_blank' href={`${ChatHOST}?user=${auth.user.name}&avatar=${auth.user.headimgurl}&email=${auth.user.email}&info=${auth.user.sign}`}>聊天室</a>
                        :
                        <Link to="/login">
                        聊天室
                       </Link>
                    )
                    } 
                </li>
                <li  style={{width:'250px',marginTop:'10px'}}>
                      <div className="input-group">
                          <input  value={this.state.serachText} ref='searchContent' type="text" onKeyDown={this.onEnterDown.bind(this)} onChange={this.handleSearchContentChange.bind(this)} className="form-control c-square c-theme-border" placeholder="文章/学习视频/书籍..."/>
                          <span className="input-group-btn">
                              <button onClick={this.handleSearch.bind(this)} style={{paddingLeft:'10px',paddingRight:'8px'}} className="btn c-theme-btn c-theme-border c-btn-square" type="button"><i className="fa fa-search"></i></button>
                          </span>
                      </div>
                </li>

                {/*<li>
                  {
                    isPhone ?
                    <a href='javascript:;' onClick={this._toSearch.bind(this)}><span><i className="fa fa-search"></i></span></a>
                    :
                    <Link to="/search">
                      <span><i className="fa fa-search"></i></span>
                    </Link>
                  } 
                </li>*/}

                {(auth.token && auth.user) &&
                  <li title='分享资源'>
                    {
                      isPhone ?
                      <a href='javascript:;' onClick={this._toShare.bind(this)}><span className="add">+</span></a>
                      :
                      <Link to="/articles/share"><span className="add">+</span></Link>
                    }
                  </li>
                }

                {(auth.token && auth.user) &&
                  <li title='通知'>
                    {
                      isPhone ?
                      <a href='javascript:;' onClick={this._toInfo.bind(this, auth.user._id)}><i className="fa fa-envelope-o fa-fw"></i> <Badge amStyle="success" round>{unreadMessage.count}</Badge></a>
                      :
                      <Link to={`/info/${auth.user._id}`}>
                        <i className="fa fa-bell-o fa-fw"></i> <Badge amStyle="success" round>{unreadMessage.count}</Badge>
                      </Link>
                    } 
                  </li>
                }

                {(auth.token && auth.user)?
                  <li style={{marginTop:'10px'}}>
                    <Dropdown id="dropdown-menu">
                      <a className="am-dropdown-toggle"  href="javascript:;" bsRole="toggle" >
                        {/*<img className="avatarheader" src={require('../../assets/images/'+auth.user.headimgurl)}/>*/}
                        <img className="avatarheader" src={ auth.user.headimgurl}/>
                        <span className="am-icon-caret-down"></span>
                      </a>
                      <Dropdown.Menu className="dropdown-menu pull-right" style={{...dropdownStyle}}>
                        
                        <li style={{paddingLeft:'0px'}}>
                            <a href='javascript:;' onClick={this._toUser.bind(this,auth.user._id, isPhone)}><span className="am-icon-user"> </span> 我的主页</a>
                        </li>
                        
                        <li style={{paddingLeft:'0px'}}>
                            <a href='javascript:;' onClick={this._toInvite.bind(this, isPhone)}><span className="am-icon-user-plus"> </span> 邀请好友</a>
                        </li>
                        {( auth.user.role === 'admin') && 
                          <li style={{paddingLeft:'0px'}}>
                            <Link  to="/dashboard">
                              <span className="am-icon-cog"></span>  后台管理系统
                            </Link>
                          {/*<a href="javascript:;" onClick={this._toDashboard.bind(this)} ><span className="am-icon-cog"></span>  后台管理系统</a>*/}
                          </li>
                        }
                        <MenuItem divider />
                        <li style={{paddingLeft:'0px'}}>
                            <a href='javascript:;' onClick={this._toSetting.bind(this, auth.user._id, isPhone)}><span className="am-icon-cog"> </span> 设置</a>
                        </li>
                        <MenuItem divider />
                        <li style={{paddingLeft:'0px'}}>
                          <a href="javascript:;" onClick={this.logout.bind(this, isPhone)}>
                            <i className="fa fa-sign-out"></i>  退出
                          </a>  
                        </li>
                        
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                  :
                  <li>
                    {
                      isPhone ?
                      <a style={{color:'#fff', fontWeight:'600'}} href='javascript:;' onClick={this._toLogin.bind(this)}>登录</a>
                      :
                      <Link  style={{color:'#fff', fontWeight:'600'}}  to="/login">
                        登录
                      </Link>
                    } 
                  </li>
                }
              </ul>
            </div>
          </div>
        </header>
      </div>
    )
  }
}