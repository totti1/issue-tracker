import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import axios from 'axios';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';


const API =
  process.env.NODE_ENV !== 'production'
    ? process.env.REACT_APP_API_DEV
    : process.env.REACT_APP_API_URL;
export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showcode, setShowcode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('')

  useEffect(() => {
    const check = localStorage.getItem('loggedin')
    if (check) {
      navigate('/dashboard', { replace: true });
    }
  }, [])
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    onSubmit: async (e) => {
      setError('')
      const info = {
        email: e.email
      };
      setLoading(true);
      if (showcode) {
        if (code == e.passcode) {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('loggedin', true);
          navigate('/dashboard', { replace: true });
        } else {
          setLoading(false)
          setError('Passcode mismatched')
        }
      } else {
        try {
          axios
            .post(`${API}/auth/signin/`, info)
            .then((response) => {
              const data = response;
              if (data.status === 200) {
                const { passcode } = data.data.data
                setCode(passcode)
                setUser(data.data)
                setShowcode(true)
                setMessage('Please check your email and enter passcode below!')
              } else {
                setError(data.error)
              }
              setLoading(false)
            })
            .catch((error) => {
              setLoading(false);
              setError('Oops refresh and type again!')
            });
        } catch (error) {
          console.log(error.message);
        }
      }

    }
  });
  const { errors, touched, values, handleSubmit, getFieldProps } = formik;
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
            Sign in to Issue tracker
            </Typography>
          {!error ? <Typography sx={{ color: 'text.secondary' }}>{message || "Enter your Email below."}</Typography> :
            <Typography sx={{ color: 'red' }}>{error}</Typography>}
        </Stack>
        <Stack spacing={3}>
          {!showcode && <TextField
            fullWidth
            autoComplete="email"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />}

          {showcode && <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="PASS CODE"
            {...getFieldProps('passcode')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />}
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={loading}
          >
            Continue
        </LoadingButton>
        </Stack>

      </Form>
    </FormikProvider>
  );
}
