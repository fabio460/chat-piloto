
import React,{useState} from 'react'
import './InputBase.css'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

import NearMeIcon from '@mui/icons-material/NearMe';
import {useAuthState} from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import db from '../../fireBaseConfig';




export default function InputBase({room,idReceptor}) {
  const [mensagem,setMensagem]=useState([])
  const auth = getAuth();
  const [user] = useAuthState(auth);
    const enviar =async ()=>{
       if(mensagem !== ""){
        try {
          
          let hora = new Date().getHours()
          let minutos = new Date().getMinutes()
          if (hora < 10) {
            hora.toString()
            hora = '0' + hora
          }
          if (minutos < 10) {
            minutos.toString()
            minutos = '0' + minutos
          }
          let documento =  Math.random().toString()
          const docRef = await setDoc(doc(db, "chats",documento), {
            data:hora+":"+minutos,
            mensagem,
            photoURL:user.photoURL,
            sala:room,
            uid:idReceptor,
            usuarioLogado:user.displayName,
            documento
         });
         hora = new Date().getHours()
         minutos = new Date().getMinutes()
         console.log(docRef._key.path.segments[1])
        } catch (error) {
          console.log(error)
        }
        setMensagem("")
        function scroll(params) {
          document.querySelector(".mensagens").scrollTop=1000000
        }
        scroll()
       }
    }
 
  return (
    <div className='inputMensage'>
        <div className='inputMessagItem'><input className='inputMessagItem' onChange={e=>setMensagem(e.target.value)} value={mensagem}/></div>
        <Box sx={{ marginRight:"0px" }}>
          <Fab color="success" aria-label="edit" sx={{width:"40px",height:"40px",marginTop:"13px"}} onClick={enviar}>
            <NearMeIcon sx={{width:"30px"}}/>
          </Fab>
        </Box>   
    </div>
  )
}