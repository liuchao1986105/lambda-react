import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import ReactPaginate from 'react-paginate';
import moment from 'moment'
import { Table } from 'amazeui-react';
import { limtPage} from '../../config'
import ConfirmDelete from '../Modal/confirmDelete'


export default class DashboardArticle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      searchContent:''
    }
  }

  static propTypes = {
    actions:PropTypes.object.isRequired,
    articleList:PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { actions } = this.props
  /*  actions.changeOptions({'page':1})
    actions.getArticleList(false)*/
  }

  _removeArticle(article_id){
    this.props.actions.deleteArticle(article_id)
  }

  handleSearchContentChange(event) {
    this.setState({searchContent: event.target.value})
  }

  handleSearch(e){
    e.preventDefault()
    const {actions} = this.props
    actions.getArticleList(false, {page: 1, limit: limtPage, search: this.state.searchContent,from:'dashboard'})
  }


  handlePageClick = (data) => {
    const { actions } = this.props
    const option = {page: ++data.selected}
    option.search = this.state.searchContent
    option.from = 'dashboard'
    this.setState(option)

    actions.changeOptions(option)
    actions.getArticleList(false)
  };

  _toAddArticle(){
    window.location.href='/dashboard/articles/add'
  }

  _toEditArticle(article_id){
    window.location.href=`/dashboard/articles/edit/${article_id}`
  }

  render() {
    const {options, articleList: { items, isFetching, isMore, pagecount}} = this.props

    return (
      <div className="admin-content">
        <div className="am-cf am-padding">
          <div className="am-fl am-cf">
            <Link to='/dashboard/articles'>
              <strong className="am-text-primary am-text-lg">文章Article</strong> / <small>列表</small>
            </Link>
          </div>
        </div>

        <div className="am-g">
          <div className="am-u-md-6 am-cf">
            <div className="am-fl am-cf">
              <div className="am-btn-toolbar am-fl">
                <div className="am-btn-group am-btn-group-xs">
                  {/*<a href="javascript:;" className="am-btn am-btn-default" onClick={this._toAddArticle.bind(this)} ></a>*/}
                  <Link to='/dashboard/articles/add'><span className="am-icon-plus"></span> 新增</Link>
                </div>
              </div>
            </div>
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
                    <th>名称</th><th>所属主题</th><th>类型</th><th>得分</th><th>标签</th><th >视频地址</th><th>创建日期</th><th>操作</th>
                  </tr>
                </thead>
                <tbody>
                {items.length > 0&&
                  items.map((item,i)=>
                  <tr key={i}>
                    <td>{item.title}</td>
                    <td>{item.topicId && item.topicId.title}</td>
                    <td>{item.type}</td>
                    <td>{item.score}</td>
                    <td>{item.tags.length > 0 && 
                      item.tags.map((tag,t)=>
                      <span key={t}>{tag.name} /</span>)
                    }
                    </td>
                    <td><a target='_blank' href={item.url}>{item.url}</a></td>
                    <td>{moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
                    <td>
                      <div className="am-btn-toolbar">
                        <div className="am-btn-group am-btn-group-xs">
                          <Link to={`/dashboard/articles/edit/${item._id}`}>
                            <button className="am-btn am-btn-default am-btn-xs am-text-secondary">
                              <span className="am-icon-pencil-square-o"></span> 编辑
                            </button>
                          </Link>
                          <ConfirmDelete  text={(!item.active) ? '上架' : ''} onClick={this._removeArticle.bind(this,item._id)}></ConfirmDelete>
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