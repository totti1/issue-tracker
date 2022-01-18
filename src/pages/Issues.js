import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { IssuePostCard, IssuePostsSort, IssuePostsSearch } from '../components/_dashboard/issues';
//
import POSTS from '../_mocks_/issues';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------
const API =
  process.env.NODE_ENV !== 'production'
    ? process.env.REACT_APP_API_URL
    : process.env.REACT_APP_API_URL;
export default function Issues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getJiraProject();
  }, [0]);
  const getJiraProject = async () => {
    setLoading(true);
    const requestOptions = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await fetch(`${API}/issues`, requestOptions);
      const { data } = await response.json();
      setIssues(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Page title="Dashboard: Issues | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Issues Reported
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Issue
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <IssuePostsSearch posts={Issues} />
          <IssuePostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {!loading &&
            issues.map((is, index) => (
              <IssuePostCard key={is.id} issue={is} post={is} index={index} />
            ))}
        </Grid>
      </Container>
    </Page>
  );
}
