import React from 'react'
import CustomizedInputBase from '../Mensagens/CustomizedInputBase';
import './Mensagens.css'
import '../imputMensagens/InputBase.css'

import AlertDialog from './AlertDialog';
export default function Mensagens({mensagens,room,getDocumento,user,idDaMensagem,idReceptor}) {
  
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
                                  
                                  <strong
                                    id={elem.documento}
                                    style={{color:'red',cursor:"pointer",padding:"0px",margin:" 0px",width:"12px",
                                       alignItems:"center",
                                       display:elem.usuarioLogado === user.displayName?"none":"flex"
                                    }}
                                  >
                                      <AlertDialog id={elem.documento}/>
                                  </strong>
                                    <div onClick={()=>getDocumento(elem.documento)} className='mensagemItem'>{elem.mensagem}
                                       
                                       <div className={
                                          elem.usuarioLogado === user.displayName ?
                                          "dataLeft ":
                                          "dataRigth "
                                       }>
                                        {elem.data.toString()}</div>
                                    </div>

                                    <strong
                                      id={elem.documento}
                                      style={{color:'blue',cursor:"pointer",padding:"0px",
                                        margin:" 0px",
                                        width:"0px",
                                        alignItems:"center",
                                        justifyContent:"center",
                                        background:"",
                                        height:"",
                                        display:elem.usuarioLogado === user.displayName?"flex":"none"
                                      }}
                                    >
                                      
                                      <AlertDialog id={elem.documento}/>
                                  </strong>
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
                    <CustomizedInputBase room={room} idDaMensagem={idDaMensagem} idReceptor={idReceptor}/>
                  </div>
              </div>
    </div>
  )
}