import React,{Component,PropTypes} from 'react'
import { Thumbnail, Image, Badge} from 'amazeui-react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {  feedBgUrl } from '../../config'
import "../FeedMain/feedmain.scss"
import Loding from '../Loding'
import { timeago} from '../../utils/timeago'

export default class FeedMain extends Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    feedPostList: PropTypes.object.isRequired
  }

  _toFeed(link){
    window.open(link)
  }

  toggleReaded(id){
    const { actions } = this.props
    actions.togglePost(id,{type:'read'})
    actions.getMyFeeds()
  }


  _toArticle(id, link){
    const {actions} = this.props
    this.toggleReaded(id)
    window.open(link)
  }

  render() {
    const {feedDetail, feedPostList: { items, isFetching, isMore }} = this.props
    return (
      <div className="col-md-9">
        <div className="c-content-box c-size-md c-no-padding">
          <div>
            <ul className="am-avg-sm-1 am-avg-md-2 am-avg-lg-3 am-thumbnails">
            {
              (isFetching) ?
              <Loding/>
              :
              (items.length > 0&&
                items.map((item,i)=>
                  <li key={i} style={{paddingLeft:'1rem'}}>
                    <div>
                      <Link to={`/feed/show/${item.feed_id}`} style={{textAlign:'left'}}>
                          <Image
                            src={item.favicon || ''}
                            width="15"
                            height="15"
                            circle />
                          <span style={{fontSize:'14px',fontWeight:'bold'}}>{item.feed_title}</span>
                        </Link>
                      <Thumbnail
                        src={`${item.description}?imageslim&imageMogr2/thumbnail/400x220!`}>
                        <div>
                          <div style={{textAlign:'center'}} className="c-title c-font-bold c-font-uppercase">
                            <a href='javascript:;' onClick={this._toArticle.bind(this, item._id, item.link)}>{item.title}</a>
                          </div>
                          <div className="topicContent">
                            <a href='javascript:;' onClick={this._toArticle.bind(this, item._id, item.link)}>{item.summary}</a>
                          </div>
                          <div className="c-panel" >
                              <i className="fa fa-clock-o"></i><span style={{marginLeft:'5apx',fontSize:'10px',fontColor:'#FFFFFF'}}>{timeago(item.pubdate)}</span>
                          </div>
                        </div>
                      </Thumbnail>
                    </div>
                  </li>
                )
              )
            }
          </ul>
          </div>
        </div>

      </div>
    );
  }
}