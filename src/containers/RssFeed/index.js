import React,{Component,PropTypes} from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions'
import FeedSidebar from '../../components/FeedSidebar'
import FeedMain from '../../components/FeedMain'
import FeedIndex from '../../components/FeedIndex'
import FeedExplore from '../../components/FeedExplore'


const mapStateToProps = state =>{
  return {
    auth: state.auth.toJS(),
    showmsg: state.showmsg.toJS(),
    recentPostList: state.recentPostList.toJS(),
    myFeeds: state.myFeeds.toJS(),
    feedsList: state.feedsList.toJS(),
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)
export default class RssFeed extends Component {
  constructor(props){
    super(props);
  }

  static propTypes = {
    params: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    showmsg: PropTypes.object.isRequired,
    recentPostList: PropTypes.object.isRequired,
    myFeeds: PropTypes.object.isRequired,
    feedPostList: PropTypes.object.isRequired,
  }

  static fetchData(params){
    return [
        Actions.getRencentPostList(false, {}), 
        Actions.getMyFeeds(),
        Actions.getFeedsList(false, {page: 1, limit: 12}), 
    ]
  }

  componentDidMount() {
    const { actions} = this.props
    actions.getRencentPostList(false, {})
    actions.getMyFeeds()
    actions.getFeedsList(false, {page: 1, limit: 12})
  }

  render() {
    const { showmsg, auth, actions, location, params, recentPostList, myFeeds, feedsList } = this.props

    let content;
    if (location.pathname) {
      if(location.pathname.indexOf('feed/show') > 0){
        location.pathname = 'showFeed'
      }
      switch(location.pathname){
        case '/feed': 
          content = <FeedIndex actions={actions} recentPostList={recentPostList}/>
          break
        case 'showFeed':
           content = <FeedMain msg={showmsg} actions={actions} />
           break
        case '/feed/explore':
           content = <FeedExplore msg={showmsg} actions={actions} feedsList={feedsList}/>
           break
        default:
          content = <FeedIndex />
      }
    }
    return (
      <div>
        <div className="c-layout-page">
             <div className="c-content-box c-size-md">
                <div className="container">
                    <div className="row">
                        {content}
                        <FeedSidebar msg={showmsg}  actions={actions} myFeeds={myFeeds}/>
                    </div>
                </div>
            </div>
        </div>
      </div>

    );
  }
}