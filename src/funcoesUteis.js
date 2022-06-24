
import { collection, onSnapshot, query } from "firebase/firestore"
import db from "./fireBaseConfig"
//const [array,setArray]=useState([])
var array = []
const uteis ={
    abrirMensagens : ()=>{
        document.querySelector(".HomeSidebar").classList.add("sumir")
      
    },
    fecharMensagens : ()=>{
        document.querySelector(".HomeSidebar").classList.remove("sumir")
        
    },

    mostrarInput:()=>{
        document.querySelector(".inputMensage").classList.add("display")
    },
    esconderInput:()=>{
        document.querySelector(".inputMensage").classList.remove("display")
    },
    gerarSala:(a,b)=> {
        let frase = a.toString() + b.toString()
        let array = frase.split('')
        
        let arrayOrd = array.sort()
        let res = ""
        arrayOrd.forEach(element => {
           res += element
        });
        return res
     },
     getUsuariosCadastrados:()=>{
        let usuariosRef = query(collection(db,'user'))
   
        onSnapshot(usuariosRef,(snapshot)=>{
          let aux = []
          snapshot.docs.forEach(doc=>{
              aux.push(doc.data())      
          })
          array=aux
        })
        return array
     },
     scroll:()=>{
        document.querySelector(".mensagens").scrollTop=100000000
     }
}
export default uteis