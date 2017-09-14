import React,{Component,PropTypes} from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions'
import FeedSidebar from '../../components/FeedSidebar'
import FeedMain from '../../components/FeedMain'


const mapStateToProps = state =>{
  return {
    auth: state.auth.toJS(),
    showmsg: state.showmsg.toJS(),
    myFeeds: state.myFeeds.toJS(),
    feedDetail: state.feedDetail.toJS(),
    feedPostList: state.feedPostList.toJS()
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)
export default class Feed extends Component {
  constructor(props){
    super(props);
  }

  static propTypes = {
    params: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    showmsg: PropTypes.object.isRequired,
    myFeeds: PropTypes.object.isRequired,
    feedDetail: PropTypes.object.isRequired,
    feedPostList: PropTypes.object.isRequired
  }

  static fetchData(id){
    return [
      Actions.getFeedDetail(id),
      Actions.getFeedPostList(false, {feed_id:id})
    ]
  }

  componentDidMount() {
    const { params: { id }, actions, feedDetail} = this.props
    actions.getMyFeeds()

    if(!feedDetail._id || feedDetail._id !== id){
      if(id){
        actions.getFeedDetail(id)
        actions.getFeedPostList(false, {feed_id:id})
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.params.id !== this.props.params.id){
      this.props.actions.getFeedDetail(nextProps.params.id)
      this.props.actions.getFeedPostList(false, {feed_id:nextProps.params.id})
    }
  }


  render() {
    const { showmsg, auth, actions, location, params, myFeeds, feedDetail, feedPostList } = this.props
    document.title = 'Rss订阅 - Lambda';
    return (
      <div>
        <div className="c-layout-page">
             <div className="c-content-box c-size-md">
                <div className="container">
                    <div className="row">
                        <FeedMain msg={showmsg} actions={actions} feedDetail={feedDetail} feedPostList={feedPostList}/>
                        <FeedSidebar msg={showmsg}  actions={actions} myFeeds={myFeeds}/>
                    </div>
                </div>
            </div>
        </div>
      </div>

    );
  }
}