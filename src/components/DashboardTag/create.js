import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'

const types = [
  { id: 1, label: 'topic', value:'topic'},
  { id: 2, label: 'article', value:'article'}
]

const renderOptions = () => types.map(option => <option key={option.id} value={option.value}>{option.label}</option>)


@reduxForm({
  form: 'tag',
  fields: ['name', 'type', 'description', 'sort', 'topicId'],
  initialValues:{}
})
export default class DashboardAddTag extends Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    msg: PropTypes.object.isRequired,
    topicList: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    values: PropTypes.object,
    fields: PropTypes.object,
    resetForm: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { actions } = this.props
    actions.getTopicList(false,{page:1,limit:1000})
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

    const { actions } = this.props
    actions.addTag(values)
  }

  render() {
    const { msg, actions, topicList, fields: { name, type, description, sort, topicId}, dirty,invalid, resetForm } = this.props

    return (
      <div className="admin-content">
        <div className="am-cf am-padding">
          <div className="am-fl am-cf">
            <Link to='/dashboard/tags'>
              <strong className="am-text-primary am-text-lg">标签</strong> / <small>新增</small>
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