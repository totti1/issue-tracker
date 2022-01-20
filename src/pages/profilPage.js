// material
import { useState } from 'react';
import { Box, Grid, Container, Typography, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { BasicModal } from '../components/_dashboard/projects';
// components
import { HomeNavbar, HomeSideMenu, UserProfileSide, IssueCard } from '../components/home';
import POSTS from '../_mocks_/issues';
import { IssuePostCard } from 'src/components/_dashboard/issues';


// ----------------------------------------------------------------------

export default function ProfilPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      {/* <HomeNavbar /> */}
      {/* <Container maxWidth="xl" sx={{ marginTop: '2%' }}> */}
      <Grid container spacing={2} sx={{ pb: 5 }}>
        <Grid item xs={3}>
          <HomeSideMenu />
        </Grid>
        <Grid item xs={6} sx={{ marginBottom: 20 }}>
          {/* <Typography variant="h4">Hi, Welcome back</Typography> */}
          {POSTS.map((post, index) => (
            <IssuePostCard key={post.id} issue={post} post={post} index={index} />
          ))}
        </Grid>
        <Grid item xs={3}>
          <UserProfileSide />
        </Grid>
      </Grid>
      {/* </Container> */}
      <BasicModal open={open} onClose={handleClose}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Report a New Issue
        </Typography>
        <TextField
          fullWidth
          type="text"
          label="Title"
          sx={{ marginTop: 2, marginBottom: 2 }}
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
          Report
        </LoadingButton>
      </BasicModal>
      <Button
        variant="outlined"
        sx={{
          width: '100%',
          borderRadius: 1.2,
          border: 1.2,
          position: 'sticky',
          bottom: 16,
          right: 16
        }}
        onClick={handleOpen}
      >
        Report a New Issue
      </Button>
    </div>
  );
}
