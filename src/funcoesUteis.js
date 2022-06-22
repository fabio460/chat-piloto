
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
     }
}
export default uteis