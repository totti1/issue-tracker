import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { useParams } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { IssuePostCard, IssuePostsSort, IssuePostsSearch } from '../components/_dashboard/issues';
//
import POSTS from '../_mocks_/issues';
import { HomeSideMenu } from '../components/home';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------
const API =
  process.env.NODE_ENV !== 'production'
    ? process.env.REACT_APP_API_DEV
    : process.env.REACT_APP_API_URL;
export default function Issues() {
  const { id } = useParams();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const { data } = JSON.parse(localStorage.getItem('user'));
    const Is = JSON.parse(localStorage.getItem('issues'));
    if (Is) {
      const issue = Is.filter(i => i.projectid == id)
      setIssues(issue)
      setLoading(false)
    }
    getAllIssues(data.token);
  }, [0]);
  const getAllIssues = async (Token) => {
    const requestOptions = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`,
      },
    };
    try {
      const response = await fetch(`${API}/issues`, requestOptions);
      const { data } = await response.json();
      const issue = data.filter(i => i.projectid == id)
      setIssues(issue);
      localStorage.setItem('issues', data)
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Page title='Dashboard: Issues | Minimal-UI'>
      <Container>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          mb={5}
        >
          <Typography variant='h4' gutterBottom>
            Issues reported for Project 1
          </Typography>
          <Button
            variant='contained'
            component={RouterLink}
            to='#'
            startIcon={<Icon icon={plusFill} />}
          >
            New Issue
          </Button>
        </Stack>
        <Stack
          mb={5}
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <IssuePostsSearch posts={Issues} />
          <IssuePostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={8}>
            {!loading &&
              issues.map((is, index) => (
                <Grid item xs={12} sx={{ marginBottom: 2 }}>
                  <IssuePostCard
                    key={is.id}
                    issue={is}
                    post={is}
                    index={index}
                  />
                </Grid>
              ))}
          </Grid>
          <Grid item xs={4}>
            <HomeSideMenu />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
