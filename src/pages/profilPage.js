// material
import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
// components
import { HomeSideMenu, UserProfileSide } from '../components/home';
import POSTS from '../_mocks_/issues';
import { IssuePostCard } from 'src/components/_dashboard/issues';


// ----------------------------------------------------------------------

export default function ProfilPage() {
  const [issues, setIssues] = useState(null)
  const [projects, setProjects] = useState(null)
  useEffect(() => {
    try {
      const issues = JSON.parse(localStorage.getItem('issues'))
      const projects = JSON.parse(localStorage.getItem('projects'))
      setIssues(issues)
      setProjects(projects)
    } catch (error) {
      console.log(error)
    }

  }, [issues])
  return (
    <div>
      <Grid container spacing={3} sx={{ pb: 5 }}>
        <Grid item xs={12} sx={{ marginBottom: 1 }}>
          <Typography variant="h4">My Issues</Typography>
        </Grid>
        <Grid item xs={8} sx={{ marginBottom: 20 }}>
          {issues && issues.map((post, index) => (
            <IssuePostCard key={post.id} issue={post} post={post} index={index} />
          ))}
        </Grid>
        <Grid item xs={4}>
          <UserProfileSide />
          <br />
          <HomeSideMenu recent={projects && projects} />
        </Grid>
      </Grid>
    </div>
  );
}
