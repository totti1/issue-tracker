import { useState, useEffect } from 'react';
import { Typography, Avatar, ListItemIcon, Divider, CardHeader, Card } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

import ImageAvatars from './avatar';

export default function UserProfileSide() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    try {
      const userData = localStorage.getItem('user')
      if (!userData) {
        return false
      }
      const { data } = JSON.parse(userData);
      setUser(data);
    } catch (error) {

    }

  }, [])
  return (
    <Card
      elevation={9}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 1.5
      }}
    >
      <ImageAvatars />
      <CardHeader title={`${user && user.first_name} ${user && user.last_name}`} />
      <ListSubheader component="div" id="nested-list-subheader">
        {user && user.isadmin ? "Admin" : "Contributor"}
      </ListSubheader>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', paddingLeft: '7.5%' }}
        component="nav"
        aria-labelledby="nested-list-subheader"

      >
        <ListItemButton>
          <ListItemIcon>
            <AlternateEmailIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body2" noWrap>
              {user && user.email}
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
    </Card>
  );
}
