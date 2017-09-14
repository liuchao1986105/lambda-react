import React,{Component,PropTypes} from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions'
import FeedSidebar from '../../components/FeedSidebar'
import FeedMarked from '../../components/FeedMarked'


const mapStateToProps = state =>{
  return {
    auth: state.auth.toJS(),
    showmsg: state.showmsg.toJS(),
    myFeeds: state.myFeeds.toJS(),
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
    feedPostList: PropTypes.object.isRequired
  }

  static fetchData(id){
    return [
      Actions.getFeedPostList(false, {type: 'mark'})
    ]
  }

  componentDidMount() {
    const { actions } = this.props
    actions.getMyFeeds()
    actions.getFeedPostList(false, {type: 'mark'})
  }

  render() {
    const { showmsg, auth, actions, location, params, myFeeds, feedPostList } = this.props
    document.title = 'Rss订阅 - Lambda';
    return (
      <div>
        <div className="c-layout-page">
             <div className="c-content-box c-size-md">
                <div className="container">
                    <div className="row">
                        <FeedMarked msg={showmsg} actions={actions} feedPostList={feedPostList}/>
                        <FeedSidebar msg={showmsg}  actions={actions} myFeeds={myFeeds}/>
                    </div>
                </div>
            </div>
        </div>
      </div>

    );
  }
}