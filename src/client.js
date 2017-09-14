import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import {Provider} from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './routes'
import configureStore from './store/configureStore'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/index.css'
import './assets/styles/admin.css'
import 'react-s-alert/dist/s-alert-default.css'



/*import './assets/plugins/animate/animate.min.css'
import './assets/plugins/owl-carousel/owl.carousel.css'
import './assets/plugins/owl-carousel/owl.transitions.css'
import './assets/plugins/fancybox/jquery.fancybox.css'
import './assets/plugins/slider-for-bootstrap/css/slider.css'*/


import './assets/plugins/cubeportfolio/css/cubeportfolio.min.css'
import './assets/base/css/plugins.css'
//import './assets/base/css/components.css'
import './assets/base/css/themes/dark1.css'
//import './assets/plugins/editor/editor.css'
//import './assets/plugins/webuploader/webuploader.css'

//import './assets/base/js/components.js'
/*import './assets/plugins/jquery-migrate.min.js'*/
//import './assets/base/js/init.js'
//import './assets/plugins/bootstrap/js/bootstrap.min.js'
//import './assets/base/js/components.js'
/*import './assets/plugins/jquery.easing.min.js'*/
/*import './assets/plugins/reveal-animate/wow.js'*/

//import './assets/plugins/cubeportfolio/js/jquery.cubeportfolio.min.js'
/*import './assets/plugins/owl-carousel/owl.carousel.min.js'
import './assets/plugins/counterup/jquery.counterup.min.js'
import './assets/plugins//slider-for-bootstrap/js/bootstrap-slider.js'
import './assets/plugins/fancybox/jquery.fancybox.pack.js'*/
//import './assets/base/js/scripts/pages/extended-portfolio.js'

import createDevTools from './createDevtools'

const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState,browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

createDevTools(store)

render(
  <Provider store={store}>
    <Router history={history}>
      {routes()}
    </Router>
  </Provider>,
  document.getElementById('root')
)