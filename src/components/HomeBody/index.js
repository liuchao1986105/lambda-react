import React, { PropTypes, Component } from 'react'
import { Thumbnail} from 'amazeui-react';
import "./body.scss"
//import tiny from '../../assets/images/tiny.gif'
import Loding from '../Loding'

export default class HomeBody extends Component{
  constructor(props){
    super(props)
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    topicList:PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    firstLoad: PropTypes.bool.isRequired,
  }      

  _toTopic(topic_id){
    this.props.actions.toPage(`/topics/${topic_id}`)
  }

  render(){
    const {topicList, options, isFetching, firstLoad} = this.props

    return (
      <div className="container">
        <ul className="am-avg-sm-1 am-avg-md-2 am-avg-lg-3 am-thumbnails">
          {
            (isFetching && firstLoad) ?
            <Loding/>
            :
            (topicList.length > 0&&
              topicList.map((topic,i)=>
                <li key={i} style={{paddingLeft:'1rem'}}>
                  <div  style={{cursor:'pointer'}} onClick={this._toTopic.bind(this,topic._id)}>
                    <Thumbnail
                      src={`${topic.img}?imageslim&imageMogr2/thumbnail/400x220!`}>
                      <div>
                        <div style={{textAlign:'center'}}>
                          <a href="javascript:;"  className="title">{topic.title}</a>
                        </div>
                        <div className="collectCount">
                          {topic.numberOfArticles + topic.numberOfVideos + topic.numberOfBooks}&nbsp;&nbsp;收录资源&nbsp;&nbsp;|&nbsp;&nbsp;{topic.numberOfCollects + topic.defaultCollects}&nbsp;&nbsp;关注者
                        </div>
                        <div className="topicContent">
                          {topic.description}
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
    )
  }
}