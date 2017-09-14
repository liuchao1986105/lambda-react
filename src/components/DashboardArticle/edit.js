import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions'
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


const mapStateToProps = state =>{
  return {
    articleDetail: state.articleDetail.toJS(),
    
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)


class DashboardEditArticle extends Component {
  constructor(props){
    super(props)
    this.state = {
      description :'',
      value:''
    }
  }

  static propTypes = {
    articleDetail: PropTypes.object.isRequired,
    tagList: PropTypes.array.isRequired,
    topicList: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    values: PropTypes.object,
    fields: PropTypes.object,
    resetForm: PropTypes.func.isRequired
  }

  static fetchData({id}){
    return [
      Actions.getArticleDetail(id), Actions.getTopicList(false, {page:1,limit:1000})
    ]
  }

  componentDidMount() {
    const { params: { id }, actions, articleDetail} = this.props
    const { fields: { description} } = this.props
    //if(!articleDetail._id || articleDetail._id !== id){
      this.fetchArticleData(id)
    //}
    
    actions.getTopicList(false, {page:1,limit:1000})
  }

  componentDidUpdate() {
    const { articleDetail} = this.props
    //$(ReactDOM.findDOMNode(this.refs.editor)).text(articleDetail.description)
  }


  componentWillReceiveProps(nextProps){
    if (nextProps.params.id !== this.props.params.id){
      this.fetchArticleData(nextProps.params.id)
    }
  }

  handleChange(event) {
    event.preventDefault();
    const { actions, articleDetail} = this.props
    articleDetail.topicId = event.target.value
    actions.changeArticleTopicId(articleDetail)
    actions.getTagList({type:'article', topicId: event.target.value})
  }


  fetchArticleData(id){
    const { actions} = this.props
    if(id){
      actions.getArticleDetail(id)
    }
  }

  _validateForm(values) {
    if (!values.title) {
      this.props.actions.showMsg('名称不能为空')
      return false
    }

    return true
  }

  handleSubmit (e) {
    e.preventDefault();
    const { values, articleDetail } = this.props
    if (!this._validateForm(values)) return
    if(articleDetail.type != 'blog' && articleDetail.type != 'post'){
      values.topicId = this.props.articleDetail.topicId
    }
    
    //values.description = $(ReactDOM.findDOMNode(this.refs.editor)).text()
    values.description = this.props.articleDetail.description

    const { actions, params: { id }} = this.props
    actions.updateArticle(id, values)
  }

  handleTextChange(value){
    //this.setState({value: value});
    this.props.actions.changeDesc(value)
  }



  render() {
    const { msg, actions, topicList, tagList, fields: { cover, single, title, isBanner, price, classImg, classDesc, classPeople, classJoined, classRepay, description, type, top, tags, url, password, shareurl, score}, dirty,invalid, resetForm } = this.props
    const { params: { id }, articleDetail} = this.props

    return (
      <div className="admin-content">
        <input type='hidden' id='targetId' name='targetId' value={id}/>
        <input type='hidden' id='targetValue' name='targetValue' value={description.value}/>
        <div className="am-cf am-padding">
          <div className="am-fl am-cf">
            <Link to='/dashboard/articles'>
              <strong className="am-text-primary am-text-lg">文章Article</strong> / <small>编辑</small>
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

          {
            (articleDetail.type != 'post' && articleDetail.type != 'blog') && 
            <div className="am-form-group am-form-group-lg">
              <label htmlFor="tags" className="am-u-sm-2 am-form-label">所属主题</label>
              <div className="am-u-sm-10">
                <select name="topicId"  value={articleDetail.topicId && articleDetail.topicId._id} onChange={this.handleChange.bind(this)}>
                  <option/>
                  {topicList.map(topic => <option key={topic._id} value={topic._id}>{topic.title}</option>)}
                </select>
              </div>
            </div>
          }


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

          {
            (articleDetail.type == 'video' || articleDetail.type == 'book') &&
            (
            <div>
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
                  <label htmlFor="price" className="am-u-sm-2 am-form-label">价格</label>
                  <div className="am-u-sm-10">
                    <input type="text" id="price" className="am-form-field"  {...price}/>
                  </div>
                </div>
            </div>
            )
          }


          {
            (articleDetail.type == 'doc' || articleDetail.type == 'ted' || articleDetail.type == 'blog')  &&
            (
              <div>
                <div className="am-form-group am-form-group-lg">
                  <label htmlFor="shareurl" className="am-u-sm-2 am-form-label">文章地址</label>
                  <div className="am-u-sm-10">
                    <input type="text" id="shareurl" className="am-form-field"  {...shareurl}/>
                  </div>
                </div>
              </div>
            )
          }

          {
            (articleDetail.type == 'class')  &&
            (
              <div>
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
              </div>
            )
          }

          <div className="am-form-group am-form-group-lg">
            <label htmlFor="description" className="am-u-sm-2 am-form-label">描述</label>
            <div className="am-u-sm-10">
              <div id='content' >
                <div className='panel'>
                  <MDEditor value={articleDetail.description} onChange={this.handleTextChange.bind(this)}  />
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


export default reduxForm({
  form: 'article',
  fields: ['single', 'title', 'cover', 'isBanner', 'description', 'type', 'price', 'classDesc','classImg', 'classPeople', 'classJoined', 'classRepay', 'topicId', 'top', 'tags', 'url', 'shareurl', 'password', 'score'],
},state => ({
  initialValues: state.articleDetail.toJS()
}),
)(DashboardEditArticle);

