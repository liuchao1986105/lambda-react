import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
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
  
  if (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(values.email)) {
    errors.email = '无效邮件地址'
  }

  return errors
}


@connect(mapStateToProps,mapDispatchToProps)
@reduxForm({
  form: 'reset',
  fields: ['email'],
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
    showmsg: PropTypes.object.isRequired
  }

  static fetchData(params){
    return []
  }

  _validateForm(values) {

    if (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(values.email)) {
      this.props.actions.showMsg('无效邮件地址')
      return false
    }

    return true
  }

  handleSubmit (e) {
    e.preventDefault();
    const { values } = this.props
    if (!this._validateForm(values)) return

    const { actions } = this.props
    //actions.localLogin(values)
    actions.sendResetMail(values)
  }


  componentDidMount() {
    const { actions } = this.props
    //actions.getSnsLogins()
  }

  validatorCalss(field){
    let initClass = 'form-control input-lg c-square'
    return initClass
  }

  render() {
    const { showmsg, auth, actions, fields: { email}, dirty, invalid } = this.props
    document.title = '重置密码 - Lambda'
    return (
      <div className="c-layout-page signinup" style={{backgroundImage: `url(${loginBgUrl})`}}>
        <div className="c-content-login-form">
            <div className="modal-dialog">
                <div className="modal-content c-square" style={{borderRadius:'0px'}}>
                    <div className="modal-body" >
                        <h3 className="c-font-24 c-font-sbold">重置密码</h3>
                        <p>系统会发送邮件到注册邮箱，引导您重置密码！</p>
                        <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)} noValidate>
                            <div className="form-group"> 
                              <input type="text" className={ this.validatorCalss(email) } placeholder="注册邮箱名" {...email} /> 
                            </div>
                            <div className="form-group">
                              <button disabled={ invalid }  type="submit" className="btn c-theme-btn btn-md c-btn-uppercase c-btn-bold c-btn-square c-btn-login">提交</button>
                            </div>
                        </form>
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
