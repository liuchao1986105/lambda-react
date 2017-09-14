import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Alert } from 'amazeui-react';
import { saveCookie} from '../../utils/authService'
import { loginBgUrl, imgCount, qiniuImageUrl } from '../../config'
import * as Actions from '../../actions'
import '../Login/login.scss'
import  _ from 'lodash'


const mapStateToProps = state =>{
  return {
    globalVal : state.globalVal.toJS(),
    auth: state.auth.toJS(),
    showmsg: state.showmsg.toJS()
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

const formValidate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }

  if (!values.password) {
    errors.password = 'Required'
  }

  if (!values.captcha) {
    errors.captcha = 'Required'
  }

  if (!values.email) {
    errors.email = 'Required'
  }

  return errors
}

@connect(mapStateToProps,mapDispatchToProps)
@reduxForm({
  form: 'signup',
  fields: ['name', 'password', 'email', 'captcha', 'confirmpwd'],
  initialValues:{},
  validate: formValidate
})
export default class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      invitor: ''
    }
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    globalVal: PropTypes.object.isRequired,
    values: PropTypes.object,
    fields: PropTypes.object,
    auth: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    showmsg: PropTypes.object.isRequired
  }

 /* static fetchData(params){
    return [Actions.getSnsLogins()]
  }*/

  changeCaptcha(e){
    e.preventDefault()
    const { actions } = this.props
    actions.getCaptchaUrl()
  }

  _validateForm(values) {
    this.props.actions.hideMsg()
    if (values.password.length < 6 ) {
      this.props.actions.showMsg('密码长度不能低于6位')
      return false
    }

    if (values.captcha.length !== 4) {
      this.props.actions.showMsg('验证码是4位')
      return false
    }

    if (values.password !== values.confirmpwd) {
      this.props.actions.showMsg('密码与确认密码不一致')
      return false
    }

    if (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(values.email)) {
      this.props.actions.showMsg('无效电子邮件地址')
      return false
    }

    return true
  }

  handleSubmit (e) {
    e.preventDefault();
    let { values } = this.props
    if (!this._validateForm(values)) return

    const headimgurl = _.random(1,imgCount) + '.jpg'
    values.headimgurl = qiniuImageUrl + headimgurl
    values.invitor = this.state.invitor
    const { actions } = this.props
    actions.signUp(values)
  }


  componentDidMount() {
    this.props.actions.hideMsg()
    //saveCookie('invitor',this.props.location.query.code)
    this.setState({invitor: this.props.location.query.code})
  }

  validatorCalss(field){
    let initClass = 'form-control input-lg c-square'
    // if(field.invalid){
    //   initClass += ' ng-invalid'
    // }
    // if(field.dirty){
    //   initClass += ' ng-dirty'
    // }
    return initClass
  }


  render() {
    const { showmsg, auth, actions, globalVal: {captchaUrl}, fields: { name, password, confirmpwd, email, captcha}, invalid } = this.props
    document.title = '注册 - Lambda'
    return (
      <div className="c-layout-page signinup" style={{backgroundImage: `url(${loginBgUrl})`}}>
        <div className="c-content-login-form">
            <div className="modal-dialog">
                <div className="modal-content c-square" style={{borderRadius:'0px'}}>
                    <div className="modal-body" >
                        <h3 className="c-font-24 c-font-sbold">注册</h3>
                        <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)} noValidate>
                            <div className="form-group"> 
                              <input type="text" className={ this.validatorCalss(name) } placeholder="用户名" {...name} /> 
                            </div>
                            <div className="form-group"> 
                              <input type="text" className={ this.validatorCalss(email) } placeholder="邮箱" {...email} /> 
                            </div>
                            <div className="form-group">
                              <input type="password" className={ this.validatorCalss(password) } placeholder="密码"  {...password} />
                            </div>
                            <div className="form-group">
                              <input type="password" className={ this.validatorCalss(confirmpwd) } placeholder="确认密码"  {...confirmpwd} />
                            </div>
                            <div className="form-group">
                              <div className='captchaDiv'>
                                <input className={ this.validatorCalss(captcha) } style= {{width:'60%'}} maxLength="4" type="text" placeholder="验证码" {...captcha} />
                                <a href="javascript:;" style= {{width:'30%'}} onClick={this.changeCaptcha.bind(this)}>
                                  <img src={captchaUrl} />
                                </a>
                              </div>
                              
                            </div>
                            {/*{ (showmsg.content) ? <Alert amStyle="warning"><strong>{showmsg.content}</strong></Alert> : ''}*/}
                            <div className="form-group">
                                <button disabled={ invalid }  type="submit" className="btn c-theme-btn btn-md c-btn-uppercase c-btn-bold c-btn-square c-btn-login">注册</button>
                                <Link  className="c-btn-forgot" to="/login">返回登录</Link>
                            </div>
                        </form>

                    </div>
                   
                </div>
            </div>
        </div>
      </div>
    )
  }
}
