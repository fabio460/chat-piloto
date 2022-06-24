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
import InputBase from '../imputMensagens/InputBase';
export default function Home() {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [visivel,setVisivel]=useState(true)
  const [room,setRoom]=useState(0)
  const [mensagens,setMensagens]=useState([])
  const [getIdReceptor]=useState()
  const [idDaMensagem,setIdDaMensagem]=useState()
  useEffect(()=>{
    const mensageRef = query(collection(db,"chats"),where("sala","==",room),orderBy('uid'))
    onSnapshot(mensageRef,snap=>{
      let array=[]
      snap.docs.forEach(elem=>{
        array.push(elem.data())
        console.log(elem.data().uid+' sala: '+elem.data().sala)
      })
      setMensagens(array)
      let arrayZerado = array.length
      if (arrayZerado === 0) {
        
        setIdDaMensagem(1)
        console.log('ultimoId')
      }else{
        let ultimoId = array[array.length-1].uid  
        setIdDaMensagem(parseInt(ultimoId) + 1)
        console.log(array.length)
      }
     
      
    })
    
  
    setTimeout(() => {
      uteis.scroll()
    }, 400);
    
  },[room,idDaMensagem])
 
  console.log(visivel)
  return (
    <div className='Home'>
        <div className='HomeHeader'><ResponsiveAppBar user={user}/></div>
        <div className='HomeBody'>
          <div className='HomeSidebar '>
            <ToggleButtonNotEmpty user={user} setVisivel={setVisivel} setRoom={setRoom} getIdReceptor={getIdReceptor}/>
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
                              return<div className='mensagemItemBody'>
                                <div className={
                                  elem.usuarioLogado === user.displayName ?"usuarioLogado":"usuarioReceptor"
                                }>
                                  <div className='imagemAvatarItem'>
                                    <img className={
                                      elem.usuarioLogado === user.displayName ?
                                      "avatarReceptor  ":
                                      "avatarUsuario avatarVisible"
                                    } src={elem.photoURL} alt=''/>
                                  </div>
                                  <div>
                                    <div className='mensagemItem'>{elem.mensagem}
                                       <div className={
                                          elem.usuarioLogado === user.displayName ?
                                          "dataLeft ":
                                          "dataRigth "
                                       }>{elem.data.toString()}</div>
                                    </div>
                                  </div>
                                  <div className='imagemAvatarItem'>
                                    <img className={
                                      elem.usuarioLogado === user.displayName ?
                                      "avatarReceptor avatarVisible ":
                                      "avatarUsuario "
                                    } src={elem.photoURL} alt=''/>
                                  </div>
                                </div>
                              </div>
                            })}
                        </div>    
                      </div>  
                 
                 <div className=''><InputBase room={room} idReceptor={idDaMensagem}/></div>
              </div>
            }
             
            </div>
         
          </div>
        </div>
    </div>
  )
}