import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import ReactPaginate from 'react-paginate';
import moment from 'moment'
import { Table } from 'amazeui-react';
import { limtPage} from '../../config'
import ConfirmDelete from '../Modal/confirmDelete'


export default class DashboardUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      searchContent:''
    }
  }

  static propTypes = {
    actions:PropTypes.object.isRequired,
    userList:PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { actions } = this.props
  }

  _removeUser(user_id){
    this.props.actions.deleteUser(user_id)
  }

  handleSearchContentChange(event) {
    this.setState({searchContent: event.target.value})
  }

  handleSearch(e){
    e.preventDefault()
    const {actions} = this.props
    actions.getUserList(false, {page: 1, limit: limtPage, search: this.state.searchContent})
  }

  handlePageClick = (data) => {
    const { actions } = this.props
    const option = {page: ++data.selected}
    option.search = this.state.searchContent
    this.setState(option)

    actions.changeOptions(option)
    actions.getUserList(false)
  };

  render() {
    const {options, userList: { items, isFetching, isMore, pagecount, total}} = this.props

    return (
      <div className="admin-content">
        <div className="am-cf am-padding">
          <div className="am-fl am-cf">
            <Link to='/dashboard/users'>
              <strong className="am-text-primary am-text-lg">用户</strong> / <small>列表</small>
            </Link>
          </div>
        </div>

        <div className="am-g">
          <div className="am-u-md-6 am-cf">
            总用户: {total}
          </div>
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
                    <th>用户名</th><th>ID</th><th>Email</th><th>关注数</th><th>收藏数</th><th>分享数</th><th>得分</th><th>是否付费</th><th>支付日期</th><th>创建日期</th><th>操作</th>
                  </tr>
                </thead>
                <tbody>
                {items.length > 0&&
                  items.map((item,i)=>
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td><Link to={`/users/${item._id}`}>{item._id}</Link></td>
                    <td>{item.email}</td>
                    <td>{item.collectedTopics && item.collectedTopics.length}</td>
                    <td>{item.collectedArticles && item.collectedArticles.length}</td>
                    <td>{item.articleCount}</td>
                    <td>{item.score}</td>
                    <td>{item.isPayed ? '是': '否'}</td>
                    <td>{item.payTime &&　moment(item.payTime).format('YYYY-MM-DD HH:mm:ss')}</td>
                    <td>{moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
                    <td>
                      <div className="am-btn-toolbar">
                        <div className="am-btn-group am-btn-group-xs">
                          <Link to={`/dashboard/users/edit/${item._id}`}>
                            <button className="am-btn am-btn-default am-btn-xs am-text-secondary">
                              <span className="am-icon-pencil-square-o"></span> 编辑
                            </button>
                          </Link>
                          <ConfirmDelete onClick={this._removeUser.bind(this,item._id)}></ConfirmDelete>
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
                       clickCallback={this.handlePageClick}
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