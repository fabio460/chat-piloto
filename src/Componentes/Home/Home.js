import React,{useEffect, useState} from 'react'
import './Home.css'
import uteis from '../../funcoesUteis'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth';
import ResponsiveAppBar from '../AppBar/ResponsiveAppBar';

import ToggleButtonNotEmpty from '../SideBar/ToggleButtonNotEmpty';
import { collection,where, onSnapshot, orderBy, query } from 'firebase/firestore';
import db from '../../fireBaseConfig';
import Mensagens from '../Mensagens/Mensagens';

import CustomizedInputBase from '../SideBar/CustomizedInputBase';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import PopoverPopupState from './PopoverPopupState';
export default function Home() {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [visivel,setVisivel]=useState(true)
  const [room,setRoom]=useState(0)
  const [mensagens,setMensagens]=useState([])
  const [idReceptor,getIdReceptor]=useState()
  const [idDaMensagem,setIdDaMensagem]=useState()
  
  //const [setNomeDoDocumento]=useState("")

  
  useEffect(()=>{
    const mensageRef = query(collection(db,"chats"),where("sala","==",room),orderBy('uid'))
    
    onSnapshot(mensageRef,snap=>{
      let array=[]
      snap.docs.forEach(elem=>{
        array.push(elem.data())
      })
      setMensagens(array)
    
      let arrayZerado = array.length
      if (arrayZerado === 0) {
        setIdDaMensagem(1)
      }else{
        let ultimoId = array[array.length-1].uid  
        setIdDaMensagem(parseInt(ultimoId) + 1)
      }
    })

    setTimeout(() => {
      uteis.scroll()
    }, 400);
    
  },[room,idDaMensagem,visivel])
 
  const getDocumento = (doc)=>{
    //setNomeDoDocumento(doc)
    return doc 
  }

  return (
    <div className='Home'>
        <div className='HomeBody'>
          <div className='HomeSidebar '>
            <div className='HomeSideBarHeader'>
              <div className='HomeSideBarHeaderLogo'><h1>Chat</h1></div>
              <div className='HomeSideBarHeaderAvatar'><PopoverPopupState/></div>
            </div>
            <div className='HomeSideBarHeaderInput'>
              <CustomizedInputBase/>
            </div>
            <div className='HomeSideBarHeaderUsuarios'>
                <ToggleButtonNotEmpty user={user} setVisivel={setVisivel} setRoom={setRoom} getIdReceptor={getIdReceptor}/>
            </div>
            
          </div>
          <div className='HomeMensage'>
          <div className='HomeHeader'><ResponsiveAppBar user={user}/></div>
            
            <div className='HomeMessageBody'>
            {room === 0 
              ?<div className='HomeMessageBodySemMensagem'>
                <AnnouncementIcon  sx={{fontSize:"200px",color:"green"}}/>
                <h1> não ha mensagens</h1>
              </div>
              :<Mensagens user={user} room={room} getDocumento={getDocumento} idDaMensagem={idDaMensagem} mensagens={mensagens} idReceptor={idReceptor}/>
            }
            </div>
          </div>


        </div>
    </div>
  )
}