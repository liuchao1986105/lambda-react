import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { limtPage} from '../../config'
import ArticleList from '../../components/Article/article_list'
import Loading from '../../components/Loding'
import '../Topics/topic.scss'

const mapStateToProps = state =>{
  return {
    globalVal: state.globalVal.toJS(),
    articleList: state.articleList.toJS(),
    options: state.options.toJS(),
    auth: state.auth.toJS()
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)

export default class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      article_page: 1,
      firstLoad: true
    }
  }

  static propTypes = {
    articleList: PropTypes.object.isRequired,
    globalVal: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  /*static fetchData({id}){
    return [
      Actions.getArticleList(false, {page: 1, limit: limtPage}), 
    ]
  }
*/
  componentDidMount() {
    const { actions, location, options } = this.props
    actions.getArticleList(false, {page: 1, limit: limtPage, type:'all', search: location.query.search})
    options.search = location.query.search
    actions.changeOptions(options)
  }

  handleArticlePageClick = (option) => {
    const { actions, options } = this.props
    const page = option.page
    this.setState({article_page: page, firstLoad: false  })
    let articleoption = {page: page, limit: limtPage, type:'all', search: options.search}
    actions.getArticleList(true, articleoption)
  };

  handleSearchContentChange(event) {
    const { actions, options } = this.props
    options.search = event.target.value
    actions.changeOptions(options)
  }

  handleSearch(e){
    e.preventDefault()    
    //this.refs['searchContent'].value = ' '

    const {actions, options} = this.props
    actions.getArticleList(false, {page: 1, limit: limtPage, search: options.search})
  }

  onEnterDown(e){
    if(e.keyCode == 13){
      this.handleSearch(e)
    }
  }

  render() {
    const {actions, articleList, auth, options} = this.props
    document.title=  'Lambda - 程序员学习社区'
    return (
      <div className="c-layout-page">
       <div className="c-content-box" style={{marginBottom:'15px'}}>
          <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="input-group input-group-lg c-square" style={{fontSize:'16px', width:'80%',left:'10%'}}>
                        <input  value={options.search} ref='searchContent' type="text" onKeyDown={this.onEnterDown.bind(this)} onChange={this.handleSearchContentChange.bind(this)} className="form-control c-square c-theme-border" placeholder="文章/学习视频/书籍..."/>
                        <span className="input-group-btn">
                            <button onClick={this.handleSearch.bind(this)} className="btn c-theme-btn c-theme-border c-btn-square c-font-bold"  type="button">搜索</button>
                        </span>
                  </div>

                  <div className="c-content-blog-post-card-1-grid">
                    <div className="c-content-tab-1 c-theme c-margin-t-30">
                            <div className="tab-content">
                              {
                                (articleList.isFetching  && this.state.firstLoad) ?
                                <Loading/>
                                :
                                ((articleList.items.length > 0) ?
                                  <div className="tab-pane active" id="all_posts">
                                    <ArticleList location={location} auth={auth} actions={actions} handleArticle={this.handleArticlePageClick.bind(this)} current_page={this.state.article_page} objectList={articleList}/>
                                  </div>
                                  :
                                  <div className="c-shop-cart-page-1 c-center" style={{marginTop:'150px'}}>
                                    <i className="fa fa-frown-o c-font-dark c-font-50 c-font-thin " style={{fontSize:'50px'}}></i>
                                    <h2 className="c-font-thin c-center">无搜索结果信息</h2>
                                  </div>
                                )
                              }
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