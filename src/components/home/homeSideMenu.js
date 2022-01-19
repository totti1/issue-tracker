import * as React from 'react';
import {
  Paper,
  CardHeader,
  ListItemButton,
  ListItemText,
  Divider,
  List,
  Typography,
  Card
} from '@mui/material';

export default function AlignItemsList() {
  return (
    <Card elevation={9}>
      <CardHeader title="Other Projects" />
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <Divider />
        <ListItemButton alignItems="flex-start">
          <ListItemText
            primary="Brunch this weekend?"
            variant="subtitle2"
            secondary={
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.secondary"
              >
                I'll be in your neighborhood doing errands
              </Typography>
            }
          />
        </ListItemButton>
        <Divider />
        <ListItemButton alignItems="flex-start">
          <ListItemText
            primary="Summer BBQ"
            secondary={
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.secondary"
              >
                Wish I could come, but I'm out of town
              </Typography>
            }
          />
        </ListItemButton>
        <Divider />
        <ListItemButton alignItems="flex-start">
          <ListItemText
            primary="Oui Oui"
            secondary={
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.secondary"
              >
                Do you have Paris recommendations?
              </Typography>
            }
          />
        </ListItemButton>
      </List>
    </Card>
  );
}
