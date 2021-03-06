import { useState, useEffect, useRef } from 'react';
import LoadingBar from 'react-top-loading-bar'
// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppConversionRates
} from '../components/_dashboard/app';
import { useNavigate } from 'react-router-dom';
// ----------------------------------------------------------------------
const API =
  process.env.NODE_ENV !== 'production'
    ? process.env.REACT_APP_API_DEV
    : process.env.REACT_APP_API_URL;
export default function DashboardApp() {
  const navigate = useNavigate();
  const ref = useRef(null)
  const [projects, setProjects] = useState([]);
  const [iloading, setILoading] = useState(true);
  const [uloading, setULoading] = useState(true);
  const [ploading, setPLoading] = useState(true);
  const [user, setUser] = useState({});
  const [issues, setIssues] = useState([]);
  const [myProjects, setMyProjects] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    try {
      const userData = localStorage.getItem('user')
      if (!userData) {
        navigate('/login', { replace: true });
      }
      const { data } = JSON.parse(userData);
      let myPro = data.projects.map(i => i.projectid)
      setMyProjects(myPro)
      getIssues(data.token);
      getProjects(data.token);
      data.isadmin && getAllUsers(data.token);
      if (data) {
        setUser(data);
      }
      ref.current.complete()
    } catch (error) {
      console.log(error)
    }
  }, [projects]);
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
      if (!user.isadmin) {
        let myIssues = data.filter(i => myProjects.includes(i.projectid))
        setIssues(myIssues);
        localStorage.setItem('issues', JSON.stringify(myIssues))
      } else {
        setIssues(data);
        localStorage.setItem('issues', JSON.stringify(data))
      }

      setILoading(false);
    } catch (error) {
    }
  };
  const getProjects = async (Token) => {
    ref.current.continuousStart()
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
      if (!user.isadmin) {
        let myPros = data.filter(i => myProjects.includes(i.id))
        setProjects(myPros);
        localStorage.setItem('projects', JSON.stringify(myPros))
      } else {
        setProjects(data);
        localStorage.setItem('projects', JSON.stringify(data))
      }
      setPLoading(false);
    } catch (error) {

    }
  };
  const getAllUsers = async (Token) => {
    const requestOptions = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`
      }
    };
    try {
      const response = await fetch(`${API}/auth/users`, requestOptions);
      const { data } = await response.json();
      if (data) {
        setUsers(data)
        localStorage.setItem('users', JSON.stringify(data))
      }
      setULoading(false);
    } catch (error) {

    }
  }
  return (
    <Page title={`Dashboard | ${user.first_name} ${user.last_name}`}>
      <LoadingBar color='#2ecc71' ref={ref} height={4} />
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4"> Welcome back, {user.first_name || 'again'}!</Typography>
        </Box>
        <Grid container spacing={3}>

          {user.isadmin && <><Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales issues={issues} />
          </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppNewUsers issues={issues} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppItemOrders projects={projects} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBugReports clients={users} />
            </Grid>
          </>}
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
