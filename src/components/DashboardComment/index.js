import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import ReactPaginate from 'react-paginate';
import moment from 'moment'
import { Table } from 'amazeui-react';
import { limtPage} from '../../config'
import ConfirmDelete from '../Modal/confirmDelete'

export default class DashboardComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      searchContent:''
    }
  }

  static propTypes = {
    actions:PropTypes.object.isRequired,
    commentList:PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { actions } = this.props
  }

  _removeComment(comment_id,article_id){
    this.props.actions.deleteComment(comment_id,article_id)
  }

  handleSearchContentChange(event) {
    this.setState({searchContent: event.target.value})
  }

  handleSearch(e){
    e.preventDefault()
    const {actions} = this.props
    actions.getCommentList(false, {page: 1, limit: limtPage, search: this.state.searchContent, from: 'dashboard'})
  }

  handlePageClick = (data) => {
    const { actions } = this.props
    const option = {page: ++data.selected}
    option.search = this.state.searchContent
    this.setState(option)

    actions.changeCommentOptions(option)
    actions.getCommentList(false)
  };

  render() {
    const {options, commentList: { items, isFetching, pagecount}} = this.props

    return (
      <div className="admin-content">
        <div className="am-cf am-padding">
          <div className="am-fl am-cf">
            <Link to='/dashboard/comments'>
              <strong className="am-text-primary am-text-lg">评论</strong> / <small>列表</small>
            </Link>
          </div>
        </div>

        <div className="am-g">
          <div className="am-u-md-3 am-cf">
            <div className="am-fr">
              <div className="am-input-group am-input-group-sm">
                <input ref='searchContent' className="am-form-field" type="text" onChange={this.handleSearchContentChange.bind(this)}/>
                    <span className="am-input-group-btn">
                      <button onClick={this.handleSearch.bind(this)} className="am-btn am-btn-default" type="button">搜索</button>
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
                    <th>文章名</th><th>文章ID</th><th>用户名</th><th>评论</th><th>创建日期</th><th>操作</th>
                  </tr>
                </thead>
                <tbody>
                {items.length > 0&&
                  items.map((item,i)=>
                  <tr key={i}>
                    <td><a target="_blank" href={`/articles/doc/${item._id}`}>{item.articleId.title}</a></td>
                    <td>{item.articleId._id}</td>
                    <td>{item.authorId.name}</td>
                    <td>{item.content}</td>
                    {/*<td><Link to={`/dashboard/comments/${item._id}/replys`}>{item.replys ? item.replys.length: 0}</Link></td>*/}
                    <td>{moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
                    <td>
                      <div className="am-btn-toolbar">
                        <div className="am-btn-group am-btn-group-xs">
                          <ConfirmDelete  onClick={this._removeComment.bind(this,item._id,item.articleId._id)}></ConfirmDelete>
                        </div>
                      </div>
                    </td>
                  </tr>
                  )
                }
                </tbody>
              </table>


              <div className="am-cf">
                <div className="am-fr">
                  <ReactPaginate previousLabel={"«"}
                       nextLabel={"»"}
                       breakLabel={<span>...</span>}
                       pageNum={pagecount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       initialSelected={this.state.page-1}
                       clickCallback={this.handlePageClick.bind(this)}
                       containerClassName={"am-pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"am-active"} />
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}