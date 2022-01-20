// import { filter } from 'lodash';
// import { Icon } from '@iconify/react';
// import { sentenceCase } from 'change-case';
import { useState } from 'react';
// import plusFill from '@iconify/icons-eva/plus-fill';
// import { Link as RouterLink } from 'react-router-dom';
// material
import {
  // Card,
  // Table,
  Stack,
  // Avatar,
  // Button,
  // Checkbox,
  // TableRow,
  // TableBody,
  // TableCell,
  Container,
  Typography,
  // TableContainer,
  // TablePagination,
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
          {projectsMock.map((items) => (
            <Grid item xs={4}>
              <ProjectCard
                issueTitle={items.title}
                issueDescription={items.description}
                issueDateCreated={items.createdAt}
                onClick={handleOpen}
                redirectTo="/dashboard/issues"
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
