import { 
  GET_CAPTCHAURL,
  GET_INDEX_IMG_SUCCESS,
  GET_INDEX_IMG_FAILURE
} from '../actions/types'
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import { API_ROOT, indexImg } from '../config'

export default createReducer(fromJS({
  indexImg:'',
  captchaUrl: API_ROOT + 'users/getCaptcha'
}), {
  [GET_CAPTCHAURL]: (state, action) => state.set('captchaUrl', action.captchaUrl),
  [GET_INDEX_IMG_SUCCESS]: (state, {json}) => state.set('indexImg',json.img),
  [GET_INDEX_IMG_FAILURE]: (state, {json}) => state.set('indexImg',indexImg)
})