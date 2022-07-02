import * as React from 'react';

import {collection, onSnapshot, orderBy, query, where} from 'firebase/firestore'
import db from '../../fireBaseConfig'
import uteis from '../../funcoesUteis';
import { Avatar } from '@mui/material';
import {useDispatch} from 'react-redux'
import  './SideBar.css';
export default function ToggleButtonNotEmpty({user,setVisivel,setRoom,getIdReceptor,setValue}) {
  
  const [idLogado,setIdLogado] =React.useState(null)

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
  let [users,setUsers] =React.useState([])

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

  },[user])
  
  const dispath = useDispatch()
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
     getIdReceptor(parseInt(e.target.id))
     function scroll(params) {
      document.querySelector(".mensagens").scrollTop=1000000
    }
    setValue(0)
    scroll()
    uteis.abrirMensagens()
  }


  return (

    <div >
        {users.map((elem,key)=>{
         return <div 
                   value={elem.uid} id={elem.uid}
                   className="sideBarUserContainers"
                   onClick={ getUsers}
                >
                  
                  <div id={elem.uid} className='sideBarUserNomeMensagens'>
                    <Avatar src={elem.avatar} alt={elem.nome} id={elem.uid} sx={{marginRight:"8px"}}/>
                      <div className='sideBarUserNomeMensagensItemNome' id={elem.uid}>{elem.nome}</div>
                  </div>

                </div>      
        })}
      </div>     
  );
}
