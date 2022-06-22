import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
//import db from '../../fireBaseConfig'
export default function Login() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
    const logar = ()=>{
      signInWithPopup(auth, provider)
    }
  //console.log(db) 
  return (
    <div>
      <h1>Login</h1>
      <button onClick={logar}>Logar com Google</button>
    </div>
  )
}
