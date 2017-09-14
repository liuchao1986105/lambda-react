import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import { reduxForm } from 'redux-form'
import * as Actions from '../../actions'
import './setting.scss'

const mapStateToProps = state =>{
  return {
    auth: state.auth.toJS(),
    userDetail: state.userDetail.toJS(),
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)

class Setting extends Component {
  constructor(props){
    super(props)
  }
  
  static propTypes = {
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    values: PropTypes.object,
    fields: PropTypes.object,
    dirty: PropTypes.bool,
    invalid: PropTypes.bool,
    params: PropTypes.object.isRequired
  }

  static fetchData({id}){
    return [
      Actions.getUserDetail(id),
    ]
  }

  componentDidMount() {
    const { params: { id }, actions, auth } = this.props
    actions.getUserDetail(id)
  }

  focusInput(type){
     $(ReactDOM.findDOMNode(this.refs[type])).focus()
  }

  updateUser(type){
    const {values, actions} = this.props

    if(type == 'name'){
      actions.setUser({name: values.name})
    }else if(type == 'position'){
      actions.setUser({position: values.position})
    }
    else if(type == 'company'){
      actions.setUser({company: values.company})
    }
    else if(type == 'sign'){
      actions.setUser({sign: values.sign})
    }
    else if(type == 'blog'){
      actions.setUser({blog: values.blog})
    }
    else if(type == 'weixin'){
      actions.setUser({weixin: values.weixin})
    }
    else if(type == 'alipay'){
      actions.setUser({alipay: values.alipay})
    }
    else if(type == 'githubname'){
      actions.setUser({githubname: values.githubname})
    }
    else if(type == 'email'){
      actions.setUser({email: values.email})
    }
  }

  render() {
    const {  fields: { name, position, company, sign, email, blog, weixin, alipay, githubname}, dirty,invalid, resetForm } = this.props
    const { userDetail } = this.props
    document.title = 'Lambda - 程序员学习社区'
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12" style={{marginTop:'30px'}}>
            <div className="c-comments">
                <div className="c-content-title-1">
                    <h3 className="c-font-bold">设置</h3>
                    <div className="c-line-left"></div>
                </div>
            </div>

            <div className="c-content-tab-1">
                <div className="row">
                    <div className="col-md-3 col-sm-12 col-xs-12">
                        <ul className="nav nav-tabs tabs-left c-font-uppercase c-font-bold">
                            <li className="active">
                                <a href="#tab_16_1" data-toggle="tab" aria-expanded="true" data-toggle="tab">个人资料</a>
                            </li>
                            <li>
                                <a href="#tab_16_2" data-toggle="tab">账号关联</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-9 col-sm-12 col-xs-12">
                        <div className="tab-content c-padding-sm">
                            <div className="tab-pane active" id="tab_16_1">
                                <div className="c-content-title-1 c-title-md c-margin-b-20">
                                  <h3 className="c-font-uppercase c-font-bold">个人资料</h3>
                                  <div className="c-content-divider c-divider-sm"></div>
                                </div>
                                <div className="col-lg-12  col-md-12 col-sm-12 col-xs-12" style={{marginBottom:'20px'}}>
                                    <label for="name" className="settingTile col-lg-3 col-md-3 col-sm-3 col-xs-1">昵称</label> 
                                    <div className="settingTile col-lg-6 col-md-5 col-sm-5 col-xs-10">
                                      <input type="text" ref='name' className="form-control  c-square c-border-2px c-theme" id="name" {...name}/> 
                                    </div>
                                    <div className="settingTile  col-lg-3 col-md-4 col-sm-4 col-xs-10">
                                      <button onClick={this.focusInput.bind(this, 'name')} className='cbp-l-loadMore-link btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase'>编辑</button>
                                      <button onClick={this.updateUser.bind(this, 'name')} className='cbp-l-loadMore-link btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase'>提交</button>
                                    </div>
                                </div>
                                                            

                                <div className="col-lg-12  col-md-12 col-sm-12 col-xs-12" style={{marginBottom:'20px'}}>
                                    <label for="position" className="settingTile col-lg-3 col-md-3 col-sm-3 col-xs-1">职位</label> 
                                    <div className="settingTile col-lg-6 col-md-5 col-sm-5 col-xs-10">
                                      <input type="text" ref='position' className="form-control  c-square c-border-2px c-theme" id="position" placeholder="填写你的职位" {...position}/> 
                                    </div>
                                    <div className="settingTile  col-lg-3 col-md-4 col-sm-4 col-xs-10">
                                      <button onClick={this.focusInput.bind(this,'position')} className='cbp-l-loadMore-link btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase'>编辑</button>
                                      <button onClick={this.updateUser.bind(this, 'position')} className='cbp-l-loadMore-link btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase'>提交</button>
                                    </div>
                                </div>

                                <div className="col-lg-12  col-md-12 col-sm-12 col-xs-12" style={{marginBottom:'20px'}}>
                                    <label for="company" className="settingTile col-lg-3 col-md-3 col-sm-3 col-xs-1">公司</label> 
                                    <div className="settingTile col-lg-6 col-md-5 col-sm-5 col-xs-10">
                                      <input type="text" ref='company' className="form-control  c-square c-border-2px c-theme" id="company" placeholder="填写你的公司" {...company}/> 
                                    </div>
                                    <div className="settingTile  col-lg-3 col-md-4 col-sm-4 col-xs-10">
                                      <button onClick={this.focusInput.bind(this, 'company')} className='cbp-l-loadMore-link btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase'>编辑</button>
                                      <button onClick={this.updateUser.bind(this, 'company')} className='cbp-l-loadMore-link btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase'>提交</button>
                                    </div>
                                </div>

                                <div className="col-lg-12  col-md-12 col-sm-12 col-xs-12" style={{marginBottom:'20px'}}>
                                    <label for="sign" className="settingTile col-lg-3 col-md-3 col-sm-3 col-xs-1">个人签名</label> 
                                    <div className="settingTile col-lg-6 col-md-5 col-sm-5 col-xs-10">
                                      <input type="text" ref='sign' className="form-control  c-square c-border-2px c-theme" id="sign" placeholder="填写你的个人签名" {...sign}/> 
                                    </div>
                                    <div className="settingTile  col-lg-3 col-md-4 col-sm-4 col-xs-10">
                                      <button onClick={this.focusInput.bind(this, 'sign')} className='cbp-l-loadMore-link btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase'>编辑</button>
                                      <button onClick={this.updateUser.bind(this, 'sign')} className='cbp-l-loadMore-link btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase'>提交</button>
                                    </div>
                                </div>

                                <div className="col-lg-12  col-md-12 col-sm-12 col-xs-12" style={{marginBottom:'20px'}}>
                                    <label for="blog" className="settingTile col-lg-3 col-md-3 col-sm-3 col-xs-1">个人博客</label> 
                                    <div className="settingTile col-lg-6 col-md-5 col-sm-5 col-xs-10">
                                      <input type="text" ref='blog' className="form-control  c-square c-border-2px c-theme" id="blog" placeholder="填写你的个人博客" {...blog}/> 
                                    </div>
                                    <div className="settingTile  col-lg-3 col-md-4 col-sm-4 col-xs-10">
                                      <button onClick={this.focusInput.bind(this, 'blog')} className='cbp-l-loadMore-link btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase'>编辑</button>
                                      <button onClick={this.updateUser.bind(this, 'blog')} className='cbp-l-loadMore-link btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase'>提交</button>
                                    </div>
                                </div>

                            </div>
                            <div className="tab-pane fade" id="tab_16_2">
                                <div className="c-content-title-1 c-title-md c-margin-b-20">
                                  <h3 className="c-font-uppercase c-font-bold">账号关联</h3>
                                  <div className="c-content-divider c-divider-sm"></div>
                                </div>
                                <div className="col-lg-12  col-md-12 col-sm-12 col-xs-12" style={{marginBottom:'20px'}}>
                                    <label for="weixin" className="settingTile col-lg-3 col-md-3 col-sm-3 col-xs-1">
                                    <img src="https://gold-cdn.xitu.io/images/register-login/wechat.svg" className="inline account-icon"/>
                                     微信</label> 
                                    <div className="settingTile col-lg-6 col-md-5 col-sm-5 col-xs-10">
                                      <input type="text" ref='weixin' className="form-control  c-square c-border-2px c-theme" id="weixin" placeholder="填写你的微信号" {...weixin}/> 
                                    </div>
                                    <div className="settingTile  col-lg-3 col-md-4 col-sm-4 col-xs-10">
                                      <button onClick={this.focusInput.bind(this, 'weixin')} className='cbp-l-loadMore-link btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase'>编辑</button>
                                      <button onClick={this.updateUser.bind(this, 'weixin')} className='cbp-l-loadMore-link btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase'>绑定</button>
                                    </div>
                                </div>
                                                            

                                {/*<div className="col-lg-12  col-md-12 col-sm-12 col-xs-12" style={{marginBottom:'20px'}}>
                                    <label for="alipay" className="settingTile col-lg-3 col-md-3 col-sm-3 col-xs-1">支付宝</label> 
                                    <div className="settingTile col-lg-6 col-md-5 col-sm-5 col-xs-4">
                                      <input type="text" ref='alipay' className="form-control  c-square c-border-2px c-theme" id="alipay" placeholder="填写你的支付宝账号" {...alipay}/> 
                                    </div>
                                    <div className="settingTile col-md-3 col-sm-3 col-xs-3">
                                      <button onClick={this.focusInput.bind(this, 'alipay')} className='cbp-l-loadMore-link btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase'>编辑</button>
                                      <button onClick={this.updateUser.bind(this, 'alipay')} className='cbp-l-loadMore-link btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase'>绑定</button>
                                    </div>
                                </div>*/}

                                <div className="col-lg-12  col-md-12 col-sm-12 col-xs-12" style={{marginBottom:'20px'}}>
                                    <label for="githubname" className="settingTile col-lg-3 col-md-3 col-sm-3 col-xs-1">
                                    <img src="https://gold-cdn.xitu.io/images/register-login/github.svg" className="inline account-icon"/>
                                    Github</label> 
                                    <div className="settingTile col-lg-6 col-md-5 col-sm-5 col-xs-10">
                                      <input type="text" ref='githubname' className="form-control  c-square c-border-2px c-theme" id="githubname" placeholder="填写你的Github账号" {...githubname}/> 
                                    </div>
                                    <div className="settingTile  col-lg-3 col-md-4 col-sm-4 col-xs-10">
                                      <button onClick={this.focusInput.bind(this, 'githubname')} className='cbp-l-loadMore-link btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase'>编辑</button>
                                      <button onClick={this.updateUser.bind(this, 'githubname')} className='cbp-l-loadMore-link btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase'>绑定</button>
                                    </div>
                                </div>

                                <div className="col-lg-12  col-md-12 col-sm-12 col-xs-12" style={{marginBottom:'20px'}}>
                                    <label for="email" className="settingTile col-lg-3 col-md-3 col-sm-3 col-xs-1">
                                    <img src="https://gold-cdn.xitu.io/images/register-login/mail-icon.svg" className="inline account-icon"/>
                                        邮箱</label> 
                                    <div className="settingTile col-lg-6 col-md-5 col-sm-5 col-xs-10">
                                      <input type="text" ref='email' className="form-control  c-square c-border-2px c-theme" id="email" placeholder="填写你的邮箱" {...email}/> 
                                    </div>
                                    <div className="settingTile  col-lg-3 col-md-4 col-sm-4 col-xs-10">
                                      <button onClick={this.focusInput.bind(this, 'email')} className='cbp-l-loadMore-link btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase'>编辑</button>
                                      <button onClick={this.updateUser.bind(this, 'email')} className='cbp-l-loadMore-link btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase'>绑定</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

          </div>
        </div>

      </div>
    )
  }
}

export default reduxForm({
  form: 'setting',
  fields: ['name', 'position', 'company', 'sign', 'blog','weixin', 'alipay', 'githubname', 'email'],
},state => ({
  initialValues: state.userDetail.toJS()
}),
)(Setting);