import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


import NearMeIcon from '@mui/icons-material/NearMe';
import {useAuthState} from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import db from '../../fireBaseConfig';
export default function CustomizedInputBase({room,idReceptor}) {


  const [mensagem,setMensagem]=React.useState([])
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
    <Paper
      component=""
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 900,margin:"auto ",borderRadius:"30px" }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Envie sua mengem "
        inputProps={{ 'aria-label': 'search ' }}
        onChange={e=>setMensagem(e.target.value)} value={mensagem}
      />
      
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={enviar}>
        <NearMeIcon />
      </IconButton>
    </Paper>
  );
}
