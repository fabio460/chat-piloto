import React from 'react'
import SimpleDialogDemo from './SimpleDialog'
import InputBase from '../imputMensagens/InputBase'

export default function Mensagens({mensagens,room,getDocumento,user,idDaMensagem}) {
  const getId = (e)=>{
     return e.target.id
  }
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
                                  <span><SimpleDialogDemo idDaMensagem={idDaMensagem} id={elem.documento} getId={getId}/></span>
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
                 
                 <div className='inputMensagemContainer'><InputBase room={room} idReceptor={idDaMensagem}/></div>
              </div>
    </div>
  )
}
