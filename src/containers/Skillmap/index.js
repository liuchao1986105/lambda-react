import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions'

const mapStateToProps = state =>{
  return {
    globalVal: state.globalVal.toJS(),
    skillmapList: state.skillmapList.toJS(),
    auth: state.auth.toJS(),
    options: state.options.toJS()
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)

export default class Skillmap extends Component {
  constructor(props){
    super(props);
  }

  static propTypes = {
    skillmapList: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

 /* static fetchData(params){
    return [Actions.getSkillmapList()]
  }*/

  componentWillReceiveProps(nextProps){
  }

  componentDidMount() {
    //this.props.actions.getIndexImage()
  }

  loadMore(page){
    console.log("page:"+page)
    this.setState({page:page})
  }

  render() {
    // const { skillmapList:{items} } = this.props
    const items = [
        {
            "name": "Container",
            "url": "assets.lambda-study.com/skillmaps/Container.png"
        },
        {
            "name": "DevOps",
            "url": "assets.lambda-study.com/skillmaps/DevOps.png"
        },
        {
            "name": "Hadoop",
            "url": "assets.lambda-study.com/skillmaps/Hadoop.png"
        },
        {
            "name": "IOS",
            "url": "assets.lambda-study.com/skillmaps/IOS.png"
        },
        {
            "name": "OpenResty",
            "url": "assets.lambda-study.com/skillmaps/OpenResty.png"
        },
        {
            "name": "Secutiry",
            "url": "assets.lambda-study.com/skillmaps/Secutiry.png"
        },
        {
            "name": "云计算",
            "url": "assets.lambda-study.com/skillmaps/云计算.png"
        },
        {
            "name": "前端",
            "url": "assets.lambda-study.com/skillmaps/前端.png"
        },
        {
            "name": "大数据",
            "url": "assets.lambda-study.com/skillmaps/大数据.png"
        },
        {
            "name": "嵌入式",
            "url": "assets.lambda-study.com/skillmaps/嵌入式.png"
        },
        {
            "name": "微服务",
            "url": "assets.lambda-study.com/skillmaps/微服务.png"
        },
        {
            "name": "移动测试",
            "url": "assets.lambda-study.com/skillmaps/移动测试.png"
        },
        {
            "name": "编程语言",
            "url": "assets.lambda-study.com/skillmaps/编程语言.png"
        }
    ]

    return (
      <div className="c-layout-page">
        <div className="c-content-box c-size-md">
          <div className="container">
              <div className="cbp-panel">
                  <div id="grid-container" className="cbp cbp-l-grid-masonry-projects">

                    {items.length > 0&&
                      items.map((item,i)=>
                      <div key={i} className="cbp-item graphic logos identity web-design">
                          <div className="cbp-caption">
                              <div className="cbp-caption-defaultWrap">
                                  <img src={'https://' + items[i].url}/> </div>
                                 <div className="cbp-caption-activeWrap">
                                  <div className="c-masonry-border"></div>
                                  <div className="cbp-l-caption-alignCenter">
                                      <div className="cbp-l-caption-body">
                                          <a target="_blank" href={'https://' + items[i].url} className="cbp-l-loadMore-link btn cbp-l-caption-buttonLeft c-btn-square c-btn-border-1x c-btn-white c-btn-bold c-btn-uppercase">下载</a>
                                          <a href={'https://' + items[i].url} className="cbp-lightbox cbp-l-caption-buttonRight btn c-btn-square c-btn-border-1x c-btn-white c-btn-bold c-btn-uppercase" data-title={items[i].name}>浏览</a>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <span className="cbp-singlePage cbp-l-grid-masonry-projects-title">{items[i].name}</span>
                      </div>
                      )
                    }
                  </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}