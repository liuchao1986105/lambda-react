import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'

@reduxForm({
  form: 'info',
  fields: ['description'],
  initialValues:{}
})

export default class DashboardInfo extends Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    msg: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    values: PropTypes.object,
    fields: PropTypes.object,
    resetForm: PropTypes.func.isRequired
  }

  _validateForm(values) {
    if (!values.description) {
      this.props.actions.showMsg('发送消息不能为空')
      return false
    }
    return true
  }


  handleSubmit (e) {
    e.preventDefault();
    const { values, actions } = this.props
    if (!this._validateForm(values)) return

    actions.sendInfo(values)
  }

  componentDidMount() {
    const { actions } = this.props
    $(ReactDOM.findDOMNode(this.refs['description'])).focus()
  }

  render() {
    const { msg, actions,  fields: { description }, dirty,invalid, resetForm } = this.props
    return (
      <div className="admin-content">
        <div className="am-cf am-padding">
          <div className="am-fl am-cf">
            <strong className="am-text-primary am-text-lg">发送消息</strong>
          </div>
        </div>
        <form className="am-form am-form-horizontal" onSubmit={this.handleSubmit.bind(this)} >
          <div className="am-form-group am-form-group-lg">
            <label htmlFor="description" className="am-u-sm-2 am-form-label">消息内容</label>
            <div className="am-u-sm-10">
              <div id='content' >
                <div className='panel'>
                    <div className='inner post' >
                      <fieldset>
                        <span id="topic_create_warn"></span>
                        <div className='markdown_editor in_editor'>
                            <div className='markdown_in_editor'>
                              <textarea ref="description" rows='15' id="description" {...description} />
                            </div>
                        </div>
                      </fieldset>
                    </div>
                </div>
              </div>
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