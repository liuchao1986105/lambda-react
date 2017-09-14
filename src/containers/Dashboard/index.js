import React,{Component,PropTypes} from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions'
import DashboardHeader from '../../components/DashboardHeader'
import DashboardSidebar from '../../components/DashboardSidebar'
import DashboardIndex from '../../components/DashboardIndex'
import DashboardTopic from '../../components/DashboardTopic'
import DashboardAddTopic from '../../components/DashboardTopic/create'
import DashboardEditTopic from '../../components/DashboardTopic/edit'
import DashboardTag from '../../components/DashboardTag'
import DashboardAddTag from '../../components/DashboardTag/create'
import DashboardEditTag from '../../components/DashboardTag/edit'
import DashboardArticle from '../../components/DashboardArticle'
import DashboardAddArticle from '../../components/DashboardArticle/create'
import DashboardEditArticle from '../../components/DashboardArticle/edit'
import DashboardComment from '../../components/DashboardComment'
import DashboardCommentReplys from '../../components/DashboardComment/replys'
import DashboardUser from '../../components/DashboardUser'
//import DashboardAddUser from '../../components/DashboardUser/create'
import DashboardEditUser from '../../components/DashboardUser/edit'
import DashboardInfo from '../../components/DashboardInfo'

const mapStateToProps = state =>{
  return {
    auth: state.auth.toJS(),
    topicList: state.topicList.toJS(),
    articleList: state.articleList.toJS(),
    commentList: state.commentList.toJS(),
    userList: state.userList.toJS(),
    tagList: state.tagList.toJS(),
    showmsg: state.showmsg.toJS(),
    options: state.options.toJS(),
    commentOptions: state.commentOptions.toJS(),
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)
export default class Dashboard extends Component {
  constructor(props){
    super(props);
  }

  static propTypes = {
    params: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    topicList: PropTypes.object.isRequired,
    articleList: PropTypes.object.isRequired,
    userList: PropTypes.object.isRequired,
    commentList: PropTypes.object.isRequired,
    tagList: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
    commentOptions: PropTypes.object.isRequired,
    showmsg: PropTypes.object.isRequired
  }

  static fetchData(params){
    return [Actions.getTopicList(false), Actions.getTagList(), Actions.getArticleList(false), Actions.getCommentList(false), Actions.getUserList(false)]
  }

  componentDidMount() {
    const { actions, tagList} = this.props
    actions.changeOptions({'page':1})


    actions.getTopicList(false)
    actions.getArticleList(false,'','dashboard')
    //if(tagList.items.length < 1){
    actions.getTagList()
    //}
    actions.getCommentList(false)
    actions.getUserList(false)
  }

  render() {
    const { showmsg, auth, actions, location, userList, topicList, articleList, tagList, commentList, options, commentOptions, params } = this.props

    let content;
    if (location.pathname) {
      if(location.pathname.indexOf('topics/edit') > 0){
        location.pathname = '/dashboard/editTopic'
      }else if(location.pathname.indexOf('tags/edit') > 0){
        location.pathname = '/dashboard/editTag'
      }else if(location.pathname.indexOf('articles/edit') > 0){
        location.pathname = '/dashboard/editArticle'
      }else if(location.pathname.indexOf('replys') > 0){
        location.pathname = '/dashboard/commentReplys'
      }else if(location.pathname.indexOf('users/edit') > 0){
        location.pathname = '/dashboard/editUser'
      }

      switch(location.pathname){
        case '/dashboard': 
          content = <DashboardIndex/>
          break
        case '/dashboard/topics': 
          content = <DashboardTopic actions={actions} topicList={topicList} options={options}/>
          break
        case '/dashboard/topics/add':
          content = <DashboardAddTopic msg={showmsg} actions={actions} />
          break
        case '/dashboard/editTopic':
          content = <DashboardEditTopic msg={showmsg} actions={actions} params={params}/>
          break
        case '/dashboard/articles': 
          content = <DashboardArticle actions={actions} articleList={articleList}  options={options}/>
          break
        case '/dashboard/articles/add': 
          content = <DashboardAddArticle msg={showmsg} tagList={tagList.items} topicList={topicList.items} actions={actions}/>
          break
        case '/dashboard/editArticle':
          content = <DashboardEditArticle msg={showmsg} actions={actions} params={params} topicList={topicList.items}  tagList={tagList.items}/>
          break
        case '/dashboard/users': 
          content = <DashboardUser actions={actions} userList={userList}   options={options}/>
          break
        case '/dashboard/users/add': 
          content = <DashboardAddUser msg={showmsg} actions={actions} />
          break
        case '/dashboard/editUser':
          content = <DashboardEditUser msg={showmsg} actions={actions}  params={params}/>
          break
        case '/dashboard/tags': 
          content = <DashboardTag actions={actions} tagList={tagList}/>
          break
        case '/dashboard/tags/add':
          content = <DashboardAddTag msg={showmsg} topicList={topicList.items} actions={actions}/>
          break
        case '/dashboard/editTag':
          content = <DashboardEditTag msg={showmsg} topicList={topicList.items} actions={actions} params={params}/>
          break
        case '/dashboard/comments': 
          content = <DashboardComment actions={actions} commentList={commentList} options={commentOptions}/>
          break
        case '/dashboard/commentReplys': 
          content = <DashboardCommentReplys actions={actions} params={params}/>
          break
        case '/dashboard/infos': 
          content = <DashboardInfo actions={actions} msg={showmsg}/>
          break
        default:
          content = <DashboardIndex />
      }
    }
    return (
      <div>
        <DashboardHeader/>
        <div className="am-cf admin-main">
          <DashboardSidebar/>
          {content}
        </div>
      </div>

    );
  }
}