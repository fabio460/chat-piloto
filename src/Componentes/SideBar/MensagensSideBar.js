
import { Avatar } from '@mui/material'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import db from '../../fireBaseConfig'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux'
import uteis from '../../funcoesUteis';
import './SideBar.css'
export default function MensagensSideBar({setVisivel,setRoom,getIdReceptor}) {
const [mensagens,setMensagens]=useState([])    
const [user] = useAuthState(getAuth());
const [idLogado,setIdLogado] =React.useState(null)
const dispath = useDispatch()

function salvarRoomRedux(room) {
  dispath({
    type:"sala",
    payload:{sala:room}
  })
}

async function gerarIdUsuarioLogado(user) {
    
  let logadoRef = query(collection(db,"user"),where("email","==",user.email))
  onSnapshot(logadoRef,(snapshot)=>{
     snapshot.docs.forEach(async doc=>{
       let id = await doc.data().uid
       await setIdLogado( id )
       return id
     })
  })
}
let [setUsers] =React.useState([])

React.useEffect(()=>{
  let usuariosRef = query(collection(db,'user'),orderBy("hora","desc"))
  onSnapshot(usuariosRef,(snapshot)=>{
    let aux = []
    snapshot.docs.forEach(doc=>{
      if(user.email !== doc.data().email){
        aux.push(doc.data())
      }
    })
    setUsers(aux)
  })
  gerarIdUsuarioLogado(user)

},[user,setUsers])


const getUsers = (e)=>{  
  
  const ref = query(collection(db,"user"),where("uid","==",parseInt(e.target.id)))
  onSnapshot(ref,(snap)=>{
    snap.docs.forEach(doc=>{
      dispath({
        type:"documento",
        payload:{doc:doc._key.path.segments[6]}
      })
      dispath({
        type:"receptor",
        payload:{receptor:doc.data()}
      })
      document.querySelector('.avatarReceptorMensage').style="display:flex"
    })
  })
   setVisivel(true) 
   setRoom(uteis.gerarSala( e.target.id , idLogado))
   salvarRoomRedux(uteis.gerarSala( e.target.id , idLogado))
   //getIdReceptor()
   getIdReceptor(parseInt(e.target.id))
   function scroll(params) {
    document.querySelector(".mensagens").scrollTop=1000000
  }
  scroll()
  uteis.abrirMensagens()
}

useEffect(()=>{
    const ref = query(collection(db,'ultimasMensagens'),orderBy("hora","desc"))
    onSnapshot(ref,snapshot=>{
        let lista = []
        snapshot.docs.forEach(elem=>{
           lista.push(elem.data())
          //console.log(elem.data())
        })
     //   console.log(lista)
        setMensagens(lista)
    }) 
    



},[]) 
// function Sobrenome(nomeCompleto) {
//   let texto = nomeCompleto.split(" ") 
  
//   return texto[0] 
// } 
  return (
    <div className='sidebarListaDeMensagens' style={{cursor:"pointer"}}>
       {mensagens.map(item=>{
            if(user.email === item.usuario || user.email === item.receptor.email){
            
              return <div>
                <div onClick={getUsers} id={user.email === item.usuario ? item.receptor.uid : item.uid} className='sidebarListaDeMensagensElemento'>

                    <div id={user.email === item.usuario ? item.receptor.uid : item.uid} className='sidebarListaDeMensagensElementoLeft'>
                      <Avatar src={user.email === item.usuario?item.receptor.avatar:item.avatar}
                        alt={user.email === item.usuario?item.receptor.nome:item.nome}
                        sx={{marginRight:"10px"}}
                      />
                      <div className='sidebarListaDeMensagensElementoRight' id={user.email === item.usuario ? item.receptor.uid : item.uid}>
                        <div id={user.email === item.usuario ? item.receptor.uid : item.uid}>
                           {user.email === item.usuario?
                             item.receptor.nome
                             :
                             item.nome
                           }
                        </div>
                        <div id={user.email === item.usuario ? item.receptor.uid : item.uid} class=" text-truncate" style={{width:"200px",color:"gray"  }} >{item.mensagem}</div>
                      </div>
                    </div>
                    <div id={user.email === item.usuario ? item.receptor.uid : item.uid} className='sidebarListaDeMensagensElementoHora' style={{fontSize:"11px"}} >{item.hora}</div>
      
                  </div>
              </div>
            }
            return ''
          }
       )}
    </div>
  )
}
