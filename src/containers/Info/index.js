import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import LoadMore from '../../components/LoadMore'
import * as Actions from '../../actions'
import { limtPage, qiniuImageUrl, Values} from '../../config'
import moment from 'moment'

const mapStateToProps = state =>{
  return {
    messageList: state.messageList.toJS(),
    auth: state.auth.toJS()
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)

export default class Info extends Component {
  constructor(props){
    super(props)
    this.state = {
      message_page: 1,
    }
  }

  static propTypes = {
    messageList: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  static fetchData({id}){
    return [
      Actions.getMessageList(false, {page: 1, limit: limtPage, user_id:id})
    ]
  }

  componentDidMount() {
    const { params: { id }, actions, auth } = this.props
    if(id){
      actions.getMessageList(false, {page: 1, limit: limtPage, user_id:id})
    }
    
    
  }

  handleMessagePageClick = (option) => {
    const { params: { id }, actions } = this.props
    const page = option.page
    this.setState({message_page: page })
    let messageoption = {page: page, limit: limtPage, user_id:id}

    actions.getMessageList(true, messageoption)
  };


  information(message){
    if(message.type=='collect'){
        return (
            <Link className="reply" to={`/articles/doc/${message.articleId && message.articleId._id}`}>查看</Link>                        
            )
    }else if(message.type=='comment' || message.type=='reply'){
        return (
            <a className="reply" target="_blank" href={`/articles/doc/${message.articleId && message.articleId._id}#comment-${message.commentId}`}>查看</a>                        
            )
    }
  }

  rendercontent(message, info){
    if(message.type == 'push'){
      return (
      <p>
        <span>专题<Link to={`/topics/${message.topicId && message.topicId._id}`}>{message.topicId && message.topicId.title}</Link> 向您推送了文章 <Link to={`/articles/doc/${message.articleId && message.articleId._id}`}>{message.articleId && message.articleId.title}</Link></span>
      </p>
      )
    }else if(message.type == 'pay'){
      return (
      <p >
        <span>您的好友<Link to={`/users/${message.authorId && message.authorId._id}`}>{message.authorId && message.authorId.name}</Link>接受了您的邀请成为会员，您将得到10元现金奖励</span>
      </p>
      )
    }else if(message.type == 'shareInfo'){
      return (
      <p >
        <span>系统通知：分享文章或书籍可获取10枚L币，分享视频资源可获取50枚L币，200L币可兑换任一专题的所有视频教程 <Link to={`/articles/share`}>&nbsp;&nbsp;分享资源</Link></span>
      </p>
      )
    }else if(message.type == 'confirm'){
      if(message.target == 'doc'){
        return (
          <div>
            <p>
              <span>Lambda已经审核通过了您的文章<Link to={`/articles/doc/${message.articleId && message.articleId._id}`}>{message.articleId && message.articleId.title}</Link></span><br/>
            </p>
            <p style={{fontSize:'14px'}}><span>您获得了{Values.article}枚L币</span></p>
          </div>
        )
      }else if(message.target == 'video'){
        return (
          <div>
            <p >
            <span>Lambda已经审核通过了您的视频教程<Link to={`/articles/doc/${message.articleId && message.articleId._id}`}>{message.articleId && message.articleId.title}</Link></span><br/>
            </p>
            <p style={{fontSize:'14px'}}><span>您获得了{Values.video}枚L币</span></p>
          </div>
        )
      }else if(message.target == 'book'){
        return (
          <div>
            <p >
            <span>Lambda已经审核通过了您的PDF书籍<Link to={`/articles/doc/${message.articleId && message.articleId._id}`}>{message.articleId && message.articleId.title}</Link></span><br/>
            </p>
            <p style={{fontSize:'14px'}}><span>您获得了{Values.book}枚L币</span></p>
          </div>
        )
      }
      
    }else{
      return (
      <p >
        <span><Link to={`/users/${message.authorId && message.authorId._id}`}>{message.authorId && message.authorId.name}</Link> {info[message.type]}了你的文章 <Link to={`/articles/doc/${message.articleId && message.articleId._id}`}>{message.articleId && message.articleId.title}</Link></span>
      </p>
      )
    }
  }

  render() {
    const { actions, messageList, auth, params: { id }, } = this.props

    //({messageList.total})
    const info = {
        comment: '评论',
        collect: '收藏',
        reply: '回复'
    }

    document.title=  '通知 - Lambda';
    return (
      <div className="c-layout-page">
        <div className="tab-content" style={{marginTop:'30px'}}>
            <div className="container">
              <div className="c-content-title-1">
                <h3 className="c-font-bold">通知</h3>
                <div className="c-line-left"></div>
              </div>
              <ul className="timeline-content">
              {messageList.items.length > 0 &&
                  messageList.items.map((message,i)=>
                      <li key={i} className="comment" style={{marginLeft:'20%',marginRight:'20%'}}>
                        <div className="avatar-container">
                          <div className="avatar">
                            <Link to={`/users/${message.authorId ? message.authorId._id : auth.user._id}`}>
                              <img src={( message.authorId ? message.authorId.headimgurl: auth.user.headimgurl)}/>
                            </Link>
                          </div>
                        </div>
                        {this.rendercontent(message,info)}
                        <div className="meta">
                          {this.information(message)}
                          <time>{moment(message.created_at).format('YYYY-MM-DD HH:mm:ss')}</time>
                        </div>
                      </li>
                  )
                }
              </ul>
              {(messageList.items.length > 0)&&<LoadMore options={{page: this.state.message_page}} isMore={messageList.isMore} isFetching={messageList.isFetching} addData={this.handleMessagePageClick.bind(this)} />}
            </div>
        </div>
      </div>
    )
  }
}