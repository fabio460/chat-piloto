import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { useSelector } from 'react-redux';
import './AppBar.css'
export default function GroupAvatars({src}) {
  const receptor = useSelector(state=>state.ReceptorRducer.receptor )  
  
  return (
    <AvatarGroup max={4}>
      <Avatar alt="Remy Sharp" src={src} />
      <Avatar className='avatarReceptor' alt={receptor.nome} src={receptor.avatar} sx={{marginLeft:"-5px"}}/>
    </AvatarGroup>
  );
}
