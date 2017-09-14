import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import './video.scss'

const mapStateToProps = state =>{
  return {
    auth: state.auth.toJS(),
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)   

export default class Articles extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const banner_img = "https://assets.lambda-study.com/lambda%2Freact_title.jpg";
    const { actions,auth,location } = this.props
    const backgroundImage = banner_img;
    return (
      <div style={{marginRight:'10%',marginLeft:'10%'}}>
            <div className="c-content-box c-size-lg c-overflow-hide c-bg-white">
                <div>
                    <div className="c-shop-product-details-2">
                        <div className="row">
                            <div className="col-md-6">
                              <div className="classTitleimg" style={{backgroundImage: `url(${backgroundImage})`}}>
                              </div>
                            </div>
                            <div className="col-md-6">
                                <div className="c-product-meta">
                                    <div className="c-content-title-1">
                                        <h3 className="c-font-bold">React 入门教程</h3>
                                        <div className="c-line-left"></div>
                                    </div>
                                    <div className="c-product-review">
                                        <div className="c-product-rating">
                                            <i className="fa fa-star c-font-black"></i>
                                            <i className="fa fa-star c-font-black"></i>
                                            <i className="fa fa-star c-font-black"></i>
                                            <i className="fa fa-star c-font-black"></i>
                                            <i className="fa fa-star-half-o c-font-black"></i>
                                        </div>
                                        <div className="c-product-write-review">
                                            <button className="btn c-btn-square c-btn-border-2x c-btn-dark c-btn-bold c-btn-uppercase"><i className="fa fa-pencil fa-fw"></i>写笔记</button>
                                        </div>
                                    </div>
                                    <div className="c-product-short-desc"> 此react课程可以让你对react有一个基本的认识，从而开始你的react之旅. </div>
                                    <div className="row c-product-variant">
                                        <div className="col-sm-12 col-xs-12">
                                            <p className="c-product-meta-label c-product-margin-1 c-font-uppercase c-font-bold">知识量: <span style={{color:'#32C5D2'}}>9.0</span></p>
                                            <p className="c-product-meta-label c-product-margin-1 c-font-uppercase c-font-bold">实用性: <span style={{color:'#32C5D2'}}>9.0</span></p>
                                            <p className="c-product-meta-label c-product-margin-1 c-font-uppercase c-font-bold">难度: <span style={{color:'#32C5D2'}}>简单</span></p>
                                            <p className="c-product-meta-label c-product-margin-1 c-font-uppercase c-font-bold">课程设计: <span style={{color:'#32C5D2'}}>9.8</span></p>
                                            <p className="c-product-meta-label c-product-margin-1 c-font-uppercase c-font-bold">授课水平: <span style={{color:'#32C5D2'}}>9.0</span></p>
                                        </div>
                                    </div>
                                    <div className="c-product-add-cart c-margin-t-20">
                                        <div className="row">
                                            <div className="col-sm-12 col-xs-12 c-margin-t-20">
                                                <button className="btn c-btn btn-lg c-font-bold c-font-white c-theme-btn c-btn-square c-font-uppercase">加入到学习列表</button>
                                                
                                                <div className="bdsharebuttonbox">
                                                  {/*<a href="#" className="bds_more" data-cmd="more"></a>*/}
                                                  <a href="#" className="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
                                                  <a href="#" className="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
                                                  <a href="#" className="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>
                                                  <a href="#" className="bds_renren" data-cmd="renren" title="分享到人人网"></a>
                                                  <a href="#" className="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="c-content-box c-size-md c-no-padding">
                <div className="c-shop-product-tab-1" role="tabpanel">
                    <div>
                        <ul className="nav nav-justified" role="tablist">
                            <li role="presentation" className="active">
                                <a className="c-font-uppercase c-font-bold" href="#tab-1" role="tab" data-toggle="tab">简介</a>
                            </li>
                            <li role="presentation">
                                <a className="c-font-uppercase c-font-bold" href="#tab-2" role="tab" data-toggle="tab">笔记</a>
                            </li>
                            <li role="presentation">
                                <a className="c-font-uppercase c-font-bold" href="#tab-3" role="tab" data-toggle="tab">点评 (3)</a>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content">
                        <div role="tabpanel" className="tab-pane fade in active" id="tab-1">
                            <div className="c-product-desc c-center">
                                <div>
                                    <img src={banner_img} />
                                    <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit
                                        lobortis nisl ut aliquip ex ea commodo consequat. </p>
                                    <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit
                                        lobortis nisl ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
                                        minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. </p>
                                </div>
                            </div>
                        </div>
                        <div role="tabpanel" className="tab-pane fade" id="tab-2">
                            <div className="container">
                                <p className="c-center">
                                    <strong>Sizes:</strong> S, M, L, XL</p>
                                <br/>
                                <p className="c-center">
                                    <strong>Colors:</strong> Red, Black, Beige, White</p>
                                </div>
                            <div className="c-product-tab-meta-bg c-bg-grey c-center">
                                <div className="container">
                                    <p className="c-product-tab-meta">
                                        <strong>SKU:</strong> 1410SL</p>
                                    <p className="c-product-tab-meta">
                                        <strong>Categories:</strong>
                                        <a href="#">Jacket</a>,
                                        <a href="#">Winter</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div role="tabpanel" className="tab-pane fade" id="tab-3">
                            <div className="container">
                                <h3 className="c-font-uppercase c-font-bold c-font-22 c-center c-margin-b-40 c-margin-t-40">Reviews for Warm Winter Jacket</h3>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <div className="c-user-avatar">
                                            <img src={banner_img} /> </div>
                                        <div className="c-product-review-name">
                                            <h3 className="c-font-bold c-font-24 c-margin-b-5">Steve</h3>
                                            <p className="c-date c-theme-font c-font-14">July 4, 2015</p>
                                        </div>
                                    </div>
                                    <div className="col-xs-6">
                                        <div className="c-product-rating c-right">
                                            <i className="fa fa-star c-font-red"></i>
                                            <i className="fa fa-star c-font-red"></i>
                                            <i className="fa fa-star c-font-red"></i>
                                            <i className="fa fa-star c-font-red"></i>
                                            <i className="fa fa-star-half-o c-font-red"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="c-product-review-content">
                                    <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud </p>
                                </div>
                                <div className="row c-margin-t-40">
                                    <div className="col-xs-6">
                                        <div className="c-user-avatar">
                                            <img src={banner_img} /> </div>
                                        <div className="c-product-review-name">
                                            <h3 className="c-font-bold c-font-24 c-margin-b-5">John</h3>
                                            <p className="c-date c-theme-font c-font-14">July 4, 2015</p>
                                        </div>
                                    </div>
                                    <div className="col-xs-6">
                                        <div className="c-product-rating c-right">
                                            <i className="fa fa-star c-font-red"></i>
                                            <i className="fa fa-star c-font-red"></i>
                                            <i className="fa fa-star c-font-red"></i>
                                            <i className="fa fa-star c-font-red"></i>
                                            <i className="fa fa-star-half-o c-font-red"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="c-product-review-content">
                                    <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud </p>
                                </div>
                                <div className="row c-margin-t-40">
                                    <div className="col-xs-6">
                                        <div className="c-user-avatar">
                                            <img src={banner_img} /> </div>
                                        <div className="c-product-review-name">
                                            <h3 className="c-font-bold c-font-24 c-margin-b-5">Alice</h3>
                                            <p className="c-date c-theme-font c-font-14">July 4, 2015</p>
                                        </div>
                                    </div>
                                    <div className="col-xs-6">
                                        <div className="c-product-rating c-right">
                                            <i className="fa fa-star c-font-red"></i>
                                            <i className="fa fa-star c-font-red"></i>
                                            <i className="fa fa-star c-font-red"></i>
                                            <i className="fa fa-star c-font-red"></i>
                                            <i className="fa fa-star-half-o c-font-red"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="c-product-review-content">
                                    <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud </p>
                                </div>
                                <div className="row c-product-review-input">
                                    <h3 className="c-font-bold c-font-uppercase">Submit your Review</h3>
                                    <p className="c-review-rating-input">Rating:
                                        <i className="fa fa-star-o"></i>
                                        <i className="fa fa-star-o"></i>
                                        <i className="fa fa-star-o"></i>
                                        <i className="fa fa-star-o"></i>
                                        <i className="fa fa-star-o"></i>
                                    </p>
                                    <textarea></textarea>
                                    <button className="btn c-btn c-btn-square c-theme-btn c-font-bold c-font-uppercase c-font-white">Submit Review</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

              <div className="c-content-box c-size-md c-overflow-hide c-bs-grid-small-space">
                <div >
                    <div className="c-content-title-4">
                        <h3 className="c-font-uppercase c-center c-font-bold c-line-strike">
                            <span className="c-bg-white">推荐学习视频</span>
                        </h3>
                    </div>

                </div>
            </div>
      </div>
    )   
  }
}