import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography, Avatar, ListItemIcon, Divider, CardHeader, Card } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

import ImageAvatars from './avatar';

export default function UserProfileSide() {
  return (
    // <Box
    //   sx={{
    //     display: 'flex',
    //     flexWrap: 'wrap',
    //     justifyContent: 'center',
    //     '& > :not(style)': {
    //       m: 1,
    //       width: 128,
    //       height: 128
    //     }
    //   }}
    // >
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
      <CardHeader title="Aristote Katy" />
      <ListSubheader component="div" id="nested-list-subheader">
        Product Owner
      </ListSubheader>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', paddingLeft: '7.5%' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        // subheader={
        // }
      >
        <ListItemButton>
          <ListItemIcon>
            <AlternateEmailIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body2" noWrap>
              robert.lewandoski@gmail.com
            </Typography>
          </ListItemText>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <ContactPhoneIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body2" noWrap>
              +250847463734
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
    </Card>
    // </Box>
  );
}
