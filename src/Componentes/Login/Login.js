import React, { useEffect, useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import './Login.css'
import { addDoc, collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import db from '../../fireBaseConfig';
import Button from '@mui/material/Button';
export default function Login() {
  const auth = getAuth();
  
  const provider = new GoogleAuthProvider();
  const [numUsuer,setNumUser]=useState(1)
 
  
  useEffect(()=>{
    const colRef2 = query(collection(db, "user"),orderBy("uid"))
    onSnapshot(colRef2, (snapshot) => {
      let aux = []
        snapshot.docs.forEach((doc) => {
            aux.push(doc.data())  
        })
        let defined = aux[aux.length - 1]
        if (defined !== undefined) {
          setNumUser(defined.uid + 1)
        }
    })
  },[])

  async function cadastrarUsuario(email,nome,senha,avatar,uid,data) {
    addDoc(collection(db, "user"), {
        email,
        nome,
        senha,
        avatar,
        uid,
        data
        });
    }


  const logar = ()=>{
    signInWithPopup(auth, provider)
    .then(async(result) => {
  
      const colRef = query(collection(db, "user"),where("email", "==", auth.currentUser.email))
      onSnapshot(colRef, (snapshot) => {
          let tamanhoArray = snapshot._snapshot.docChanges.length
          
          
          if (tamanhoArray === 0) {
                  cadastrarUsuario(auth.currentUser.email,auth.currentUser.displayName,"",auth.currentUser.photoURL,numUsuer,new Date())
                  console.log(auth.currentUser.email+" cadastrado com sucesso")    
                 
          }        
      })
  
    }).catch((error) => {
  
      // ...
    });
  }
    
  //console.log(db) 
  return (
    <div className='loginContainer'>
      <h1>Login</h1>
    
      <Button variant="contained" onClick={logar}>Logar com Google</Button>
    </div>
  )
}
