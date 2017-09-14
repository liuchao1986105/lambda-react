import React,{Component,PropTypes} from 'react'
import { Thumbnail} from 'amazeui-react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {  feedBgUrl } from '../../config'
import "./feedmain.scss"
import ReactEcharts from 'echarts-for-react'; 
import _ from 'underscore'
import Loding from '../Loding'
import { timeago} from '../../utils/timeago'

export default class FeedMain extends Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    feedDetail:PropTypes.object.isRequired,
    feedPostList: PropTypes.object.isRequired
  }

  _toFeed(link){
    window.open(link)
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

  toggleReaded(id){
    const {actions, auth, feedDetail} = this.props
    $(ReactDOM.findDOMNode(this.refs['read_'+id])).attr("class", "fa fa-check c-font-blue")
    $(ReactDOM.findDOMNode(this.refs['atitle_'+id])).attr("title", "已读")
    let num = parseInt($(ReactDOM.findDOMNode(this.refs['unread_'+feedDetail._id])).text())
    $(ReactDOM.findDOMNode(this.refs['unread_'+feedDetail._id])).text(num - 1)

    actions.togglePost(id,{type:'read'})
    actions.getMyFeeds()

  }

  toggleMarked(id , ismark){
    const {actions} = this.props
    if(!ismark){
      $(ReactDOM.findDOMNode(this.refs['amark_'+id])).attr("title", "取消收藏")
      $(ReactDOM.findDOMNode(this.refs['mark_'+id])).addClass('c-font-red')
    }else{
      $(ReactDOM.findDOMNode(this.refs['amark_'+id])).attr("title", "收藏")
      $(ReactDOM.findDOMNode(this.refs['mark_'+id])).removeClass('c-font-red')
    }
    actions.togglePost(id,{type:'mark', revert: true})
  }

  _toArticle(id, link){
    const {actions} = this.props
    this.toggleReaded(id)
    window.open(link)
  }

  render() {
    const {feedDetail, feedPostList: { items, isFetching, isMore }} = this.props
    let option = {
      color: ['#2f4554'],
      tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis : [
          {
              type : 'category',
              name : '月份',
              nameLocation: 'middle',
              nameGap:20,
              data : [],  //'2017-04', '2017-03', '2017-02', '2017-01', '2016-12', '2016-11', '2016-10'
              axisTick: {
                  alignWithLabel: true
              }
          }
      ],
      yAxis : [
          {
              type : 'value',
              name : '最近更新文章数',
              nameLocation: 'middle',
              nameGap:30
          }
      ],
      series : [
          {
              name:'直接访问',
              type:'bar',
              barWidth: '60%',
              data:[]   //10, 15, 17, 17, 77, 77, 100
          }
      ],
      tooltip: {
        formatter: '{b0}  <strong>{c0}篇</strong>'
      },
    }

    let  array = []
    _.each(_.groupBy(items, 'pubdate'), (value, key) => {
      const date = key.slice(0, 7)
      let exist = false
      _.each(array, value => {
        if (value.label === date) {
          value.value++
          exist = true
        }
      })
      if (!exist) {
        array.push({
          label: date,
          value: 1,
        })
      }
    })
    array = _.sortBy(array, 'label').reverse()
    option.series[0].data = _.pluck(array, 'value');
    option.xAxis[0].data = _.pluck(array, 'label');

    return (
      <div className="col-md-9">
        <div className="feedheader" style={{backgroundImage: `url(${feedBgUrl})`}}>
          <div>
            <div className="thumb-lg pull-left m-r">
              <img className="r-3x" src="http://7xiyp4.com2.z0.glb.qiniucdn.com/site-57713b7c3677dbc4306f5dd8-avatar?imageMogr2/gravity/Center/thumbnail/!100x100"/>
              <span ref={'res_'+feedDetail._id} style={{display:'none'}}>{feedDetail.is_subscribe}</span>
              <p className="text-center m-t-sm">
                <a className="btn btn-success btn-sm" ref={'btn_'+feedDetail._id} onClick={this._toSubscribeFeed.bind(this,feedDetail._id)}>{feedDetail.is_subscribe == 'true' ? '已订阅' : '订阅'}</a>
              </p>
            </div>
            <div className="clear m-b">
              <div className="m-b-sm">
                <span className="text-black">
                  <a href='javascript:;' onClick={this._toFeed.bind(this, feedDetail.link)}>{feedDetail.title}</a>
                </span>
              </div>
              <p className="feed-desc">网址: {feedDetail.link}</p>
              <p className="feed-desc">订阅源: {feedDetail.absurl}</p>
            </div>
          </div>
          <div>
            <div className="text-center s-fc-333">
              <span className="m-b-md inline m"><span className="block font-bold" ref={'sub_'+feedDetail._id}>{feedDetail.feedNum}</span><small>人已订阅</small></span>
              <span className="m-b-md inline m"><span className="block font-bold" ref={'unread_'+feedDetail._id}>{feedDetail.unread}</span><small>未读</small></span>
              <span className="m-b-md inline m"><span className="block font-bold">{feedDetail.count}</span><small>篇文章</small></span>
            </div>
          </div>
        </div>


        <div className="c-content-box c-size-md c-no-padding">
          <div className="c-shop-product-tab-1" role="tabpanel">
              <div>
                  <ul className="nav nav-justified" role="tablist">                  
                      <li className="active">
                          <a className="c-font-bold" href="#tab-2" data-toggle="tab" role="tab">统计</a>
                      </li>
                      <li>
                          <a className="c-font-bold" href="#tab-3" data-toggle="tab" role="tab">文章</a>
                      </li>
                  </ul>
              </div>
              <div className="tab-content">
                  <div role="tabpanel" className="tab-pane fade in active" id="tab-2">
                      <div>
                          <div className="cbp-l-filters-buttonCenter" >
                            <ReactEcharts 
                                option={option} 
                                style={{height: '400px', width: '100%'}}  
                             />
                          </div> 
                      </div>
                  </div>
                  <div role="tabpanel" className="tab-pane fade" id="tab-3">
                      <div >
                          <div className="tab-pane active" >
                            <ul className="am-avg-sm-1 am-avg-md-2 am-avg-lg-3 am-thumbnails">
                            {
                              (isFetching) ?
                              <Loding/>
                              :
                              (items.length > 0&&
                                items.map((item,i)=>
                                  <li key={i} style={{paddingLeft:'1rem'}}>
                                    <div>
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
                                              <div style={{float:'right' }}>
                                                <a title={item.mark ? '取消收藏' : '收藏' } ref={'amark_'+item._id} href="javascript:;" style={{marginRight:'10px'}} onClick={this.toggleMarked.bind(this, item._id, item.mark)}>
                                                  <i className={"fa fa-heart " + (item.mark && 'c-font-red')} ref={'mark_'+item._id}></i>
                                                </a>
                                                {
                                                  item.read ?
                                                  <i title="已读"  className={"fa fa-check  c-font-blue"} ></i>
                                                  :
                                                  <a title="标记为已读" ref={'atitle_'+item._id} href="javascript:;" onClick={this.toggleReaded.bind(this, item._id)}>
                                                    <i className={"fa fa-times "} ref={'read_'+item._id}></i>
                                                  </a>
                                                }
                                                
                                              </div>
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
              </div>
          </div>
        </div>

      </div>
    );
  }
}