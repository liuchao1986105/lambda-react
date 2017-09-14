import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions'

const types = [
  { id: 1, label: 'topic', value:'topic'},
  { id: 2, label: 'article', value:'article'}
]

const renderOptions = () => types.map(option => <option key={option.id} value={option.value}>{option.label}</option>)


const mapStateToProps = state =>{
  return {
    tagDetail: state.tagDetail.toJS(),
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)


class DashboardEditTag extends Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    tagDetail: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    topicList: PropTypes.array.isRequired,
    msg: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    values: PropTypes.object,
    fields: PropTypes.object,
    resetForm: PropTypes.func.isRequired
  }

  static fetchData({id}){
    return [
      Actions.getTagDetail(id)
    ]
  }

  componentDidMount() {
    const { params: { id },actions,tagDetail } = this.props
    this.fetchTagData(id)
    actions.changeOptions({page: 1, limit:1000})
    actions.getTopicList(false)
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.params.id !== this.props.params.id){
      this.fetchTagData(nextProps.params.id)
    }
  }

  fetchTagData(id){
    const { actions} = this.props
    if(id){
      actions.getTagDetail(id)
    }
  }

  _validateForm(values) {
    if (!values.name) {
      this.props.actions.showMsg('名称不能为空')
      return false
    }

    return true
  }

  handleSubmit (e) {
    e.preventDefault();
    const { values } = this.props
    if (!this._validateForm(values)) return

    const { actions, params: { id }} = this.props
    actions.updateTag(id, values)
  }



  render() {
    const { msg, actions, topicList, fields: { name, type, description, sort, topicId}, dirty,invalid, resetForm } = this.props
    
    return (
      <div className="admin-content">
        <div className="am-cf am-padding">
          <div className="am-fl am-cf">
            <Link to='/dashboard/tags'>
              <strong className="am-text-primary am-text-lg">标签</strong> / <small>编辑</small>
            </Link>
          </div>
        </div>
        <form className="am-form am-form-horizontal" onSubmit={this.handleSubmit.bind(this)} >
          <div className="am-form-group am-form-group-lg">
            <label htmlFor="name" className="am-u-sm-2 am-form-label">名称</label>
            <div className="am-u-sm-10">
              <input type="text" id="name" className="am-form-field" {...name}/>                       
            </div>
          </div>
          <div className="am-form-group am-form-group-lg">
            <label htmlFor="type" className="am-u-sm-2 am-form-label">标签类型</label>
            <div className="am-u-sm-10">
              <select {...type}>
                <option/>
                {renderOptions()}
              </select>
            </div>
          </div>
          {type.value == "article" && 
            <div className="am-form-group am-form-group-lg">
              <label htmlFor="tags" className="am-u-sm-2 am-form-label">所属主题</label>
              <div className="am-u-sm-10">
                <select {...topicId}>
                  {topicList.map(topic => <option key={topic._id} value={topic._id}>{topic.title}</option>)}
                </select>
              </div>
            </div>
          }
          <div className="am-form-group am-form-group-lg">
            <label htmlFor="sort" className="am-u-sm-2 am-form-label">序号</label>
            <div className="am-u-sm-10">
              <input type="text" id="sort" className="am-form-field" placeholder="标签的序号"  {...sort}/>
            </div>
          </div>
          <div className="am-form-group am-form-group-lg">
            <label htmlFor="description" className="am-u-sm-2 am-form-label">描述</label>
            <div className="am-u-sm-10">
              <textarea className="am-form-field" rows="5" id="description" {...description}></textarea>
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
  form: 'topic',
  fields: ['name', 'type', 'description', 'sort', 'topicId'],
},state => ({
  initialValues: state.tagDetail.toJS()
}),
)(DashboardEditTag);