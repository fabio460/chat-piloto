import {combineReducers} from 'redux'
import DocumentoReducer from './documentoRedux'
import ReceptorRducer from './ReceptorReducer'
import salaReducer from './salaReducer'
import getEmoji from './getEmoji'
export default combineReducers({
    documento:DocumentoReducer,
    ReceptorRducer,
    salaReducer,
    getEmoji
})