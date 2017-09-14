import React,{Component,PropTypes} from 'react'
import ReactPaginate from 'react-paginate';
import ReactDOM from 'react-dom'
import LoadMore from '../../components/LoadMore'
import moment from 'moment'
import Reply from './reply'
import ConfirmDelete from '../../components/Modal/confirmDelete'
import { limtPage, qiniuImageUrl } from '../../config'
import "./article.scss"

export default class Comment extends Component{
  constructor(props){
    super(props)
    this.state = {
      commentContent:'',
      current_page : 1,
      //commentNum: this.props.commentNum
    }
  }
  static propTypes = {
    commentList: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    article_id: PropTypes.string.isRequired,
    commentNum: PropTypes.number.isRequired,
  }

  showReply(k,nickname){
    //只有登录过的才可以回复
    const {auth, article_id} = this.props
    if(auth.token){
      const eleForm = this.refs['reply_form_'+k]
      const eleTextarea = eleForm.getElementsByTagName('textarea')[0]
      if(eleForm.className.indexOf('hide') != -1){
        eleForm.className = 'new-reply'
        eleTextarea.focus()
        this.refs['replyContent'+k].value = '@' + nickname + ' '
      }else{
        eleForm.className += ' hide'
      }
    }else{
      saveCookie('returnUrl', '/articles/doc/'+article_id)
      actions.toPage('/login')
    }
  }

  handleSubmitReply = (e, i) => {
    e.preventDefault()
    const content = this.refs['replyContent'+i].value
    if (!content) {
      this.props.actions.showMsg('回复内容不能为空')
      return false
    }

    const eleForm = this.refs['reply_form_'+i]
    eleForm.className += ' hide'
    //location.hash = 'commentTitle';
    this.refs['replyContent'+i].value = ' '
    //this.setState({commentNum: this.state.commentNum + 1})
    let commentNum = parseInt($(ReactDOM.findDOMNode(this.refs.comment_title)).text())
    $(ReactDOM.findDOMNode(this.refs.comment_title)).text(commentNum +1)

    const {actions, article_id} = this.props
    actions.addComment(article_id, content)
  }

  handleSubmit(e){
    e.preventDefault()
    if (!this.state.commentContent) {
      this.props.actions.showMsg('评论内容不能为空')
      return false
    }
    //location.hash = 'commentTitle';
    this.refs['commentContent'].value = ' '
    let commentNum = parseInt($(ReactDOM.findDOMNode(this.refs.comment_title)).text())
    $(ReactDOM.findDOMNode(this.refs.comment_title)).text(commentNum +1)

    this.setState({commentContent: ''})
    const {actions, article_id} = this.props
    //提交新评论
    actions.addComment(article_id, this.state.commentContent)
  }

  handleCommentContentChange(event) {
    this.setState({commentContent: event.target.value})
  }

  _toLogin(){
    this.props.actions.toPage("/login")
  }

  _toArticleComment(){
    location.hash = 'article_comment';
    $(ReactDOM.findDOMNode(this.refs.commentContent)).focus()
  }

  handleCommentPageClick = (option) => {
    const { actions, article_id } = this.props
    const page = option.page
    this.setState({current_page: page })
    actions.getCommentList(true, {page: page, limit: limtPage, articleId: article_id})
  }

  _removeComment(comment_id, i){
    const { actions, article_id, auth } = this.props
    //this.setState({commentNum: this.state.commentNum -1 })

    let commentNum = parseInt($(ReactDOM.findDOMNode(this.refs.comment_title)).text())
    $(ReactDOM.findDOMNode(this.refs.comment_title)).text(commentNum - 1)

    $(ReactDOM.findDOMNode(this.refs['comment_div_'+i])).remove()
    actions.deleteComment(comment_id, article_id, 'article')
  }

  render(){
    const {commentList, auth, authorId, commentNum} = this.props

    return(

      <div className="c-comments">
          <div className="c-content-title-1">
            <div className="commentDiv">
              <div id='commentTitle' className="c-title c-font-bold">评论(<span ref={'comment_title'} >{commentNum}</span>)</div>
              {
                auth.token &&
                <a  className="pull-right comment_a" href="javascript:;" onClick={this._toArticleComment.bind(this)}><i className="fa fa-pencil"></i>添加新评论</a>
              }
              </div>
            <div className="c-line-left"></div>
          </div>
          <div className="c-comment-list">
              {commentList.items.length > 0 &&
                commentList.items.map((comment,i)=>
                  <div id={'comment-'+comment._id} className="media" ref={'comment_div_'+i} key={i}>
                      <div className="media-left">
                          <a href={'/users/'+comment.authorId._id}>
                            <img className="media-object" title={comment.authorId.name} src={comment.authorId.headimgurl} /> 
                          </a>
                      </div>
                      <div className="media-body">
                        <h4>
                          <a href={'/users/'+comment.authorId._id} className="c-font-bold comment_name">{comment.authorId.name}</a>
                          <span className="c-date">{moment(comment.created_at).format('YYYY-MM-DD HH:mm:ss')}</span>
                          {
                            (auth.token) &&
                            <span>
                              <a className="pull-right comment_a" href="javascript:;" onClick={this.showReply.bind(this,i,comment.authorId.name)}>回复</a>
                              { (authorId == comment.authorId._id.toString()) &&
                                <ConfirmDelete  onClick={this._removeComment.bind(this,comment._id, i)} type='comment'></ConfirmDelete>
                              } 
                            </span>
                          }
                          
                        </h4>
                        <div dangerouslySetInnerHTML={{__html: comment.content}} />
                        <form className="new-reply hide" ref={'reply_form_'+i} id={'reply_form_'+i} onSubmit={e=>this.handleSubmitReply(e,i)}> 
                          <div className="comment-text"> 
                            <textarea className='reply-textarea' id={'replyContent'+i} 
                                    maxLength="2000" 
                                    ref={'replyContent'+i}
                                    placeholder="写下你的回复…"></textarea> 
                            <div>
                              <input type="submit" value="发 表" className="btn btn-sm c-theme-btn c-btn-square" /> 
                            </div> 
                          </div>
                        </form>
                      </div>
                  </div>
                )
              }
          </div>
          {/*(commentList.items.length > 0)&&<LoadMore options={{page: this.state.current_page}} isMore={commentList.isMore} isFetching={commentList.isFetching} addData={this.handleCommentPageClick.bind(this)} />*/}

          <div id='article_comment'>
            { auth.token ?
              <form onSubmit={this.handleSubmit.bind(this)} >
                <div className="form-group">
                    <textarea ref='commentContent' className="comment-textarea c-square" maxLength="2000" id='message' name="message" placeholder="发表评论 ..." onChange={this.handleCommentContentChange.bind(this)}></textarea>
                </div>
                <div className="form-group">
                  <button  type="submit" className="btn c-btn c-btn-square c-theme-btn c-font-bold c-font-uppercase c-font-white">提交</button>
                </div>
              </form>
            : 
              <div>
                <p>
                    <button className="btn c-theme-btn c-btn-uppercase btn-md c-btn-sbold btn-block c-btn-square" onClick={this._toLogin.bind(this)}>登录后发表评论</button>  
                </p>
              </div>
            }
          </div>

      </div>
    )

  }
}