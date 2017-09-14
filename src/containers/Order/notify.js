import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Alert } from 'amazeui-react';
import { passpay } from '../../config'
import { md5} from '../../utils'
import * as Actions from '../../actions'

const mapStateToProps = state =>{
  return {
    globalVal : state.globalVal.toJS(),
    auth: state.auth.toJS(),
    showmsg: state.showmsg.toJS()
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)

export default class OrderNotify extends Component {
  constructor(props){
    super(props)
    this.state = {
      text: ''
    }
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    globalVal: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    showmsg: PropTypes.object.isRequired
  }

  static fetchData(params){
    return []
  }

  handleSubmit (e) {
    e.preventDefault();
    const { values, location } = this.props
    const token= location.query.key;

    if (!this._validateForm(values)) return

    const { actions } = this.props
    values.token = token;
    actions.sendResetPassword(values)
  }


  componentDidMount() {
     const { actions } = this.props
  }

  render() {
    const { actions, location } = this.props
    let text = '';
    const out_order_no= location.query.out_order_no;
    const total_fee= location.query.total_fee;
    const trade_status= location.query.trade_status;
    const sign= location.query.sign;
    const trade_no= location.query.trade_no;

    const prestr = out_order_no + total_fee + trade_status + passpay.partner + passpay.key ;
    const mysign = md5(prestr)
    if(sign == mysign ){
      // if(trade_status == 'TRADE_SUCCESS'){
      //   text = '支付成功'
      // }else{
      //   text = '支付失败'
      // }
      text = 'success'
    }else{
      text = 'fail'
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12" style={{marginTop:'30px'}}>
            <div className="c-comments">
                <div className="c-content-title-1">
                    <h3 className="c-font-bold">支付结果</h3>
                    <div className="c-line-left"></div>
                </div>
            </div>

            <div className="c-content-box c-size-md c-bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="c-content-title-1">
                              <h3 className="c-center c-font-uppercase  c-font-bold">{text}</h3>                             
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
