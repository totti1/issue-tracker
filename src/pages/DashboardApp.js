import { useState, useEffect } from 'react';
// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppNewsUpdate,
  AppConversionRates
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------
const API =
  process.env.NODE_ENV !== 'production'
    ? process.env.REACT_APP_API_DEV
    : process.env.REACT_APP_API_URL;
export default function DashboardApp() {
  const [projects, setProjects] = useState([]);
  const [iloading, setILoading] = useState(true);
  const [ploading, setPLoading] = useState(true);
  const [user, setUser] = useState({});
  const [issues, setIssues] = useState([]);
  useEffect(() => {
    try {
      const userData = localStorage.getItem('user')
      if (!userData) {
        return false
      }
      const { data } = JSON.parse(userData);
      getIssues(data.token);
      getProjects(data.token);
      if (data) {
        setUser(data);
      }
    } catch (error) {
      console.log(error)
    }

  }, [0]);
  const getIssues = async (Token) => {

    const requestOptions = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`
      }
    };
    try {
      const response = await fetch(`${API}/issues`, requestOptions);
      const { data } = await response.json();
      setIssues(data);
      localStorage.setItem('issues', JSON.stringify(data))
      setILoading(false);
    } catch (error) {
    }
  };
  const getProjects = async (Token) => {
    const requestOptions = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`
      }
    };
    try {
      const response = await fetch(`${API}/projects`, requestOptions);
      const { data } = await response.json();
      setProjects(data);
      localStorage.setItem('projects', JSON.stringify(data))
      setPLoading(false);
    } catch (error) {

    }
  };

  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4"> Welcome back, {user.first_name || 'again'}!</Typography>
        </Box>
        <Grid container spacing={3}>

          <Grid item xs={12} md={6} lg={12}>
            {!ploading && <AppConversionRates projects={projects} />}
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            {!iloading && <AppNewsUpdate projects={issues} />}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
