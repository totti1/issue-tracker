import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { RegisterForm } from '../components/authentication/register';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '50vh',
  flexDirection: 'column',
  justifyContent: 'center'
}));

const API =
  process.env.NODE_ENV !== 'production'
    ? process.env.REACT_APP_API_DEV
    : process.env.REACT_APP_API_URL;

const Register = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true);
    if (id) {
      checkUser()
    }
  }, [])

  const checkUser = async () => {
    const requestOptions = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${id}`,
      },
    };
    try {
      const response = await fetch(`${API}/auth/user`, requestOptions);
      const data = await response.json();
      if (data.status === 404) {
        setData(data);
      } else if (data.status === 200) {
        let info = data.data
        localStorage.setItem('user', JSON.stringify(info));
        localStorage.setItem('loggedin', true);
        navigate('/dashboard', { replace: true });
      } else {
        alert('Email or Password mismatch');
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <RootStyle title="Register | Minimal-UI">

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Manage the job more effectively with Minimal
          </Typography>
          <img alt="register" src="/static/illustrations/illustration_register.png" />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Register New Client
            </Typography>
          </Box>
          {!loading && <RegisterForm email={data.email} token={id} />}
          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              Already have an account?&nbsp;
              <Link to="/login" component={RouterLink}>
                Login
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
export default Register