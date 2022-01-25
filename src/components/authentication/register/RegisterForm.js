import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------
const API =
  process.env.NODE_ENV !== 'production'
    ? process.env.REACT_APP_API_DEV
    : process.env.REACT_APP_API_URL;
export default function RegisterForm({ email, token }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    organisation: Yup.string(),
    representative: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email,
      organisation: '',
      representative: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (e) => {
      const info = {
        first_name: e.firstName,
        last_name: e.lastName,
        organisation: e.organisation,
        representative: e.representative,
      };
      setLoading(true);
      try {
        axios
          .post(`${API}/auth/signup/${token}`, info)
          .then((response) => {
            const data = response;
            if (data.status === 201) {
              localStorage.setItem('user', JSON.stringify(data.data));
              localStorage.setItem('logged', true);
              navigate('/dashboard/app', { replace: true });
            } 
          })
          .catch((error) => {
            setLoading(false);
          });
      } catch (error) {
        console.log(error.message);
      }

    }

  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            disabled={true}
            autoComplete="email"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            value={email}
          />
          <TextField
            fullWidth
            label="Organisation Name(optional)"
            type="text"
            {...getFieldProps('organisation')}
            error={Boolean(touched.organisation && errors.organisation)}
            helperText={touched.organisation && errors.organisation}
          />
          <TextField
            fullWidth
            label="Representative fullname(optional)"
            type="text"
            {...getFieldProps('representative')}
            error={Boolean(touched.representative && errors.representative)}
            helperText={touched.representative && errors.representative}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={loading}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}