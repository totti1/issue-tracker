import * as React from 'react';
import { Card, CardHeader, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function ProjectCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card sx={{ minWidth: 345, marginBottom: 2 }}>
      <CardHeader title={props.issueTitle} subheader={props.issueDateCreated} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.issueDescription}
        </Typography>
      </CardContent>
      <CardActions sx={{ marginLeft: '2.5%' }}>
        <Button size="small" to={props.redirectTo} component={RouterLink}>
          Check Issues
        </Button>
        <Button size="small" onClick={props.onClick}>
          Add new client
        </Button>
      </CardActions>
    </Card>
  );
}
