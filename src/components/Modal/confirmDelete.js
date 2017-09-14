import React, { Component } from 'react'
import {Modal,ModalTrigger} from 'amazeui-react';


export default class ConfirmDelete extends Component {
    constructor(props) {
        super(props)
    }

    onConfirm(e) {
      this.props.onClick()
    }

    onCancel(){
    }

    render() {
        let modal = <Modal type="confirm" title={this.props.text?this.props.text:'删除'}>你，确定要{this.props.text?this.props.text:'删除'}这条记录吗？</Modal>;

        return (
          <ModalTrigger
            modal={modal}
            onCancel={this.onCancel.bind(this)}
            onConfirm={this.onConfirm.bind(this)}>
            {this.props.type == 'comment' ?
            <a className="pull-right comment_a" href="javascript:;">{this.props.text?this.props.text:'删除'}</a>
            :
            <button className="am-btn am-btn-default am-btn-xs am-text-danger"><span className="am-icon-trash-o"></span> {this.props.text?this.props.text:'删除'}</button>
            }
          </ModalTrigger>
        )
    }
}
