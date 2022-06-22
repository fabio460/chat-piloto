import * as React from 'react';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import {collection, onSnapshot, query, where} from 'firebase/firestore'
import db from '../../fireBaseConfig'
import uteis from '../../funcoesUteis';
export default function ToggleButtonNotEmpty({user,setVisivel,setRoom}) {
  const [alignment, setAlignment] = React.useState('left');
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  

  // aqui eu crio um id do usuario logado que seja um inteiro auto increment
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

  
  // +- 
  let [users,setUsers] =React.useState([])
  React.useEffect(()=>{
    let usuariosRef = query(collection(db,'user'))
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
  

  //pego os usuarios cadastrados no sistema
  const getUsuariosCadastrados = (e)=>{
    uteis.abrirTelaDeMensagens()
    setVisivel(true)
    setRoom(uteis.gerarSala( e.target.id , idLogado))
  }



  return (
    <Stack direction="column" spacing={3}>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        sx={{display:"flex",flexDirection:"column"}}
      >
       
        {users.map((elem,key)=>{
          return <ToggleButton value={elem} id={elem.uid} onClick={getUsuariosCadastrados}>
                    <img style={{borderRadius:"50%",width:"60px"}} alt={elem.nome} src={elem.avatar} id={elem.uid}/>
                </ToggleButton>
        })}
      </ToggleButtonGroup>
    </Stack>
  );
}
