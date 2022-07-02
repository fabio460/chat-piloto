import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { doc, deleteDoc, query, collection, onSnapshot, where } from "firebase/firestore";
import db from '../../fireBaseConfig';
import { useSelector } from 'react-redux';
export default function AlertDialog({id}) {
  const [open, setOpen] = React.useState(false);
  const sala = useSelector(state=> state.salaReducer.sala)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const deletar = async()=>{
    try {
        
       
        const refChat = query(collection(db,"chats"),where("sala","==",sala))
        onSnapshot(refChat,snap=>{
          let aux = []
          snap.docs.forEach(doc=>{
            aux.push(doc.data())
            //alert("tem objeto")
          })
          if(aux.length === 0){
            deleteDoc(doc(db, "ultimasMensagens", sala))
          }
          console.log(aux.length)
        })
        await deleteDoc(doc(db, "chats", id))
        
    } catch (error) {
        console.log(error)
    }
    handleClose()
  }

  return (
    <div>
        <MoreVertIcon onClick={handleClickOpen} fontSize='6px'/>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deseja deletar sua mensagem ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
        
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Não</Button>
          <Button onClick={deletar} autoFocus>
            <span style={{color:"red"}}>Sim</span>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
