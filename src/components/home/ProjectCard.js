import * as React from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function ProjectCard(props) {
  // const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ minWidth: 345, marginBottom: 2 }}>
      <CardHeader
        title={props.issueTitle}
        subheader={props.projectTypeKey}
        action={
          <div>
            <IconButton 
              aria-label="settings"
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={props.onClickInviteClient}>
              Invite Client
            </MenuItem>
            <MenuItem onClick={handleClose} to={props.redirectToNewIssue} component={RouterLink}>
              Report Issue
            </MenuItem>
          </Menu>
        </div>
        }
      />
      <CardContent>
        <Typography variant="body" color="text.secondary">
          Created by {props.projectLead}
        </Typography>
      </CardContent>
      <CardActions sx={{ marginLeft: '2.5%' }}>
        <Button size="small" to={props.redirectToIssues} component={RouterLink}>
          Check Issues
        </Button>
        {/* <Button size="small" onClick={props.onClick}>
          Invite client
        </Button> */}
      </CardActions>
    </Card>
  );
}
