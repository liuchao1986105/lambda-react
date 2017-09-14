import React, {Component} from 'react';
import { Link } from 'react-router'
export default class DashboardSidebar extends Component {
  render() {
    return (
      <div className="admin-sidebar">
        <ul className="am-list admin-sidebar-list">
          <li><Link to='/dashboard'><span className="am-icon-home"></span> 首页</Link></li>
          <li className="admin-parent">
            <a className="am-cf" data-am-collapse="{target: '#collapse-nav'}"><span className="am-icon-file"></span> 我 <span className="am-icon-angle-right am-fr am-margin-right"></span></a>
            <ul className="am-list am-collapse admin-sidebar-sub am-in" id="collapse-nav">
              <li><a href="#" className="am-cf"><span className="am-icon-check"></span> 个人资料<span className="am-icon-star am-fr am-margin-right admin-icon-yellow"></span></a></li>
              <li><a href="#"><span className="am-icon-th"></span> 相册页面<span className="am-badge am-badge-secondary am-margin-right am-fr">24</span></a></li>
              <li>
                <a target='_blank' href="http://www.yilan.io/home/">
                  <span className="am-icon-th"></span> Rss订阅器
                </a>
              </li>
            </ul>
          </li>
          <li><Link to='/dashboard/topics'><span className="am-icon-pencil-square-o"></span>专题</Link></li>
          <li><Link to='/dashboard/articles'><span className="am-icon-pencil-square-o"></span>文章管理</Link></li>
          <li><Link to='/dashboard/tags'><span className="am-icon-pencil-square-o"></span>标签管理</Link></li>
          <li><Link to='/dashboard/comments'><span className="am-icon-pencil-square-o"></span>评论管理</Link></li>
          <li><Link to='/dashboard/users'><span className="am-icon-pencil-square-o"></span>用户管理</Link></li>
          <li><Link to='/dashboard/infos'><span className="am-icon-pencil-square-o"></span>消息管理</Link></li>
        </ul>

        <div className="am-panel am-panel-default admin-sidebar-panel">
          <div className="am-panel-bd">
            <p><span className="am-icon-bookmark"></span> 公告</p>
            <p>君子乘势而行 —— Lambda</p>
          </div>
        </div>
      </div>
    );
  }
}