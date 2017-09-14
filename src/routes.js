import React from 'react'
import { Route, IndexRoute } from 'react-router'
/*import App from './components/App'*/
import App from './containers/App'
import Home from './containers/Home'
import Login from './containers/Login'
import Signup from './containers/Signup'
import Setting from './containers/Setting'
import Reset from './containers/Reset'
import ResetPass from './containers/Reset/reset_pass'
import Dashboard from './containers/Dashboard'
import Blog from './containers/Blog'
import Topics from './containers/Topics'
import Articles from './containers/Articles'
import ArticleCreate from './containers/Articles/create'
import Videos from './containers/Videos'
import User from './containers/User'
import Bbs from './containers/Bbs'
import Skillmap from './containers/Skillmap'
import Tour from './containers/Tour'
import Search from './containers/Search'
import Info from './containers/Info'
import Class from './containers/Class'
import ClassDetail from './containers/Class/class'
import Invite from './containers/Invite'
import CreatePost from './containers/Articles/post'
import EditPost from './containers/Articles/editPost'
import EmailBind from './containers/EmailBind'
import RssFeed from './containers/RssFeed'
import FeedIndex from './containers/FeedIndex'
import FeedExplore from './containers/FeedExplore'
import FeedMain from './containers/FeedMain'
import FeedMarked from './containers/FeedMarked'
import OrderReturn from './containers/Order/return'
import OrderNotify from './containers/Order/notify'
import {redirectToBack,redirectToLogin} from './utils/authService'

export default ()=> (
	<Route path="/" component={App}>
		<IndexRoute component={Home}/>
    	<Route path="/login" component={Login} />
        <Route path="/signup" component={Signup}/>
        <Route path="/reset" component={Reset} />
        <Route path="/reset_pass" component={ResetPass}/>
        <Route path="/invite" component={Invite}/>
        <Route path="/dashboard" component={Dashboard} onEnter={redirectToLogin} />
        <Route path="/dashboard/topics" component={Dashboard} onEnter={redirectToLogin} />
        <Route path="/dashboard/topics/add" component={Dashboard} onEnter={redirectToLogin} />
        <Route path="/dashboard/topics/edit/:id" component={Dashboard} onEnter={redirectToLogin} />
        <Route path="/dashboard/articles" component={Dashboard} onEnter={redirectToLogin} />
        <Route path="/dashboard/articles/add" component={Dashboard} onEnter={redirectToLogin} />
        <Route path="/dashboard/articles/edit/:id" component={Dashboard} onEnter={redirectToLogin} />
        <Route path="/dashboard/tags" component={Dashboard} onEnter={redirectToLogin} />
        <Route path="/dashboard/tags/add" component={Dashboard} onEnter={redirectToLogin} />
    	<Route path="/dashboard/tags/edit/:id" component={Dashboard} onEnter={redirectToLogin} />
        <Route path="/dashboard/users" component={Dashboard} onEnter={redirectToLogin} />
        <Route path="/dashboard/users/add" component={Dashboard} onEnter={redirectToLogin} />
        <Route path="/dashboard/users/edit/:id" component={Dashboard} onEnter={redirectToLogin} />
        <Route path="/dashboard/comments" component={Dashboard} onEnter={redirectToLogin} />
        <Route path="/dashboard/comments/:id/replys" component={Dashboard} onEnter={redirectToLogin} />
        <Route path="/dashboard/infos" component={Dashboard} onEnter={redirectToLogin} />
        <Route path="/articles/class/:id" component={ClassDetail} />
        <Route path="/articles/doc/:id" component={Articles} />
        <Route path="/articles/share" component={ArticleCreate} onEnter={redirectToLogin} />
        <Route path="/topics/:id" component={Topics} />
        <Route path="/bbs" component={Bbs}  />
        <Route path="/skillmap" component={Skillmap}/>
        <Route path="/tour" component={Tour} />
        <Route path="/post" component={CreatePost} onEnter={redirectToLogin}/>
        <Route path="/post/edit/:id" component={EditPost} onEnter={redirectToLogin} />
        <Route path="/class" component={Class} />
        <Route path="/search" component={Search} />
        <Route path="/info/:id" component={Info} onEnter={redirectToLogin}/>
        <Route path="/users/:id" component={User} onEnter={redirectToLogin}/>
        <Route path="/setting/:id" component={Setting} onEnter={redirectToLogin} />
        <Route path="/blogs" component={Blog}/>
        <Route path="/emailbind" component={EmailBind} onEnter={redirectToLogin}/>
        <Route path="/feed" component={FeedIndex} onEnter={redirectToLogin}/>
        <Route path="/feed/show/:id" component={FeedMain} onEnter={redirectToLogin} />
        <Route path="/feed/marked" component={FeedMarked} onEnter={redirectToLogin} />
        <Route path="/feed/explore" component={FeedExplore} onEnter={redirectToLogin} />
        <Route path="/orders/return" component={OrderReturn} onEnter={redirectToLogin} />
        <Route path="/orders/notify" component={FeedExplore} onEnter={OrderNotify} />
        
	</Route>
)