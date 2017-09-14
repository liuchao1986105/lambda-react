import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions'
import { defaultTopic } from '../../config'

const types = [
  { id: 1, label: '精选文章', value:'doc'},
  { id: 2, label: '视频教程', value:'video'},
  { id: 3, label: 'PDF书籍', value:'book'}
]

const renderOptions = () => types.map(option => <option key={option.id} value={option.value}>{option.label}</option>)


const mapStateToProps = state =>{
  return {
    topicList: state.topicList.toJS(),
    tagList: state.tagList.toJS(),
    msg: state.showmsg.toJS()
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)


class ArticleCreate extends Component {
  constructor(props){
    super(props)
    this.state = {topicId: '', type: 'doc', tags: [], defaultTopic: defaultTopic}
  }

  static propTypes = {
    msg: PropTypes.object.isRequired,
    topicList: PropTypes.object.isRequired,
    tagList: PropTypes.object.isRequired, //tagList需要动态获取，比如选择了topicID是redis的话就列出reidis的tag
    actions: PropTypes.object.isRequired,
    values: PropTypes.object,
    fields: PropTypes.object,
    resetForm: PropTypes.func.isRequired
  }

  _validateForm(values) {
    if (!values.title) {
      this.props.actions.showMsg('标题不能为空')
      return false
    }

    if (this.state.type == 'doc' && !values.shareurl) {
      this.props.actions.showMsg('分享地址不能为空')
      return false
    }

    if ((this.state.type == 'video' || this.state.type == 'book') && !values.url) {
      this.props.actions.showMsg('网盘地址不能为空')
      return false
    }

    return true
  }

  handleChange(topic_id) {
    this.setState({topicId: topic_id, tags: [], defaultTopic: ''})
    this.props.actions.getTagList({type:'article',topicId: topic_id})
  }

  handleTypeChange(e) {
    this.setState({type: e.target.value})
  }

  handleTag(tag_id){
    let index = this.state.tags.indexOf(tag_id)
    if( index > -1){
      this.state.tags.splice(index, 1);
    }else{
      this.state.tags.push(tag_id)
    }
    
    this.setState({tags: this.state.tags})
  }

  handleSubmit (e) {
    e.preventDefault();
    const { values, tagList} = this.props
    if (!this._validateForm(values)) return
    if(this.state.type == 'doc'){
      if(this.state.topicId){
        values.topicId = this.state.topicId
      }else{
        values.topicId = tagList.items[0].topicId
      }
    }
    
    values.tags = this.state.tags
    values.from = 'share'
    values.type = this.state.type

    const { actions } = this.props
    actions.addArticle(values, 'share')
  }

  static fetchData(params){
    return [Actions.getTopicList(false, {page:1,limit:1000}), Actions.getTagList({type:'article',topicName: defaultTopic})]
  }

  componentDidMount() {
    const { actions } = this.props
    actions.getTopicList(false, {page:1,limit:1000})
    actions.getTagList({type:'article',topicName: defaultTopic})
  }

  render() {
    const { msg, actions, topicList, tagList, fields: { title, type,  tags, shareurl, url, password}, dirty,invalid, resetForm } = this.props
    document.title = 'Lambda - 程序员学习社区'
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12" style={{marginTop:'30px'}}>
            <div className="c-comments">
                <div className="c-content-title-1">
                    <h3 className="c-font-bold">分享资源</h3>
                    <div className="c-line-left"></div>
                </div>
                <p className="c-font-bold" style={{fontSize:'12px', color:'#5C6873', paddingBottom:'10px'}}>感谢分享，资源的审核时间约1-2个工作日；审核通过后，文章和书籍可获取10枚L币，视频可获取50枚L币，200L币可兑换任一专题的所有视频教程</p>
                <form className="am-form am-form-horizontal" onSubmit={this.handleSubmit.bind(this)} >
                  <div className="am-form-group">
                    <select name='type' onClick={this.handleTypeChange.bind(this)} style={{width:'160px'}}>
                      {renderOptions()}
                    </select>
                  </div>

                  {
                    this.state.type == 'doc' &&
                    <div>
                      <div className="am-form-group am-form-group-lg">
                        <input type="text" id="url" className="am-form-field" placeholder="分享地址http://www.example.com/example"  {...shareurl}/>
                      </div>
                      
                      <div className="am-form-group am-form-group-lg">
                        <input type="text" id="title" className="am-form-field" placeholder="标题" {...title}/>                       
                      </div>

                      <div className="am-form-group am-form-group-lg">
                        <label htmlFor="topics" className="am-form-label">分类</label>
                        <div className="cbp-l-filters-buttonCenter" style={{marginBottom:'0px'}}>
                        {
                          topicList.items.map((topic)=>
                            <div className={'cbp-filter-item ' + ((this.state.topicId == topic._id || topic.title == this.state.defaultTopic)&&'cbp-filter-item-active')}  key={topic._id} onClick={this.handleChange.bind(this, topic._id)}> 
                              {topic.title}
                            </div>
                          )
                        }
                        </div>                    
                      </div>

                      {/*<div className="am-form-group am-form-group-lg">
                        <label htmlFor="tags" className="am-form-label">标签</label>
                        <div className="cbp-l-filters-buttonCenter" style={{marginBottom:'0px'}}>
                          {
                            tagList.items.map((tag)=>
                              <div className={'cbp-filter-item ' + ((this.state.tags.indexOf(tag._id) > -1)&&'cbp-filter-item-active')} key={tag._id} onClick={this.handleTag.bind(this, tag._id)}> 
                                {tag.name}
                              </div>
                            )
                          }
                        </div>                        
                      </div>*/}
                    </div>
                  }

                  {
                    (this.state.type == 'video' || this.state.type == 'book')  && 
                    <div>
                      <div className="am-form-group am-form-group-lg">
                        <input type="text" id="title" className="am-form-field" placeholder="标题" {...title}/>                       
                      </div>
                      <div className="am-form-group am-form-group-lg">
                        <input type="text" id="url" className="am-form-field" placeholder="网盘地址http://pan.baidu.com/..."  {...url}/>
                      </div>
                      <div className="am-form-group am-form-group-lg">
                        <input type="text" id="url" className="am-form-field" placeholder="网盘地址的密码"  {...password}/>
                      </div>
                      

                    </div>
                  }
             
                  <div className="form-group" style={{paddingTop:'20px'}}>

                  <button  type="submit" className="btn c-btn c-btn-square c-theme-btn c-font-bold c-font-uppercase c-font-white">提交</button>
         
                  {/*<button type="submit" className="btn c-theme-btn c-btn-uppercase btn-md c-btn-sbold btn-block c-btn-square">投稿</button> */}
                  </div>

                </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'article',
  fields: ['title', 'type',  'topicId', 'tags', 'shareurl', 'url', 'password'],
},state => ({}),
)(ArticleCreate);