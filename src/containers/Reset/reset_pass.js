import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Alert } from 'amazeui-react';
import { getCookie } from '../../utils/authService'
import { API_ROOT, loginBgUrl } from '../../config'
import * as Actions from '../../actions'
import '../Login/login.scss'

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

  if (!values.password) {
    errors.password = 'Required'
  }

  if (!values.confirmpwd) {
    errors.confirmpwd = 'Required'
  }

  return errors
}



@connect(mapStateToProps,mapDispatchToProps)
@reduxForm({
  form: 'reserpass',
  fields: ['password','confirmpwd'],
  initialValues:{},
  validate: formValidate
})
export default class Reset extends Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    globalVal: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    values: PropTypes.object,
    fields: PropTypes.object,
    location: PropTypes.object.isRequired,
    showmsg: PropTypes.object.isRequired
  }

  static fetchData(params){
    return []
  }

  _validateForm(values) {
    this.props.actions.hideMsg()
    if (values.password.length < 6 ) {
      this.props.actions.showMsg('密码长度不能低于6位')
      return false
    }

    if (values.password !== values.confirmpwd) {
      this.props.actions.showMsg('密码与确认密码不一致')
      return false
    }
    return true
  }

  handleSubmit (e) {
    e.preventDefault();
    const { values, location } = this.props
    const token= location.query.key;

    if (!this._validateForm(values)) return

    const { actions } = this.props
    values.token = token;
    actions.sendResetPassword(values)
  }


  componentDidMount() {
    const { actions } = this.props
  }

  validatorCalss(field){
    let initClass = 'form-control input-lg c-square'
    return initClass
  }

  render() {
    const { showmsg, auth, actions, fields: { password, confirmpwd}, dirty, invalid } = this.props
    return (
      <div className="c-layout-page signinup" style={{backgroundImage: `url(${loginBgUrl})`}}>
        <div className="c-content-login-form">
            <div className="modal-dialog">
                <div className="modal-content c-square" style={{borderRadius:'0px'}}>
                    <div className="modal-body" >
                        <h3 className="c-font-24 c-font-sbold">更新密码</h3>
                        <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)} noValidate>
                             <div className="form-group">
                              <input type="password" className={ this.validatorCalss(password) } placeholder="密码"  {...password} />
                            </div>
                            <div className="form-group">
                              <input type="password" className={ this.validatorCalss(confirmpwd) } placeholder="确认密码"  {...confirmpwd} />
                            </div>
                            <div className="form-group">
                              <button disabled={ invalid }  type="submit" className="btn c-theme-btn btn-md c-btn-uppercase c-btn-bold c-btn-square c-btn-login">提交</button>
                            </div>
                        </form>
                        { (showmsg.content) ? <Alert amStyle="warning"><strong>{showmsg.content}</strong></Alert> : ''}
                    </div>
                    <div className="modal-footer c-no-border">
                        <span className="c-text-account">还没有账号 ?</span>
                        <Link className="btn c-btn-dark-1 btn c-btn-uppercase c-btn-bold c-btn-slim c-btn-border-2x c-btn-square c-btn-signup" to="/signup">注册</Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
