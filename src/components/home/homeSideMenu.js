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

export default function AlignItemsList({ recent }) {
  if (!recent) {
    return (
      <Card elevation={9}>
        <CardHeader title="Joined Projects" />
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItemButton alignItems="flex-start">
            <ListItemText
              primary="============="
              variant="subtitle2"
              secondary={
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.secondary"
                >
                  No project found!
              </Typography>
              }
            />
          </ListItemButton>

        </List>
      </Card>
    )
  }
  return (
    <Card elevation={9}>
      <CardHeader title="Joined Projects" />
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {recent.reverse().splice(0, 3).map((item, index) => (
          <>
            <Divider />
            <ListItemButton alignItems="flex-start">
              <ListItemText
                primary={item.name}
                variant="subtitle2"
                secondary={
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {item.key} | {item.lead.displayName}
                  </Typography>
                }
              />
            </ListItemButton>
          </>
        ))}
      </List>
    </Card>
  );
}
