import React from 'react'
import CustomizedInputBase from '../Mensagens/CustomizedInputBase';
import './Mensagens.css'
import '../imputMensagens/InputBase.css'

import AlertDialog from './AlertDialog';
export default function Mensagens({mensagens,room,getDocumento,user,idDaMensagem}) {
  
  return (
    <div>
        <div className='container'>
                    <div className='mensagensContainer'>
                        <div className='mensagens'>
                            {mensagens.map(elem=>{
                              return<div className='mensagemItemBody'>
                                <div className={
                                  elem.usuarioLogado === user.displayName ?"usuarioLogado":"usuarioReceptor"
                                }>
                                  <div className='imagemAvatarItem'>
                                    <img className={
                                      elem.usuarioLogado === user.displayName ?
                                      "avatarReceptor  ":
                                      "avatarUsuario avatarVisible"
                                    } src={elem.photoURL} alt=''/>
                                  </div>
                                  <div style={{display:"flex"}}>
                                  <span  id={elem.documento}><AlertDialog id={elem.documento}/></span>
                                    <div onClick={()=>getDocumento(elem.documento)} className='mensagemItem'>{elem.mensagem}
                                       
                                       <div className={
                                          elem.usuarioLogado === user.displayName ?
                                          "dataLeft ":
                                          "dataRigth "
                                       }>
                                        {elem.data.toString()}</div>
                                    </div>
                                  </div>
                                  <div className='imagemAvatarItem'>
                                    <img className={
                                      elem.usuarioLogado === user.displayName ?
                                      "avatarReceptor avatarVisible ":
                                      "avatarUsuario "
                                    } src={elem.photoURL} alt=''/>
                                  </div>
                                </div>
                              </div>
                            })}
                        </div>    
                      </div>  
                 
                 <div className='inputMensagemContainer'>
                    {/* <InputBase room={room} idReceptor={idDaMensagem}/> */}
                    <CustomizedInputBase room={room} idReceptor={idDaMensagem}/>
                  </div>
              </div>
    </div>
  )
}
