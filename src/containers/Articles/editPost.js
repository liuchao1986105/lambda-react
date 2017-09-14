import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions'
import  MDEditor from '../../components/MDEditor'

const mapStateToProps = state =>{
  return {
    msg: state.showmsg.toJS(),
    articleDetail: state.articleDetail.toJS(),
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)


class EditPost extends Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    msg: PropTypes.object.isRequired,
    articleDetail: PropTypes.object.isRequired,
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

    if (!this.props.articleDetail.description) {
      this.props.actions.showMsg('发布内容不能为空')
      return false
    }

    return true
  }

  handleTextChange(value){
    //this.setState({value: value});
    this.props.actions.changeDesc(value)
  }

  handleSubmit (e) {
    e.preventDefault();
    const { values } = this.props
    if (!this._validateForm(values)) return

    values.description = this.props.articleDetail.description
    values.type = 'post'
    values.active = true

    const { actions, params: { id }} = this.props
    //actions.addArticle(values, 'post')
    actions.updateArticle(id, values, 'front')
  }


  static fetchData({id}){
    return [
      Actions.getArticleDetail(id)
    ]
  }

  componentDidMount() {
    const { actions, params: { id } } = this.props
    actions.getArticleDetail(id)
  }

  render() {
    const { msg, articleDetail, actions, fields: { title }, dirty,invalid, resetForm } = this.props

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12" style={{marginTop:'30px'}}>
            <div className="c-comments">
                <div className="c-content-title-1">
                    <h3 className="c-font-bold">发布帖子</h3>
                    <div className="c-line-left"></div>
                </div>
                <form className="am-form am-form-horizontal" onSubmit={this.handleSubmit.bind(this)} >
                  <div className="am-form-group am-form-group-lg">
                    <input type="text" id="title" className="am-form-field" placeholder="标题" {...title}/>                       
                  </div>
                  <MDEditor value={articleDetail.description} onChange={this.handleTextChange.bind(this)}  />
                                


                  <div className="modal-footer">
                    <button type="submit" className="btn c-btn-dark c-btn-square c-btn-bold c-btn-uppercase">发布</button>
                    <button onClick={resetForm} className="btn c-btn-dark c-btn-border-2x c-btn-square c-btn-bold c-btn-uppercase">重置</button>
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
  fields: ['title'],
},state => ({
  initialValues: state.articleDetail.toJS()
}),
)(EditPost);