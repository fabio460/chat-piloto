
import { Avatar } from '@mui/material'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import db from '../../fireBaseConfig'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth';
export default function MensagensSideBar() {
const [mensagens,setMensagens]=useState([])    
const [user] = useAuthState(getAuth());
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
console.log(user.email)
  return (
    <div className='sidebarListaDeMensagens'>
       {mensagens.map(item=>{
            if(user.email === item.usuario || user.email === item.receptor.email){
              return <div>
                <Avatar src={user.email === item.usuario?item.receptor.avatar:item.avatar}/>
                <div>
                  <div>{item.receptor.nome}</div>
                  <div>{item.mensagem}</div>
                </div>
                <div>{item.data}</div>
            </div>
            }
          }
       )}
    </div>
  )
}
