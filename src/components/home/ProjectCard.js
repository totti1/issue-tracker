import * as React from 'react';
import { Card, CardHeader, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function ProjectCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card sx={{ minWidth: 345, marginBottom: 2 }}>
      <CardHeader title={props.issueTitle} subheader={props.projectTypeKey} />
      <CardContent>
        <Typography variant="body" color="text.secondary">
          Created by {props.projectLead}
        </Typography>
      </CardContent>
      <CardActions sx={{ marginLeft: '2.5%' }}>
        <Button size="small" to={props.redirectTo} component={RouterLink}>
          Check Issues
        </Button>
        <Button size="small" onClick={props.onClick}>
          Invite client
        </Button>
      </CardActions>
    </Card>
  );
}
