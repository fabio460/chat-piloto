import * as React from 'react';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Avatar } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signOut } from 'firebase/auth';

export default function PopoverPopupState() {
    const auth = getAuth();
    const [user] = useAuthState(auth);
    const deslogar = ()=>{
        signOut(getAuth())
      }
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Avatar src={user.photoURL} {...bindTrigger(popupState)}/>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Typography sx={{ p: 2 }} onClick={deslogar}>Logout</Typography>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
