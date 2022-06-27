import {combineReducers} from 'redux'
import DocumentoReducer from './documentoRedux'
export default combineReducers({
    documento:DocumentoReducer
})