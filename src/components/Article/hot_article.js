import React,{Component,PropTypes} from 'react'
import { Link } from 'react-router'

export default class HotArticle extends Component{
  static propTypes = {
    actions: PropTypes.object.isRequired,
    title: PropTypes.string,
    hotlist: PropTypes.object.isRequired,
  }

  render(){
    const { title, hotlist} = this.props
    return (
      <div className="c-content-ver-nav">
          <div className="c-content-title-1 c-theme c-title-md c-margin-t-40">
              <h3 className="c-font-bold c-font-uppercase">{title}</h3>
              <div className="c-line-left c-theme-bg"></div>
          </div>
          <ul className="c-menu c-arrow-dot c-theme" style={{fontSize:'14px',color:'#5F5F5F'}}>
            {hotlist.items.length > 0 &&
              hotlist.items.map((item,i)=>
                <li key={item._id}>
                  <a  href={'/articles/doc/'+item._id} target="_blank" style={{fontSize:'14px', fontWeight:'bold'}}>{item.title}</a>
                </li>
              )
            }
          </ul>
      </div>
    )
  }
}