import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { post } from '../../common/client/fetchApi';
import { saveOnStorage } from '../../common/misc/utils';

export default function LoginForm() {
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    email: Yup
    .string()
    .required('Por favor, informe o email.')
    .max(20, 'Email muito grande.'),
    password: Yup
    .string()
    .required('Por favor, informe a senha.')
    .max(20, 'Password muito grande.')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: schema,
    onSubmit: async (values) => {
        const response = await post('/auth/login', values);

        if (response) {
          const data = await response.json();
          saveOnStorage('jwtToken', data.token);
          navigate('/projects');
        }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3} sx={{ my: 2 }}>
              <TextField
                fullWidth
                type="text"
                label="Email"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />

              <TextField
                fullWidth
                type="password"
                label="Senha"
                {...getFieldProps('password')}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Login
            </LoadingButton>
          </Form>
        </FormikProvider>
      </>
  );
}
