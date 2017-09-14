import React,{Component,PropTypes} from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import { Thumbnail, Image} from 'amazeui-react';
import "./explore.scss"

export default class FeedExplore extends Component {
  constructor(props){
    super(props)
  }
  
  static propTypes = {
    actions: PropTypes.object.isRequired,
    feedsList: PropTypes.object.isRequired,
  }

  _toFeed(id){
    this.props.actions.toPage(`/feed/show/${id}`)
  }

  _toSubscribeFeed(id){
    let res = $(ReactDOM.findDOMNode(this.refs['res_'+id])).text()
    let num = parseInt($(ReactDOM.findDOMNode(this.refs['sub_'+id])).text())
    if(res == 'true'){
      $(ReactDOM.findDOMNode(this.refs['sub_'+id])).text(num - 1)
      $(ReactDOM.findDOMNode(this.refs['btn_'+id])).text('订阅')
      $(ReactDOM.findDOMNode(this.refs['res_'+id])).text('false')
      this.props.actions.unsubcribeFeed(id)
    }else{
      $(ReactDOM.findDOMNode(this.refs['sub_'+id])).text(num + 1)
      $(ReactDOM.findDOMNode(this.refs['btn_'+id])).text('已订阅')
      $(ReactDOM.findDOMNode(this.refs['res_'+id])).text('true')
      this.props.actions.subcribeFeed(id)
    }

    
  }


  render() {
    const {feedsList: { items, isFetching, isMore }} = this.props
    return (
      <div className="col-md-9">
        <ul className="am-avg-sm-2 am-avg-md-3 am-avg-lg-4 am-thumbnails">
            {items.length > 0 &&
                items.map((item,i)=>
                  <li key={item._id}  style={{paddingLeft:'1rem'}}>
                    <div >
                      <Thumbnail>
                        <div>
                          <div style={{cursor:'pointer'}} onClick={this._toFeed.bind(this,item._id)}>
                            <div style={{textAlign:'center'}}>
                              <Image
                                src={item.favicon ? `${item.favicon}`: 'https://assets.lambda-study.com/lambda-user.png?imageView/1/w/1000/h/1000/q/80'}
                                width="60"
                                height="60"
                                circle />
                            </div>
                            <div className="explore_title">
                              <span>{item.title}</span>
                            </div>
                          </div>
                          <div className="feedCount">
                            <span ref={'sub_'+item._id}>{item.feedNum}</span>人订阅
                          </div>
                          <div className="descContent">
                              {item.description || item.title}
                          </div>
                          <span ref={'res_'+item._id} style={{display:'none'}}>{item.is_subscribe}</span>
                          <div className="feedCount">
                             <button ref={'btn_'+item._id} onClick={this._toSubscribeFeed.bind(this,item._id)} className="am-btn am-btn-success" style={{fontSize:'12px', paddingLeft:'10px', paddingRight:'10px'}}>{item.is_subscribe == 'true' ? '已订阅' : '订阅'}</button>
                          </div>
                        </div>
                      </Thumbnail>
                    </div>
                  </li>
                )
              }
        </ul>
      </div>
    );
  }
}