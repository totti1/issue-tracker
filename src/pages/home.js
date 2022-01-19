// material
import { useState } from 'react';
import { Box, Grid, Container, Typography, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { BasicModal } from '../components/_dashboard/projects';
// components
import { HomeNavbar, HomeSideMenu, UserProfileSide, HomeIssueCard } from '../components/home';
import POSTS from '../_mocks_/issues';

// ----------------------------------------------------------------------

export default function Home() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <HomeNavbar />
      <Container maxWidth="xl" sx={{ marginTop: '2%' }}>
        <Grid container spacing={2} sx={{ pb: 5 }}>
          <Grid item xs={3}>
            <HomeSideMenu />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              sx={{ width: '100%', borderRadius: 1.2, border: 1.2, marginBottom: 2, elevation: 9 }}
              onClick={handleOpen}
            >
              Add New Issue
            </Button>
            {/* <Typography variant="h4">Hi, Welcome back</Typography> */}
            {POSTS.map((post, index) => (
              <HomeIssueCard
                issueTitle={post.title}
                issueDescription={post.title}
                issueDateCreated="September 14, 2016"
              />
            ))}
          </Grid>
          <Grid item xs={3}>
            <UserProfileSide />
          </Grid>
        </Grid>
      </Container>
      <BasicModal open={open} onClose={handleClose}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          New Issue
        </Typography>
        <TextField
          fullWidth
          type="text"
          label="Title"
          sx={{ marginTop: 2, marginBottom: 2 }}
          // {...getFieldProps('email')}
          // error={Boolean(touched.email && errors.email)}
          // helperText={touched.email && errors.email}
        />
        <TextField
          fullWidth
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          sx={{ marginTop: 2, marginBottom: 2 }}
        />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          // loading={isSubmitting}
        >
          Add Issue
        </LoadingButton>
      </BasicModal>
    </div>
  );
}
