import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import { Table } from 'amazeui-react';
import ConfirmDelete from '../Modal/confirmDelete'

export default class DashboardTag extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    actions:PropTypes.object.isRequired,
    tagList:PropTypes.object.isRequired,
  }

  componentDidUpdate(prevProps) {
    const {tagList} = prevProps
  }

  componentDidMount() {
    const { actions } = this.props
    actions.getTagList()
  }

  componentWillReceiveProps(nextProps){
    const {tagList} = this.props;
    const {tagList: nextTagList} = nextProps;
    /*if (nextTagList !== tagList) {
      this.props.actions.getTagList();
    }*/
  }

  _removeTag(topic_id){
    this.props.actions.deleteTag(topic_id)
  }

  render() {
    const {tagList: { items}} = this.props
    return (
      <div className="admin-content">
        <div className="am-cf am-padding">
          <div className="am-fl am-cf">
            <Link to='/dashboard/tags'>
              <strong className="am-text-primary am-text-lg">标签</strong> / <small>列表</small>
            </Link>
          </div>
        </div>

        <div className="am-g">
          <div className="am-u-md-6 am-cf">
            <div className="am-fl am-cf">
              <div className="am-btn-toolbar am-fl">
                <div className="am-btn-group am-btn-group-xs">
                  <Link to='/dashboard/tags/add' className="am-btn am-btn-default" ><span className="am-icon-plus"></span> 新增</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="am-u-md-3 am-cf">
            <div className="am-fr">
              <div className="am-input-group am-input-group-sm">
                <input type="text" className="am-form-field"/>
                    <span className="am-input-group-btn">
                      <button className="am-btn am-btn-default" type="button">搜索</button>
                    </span>
              </div>
            </div>
          </div>
        </div>


        <div className="am-g">
          <div className="am-u-sm-12">
              <table className="am-table am-table-striped am-table-hover table-main">
                <thead>
                  <tr>
                    <th>名称</th><th>类型</th><th>所属主题</th><th>描述</th><th>序号</th><th>创建日期</th><th>操作</th>
                  </tr>
                </thead>
                <tbody>
                {items.length > 0&&
                  items.map((tag,i)=>
                  <tr key={i}>
                    <td>{tag.name}</td>
                    <td>{tag.type}</td>
                    <td>{tag.topicId && tag.topicId.title　}</td>
                    <td>{tag.description}</td>
                    <td>{tag.sort}</td>
                    <td>{moment(tag.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
                    <td>
                      <div className="am-btn-toolbar">
                        <div className="am-btn-group am-btn-group-xs">
                          <Link to={`/dashboard/tags/edit/${tag._id}`}>
                            <button className="am-btn am-btn-default am-btn-xs am-text-secondary">
                              <span className="am-icon-pencil-square-o"></span> 编辑
                            </button>
                          </Link>
                          <ConfirmDelete  onClick={this._removeTag.bind(this,tag._id)}></ConfirmDelete>
                        </div>
                      </div>
                    </td>
                  </tr>
                  )
                }
                </tbody>
              </table>
          </div>
        </div>
      </div>
    );
  }
}