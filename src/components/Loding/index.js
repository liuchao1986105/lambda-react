import React,{Component,PropTypes} from 'react'
import "./loding.scss"
export default class Loading extends Component{
  static propTypes = {
  }

  render(){
    const {addData,options,isMore,isFetching} = this.props
    return (
      <div className='loadingStyle'>
        <i className="am-icon-refresh am-icon-spin" ></i>
      </div>
    )
  }
}