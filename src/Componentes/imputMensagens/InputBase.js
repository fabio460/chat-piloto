
import React,{useState} from 'react'
import './InputBase.css'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

import {useAuthState} from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import db from '../../fireBaseConfig';




export default function InputBase({room,idReceptor}) {
  const [mensagem,setMensagem]=useState([])
  const auth = getAuth();
  const [user] = useAuthState(auth);
    const enviar =async ()=>{
       if(mensagem !== ""){
        try {
          console.log(room+' '+idReceptor+' '+user.displayName)
          const docRef = await addDoc(collection(db, "chats"), {
            data:new Date().getHours()+":"+new Date().getMinutes(),
            mensagem,
            photoURL:user.photoURL,
            sala:room,
            uid:idReceptor,
            usuarioLogado:user.displayName
         });
         console.log(docRef)
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
          <Fab color="secondary" aria-label="edit" sx={{width:"40px",height:"40px",marginTop:"13px"}} onClick={enviar}>
            <EditIcon sx={{width:"30px"}}/>
          </Fab>
        </Box>   
    </div>
  )
}