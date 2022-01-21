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
  const [iloading, setILoading] = useState(true);
  const [ploading, setPLoading] = useState(true);
  const [user, setUser] = useState({});
  const [issues, setIssues] = useState([]);
  useEffect(() => {
    const { data } = JSON.parse(localStorage.getItem('user'));
    const Pr = JSON.parse(localStorage.getItem('projects'));
    const Is = JSON.parse(localStorage.getItem('issues'));
    console.log(data)
    if (data) {
      setUser(data);
    }
    if (Pr) {
      setProjects(Pr)
      setPLoading(false);
    }
    getProjects(data.token);
    if (Is) {
      setIssues(Pr)
      setILoading(false);
    }
    getIssues(data.token);
  }, []);
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
      console.log(error);
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
