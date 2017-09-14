import React,{Component,PropTypes} from 'react'
import {Modal, ModalTrigger, Button} from 'amazeui-react';
import { qiniuImageUrl } from '../../config'
import { saveCookie } from '../../utils/authService'


export default class PayedModal extends Component{
  constructor(props){
    super(props)
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    topic: PropTypes.object.isRequired,
  }


  render(){
    const { auth, topic} = this.props

    const modal = (<Modal >
                    <div  style={{display:'block'}}>
                        <div><strong>云盘地址:</strong> <a target='_blank' href={topic.url}>{topic.url}</a></div>
                        <div><strong>密码:</strong> {topic.password}</div>
                        
                    </div>
                </Modal>)

    return (
      <div >
          <div className="col-sm-12 col-xs-12 c-margin-t-10">
                  <ModalTrigger modal={modal}>
                      <Button className="btn c-btn btn-lg c-font-bold c-font-white c-theme-btn c-btn-square c-font-uppercase">链接</Button>
                  </ModalTrigger>
          </div>
      </div>
    )
  }
}
