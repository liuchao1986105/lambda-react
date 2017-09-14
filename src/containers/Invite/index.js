import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions'
import { HOST } from '../../config'

const mapStateToProps = state =>{
  return {
    msg: state.showmsg.toJS(),
    auth: state.auth.toJS()
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)


class ArticleCreate extends Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    msg: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  }


  static fetchData(params){
    return []
  }

  componentDidMount() {
    const { actions } = this.props
  }

  copyInviterCode(){
    $(ReactDOM.findDOMNode(this.refs.invitecode)).select()
    document.execCommand("Copy"); 
  }

  render() {
    const { msg, actions, auth } = this.props

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12" style={{marginTop:'30px'}}>
            <div className="c-comments">
                <div className="c-content-title-1">
                    <h3 className="c-font-bold">邀请好友</h3>
                    <div className="c-line-left"></div>
                </div>
            </div>

            <div className="c-content-box c-size-md c-bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="c-content-title-1">
                              <h3 className="c-center c-font-uppercase  c-font-bold">每邀请一位好友加入社区并支付成为会员，将获得5元/人的现金奖励</h3>
                              <h5 className="c-center" style={{color:'#666f80',fontSize:'14px'}}>一旦被邀请的好友注册并支付成为会员后，将奖励5元现金，上不封顶 每月2号进行结算</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="input-group input-group-lg c-square" style={{marginBottom:'20px', fontSize:'16px', width:'80%',left:'10%'}}>
                  <input ref='invitecode' type="text" defaultValue={ HOST + '/signup?code=' + (auth.user && auth.user._id)} readOnly  className="form-control c-square c-theme-border" />
                  <span className="input-group-btn">
                      <button onClick={this.copyInviterCode.bind(this)} className="btn c-theme-btn c-theme-border c-btn-square c-font-bold" type="button">复制链接</button>
                  </span>
            </div>

            <div className="c-content-box c-size-md c-bg-white" style={{marginTop:'80px'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="c-content-title-1 c-margin-b-60">
                                <h3 className="c-center c-font-uppercase c-font-bold"> 3个方法分享链接，分分钟赚够你的小金库</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-sm-6 wow animate fadeInLeft">
                            <div className="c-content-step-1 c-opt-1">
                                <div className="c-icon">
                                    <span className="c-hr c-hr-first">
                                        <span className="c-content-line-icon c-icon-10 c-theme"></span>
                                    </span>
                                </div>
                                <div className="c-title c-font-20 c-font-bold c-font-uppercase">1. 发给QQ群和好友</div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 wow animate fadeInLeft">
                            <div className="c-content-step-1 c-opt-1">
                                <div className="c-icon">
                                    <span className="c-hr">
                                        <span className="c-content-line-icon c-icon-19 c-theme"></span>
                                    </span>
                                </div>
                                <div className="c-title c-font-20 c-font-bold c-font-uppercase">2. 在论坛发帖</div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12 wow animate fadeInLeft">
                            <div className="c-content-step-1 c-opt-1">
                                <div className="c-icon">
                                    <span className="c-hr c-hr-last">
                                        <span className="c-content-line-icon c-icon-30 c-theme"></span>
                                    </span>
                                </div>
                                <div className="c-title c-font-20 c-font-bold c-font-uppercase">3. 往微博这么一发</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'article',
  fields: ['title', 'type',  'topicId', 'tags', 'shareurl'],
},state => ({}),
)(ArticleCreate);