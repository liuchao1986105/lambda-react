import * as types from './types'
import api from '../api'
import { push } from 'react-router-redux'
import { showMsg } from './other'
import axios from 'axios'
import { passpay} from '../config'
import { md5} from '../utils'

export const getOrderList = (isAdd = true, otherOption) =>{
  return (dispatch,getState) => {
    const options = otherOption ? otherOption : getState().options.toJS();
    return dispatch({
      type: types.ORDER_LIST,
      page: options.page,
      promise: api.getOrderList(options),
      isAdd: isAdd
    })
  }
}

function receiveAddOrder(order) {
  return {
    type: types.ADD_ORDER_SUCCESS,
    order: order
  }
}


export function addOrder(order) {
  return (dispatch,getState)=>{
    return api.addNewOrder(order)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.error_msg || '添加订单失败'))
        }
        const order = json.data;
        dispatch(receiveAddOrder(order))

        //调用支付接口
        // const order_id = json.order_id;
        // let body = {
        //   body: 'pay',
        //   notify_url: 'https://www.lambda-study.com/orders/notify',
        //   out_order_no: order_id,
        //   partner: passpay.partner,
        //   return_url:'https://www.lambda-study.com/orders/return',
        //   subject: order.subject,
        //   total_fee: order.total_fee,
        //   user_seller: passpay.user_seller,
        // }

        // let prestr = querystring.stringify(body);
        //  console.log("prestr:"+prestr)

        // const sign = md5(prestr + config.passpay.key)
        // body.sign = sign;

        // console.log("sign:"+sign)

        // axios.post(passpay.request_url, body)
        // .then(function (response) {
        //   console.log("response:"+response);
        // })
        // .catch(function (error) {
        //   console.log("error:"+error);
        // });

      }).catch(e=>{
        return dispatch(showMsg(e.data.error_msg || '添加订单失败'))
      })
  }
}

export function updateOrder(order_id, order) {
  return (dispatch,getState)=>{
    const options = getState().options.toJS()
    return api.updateOrder(order_id, order)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.error_msg || '更新订单失败'))
        }
        dispatch({
          type: types.ORDER_LIST,
          page: options.page, 
          promise: api.getOrderList(options),
          isAdd: false
        })
      }).catch(e=>{
        return dispatch(showMsg(e.data.error_msg || '更新订单失败'))
      })
  }
}


export const getOrderDetail = (id) =>{
  return (dispatch, getState) => {
    return api.getOrderDetail(id)
    .then(response => ({json: response.data, status: response.statusText}))
    .then(({json,status}) => {
      let order = json.data
      return dispatch({
        type: types.ORDER_DETAIL_SUCCESS,
        orderDetail: {...order}
      })
    })
    .catch(error => {
      return dispatch({
        type: types.ORDER_DETAIL_FAILURE
      })
    })
  }
}

export function deleteDetail(order_id){
  return (dispatch,getState)=>{
    const options = getState().options.toJS()
    return api.deleteOrder(order_id)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.error_msg || '删除订单失败'))
        }
        dispatch({
          type: types.ORDER_LIST,
          page: options.page, 
          promise: api.getOrderList(options),
          isAdd: false
        })
      }).catch(e=>{
        return dispatch(showMsg(e.data.error_msg || '删除订单失败'))
      })
  }
}
