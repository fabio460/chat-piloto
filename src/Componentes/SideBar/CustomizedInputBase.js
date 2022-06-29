import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


export default function CustomizedInputBase() {
  return (
    <Paper
      component=""
      sx={{ p: '2px 5px', display: 'flex', alignItems: 'center', width: 312,margin:"auto ",borderRadius:"10px" }}
    >
     
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Busque usuarios cadastrados"
        inputProps={{ 'aria-label': 'search google maps' }}
      />

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
