import React,{Component,PropTypes} from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions'
import FeedSidebar from '../../components/FeedSidebar'
import FeedExplore from '../../components/FeedExplore'


const mapStateToProps = state =>{
  return {
    auth: state.auth.toJS(),
    showmsg: state.showmsg.toJS(),
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
    feedsList: PropTypes.object.isRequired,
  }

  static fetchData(params){
    return [
        Actions.getMyFeeds(),
        Actions.getFeedsList(false, {page: 1, limit: 12}), 
    ]
  }

  componentDidMount() {
    const { actions} = this.props
    actions.getMyFeeds()
    actions.getFeedsList(false, {page: 1, limit: 12})
  }

  render() {
    const { showmsg, auth, actions, location, params, myFeeds, feedsList } = this.props
    document.title = 'Rss订阅 - Lambda';
    return (
      <div>
        <div className="c-layout-page">
             <div className="c-content-box c-size-md">
                <div className="container">
                    <div className="row">
                        <FeedExplore msg={showmsg} actions={actions} feedsList={feedsList}/>
                        <FeedSidebar msg={showmsg}  actions={actions} myFeeds={myFeeds}/>
                    </div>
                </div>
            </div>
        </div>
      </div>

    );
  }
}