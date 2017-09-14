import React,{Component,PropTypes} from 'react'
import _ from 'lodash'
import QRCode from 'qrcode.react'
import "./sharebuttons.scss"

export default class ShareButtons extends Component{
  static propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    sites: PropTypes.array,
  }

  render(){
    const wechatQrcodeTitle =  '微信扫一扫：分享'
    const {url, title, description, sites} = this.props
    const source = title
    const summary = description
    const image = ''
    const templates = {
      qq: `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&desc=${description}&summary=${summary}&site=${source}`, //qzone
      //qq: `http://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&source=${source}&desc=${description}`,
      weibo: `http://service.weibo.com/share/share.php?url=${url}&title=${title}&pic=${image}`,
      wechat: `javascript:`,
      douban: `http://shuo.douban.com/!service/share?href=${url}&name=${title}&text=${description}&image=${image}&starid=0&aid=0&style=11`,
      //linkedin: `http://www.linkedin.com/shareArticle?mini=true&ro=true&title=${title}&url=${url}&summary=${summary}&source=${source}&armin=armin`,
      //facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      //twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}&via=${origin}`,
      //google: `https://plus.google.com/share?url=${url}`
    };

    let html = _.map(sites, function (site, i) {
      if(site === "wechat"){
        let doc = <div key={i} className='wechat-qrcode'>
                    <h4>{wechatQrcodeTitle}</h4>
                    <div className='qrcode'>
                      <QRCode value={url} size={100} />
                    </div>
                  </div>
        return (
          <a key={i} className='share_title icon-wechat' target='_blank' href='javascript:'>
            <i className='fa fa-wechat'></i>{doc}
          </a>
        )
      } else {
        let className = `fa fa-${site}`
        let iconClassName = `icon-${site}`
        if(site === "qq"){
          return (
            <a key={i} title='分享到QQ空间' className={'share_title ' + iconClassName} href={templates[site]} target="_blank"><i className={className} ></i></a>
          )
        }else{
          return (
            <a key={i} title='分享到微博' className={'share_title ' + iconClassName} href={templates[site]} target="_blank"><i className={className} ></i></a>
          )
        }
        
      }
    })


    return (
      <span className="social-share">
        <span className="share_title">分享</span>
        {html}
        
      </span>
    )
  }
}