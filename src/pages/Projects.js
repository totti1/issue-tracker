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

import { projectsMock } from '../__mocks__/projectsMock';


export default function Projects() {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([])
  useEffect(() => {
    const Projects = JSON.parse(localStorage.getItem('projects'))
    setProjects(Projects)
  }, [])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
                projectLead={items.lead.displayName}
                onClick={handleOpen}
                redirectTo={`/dashboard/issues/${items.id}`}
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
          sx={{ marginTop: 2, marginBottom: 2 }}
        />
        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Send Invitation
        </LoadingButton>
      </BasicModal>
    </Page>
  );
}
