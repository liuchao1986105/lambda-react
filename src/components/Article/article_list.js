import React,{Component,PropTypes} from 'react'
import { customTime } from '../../utils'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import LoadMore from '../../components/LoadMore'
import { saveCookie } from '../../utils/authService'
import { Link } from 'react-router'
import { qiniuImageUrl } from '../../config'
import './article.scss'

export default class ArticleList extends Component{
  static propTypes = {
    handleArticle: PropTypes.func.isRequired,
    objectList: PropTypes.object.isRequired,
    banner_img: PropTypes.string,
    current_page: PropTypes.number,
    actions: PropTypes.object.isRequired,
    location: PropTypes.object,
    auth: PropTypes.object,
  }

  _toArticle(url, article_id){
    window.open(url)
    // 阅读量加1
    let num = parseInt($(ReactDOM.findDOMNode(this.refs['readCount_'+article_id])).text())
    $(ReactDOM.findDOMNode(this.refs['readCount_'+article_id])).text(num +1)

    this.props.actions.getArticleDetail(article_id)
  }

  _toLambdaArticle(article_id){
    //windon.location.href = 
    let num = parseInt($(ReactDOM.findDOMNode(this.refs['readCount_'+article_id])).text())
    $(ReactDOM.findDOMNode(this.refs['readCount_'+article_id])).text(num +1)
    window.open('/articles/doc/'+article_id)
  }

  toggleLike(id){
    const {actions, auth, location} = this.props

    if(auth.token){
      if(_.indexOf(auth.user.collectedArticles, id) > -1){
        let num = parseInt($(ReactDOM.findDOMNode(this.refs['article_'+id])).text())
        if(num > 0 ){
          $(ReactDOM.findDOMNode(this.refs['article_'+id])).text(num - 1)
          $(ReactDOM.findDOMNode(this.refs['heart_'+id])).addClass('c-font-red')
          actions.toggleArticleDeLike(id, num - 1)
        }

      }else{
        let num = parseInt($(ReactDOM.findDOMNode(this.refs['article_'+id])).text())
        $(ReactDOM.findDOMNode(this.refs['article_'+id])).text(num + 1)
        $(ReactDOM.findDOMNode(this.refs['heart_'+id])).removeClass('c-font-red')
        actions.toggleArticleLike(id, num + 1)
      }
    }else{
      saveCookie('returnUrl', location.pathname)
      actions.toPage('/login')
    }
  }

  toggleComment(id){
    const {actions, auth, location} = this.props

    if(auth.token){
      window.open('/articles/doc/'+id)
    }else{
      saveCookie('returnUrl', location.pathname)
      actions.toPage('/login')
    }
  }

  render(){
    const {current_page,banner_img,objectList,handleArticle, auth, location} = this.props

    const isInTopc = location.pathname.indexOf("topics") > -1 

    return (
      <div>
        <ul className="c-content-recent-posts-1" style={{marginBottom:'20px'}}>
          {objectList.items.length > 0 &&
            objectList.items.map((item,i)=>
              <li key={item._id}>
                <div className="c-image">
                  <Link to={`/users/${item.authorId._id}`}>
                    <img src={item.authorId.headimgurl+'?imageslim'}  className="img-responsive avatar2"/>
                  </Link>
                </div>
                <div className="articleTitle">
                  <div style={{width:'85%'}}>
                    {
                      (item.type == 'doc' || item.type == 'ted') ?
                      <a href='javascript:;' style={{fontSize:'16px', fontWeight:'bold'}} onClick={this._toArticle.bind(this, item.shareurl, item._id)}>{item.title}</a>
                      :
                      <a href='javascript:;' style={{fontSize:'16px', fontWeight:'bold'}} onClick={this._toLambdaArticle.bind(this, item._id)}>{item.title}</a> 
                    }
                    
                    <div className="c-date">
                      {
                        item.top && 
                        <span className="put_good">精</span>
                      }
                      {
                        item.single && 
                        <span className="single_good">单售</span>
                      }
                      
                      <Link to={`/users/${item.authorId._id}`}>
                        <span style={{fontSize:'12px', marginRight:'7px'}}>{ item.authorId.name }</span>
                      </Link>

                      <span style={{fontSize:'12px'}}>{ customTime(item.created_at) }</span>

                      <span style={{marginLeft:'12px'}}>
                        {
                          (auth.token && auth.user) ?
                          <a href="javascript:;" onClick={this.toggleLike.bind(this, item._id)} style={{fontSize:'12px'}}>
                            <i  ref={'heart_'+item._id} title= {(_.indexOf(auth.user.collectedArticles, item._id) > -1) ? '取消收藏' : '收藏' } className={"fa fa-heart " + ((_.indexOf(auth.user.collectedArticles, item._id) > -1)  && 'c-font-red')} ></i>
                            <span ref={'article_'+item._id}>{item.collectCount}</span>
                          </a>
                          :
                          <a href="javascript:;" onClick={this.toggleLike.bind(this, item._id)} style={{fontSize:'12px'}}>
                            <i ref={'heart_'+item._id} title='收藏' className={"fa fa-heart "} ></i>
                            <span ref={'article_'+item._id}>{item.collectCount}</span>
                          </a>
                        }           
                      </span>

                      <span style={{marginLeft:'12px'}}>
                        <a href="javascript:;" onClick={this.toggleComment.bind(this, item._id)} style={{fontSize:'12px'}}>
                          <i title='评论' className={"fa fa-comment"}></i>
                          <span>{item.comments.length}</span>
                        </a>
                      </span>

                      {
                        isInTopc && 
                        (
                          item.tags && 
                            item.tags.map((tag, i) =>
                              <span key={tag._id} className="articletags">{tag.name}</span>
                            )
                        )
                      }
                      
                      { (!isInTopc  && item.type !="post") &&
                        <Link to={`/topics/${item.topicId && item.topicId._id}`}><span className="articletags">{item.topicId &&　item.topicId.title}</span></Link>
                      }
                    </div>
                  </div>
                  <div className="readCount" ref={'readCount_'+item._id} >
                    {item.visitCount}
                  </div>
                </div>
              </li>
            )
          }
        </ul>
      
        {(objectList.items.length > 0)&&<LoadMore options={{page: current_page}} isMore={objectList.isMore} isFetching={objectList.isFetching} addData={handleArticle.bind(this)} />}
        {/*<div className="c-pagination">
          <ReactPaginate previousLabel={<i className='fa fa-angle-left'></i>}
               nextLabel={<i className='fa fa-angle-right'></i>}
               breakLabel={<span>...</span>}
               pageNum={objectList.pagecount}
               marginPagesDisplayed={2}
               pageRangeDisplayed={5}
               initialSelected={current_page - 1}
               clickCallback={handleArticle.bind(this)}
               containerClassName={"c-content-pagination c-theme"}
               activeClassName={"c-active"} />
        </div>*/}
      </div> 
    )
  }
}