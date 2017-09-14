import * as types from './types'
import api from '../api'
import { push } from 'react-router-redux'
import { showMsg } from './other'


export const getSkillmapList = () =>{
  return {
    type: types.SKILLMAP_LIST,
    promise: api.getSkillmapList()
  }
}