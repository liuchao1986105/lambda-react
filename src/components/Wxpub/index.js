import React, { PropTypes, Component } from 'react'
import { qiniuImageUrl } from '../../config'
import { Link } from 'react-router'
import './weixinpub.scss'

export default class Wxpub extends Component{
  constructor(props){
    super(props)
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
  }  

  _toFreeRes(){
    this.props.actions.toPage(`/articles/doc/589d1b5fd7d9c632482c704b`)
  }


  render(){
    const icon = qiniuImageUrl + 'icon_qrcode.png';
    return (
      <div>
        <div className="popover-wrap">
          <div className="fixed-btn note-fixed-download social-share_public" data-toggle="popover" data-placement="left" data-html="true" data-trigger="hover" data-content="<img src=&quot;http://cdn-qn0.jianshu.io/assets/app-page/note-qrcode-599086b03613e4f65dce8698fe9bcc99.png&quot; alt=&quot;Note qrcode&quot; />" data-original-title="" title="">
            <a className="share_title_public icon-wechat_public" href="javascript:void(0)">
              <img src={icon}  style={{marginBottom:'10px'}} alt="qrcode"/>
              <div>加入公众号 获取更多资源  </div>
              <div>-</div>
              <div  style={{cursor:'pointer', color: '#F49484'}} onClick={this._toFreeRes.bind(this)}> 详情</div>

              <div className='wechat-qrcode_public'>
                <h4>{'加入公众号，在小程序中获取更多资源'}</h4>
                <div className='qrcode_public'>
                   <img style={{width:'150px',height:'150px'}} src={(qiniuImageUrl + 'Lambda.jpg')}/>
                </div>
              </div>

            </a>     
          </div>
        </div>
      </div>
    )
  }
}