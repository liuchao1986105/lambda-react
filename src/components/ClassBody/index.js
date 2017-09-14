import React, { PropTypes, Component } from 'react'
import { Thumbnail } from 'amazeui-react';
import "../HomeBody/body.scss"
//import tiny from '../../assets/images/tiny.gif'
import Loding from '../Loding'

export default class ClassBody extends Component{
  constructor(props){
    super(props)
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    articleList:PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    firstLoad: PropTypes.bool.isRequired,
  }      

  _toArticle(article_id){
    this.props.actions.toPage(`/articles/class/${article_id}`)
  }

  render(){
    const {articleList, isFetching, firstLoad} = this.props
    return (
      <div className="container">
        <ul className="am-avg-sm-1 am-avg-md-2 am-avg-lg-3 am-thumbnails">
          {
            (isFetching && firstLoad) ?
            <Loding/>
            :
            (
              articleList.length > 0&&
                articleList.map((article,i)=>
                  <li key={i} style={{paddingLeft:'1rem'}}>
                    <div  style={{cursor:'pointer'}} onClick={this._toArticle.bind(this,article._id)}>
                      <Thumbnail
                        src={article.classImg && `${article.classImg}?imageslim&imageMogr2/thumbnail/400x220!`}>
                        <div className='classDiv'>
                          <div style={{textAlign:'center'}}>
                            <a href="javascript:;"  className="title">{article.title}</a>
                          </div>
                            {
                              (article.classPeople == article.classJoined) ?
                              <span className="classSpan">众筹成功</span>
                              :
                              <span className="classSpan">正在众筹中</span>
                            }
                          <div className="collectCount">
                            &nbsp;&nbsp;筹款目标:<span style={{color:'#32C5D2', fontWeight:'bold'}}>{article.price}元</span>&nbsp;&nbsp;|&nbsp;&nbsp;目标人数:<span style={{color:'#32C5D2', fontWeight:'bold'}}>{article.classPeople}</span>人&nbsp;&nbsp;
                            |&nbsp;&nbsp;已参与人数:<span style={{color:'#32C5D2', fontWeight:'bold'}}>{article.classJoined}人</span>
                          </div>
                          <div className="topicContent">
                            {article.classDesc}
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