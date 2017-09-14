import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as Actions from '../../actions'
import HomeBody from '../../components/HomeBody'
import LoadMore from '../../components/LoadMore'
import Wxpub from '../../components/Wxpub'
import Tags from '../../components/Tags'
import {  headBgUrl } from '../../config'
import "../../components/Header/header.scss"
import moment from 'moment'

const mapStateToProps = state =>{
  return {
    globalVal: state.globalVal.toJS(),
    auth: state.auth.toJS(),
    tagList: state.tagList.toJS(),
    topicList: state.topicList.toJS(),
    options: state.options.toJS()
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      firstLoad: true
    }
  }

  static propTypes = {
    globalVal: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    tagList: PropTypes.object.isRequired,
    topicList: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }

  static fetchData(params){
    return [Actions.getTopicList({type:'topic'}),Actions.getTagList({type:'topic'})]
  }

  componentDidMount() {
    const { actions, tagList, topicList, auth } = this.props
    actions.changeOptions({'page':1, search: ''})
    //if(tagList.items.length < 1){
      actions.getTagList({type:'topic'})
    //}
    //if(topicList.items.length < 1){
      actions.getTopicList(false)
    //}

    //判断是否过期
    // if(auth.token &&　auth.user && moment().diff(moment(auth.user.payTime), 'years') >= 1){
    //   actions.changePayedStatus(auth.user._id)
    // }

  }

  handleChange(option,isAdd=false){
    const { actions } = this.props
    this.setState({ firstLoad: false })
    option.search = ''
    actions.changeOptions(option)
    actions.getTopicList(isAdd)
  }

  _toSignup(){
    this.props.actions.toPage('/signup')
  }

  render() {
    const { globalVal, auth, tagList, topicList, options, actions } = this.props
    document.title=  'Lambda - 程序员学习社区'
    return (
      <div >
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
        { (!tagList.isFetching ) &&
          <Tags tagList={tagList.items} options={options} changeSort={this.handleChange.bind(this)} />                 
        }
        <HomeBody actions={actions} firstLoad={this.state.firstLoad} topicList={topicList.items} tagList={tagList.items} options={options} isFetching={topicList.isFetching}/>
        {(topicList.items.length > 0)&&<LoadMore options={options} isMore={topicList.isMore} isFetching={topicList.isFetching} addData={this.handleChange.bind(this)} />}
        <Wxpub actions={actions}/>
      </div>
    )
  }
}