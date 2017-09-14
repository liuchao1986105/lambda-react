import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import * as Actions from '../../actions'
import ConfirmDelete from '../Modal/confirmDelete'

const mapStateToProps = state =>{
  return {
    commentDetail: state.commentDetail.toJS(),
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)


export default class DashboardCommentReplys extends Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    commentDetail: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  static fetchData({id}){
    return [
      Actions.getCommentDetail(id)
    ]
  }

  componentDidMount() {
    const { params: { id }, actions, commentDetail } = this.props
    this.fetchCommentData(id)
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.params.id !== this.props.params.id){
      this.fetchCommentData(nextProps.params.id)
    }
  }

  fetchCommentData(id){
    const { actions} = this.props
    if(id){
      actions.getCommentDetail(id)
    }
  }

  _removeReply(comment_id,reply_id){
    this.props.actions.deleteReply(comment_id,reply_id)
  }

  render() {
    const { actions, commentDetail, params:{id}} = this.props

    return (
      <div className="admin-content">
        <div className="am-cf am-padding">
          <div className="am-fl am-cf">
            <Link to='/dashboard/comments'>
              <strong className="am-text-primary am-text-lg">评论</strong> / <small>回复</small>
            </Link>
          </div>
        </div>

        <div className="am-g">
          <div className="am-u-sm-12">
              <table className="am-table am-table-striped am-table-hover table-main">
                <thead>
                  <tr>
                    <th>内容</th><th>用户名</th><th>回复日期</th><th>操作</th>
                  </tr>
                </thead>
                <tbody>
                {commentDetail.replys && commentDetail.replys.length > 0&&
                  commentDetail.replys.map((reply,i)=>
                  <tr key={i}>
                    <td>{reply.content}</td>
                    <td>{reply.user_info.name}</td>
                    <td>{moment(reply.created).format('YYYY-MM-DD HH:mm:ss')}</td>
                    <td>
                      <div className="am-btn-toolbar">
                        <div className="am-btn-group am-btn-group-xs">
                          <ConfirmDelete  onClick={this._removeReply.bind(this,id,reply._id)}></ConfirmDelete>
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
