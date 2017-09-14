import React,{Component,PropTypes} from 'react'
import { limtPage } from '../../config'

export default class Tags extends Component{
  constructor(props){
    super(props)
  }

  static propTypes = {
    tagList: PropTypes.array.isRequired,
    options: PropTypes.object.isRequired,
    changeSort: PropTypes.func.isRequired,
    tagStyle: PropTypes.object
  }

  render(){
    const {options, changeSort, tagList, tagStyle} = this.props
    return (
      <div className="cbp-l-filters-buttonCenter" style={tagStyle}>
        <div className={'cbp-filter-item ' } onClick={ changeSort.bind(this,{'page':1,limit: limtPage, 'tagId':''},false)}> 
          全部
        </div>
        {
          tagList.map((tag,i)=>
            <div className={'cbp-filter-item ' + ((options.tagId == tag._id)&&'cbp-filter-item-active')} onClick={ changeSort.bind(this,{'page':1,limit: limtPage,'tagId':tag._id},false)} key={i}> 
              {tag.name}
            </div>
          )
        }
      </div> 
    )
  }
}