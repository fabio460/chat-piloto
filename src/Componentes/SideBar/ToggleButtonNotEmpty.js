import * as React from 'react';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {collection, onSnapshot, orderBy, query, where} from 'firebase/firestore'
import db from '../../fireBaseConfig'
import uteis from '../../funcoesUteis';
import { Avatar } from '@mui/material';
import {useDispatch} from 'react-redux'
export default function ToggleButtonNotEmpty({user,setVisivel,setRoom,getIdReceptor}) {
  const [alignment, setAlignment] = React.useState('left');
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  
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
      })
    })
    //uteis.mostrarInput()
    
    setVisivel(true)
     
     setRoom(uteis.gerarSala( e.target.id , idLogado))
     //getIdReceptor()
     getIdReceptor(parseInt(e.target.id))
     function scroll(params) {
      document.querySelector(".mensagens").scrollTop=1000000
    }
    scroll()
    
 
    uteis.abrirMensagens()
   
  }
 

  return (
    <Stack direction="column" spacing={0}>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        sx={{display:"flex",flexDirection:"column",margin:"0px",border:"none"}}
      >
       
        {users.map((elem,key)=>{
          return <ToggleButton value={elem.uid} id={elem.uid}
                    sx={{margin:"0px",border:"none",padding:"0px"}}
                    onClick={ getUsers}
                  >
                    <div  style={{
                        display:"flex",
                        justifyContent:"space-between",
                        width:"100%",
                        
                        margin:"5px",
                        padding:"5px",
                    }} id={elem.uid}>
                       <Avatar style={{borderRadius:"50%",width:"40px",marginRight:"10px"}}
                          alt={elem.nome}
                          src={elem.avatar}
                          id={elem.uid}/>
                       <div  id={elem.uid}>
                         <div id={elem.uid}>{elem.nome}</div>
                         <div id={elem.uid}>{elem.ultimaMensagem[0]}</div>
                       </div>
                       <div style={{margin:"0px 15px",fontSize:"10px"}}>{elem.ultimaMensagem[1]}</div>
                    </div>
                    
                </ToggleButton>
        })}
      </ToggleButtonGroup>
    </Stack>
  );
}
