import {combineReducers} from 'redux'
import DocumentoReducer from './documentoRedux'
import ReceptorRducer from './ReceptorReducer'
export default combineReducers({
    documento:DocumentoReducer,
    ReceptorRducer
})