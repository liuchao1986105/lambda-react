import React,{Component,PropTypes} from 'react'

export default class LoadMore extends Component{
  static propTypes = {
    addData: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired,
    isMore: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired
  }

  render(){
    const {addData,options,isMore,isFetching} = this.props
    return (
      <div className="cbp-l-loadMore-button" style={{marginBottom:'25px'}}>
       {isMore &&
          <span>
          {
            isFetching
            ?  
            <button className="cbp-l-loadMore-link btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase">正在加载...</button>
            :
            <button className="cbp-l-loadMore-link btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase" onClick={ addData.bind(this,{'page':++options.page},true)}>加载更多</button>
          }
          </span>
        } 
      </div> 
    )
  }
}