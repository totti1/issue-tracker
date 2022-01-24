import { useState, useEffect } from 'react';
import {
  Stack,
  Container,
  Typography,
  TextField,
  Grid
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { ProjectCard } from '../components/home';
import { BasicModal } from '../components/_dashboard/projects';
import Page from '../components/Page';

const API =
  process.env.NODE_ENV !== 'production'
    ? process.env.REACT_APP_API_DEV
    : process.env.REACT_APP_API_URL;

export default function Projects() {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([])
  const [ID, setID] = useState(0)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  useEffect(() => {
    try {
      const userData = localStorage.getItem('user')
      if (!userData) {
        return false
      }
      const { data } = JSON.parse(userData);
      setUser(data)
      const Projects = JSON.parse(localStorage.getItem('projects'))
      setProjects(Projects)
    } catch (error) {

    }

  }, [0])
  const handleOpen = (id) => {
    setID(id)
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };
  const sendInvite = async () => {
    const URL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : window.location.hostname
    console.log(URL)
    setLoading(true);
    let info = {
      url: URL,
      email,
      projectID: ID
    }
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(info)
    };
    try {
      const response = await fetch(`${API}/auth/invite`, requestOptions);
      const data = await response.json();

      setOpen(false)
      if (data.status === 200 || data.error === "Data Already Inserted!") {
        alert('Invited successful');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Page title="Projects | Issue Tracker">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Projects
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          {projects && projects.map((items) => (
            <Grid item xs={4}>
              <ProjectCard
                issueTitle={`${items.name}(${items.key})`}
                projectTypeKey={items.projectTypeKey}
                projectKey={items.key}
                projectID={items.id}
                isAdmin={user.isadmin}
                projectLead={items.lead.displayName}
                onClickInviteClient={() => handleOpen(items.id)}
                redirectToIssues={`/dashboard/issues/${items.id}`}
                redirectToNewIssue={`/dashboard/new/issue/${items.id}`}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <BasicModal open={open} onClose={handleClose}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Invite Client
        </Typography>
        <TextField
          fullWidth
          autoComplete="username"
          type="email"
          label="Email address"
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginTop: 2, marginBottom: 2 }}
        />
        <LoadingButton onClick={sendInvite} loading={loading} fullWidth size="large" type="submit" variant="contained">
          Send Invitation
        </LoadingButton>
      </BasicModal>
    </Page>
  );
}
