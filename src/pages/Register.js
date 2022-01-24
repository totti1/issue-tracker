import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import LoadingBar from 'react-top-loading-bar'
import { useParams } from 'react-router';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
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
  const ref = useRef(null)
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (id) {
        checkUser()
      }
    }, 1000)

  }, [])

  const checkUser = async () => {
    ref.current.continuousStart()
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
      if (data.status === 202) {
        ref.current.complete()
        setData(data);
        setLoading(false)
      } else if (data.status === 200) {
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('loggedin', true);
        navigate('/dashboard', { replace: true });
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <RootStyle title="Register | Minimal-UI">
      <LoadingBar color='#2ecc71' ref={ref} height={4} />
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Manage the job more effectively with Minimal
          </Typography>
          <img alt="register" src="/static/illustrations/illustration_register.png" />
        </SectionStyle>
      </MHidden>
      {!loading &&
        <Container>
          <ContentStyle>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h4" gutterBottom>
                Register New Client
            </Typography>
            </Box>
            <RegisterForm email={data.email} token={id} />
            <MHidden width="smUp">
              <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
                Already have an account?&nbsp;
              <Link to="/login" component={RouterLink}>
                  Login
              </Link>
              </Typography>
            </MHidden>
          </ContentStyle>
        </Container>}
    </RootStyle>
  );
}
export default Register