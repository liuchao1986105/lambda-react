import React,{Component,PropTypes} from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions'
import FeedSidebar from '../../components/FeedSidebar'
import FeedIndex from '../../components/FeedIndex'

const mapStateToProps = state =>{
  return {
    auth: state.auth.toJS(),
    showmsg: state.showmsg.toJS(),
    recentPostList: state.recentPostList.toJS(),
    myFeeds: state.myFeeds.toJS(),
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
    recentPostList: PropTypes.object.isRequired,
    myFeeds: PropTypes.object.isRequired,
  }

  static fetchData(params){
    return [
        Actions.getRencentPostList(false, {}), 
        Actions.getMyFeeds(),
    ]
  }

  componentDidMount() {
    const { actions} = this.props
    actions.getRencentPostList(false, {})
    actions.getMyFeeds()
  }

  render() {
    const { showmsg, auth, actions, location, params, recentPostList, myFeeds } = this.props
    document.title = 'Rss订阅 - Lambda';
    return (
      <div>
        <div className="c-layout-page">
             <div className="c-content-box c-size-md">
                <div className="container">
                    <div className="row">
                        <FeedIndex actions={actions} recentPostList={recentPostList}/>
                        <FeedSidebar msg={showmsg}  actions={actions} myFeeds={myFeeds}/>
                    </div>
                </div>
            </div>
        </div>
      </div>

    );
  }
}