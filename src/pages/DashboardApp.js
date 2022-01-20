import { useState, useEffect } from 'react';
// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  // AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  // AppOrderTimeline,
  // AppCurrentVisits,
  // AppWebsiteVisits,
  // AppTrafficBySite,
  // AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------
const API =
  process.env.NODE_ENV !== 'production'
    ? process.env.REACT_APP_API_DEV
    : process.env.REACT_APP_API_URL;
const JIRA_URL = process.env.REACT_APP_JIRA_URL;
const JIRA_KEY = process.env.REACT_APP_JIRA_KEY;
export default function DashboardApp() {
  const [projects, setProjects] = useState([]);
  const [iloading, setILoading] = useState(false);
  const [ploading, setPLoading] = useState(false);
  const [user, setUser] = useState({});
  const [issues, setIssues] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'));
    setUser(data);
    getIssues(data.token);
    getProjects(data.token);
  }, [0]);
  const getIssues = async (Token) => {
    setILoading(true);
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
      setILoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getProjects = async (Token) => {
    setPLoading(true);
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
      setPLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, {user.first_name} Welcome Back</Typography>
        </Box>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid> */}
          <Grid item xs={12} md={6} lg={12}>
            {!ploading && <AppConversionRates projects={projects} />}
          </Grid>
          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid> */}
          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid> */}

          <Grid item xs={12} md={6} lg={12}>
            {!iloading && <AppNewsUpdate projects={issues} />}
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
