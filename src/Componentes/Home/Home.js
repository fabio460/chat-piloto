import React,{useEffect, useState} from 'react'
import './Home.css'
import uteis from '../../funcoesUteis'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth';
import ResponsiveAppBar from '../AppBar/ResponsiveAppBar';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import ToggleButtonNotEmpty from '../SideBar/ToggleButtonNotEmpty';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import db from '../../fireBaseConfig';
export default function Home() {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [visivel,setVisivel]=useState(true)
  const [room,setRoom]=useState(0)
  const [mensagens,setMensagens]=useState([])

  
  useEffect(()=>{
    const mensageRef = query(collection(db,"chats"),where("sala","==",room),orderBy('uid'))
    onSnapshot(mensageRef,snap=>{
      let array=[]
      snap.docs.forEach(elem=>{
        array.push(elem.data())
      })
      setMensagens(array)
    })
    
  },[room])
  console.log(visivel)
  return (
    <div className='Home'>
        <div className='HomeHeader'><ResponsiveAppBar user={user}/></div>
        <div className='HomeBody'>
          <div className='HomeSidebar '>
            <ToggleButtonNotEmpty user={user} setVisivel={setVisivel} setRoom={setRoom}/>
          </div>
          <div className='HomeMensage'>
            <div className='iconeFecharMensagem'><ArrowBackIosNewIcon onClick={uteis.fecharMensagens} /></div>
            <div className='HomeMessageBody'>
            {room === 0 
              ?<div>não ha mensagens</div>
              :<div>
                <div className='mensagensContainer'>
                    <div className='mensagens'>
                        {mensagens.map(elem=>{
                          return<>
                            <div className={
                              elem.usuarioLogado === user.displayName ?"usuarioLogado":"usuarioReceptor"
                            }>
                              <img className='avatar' src={elem.photoURL} alt=''/>
                              <div className='mensagemItem'>{elem.mensagem}</div>
                            </div>
                          </>
                        })}
                    </div>    
                  </div>    
                <input/>
              </div>
            }
             
            </div>
         
          </div>
        </div>
    </div>
  )
}
