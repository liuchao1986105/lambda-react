import React, {Component} from 'react';
import { Link } from 'react-router'
export default class DashboardHeader extends Component {
  render() {
    return (
        <header className="am-topbar admin-header">
          <div className="am-topbar-brand">
            <h1 className="am-topbar-brand">
              <Link  to="/">Lambda</Link>
            </h1>
            <small>后台管理系统</small>
          </div>

          <button className="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only" data-am-collapse="{target: '#topbar-collapse'}"><span className="am-sr-only">导航切换</span> <span className="am-icon-bars"></span></button>

          <div className="am-collapse am-topbar-collapse" id="topbar-collapse">
            <ul className="am-nav am-nav-pills am-topbar-nav am-topbar-right admin-header-list">
              <li><a href="javascript:;"><span className="am-icon-envelope-o"></span> 收件箱 <span className="am-badge am-badge-warning">5</span></a></li>
              {/*<li><a href="javascript:;" id="admin-fullscreen"><span className="am-icon-arrows-alt"></span> <span className="admin-fullText">开启全屏</span></a></li>*/}
            </ul>
          </div>
        </header>
    );
  }
}