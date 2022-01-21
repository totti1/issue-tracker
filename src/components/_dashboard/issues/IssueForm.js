import * as Yup from 'yup';
// import { useState } from 'react';
// import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
// import eyeFill from '@iconify/icons-eva/eye-fill';
// import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function IssueForm() {
  const navigate = useNavigate();
  // const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Title"
          />

          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            // defaultValue="Default Value"
          />
          <TextField
            fullWidth
            disabled
            label="Project"
            defaultValue="Project Name"
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Report New Issue
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
