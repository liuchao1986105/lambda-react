import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { limtPage, headBgUrl } from '../../config'
import * as Actions from '../../actions'
import ClassBody from '../../components/ClassBody'
import LoadMore from '../../components/LoadMore'
import "./class.scss"

const mapStateToProps = state =>{
  return {
    globalVal: state.globalVal.toJS(),
    auth: state.auth.toJS(),
    articleList: state.articleList.toJS(),
    options: state.options.toJS()
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)

export default class Class extends Component {
  constructor(props){
    super(props);
    this.state = {
      article_page: 1,
      firstLoad: true
    }
  }

  static propTypes = {
    globalVal: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    articleList: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }

  static fetchData(params){
    return [Actions.getArticleList(false, {page: 1, limit: limtPage, type:'class'})]
  }

  componentDidMount() {
    const { actions} = this.props
    actions.getArticleList(false, {page: 1, limit: limtPage, type:'class'})

  }

  handlePageClick = (option) => {
    const { actions } = this.props
    this.setState({article_page: page, firstLoad: false  })
    let articleoption = {page: page, limit: limtPage, type:'class'}
    actions.getArticleList(true, articleoption)
  };

  _toSignup(){
    this.props.actions.toPage('/signup')
  }

  render() {
    const { globalVal, auth, articleList, actions } = this.props
    document.title=  'Lambda - 程序员学习社区'
    return (
      <div >
        <div className="classbgimg" style={{backgroundImage: `url(${headBgUrl})`}}>
          <div className="am-container">
            <h1 className="am-animation-slide-right">给你想要的</h1>
            <h2 className="am-animation-scale-up">和大家一起实现你的梦想</h2>
            {!(auth.token) &&  
              <button type="button" onClick={this._toSignup.bind(this)} className="am-btn am-btn-secondary am-radius am-animation-slide-bottom">    
                <a href="javascript:;">
                   <b style={{color: '#ffffff'}}>注册</b>
                </a>
              </button>
            }
          </div>
        </div>
        <ClassBody actions={actions} firstLoad={this.state.firstLoad} articleList={articleList.items} isFetching={articleList.isFetching}/>
        {(articleList.items.length > 0)&&<LoadMore options={{page: this.state.article_page}} isMore={articleList.isMore} isFetching={articleList.isFetching} addData={this.handlePageClick.bind(this)} />}
      </div>
    )
  }
}