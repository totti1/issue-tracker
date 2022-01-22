import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { useParams } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { IssuePostCard } from '../components/_dashboard/issues';


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
    const userData = localStorage.getItem('user')
    if (!userData) {
      return false
    }
    const { data } = JSON.parse(userData);
    let Is = localStorage.getItem('issues')
    if (Is) {
      try {
        const Iss = JSON.parse(Is);
        const issue = Iss.filter(i => i.projectid === id)
        setIssues(issue)
      } catch (error) {
        setLoading(false)
      }
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
    <Page title='Dashboard: Issues'>
      <Container>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          mb={5}
        >
          <Typography variant='h4' gutterBottom>
            Issues reported
          </Typography>
          <Button
            variant='contained'
            component={RouterLink}
            to={`/dashboard/new/issue/${id}`}
            startIcon={<Icon icon={plusFill} />}
          >
            New Issue
          </Button>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12}>
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
        </Grid>
      </Container>
    </Page>
  );
}
