import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import NearMeIcon from '@mui/icons-material/NearMe';
import {useAuthState} from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth';
import { collection, doc, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';
import db from '../../fireBaseConfig';
import { useSelector } from 'react-redux';

import EmojiBtn from './EmojiBtn';
export default function CustomizedInputBase({room,idReceptor,idDaMensagem}) {
    
    const [mensagem,setMensagem]=React.useState([])
    const auth = getAuth();
    const [user] = useAuthState(auth);
    const documents = useSelector(state=>state.documento.doc)
    const receptor = useSelector(state=>state.ReceptorRducer.receptor)
    const [idEmissor,setIdEmissor]=React.useState([])


    React.useEffect(()=>{
      const idRef = query(collection(db,"user"),where("email","==",user.email))
      onSnapshot(idRef,snap=>{
        snap.docs.forEach(doc=>{
          setIdEmissor(doc.data().uid)
        })
      })

    },[user])
    
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
            uid:idDaMensagem,
            usuarioLogado:user.displayName,
            documento,
            //receptor
          }
         );
         let ultimaMensagem = [{
            mensagem,
            hora:hora+":"+minutos,
            receptor
          }]


          setDoc(doc(db,'ultimasMensagens',room),{
            uid:idEmissor,
            mensagem,
            hora:hora+":"+minutos,
            receptor,
            room,
            usuario:user.email,
            nome:user.displayName,
            avatar:user.photoURL
         }) 

         console.log(docRef)


         async function upDate() {
          const ref = query(collection(db,"user"),where("uid","==",parseInt(idReceptor)))
          onSnapshot(ref,(snap)=>{
            let array = []
            snap.docs.forEach(doc=>{
              array.push(doc._key.path.segments[6])
            })
          })
          let usuarioReceptorRef = doc(db, "user", documents)
          await updateDoc(usuarioReceptorRef, {
            ultimaMensagem,
            hora:parseInt(new Date().getTime())
          }); 
         }
         upDate()
         hora = new Date().getHours()
         minutos = new Date().getMinutes()
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
    const enviarComEnter= (e)=>{
         if(e.code === "Enter"){
           enviar()
         }
    }
    const emoji = useSelector(state=>state.getEmoji.emoji)
    React.useEffect(()=>{
      setMensagem(mensagem=> mensagem + emoji)
    },[emoji])
  return (
    <Paper
      component=""
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 900,margin:"auto ",borderRadius:"30px" }}
    >
      <IconButton sx={{ p: '5px' }} aria-label="menu">
        <EmojiBtn 
          onChange={e=>setMensagem(res => res + e.target.value)} value={mensagem}
          setMensagem={setMensagem}
          mensagem={mensagem}
        />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Envie sua mengem "
        inputProps={{ 'aria-label': 'search ' }}
        onChange={e=>setMensagem(e.target.value )} value={mensagem}
        onKeyUp={e=> enviarComEnter(e)}
      />
      
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" 
         onClick={enviar}
      >
        <NearMeIcon />
      </IconButton>
  </Paper>
  );
}
