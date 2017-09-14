import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import { reduxForm } from 'redux-form'
import * as Actions from '../../actions'

const mapStateToProps = state =>{
  return {
    auth: state.auth.toJS()
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

const formValidate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  }

  return errors
}

@connect(mapStateToProps,mapDispatchToProps)
@reduxForm({
  form: 'emailbind',
  fields: ['email'],
  initialValues:{},
  validate: formValidate
})

export default class EmailBind extends Component {
  constructor(props){
    super(props)
  }
  
  static propTypes = {
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    values: PropTypes.object,
    fields: PropTypes.object,
    dirty: PropTypes.bool,
    invalid: PropTypes.bool
  }


  componentDidMount() {
    const { actions, auth } = this.props
    $(ReactDOM.findDOMNode(this.refs['email'])).focus()
  }


  _validateForm(values) {
    this.props.actions.hideMsg()

    if (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(values.email)) {
      this.props.actions.showMsg('无效邮箱地址')
      return false
    }

    return true
  }


  handleSubmit (e) {
    e.preventDefault();
    const { actions, values } = this.props
    if (!this._validateForm(values)) return

    actions.setUser({email: values.email}, true)
  }

  render() {
    const {  fields: { email}, dirty, invalid, resetForm } = this.props
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12" style={{marginTop:'30px'}}>
            <div className="c-comments">
                <div className="c-content-title-1">
                    <h3 className="c-font-bold">绑定邮箱</h3>
                    <div className="c-line-left"></div>
                </div>
                <p className="c-font-bold" style={{fontSize:'12px', color:'#5C6873', paddingBottom:'10px'}}>请绑定邮箱，以便于在忘记密码时或推送系统消息时使用</p>
                <form className="am-form am-form-horizontal" onSubmit={this.handleSubmit.bind(this)} >

                  <div className="am-form-group am-form-group-lg">
                    <input type="text" ref='email' id="email" className="am-form-field" placeholder="您的邮箱地址"  {...email}/>
                  </div>
                      

                  <div className="form-group" style={{paddingTop:'20px'}}>
                    <button  type="submit" className="btn c-btn c-btn-square c-theme-btn c-font-bold c-font-uppercase c-font-white">提交</button>
                  </div>

                </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}