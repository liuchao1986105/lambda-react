import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions'


const roles = [
  { id: 1, label: 'user', value:'user'},
  { id: 2, label: 'admin', value:'admin'},
]

const renderOptions = () => roles.map(option => <option key={option.id} value={option.value}>{option.label}</option>)

const mapStateToProps = state =>{
  return {
    userDetail: state.userDetail.toJS(),
    topicList: state.topicList.toJS(),
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)


class DashboardEditUser extends Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    userDetail: PropTypes.object.isRequired,
    topicList: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    values: PropTypes.object,
    fields: PropTypes.object,
    resetForm: PropTypes.func.isRequired
  }

  static fetchData({id}){
    return [
      Actions.getUserDetail(id), Actions.getTopicList(false, {page:1,limit:1000})
    ]
  }

  componentDidMount() {
    const { params: { id },actions,userDetail } = this.props
    this.fetchUserData(id)
    actions.getTopicList(false, {page:1,limit:1000})
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.params.id !== this.props.params.id){
      this.fetchUserData(nextProps.params.id)
    }
  }

  fetchUserData(id){
    const { actions} = this.props
    if(id){
      actions.getUserDetail(id)
    }
  }

  _validateForm(values) {
    if (!values.name) {
      this.props.actions.showMsg('用户名不能为空')
      return false
    }

    return true
  }

  handleSubmit (e) {
    e.preventDefault();
    const { values } = this.props
    if (!this._validateForm(values)) return

    const { actions, params: { id }} = this.props
    actions.updateUser(id, values, 'dashboard')
  }



  render() {
    const { msg, actions, userDetail, topicList, fields: { name, headimgurl, score, isPayed, role, payedTopics }, dirty,invalid, resetForm } = this.props
    return (
      <div className="admin-content">
        <div className="am-cf am-padding">
          <div className="am-fl am-cf">
            <Link to='/dashboard/users'>
              <strong className="am-text-primary am-text-lg">用户管理</strong> / <small>编辑</small>
            </Link>
          </div>
        </div>
        <form className="am-form am-form-horizontal" onSubmit={this.handleSubmit.bind(this)} >
          <div className="am-form-group am-form-group-lg">
            <label htmlFor="name" className="am-u-sm-2 am-form-label">用户名</label>
            <div className="am-u-sm-10">
              <input type="text" id="name" className="am-form-field" {...name}/>                       
            </div>
          </div>
          <div className="am-form-group am-form-group-lg">
            <label htmlFor="headimgurl" className="am-u-sm-2 am-form-label">头像</label>
            <div className="am-u-sm-10">
              <input type="text" id="headimgurl" className="am-form-field" placeholder="头像"  {...headimgurl}/>
            </div>
          </div>
          <div className="am-form-group am-form-group-lg">
            <label htmlFor="img" className="am-u-sm-2 am-form-label"></label>
            <div className="am-u-sm-10">
              <input type="checkbox" {...isPayed}/> 是否付款
            </div>
          </div>

          <div className="am-form-group am-form-group-lg">
            <label htmlFor="score" className="am-u-sm-2 am-form-label">score</label>
            <div className="am-u-sm-10">
              <input type="text" id="score" className="am-form-field"  placeholder="请填写数字" {...score}/>
            </div>
          </div>

          <div className="am-form-group am-form-group-lg">
            <label htmlFor="role" className="am-u-sm-2 am-form-label">用户角色</label>
            <div className="am-u-sm-10">
              <select {...role} >
                <option/>
                {renderOptions()}
              </select>
            </div>
          </div>

          <div className="am-form-group am-form-group-lg">
            <label htmlFor="payedTopics" className="am-u-sm-2 am-form-label">标签</label>
            <div className="am-u-sm-10">
              <select multiple {...payedTopics}>
                {topicList.items.map(topic => <option key={topic._id} value={topic._id}>{topic.title}</option>)}
              </select>
            </div>
          </div>


          <div className="am-form-group">
            <div className="am-u-sm-10 am-u-sm-offset-2">
              <button style={{marginRight:'15px'}} type="submit" className="am-btn am-btn-default">提交</button>
              <button onClick={resetForm} className="am-btn am-btn-default">重置</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}


export default reduxForm({
  form: 'user',
  fields: ['name', 'headimgurl', 'score', 'isPayed', 'role', 'payedTopics'],
},state => ({
  initialValues: state.userDetail.toJS()
}),
)(DashboardEditUser);