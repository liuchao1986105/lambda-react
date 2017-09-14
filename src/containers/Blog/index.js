import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { limtPage} from '../../config'
import ArticleList from '../../components/Article/article_list'
import Loding from '../../components/Loding'
import moment from 'moment'
import _ from 'lodash'

const mapStateToProps = state =>{
  return {
    articleList: state.articleList.toJS(),
    auth: state.auth.toJS()
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)


export default  class Blog extends Component {
  constructor(props){
    super(props)
    this.state = {
      article_page: 1,
      firstLoad: true,
    }
  }

  static propTypes = {
    articleList: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  }

  static fetchData(){
    return [
      Actions.getArticleList(false, {page: 1, limit: limtPage, type:'blog'}), 
    ]
  }

  componentDidMount() {
    const { actions} = this.props
     
    actions.getArticleList(false, {page: 1, limit: limtPage,type:'blog'})
  }

  handleArticlePageClick = (option) => {
    const { actions } = this.props
    const page = option.page
    this.setState({article_page: page, firstLoad: false })
    let articleoption = {page: page, limit: limtPage, type:'blog'}
    actions.getArticleList(true, articleoption)
  };

  render() {
    const {actions, articleList} = this.props
    document.title=  'Lambda - 程序员学习社区'

    return (
      <div className="container" style={{marginTop:'50px'}}>
        <div className="row">
          <div className="col-md-12">
              {
                (articleList.isFetching  && this.state.firstLoad) ?
                <Loding/>
                :
                articleList.items.length > 0 &&
                  articleList.items.map((item,i)=>
                    <div className="c-content-blog-post-1-list">
                      <div className="c-content-blog-post-1">
                          <div className="c-media">
                              <div className="c-content-media-2-slider" data-slider="owl" data-single-item="true" data-auto-play="4000">
                                  <div className="owl-carousel owl-theme c-theme owl-single">
                                      <div className="item">
                                          <div class="c-content-media-2" style={{backgroundImage: `url(${item.shareurl})`,backgroundSize: '100% 100%', minHeight: '460px'}}> </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="c-title c-font-bold c-font-uppercase">
                              <a target='blank' href={'/articles/doc/'+item._id}>{item.title}</a>
                          </div>
                          <div className="c-desc"> {_.truncate(item.description,{'length': 100})}
                              <a target='blank' href={'/articles/doc/'+item._id} style={{color:'#32C5D2', fontSize:'14px', marginLeft:'10px'}}> 更多</a>
                          </div>
                          <div className="c-panel">
                              <div className="c-author">
                                <span className="">{item.authorId.name}</span>
                              </div>
                              <div className="c-date">
                                  <span className="c-font-uppercase">{moment(item.created_at).format('YYYY-MM-DD')}</span>
                              </div>
                              <div className="c-comments">
                                <i title='评论' className={"fa fa-comment"}></i> {item.comments.length}
                              </div>
                              <div className="c-comments">
                                <i title='浏览'  className={"fa fa-eye"}></i> {item.visitCount}
                              </div>
                          </div>
                      </div>
                    </div>
                  )   
              }
          </div>
        </div>
      </div>
    );
  }
}
