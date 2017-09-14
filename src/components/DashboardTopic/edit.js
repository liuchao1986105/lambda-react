import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions'

const mapStateToProps = state =>{
  return {
    topicDetail: state.topicDetail.toJS(),
    tagList: state.tagList.toJS()
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)


class DashboardEditTopic extends Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    topicDetail: PropTypes.object.isRequired,
    tagList: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    values: PropTypes.object,
    fields: PropTypes.object,
    resetForm: PropTypes.func.isRequired
  }

  static fetchData({id}){
    return [
      Actions.getTopicDetail(id),Actions.getTagList({type:'topic'})
    ]
  }

  componentDidMount() {
    const { params: { id },actions,topicDetail } = this.props
    this.fetchTopicData(id)
    actions.getTagList({type:'topic'})
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.params.id !== this.props.params.id){
      this.fetchTopicData(nextProps.params.id)
    }
  }

  fetchTopicData(id){
    const { actions} = this.props
    if(id){
      actions.getTopicDetail(id)
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
    const { values } = this.props
    if (!this._validateForm(values)) return

    const { actions, params: { id }} = this.props
    actions.updateTopic(id, values)
  }



  render() {
    const { msg, actions, tagList, topicDetail, fields: { title, price, description, img, score, url, tburl, sns,  password, top, tags, defaultCollects}, dirty,invalid, resetForm } = this.props
    return (
      <div className="admin-content">
        <div className="am-cf am-padding">
          <div className="am-fl am-cf">
            <Link to='/dashboard/topics'>
              <strong className="am-text-primary am-text-lg">主题Topic</strong> / <small>编辑</small>
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
            <label htmlFor="img" className="am-u-sm-2 am-form-label">图片</label>
            <div className="am-u-sm-10">
              <input type="text" id="img" className="am-form-field" placeholder="主题的图片"  {...img}/>
            </div>
          </div>
          <div className="am-form-group am-form-group-lg">
            <label htmlFor="score" className="am-u-sm-2 am-form-label">得分</label>
            <div className="am-u-sm-10">
              <input type="text" id="score" className="am-form-field"  {...score}/>
            </div>
          </div>

          <div className="am-form-group am-form-group-lg">
            <label htmlFor="price" className="am-u-sm-2 am-form-label">价格</label>
            <div className="am-u-sm-10">
              <input type="text" id="price" className="am-form-field"  {...price}/>
            </div>
          </div>

          <div className="am-form-group am-form-group-lg">
            <label htmlFor="img" className="am-u-sm-2 am-form-label"></label>
            <div className="am-u-sm-10">
              <input type="checkbox" {...top}/> 是否置顶
            </div>
          </div>

          <div className="am-form-group am-form-group-lg">
            <label htmlFor="defaultCollects" className="am-u-sm-2 am-form-label">默认关注人数</label>
            <div className="am-u-sm-10">
              <input type="text" id="defaultCollects" className="am-form-field"  placeholder="请填写数字" {...defaultCollects}/>
            </div>
          </div>

          <div className="am-form-group am-form-group-lg">
            <label htmlFor="img" className="am-u-sm-2 am-form-label">标签</label>
            <div className="am-u-sm-10">
              <select multiple {...tags}>
                {tagList.items.map(tag => <option key={tag._id} value={tag._id}>{tag.name}</option>)}
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
            <label htmlFor="tburl" className="am-u-sm-2 am-form-label">淘宝地址</label>
            <div className="am-u-sm-10">
              <input type="text" id="tburl" className="am-form-field"  {...tburl}/>
            </div>
          </div>

          <div className="am-form-group am-form-group-lg">
            <label htmlFor="sns" className="am-u-sm-2 am-form-label">云售</label>
            <div className="am-u-sm-10">
              <input type="text" id="sns" className="am-form-field"  {...sns}/>
            </div>
          </div>
          
          <div className="am-form-group am-form-group-lg">
            <label htmlFor="description" className="am-u-sm-2 am-form-label">描述</label>
            <div className="am-u-sm-10">
              <textarea className="am-form-field" rows="5" id="description" {...description}></textarea>
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
  form: 'topic',
  fields: ['title', 'description', 'img', 'price', 'top', 'tags', 'score', 'url', 'tburl', 'sns', 'password', 'defaultCollects'],
},state => ({
  initialValues: state.topicDetail.toJS()
}),
)(DashboardEditTopic);