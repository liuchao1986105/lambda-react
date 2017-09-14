import React, { Component } from 'react'
import {Modal,ModalTrigger} from 'amazeui-react';
import  MDEditor from '../MDEditor'
import './article.scss'

export default class NewQuestion extends Component {
    constructor(props) {
        super(props)
        this.state = { value:'' }
    }

    handleTextChange(value){
        this.setState({value: value});
    }

    render() {
        // <ModalTrigger
        //     modal={modal}
        //     show={this.props.showModal}
        //     onClose={this.props.closeModal}>
        //   </ModalTrigger>
        let modal = <Modal>
                <div>
                    <div className="c-content-title-1 c-title-md c-margin-b-20 clearfix">
                        <h3 className="c-center c-font-uppercase c-font-bold">发布问题</h3>
                        <div className="c-line-center c-theme-bg"></div>
                    </div>
                    <form className="form-horizontal">
                        <div className="form-group">
                            <div className="col-md-12">
                                <input type="email" className="form-control  c-square c-theme" id="inputEmail3" placeholder="Email" /> 
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-12">
                                <input type="password" className="form-control  c-square c-theme" id="inputPassword3" placeholder="Password"/> 
                            </div>
                        </div>
                        <MDEditor value={this.state.value} onChange={this.handleTextChange.bind(this)}  />

                        <div className="form-group c-margin-t-40">
                            <div className="col-sm-offset-4 col-md-8">
                                <button type="submit" className="btn btn-default c-btn-square c-btn-uppercase c-btn-bold">取消</button>
                                <button type="submit" className="btn c-theme-btn c-btn-square c-btn-uppercase c-btn-bold">发布</button>
                                
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
        return (
            <div style={{marginTop:'20px'}}>
              <button type="button" data-toggle="modal" data-target=".bs-example-modal-lg" className="cbp-l-loadMore-link btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase">
                发布问题
              </button>
                <div  className="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content c-square" style={{borderRadius:'0px'}}>
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <h4 className="modal-title" id="myLargeModalLabel">发布问题</h4>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <input type="text" placeholder="标题" className="form-control c-square" name="title"/> 
                                    </div>
                                    <MDEditor value={this.state.value} onChange={this.handleTextChange.bind(this)}  />
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn c-btn-dark c-btn-square c-btn-bold c-btn-uppercase">发布</button>
                                <button type="button" className="btn c-btn-dark c-btn-border-2x c-btn-square c-btn-bold c-btn-uppercase" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
          
        )
    }
}
