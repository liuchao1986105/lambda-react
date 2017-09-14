import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import Toaster from '../components/Toaster'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollTop from '../components/ScrollTop'

const mapStateToProps = state =>{
  return {
    globalVal: state.globalVal.toJS(),
    auth: state.auth.toJS(),
    showmsg: state.showmsg.toJS(),
    options: state.options.toJS(),
    unreadMessage: state.unreadMessage.toJS(),
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)

export default class App extends Component {
  constructor(props){
    super(props)
  }

  static fetchData(params){
    return [Actions.getUserInfo(), Actions.getUnreadMessageCount()]
  }

  static propTypes = {
    globalVal: PropTypes.object.isRequired,
    showmsg: PropTypes.object.isRequired,
    children: PropTypes.node,
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
    unreadMessage: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { actions, auth } = this.props
    if(auth.token){
      actions.getUserInfo()
      actions.getUnreadMessageCount()
    }
  }

  componentWillReceiveProps(nextProps){
    const { globalVal } = this.props
/*    if(globalVal.styleMode !== nextProps.globalVal.styleMode){
      document.body.className = nextProps.globalVal.styleMode
    }*/
  }

  hasFooter(){
    const { location } = this.props
    if(location.pathname.indexOf("dashboard") > 0 
      || location.pathname.indexOf("invite") > 0  
      || location.pathname.indexOf("orders/return") > 0 
      || location.pathname.indexOf("orders/notify") > 0 
      || location.pathname.indexOf("post") > 0 
      || location.pathname.indexOf("skillmap") > 0   
      || location.pathname.indexOf("info") > 0  
      || location.pathname.indexOf("setting") > 0 
      || location.pathname == "/articles/share"
      || location.pathname == "/emailbind" 
      || location.pathname.indexOf("search") > 0 
      || location.pathname == "/login" 
      || location.pathname.indexOf("reset") >0
      || location.pathname == "/signup"){
      return false
    }else{
      return true
    }
  }

  hasHeader(){
    const { location } = this.props
    if(location.pathname.indexOf("/dashboard") < 0 ){
      return true
    }else{
      return false
    }
  }
  
  render() {
    const { auth, actions, children, showmsg, location, unreadMessage, options } = this.props
    return (
      <div>
        { this.hasHeader() && <Header options={options} unreadMessage={unreadMessage} auth={auth} actions={actions} logout={actions.logout} location={location} />}
        {children}  
        {this.hasFooter() && <Footer/>}
        <Toaster msg={showmsg} hideMsg={actions.hideMsg}  location={location} />
        <ScrollTop />
      </div>
    )
  }
}