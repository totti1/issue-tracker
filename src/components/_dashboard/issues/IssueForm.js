import * as Yup from 'yup';
import { useParams } from 'react-router';
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
export default function IssueForm() {
  const navigate = useNavigate();
  const { projectID } = useParams();

  const IssueSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Title required'),
    description: Yup.string().min(2, 'Too Short!').max(250, 'Too Long!').required('Description required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    validationSchema: IssueSchema,
    onSubmit: async (e) => {
      const userData = localStorage.getItem('user')
      if (!userData) {
        return false
      }
      const { data } = JSON.parse(userData);
      let info = {
        title: e.title,
        description: e.description,
        projectID
      }
      const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify(info)
      };
      try {
        const response = await fetch(`${API}/issue`, requestOptions);
        const data = await response.json();
        if (data.status === 201 || data.status === 202) {
          alert('Issue reported successful');
          navigate('/dashboard/app', { replace: true });
        } else {
          alert('Internal server error');
        }

      } catch (error) {
        console.log(error);
      }

    }
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="title"
            type="text"
            label="Issue name"
            {...getFieldProps('title')}
            error={Boolean(touched.title && errors.title)}
            helperText={touched.title && errors.title}
          />

          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            fullWidth
            type="text"
            {...getFieldProps('description')}
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description}
          />
          <TextField
            fullWidth
            type="file"
            {...getFieldProps('screenshot')}
            error={Boolean(touched.screenshot && errors.screenshot)}
            helperText={touched.screenshot && errors.screenshot}
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
