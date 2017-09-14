import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import  MDEditor from '../../components/MDEditor'

const types = [
  { id: 1, label: 'doc', value:'doc'},
  { id: 2, label: 'video', value:'video'},
  { id: 3, label: 'book', value:'book'},
  { id: 4, label: 'ted', value:'ted'},
  { id: 5, label: 'class', value:'class'},
  { id: 6, label: 'blog', value:'blog'}
]

const renderOptions = () => types.map(option => <option key={option.id} value={option.value}>{option.label}</option>)


@reduxForm({
  form: 'article',
  fields: ['single', 'title', 'cover', 'isBanner', 'description', 'type', 'price', 'top', 'classImg', 'classDesc', 'classPeople', 'classJoined', 'classRepay', 'topicId', 'tags', 'url', 'shareurl', 'score', 'password'],
  initialValues:{}
})

export default class DashboardAddArticle extends Component {
  constructor(props){
    super(props)
    this.state = {topicId: '', value:''}
  }

  static propTypes = {
    msg: PropTypes.object.isRequired,
    topicList: PropTypes.array.isRequired,
    tagList: PropTypes.array.isRequired, //tagList需要动态获取，比如选择了topicID是redis的话就列出reidis的tag
    actions: PropTypes.object.isRequired,
    values: PropTypes.object,
    fields: PropTypes.object,
    resetForm: PropTypes.func.isRequired
  }

  _validateForm(values) {
    if (!values.title) {
      this.props.actions.showMsg('名称不能为空')
      return false
    }
    return true
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({topicId: event.target.value})
    this.props.actions.getTagList({type:'article',topicId: event.target.value})
  }

  handleSubmit (e) {
    e.preventDefault();
    const { values } = this.props
    if (!this._validateForm(values)) return
    if(this.state.topicId){
      values.topicId = this.state.topicId
    }

    //values.description = $(ReactDOM.findDOMNode(this.refs.editor)).text()
    values.description = this.state.value
    if(!values.score){
      values.score = 0
    }

    const { actions } = this.props
    actions.addArticle(values)
  }

  handleTextChange(value){
    this.setState({value: value});
  }

  componentDidMount() {
    const { actions } = this.props
    actions.getTopicList(false, {page:1,limit:1000})
  }

  render() {
    const { msg, actions, topicList, tagList, fields: { single, cover, title, isBanner, price, classImg, classDesc, classPeople, classJoined, classRepay, description, type, top, tags, url, shareurl, password, score}, dirty,invalid, resetForm } = this.props
    return (
      <div className="admin-content">
        <div className="am-cf am-padding">
          <div className="am-fl am-cf">
            <Link to='/dashboard/articles'>
              <strong className="am-text-primary am-text-lg">文章Article</strong> / <small>新增</small>
            </Link>
          </div>
        </div>
        <form className="am-form am-form-horizontal" onSubmit={this.handleSubmit.bind(this)} >
          <div className="am-form-group am-form-group-lg">
            <label htmlFor="title" className="am-u-sm-2 am-form-label">名称</label>
            <div className="am-u-sm-10">
              <input type="text" id="title" className="am-form-field" {...title}/>                       
            </div>
          </div>
          <div className="am-form-group am-form-group-lg">
            <label htmlFor="tags" className="am-u-sm-2 am-form-label">所属主题</label>
            <div className="am-u-sm-10">
              <select name="topicId"  onChange={this.handleChange.bind(this)}>
                <option/>
                {topicList.map(topic => <option key={topic._id} value={topic._id}>{topic.title}</option>)}
              </select>
            </div>
          </div>

          <div className="am-form-group am-form-group-lg">
            <label htmlFor="type" className="am-u-sm-2 am-form-label">文章类型</label>
            <div className="am-u-sm-10">
              <select {...type} >
                <option/>
                {renderOptions()}
              </select>
            </div>
          </div>

          <div className="am-form-group am-form-group-lg">
            <label htmlFor="top" className="am-u-sm-2 am-form-label"></label>
            <div className="am-u-sm-10">
              <input type="checkbox" {...top}/> 是否置顶
            </div>
          </div>


          <div className="am-form-group am-form-group-lg">
            <label htmlFor="single" className="am-u-sm-2 am-form-label"></label>
            <div className="am-u-sm-10">
              <input type="checkbox" {...single}/> 是否单卖
            </div>
          </div>


          <div className="am-form-group am-form-group-lg">
            <label htmlFor="isBanner" className="am-u-sm-2 am-form-label"></label>
            <div className="am-u-sm-10">
              <input type="checkbox" {...isBanner}/> 是否轮播
            </div>
          </div>

          <div className="am-form-group am-form-group-lg">
            <label htmlFor="cover" className="am-u-sm-2 am-form-label">封面</label>
            <div className="am-u-sm-10">
               <input type="text" id="cover" className="am-form-field"  {...cover}/>
            </div>
          </div>

          <div className="am-form-group am-form-group-lg">
            <label htmlFor="score" className="am-u-sm-2 am-form-label">得分</label>
            <div className="am-u-sm-10">
              <input type="text" id="score" className="am-form-field" {...score}/>                       
            </div>
          </div>

          <div className="am-form-group am-form-group-lg">
            <label htmlFor="tags" className="am-u-sm-2 am-form-label">标签</label>
            <div className="am-u-sm-10">
              <select multiple {...tags}>
                {tagList.map(tag => <option key={tag._id} value={tag._id}>{tag.name}</option>)}
              </select>
            </div>
          </div>

          <div className="am-form-group am-form-group-lg">
            <label htmlFor="url" className="am-u-sm-2 am-form-label">视频地址</label>
            <div className="am-u-sm-10">
              <input type="text" id="url" className="am-form-field"  {...url}/>
            </div>
          </div>

          <div className="am-form-group am-form-group-lg">
            <label htmlFor="password" className="am-u-sm-2 am-form-label">视频密码</label>
            <div className="am-u-sm-10">
              <input type="text" id="password" className="am-form-field"  {...password}/>
            </div>
          </div>

          <div className="am-form-group am-form-group-lg">
            <label htmlFor="shareurl" className="am-u-sm-2 am-form-label">文章地址</label>
            <div className="am-u-sm-10">
              <input type="text" id="shareurl" className="am-form-field"  {...shareurl}/>
            </div>
          </div>

          <div className="am-form-group am-form-group-lg">
            <label htmlFor="classImg" className="am-u-sm-2 am-form-label">实战头像</label>
            <div className="am-u-sm-10">
              <input type="text" id="classImg" className="am-form-field"  {...classImg}/>
            </div>
          </div>

          <div className="am-form-group am-form-group-lg">
            <label htmlFor="price" className="am-u-sm-2 am-form-label">实战价格</label>
            <div className="am-u-sm-10">
              <input type="text" id="price" className="am-form-field"  {...price}/>
            </div>
          </div>

          <div className="am-form-group am-form-group-lg">
            <label htmlFor="classPeople" className="am-u-sm-2 am-form-label">实战人数</label>
            <div className="am-u-sm-10">
              <input type="text" id="classPeople" className="am-form-field"  {...classPeople}/>
            </div>
          </div>

          <div className="am-form-group am-form-group-lg">
            <label htmlFor="classJoined" className="am-u-sm-2 am-form-label">实战已经参加人数</label>
            <div className="am-u-sm-10">
              <input type="text" id="classJoined" className="am-form-field"  {...classJoined}/>
            </div>
          </div>

          <div className="am-form-group am-form-group-lg">
            <label htmlFor="classRepay" className="am-u-sm-2 am-form-label">实战回报率</label>
            <div className="am-u-sm-10">
              <input type="text" id="classRepay" className="am-form-field"  {...classRepay}/>
            </div>
          </div>


          <div className="am-form-group am-form-group-lg">
            <label htmlFor="classDesc" className="am-u-sm-2 am-form-label">实战描述</label>
            <div className="am-u-sm-10">
              <input type="text" id="classDesc" className="am-form-field"  {...classDesc}/>
            </div>
          </div>

          <div className="am-form-group am-form-group-lg">
            <label htmlFor="description" className="am-u-sm-2 am-form-label">描述</label>
            <div className="am-u-sm-10">
              <div id='content' >
                <div className='panel'>
                    {/*<div className='inner post' >
                      <fieldset>
                        <span id="topic_create_warn"></span>
                        <div className='markdown_editor in_editor'>
                            <div className='markdown_in_editor'>
                              <textarea ref="editor" className='editor' name="description" rows='15' id="description" ></textarea>
                            </div>
                        </div>
                      </fieldset>
                    </div>*/}
                  <MDEditor value={this.state.value} onChange={this.handleTextChange.bind(this)}  />

                </div>
              </div>
            </div>
          </div>

          <div className="am-form-group">
            <div className="am-u-sm-10 am-u-sm-offset-2">
              <button style={{marginRight:'15px'}} type="submit" className="am-btn am-btn-default">提交</button>
              <button onClick={resetForm} className="am-btn am-btn-default">重置</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}