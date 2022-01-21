// material
import { useState } from 'react';
import { Grid, Typography } from '@mui/material';
// components
import { HomeSideMenu, UserProfileSide } from '../components/home';
import POSTS from '../_mocks_/issues';
import { IssuePostCard } from 'src/components/_dashboard/issues';


// ----------------------------------------------------------------------

export default function ProfilPage() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Grid container spacing={3} sx={{ pb: 5 }}>
        <Grid item xs={8} sx={{ marginBottom: 20 }}>
          <Typography variant="h4">My Issues</Typography><br />
          {POSTS.map((post, index) => (
            <IssuePostCard key={post.id} issue={post} post={post} index={index} />
          ))}
        </Grid>
        <Grid item xs={4}>
          <UserProfileSide />
          <br />
          <HomeSideMenu />
        </Grid>
      </Grid>
    </div>
  );
}
