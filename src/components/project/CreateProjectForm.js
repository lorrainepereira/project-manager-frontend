import * as Yup from 'yup';
import React from 'react';
import {Form, FormikProvider, useFormik} from 'formik';
import {useNavigate} from 'react-router-dom';
import {Button, Container, Stack, TextField, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {post} from '../../common/client/fetchApi';
import {errorMessage} from '../../common/misc/utils';
import Navbar from '../../layouts/Navbar';
import {ContentStyle} from '../../layouts/MainLayout';
import {toast} from "react-toastify";

function CreateProjectForm() {
    const navigate = useNavigate();

    const schema = Yup.object().shape({
        name: Yup
            .string()
            .required('Por favor, informe um nome válido.'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: schema,
        onSubmit: async (values, { setSubmitting }) => {
            if (values.name.trim() === '') {
                errorMessage('Nome é obrigatório.');
                setSubmitting(false);
                return;
            }

            const body = {
                name: values.name,
            };

            const response = await post('/projects', body);

            if(response){
                toast.success('Projeto criado com sucesso.');
            }

            setSubmitting(false);
        }
    });

    const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

    return (
        <>
            <Navbar/>
            <Container maxWidth="sm">
                <ContentStyle>
                    <>
                        <Stack sx={{ mb: 5 }}>
                            <Typography variant="h4" gutterBottom>
                                Criar Projeto
                            </Typography>
                        </Stack>
                        <FormikProvider value={formik}>
                            <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
                                <Stack spacing={3}>

                                    {formik.values.name !== 'RANDOM_STRING' &&
                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                            <TextField
                                                fullWidth
                                                type='String'
                                                label='Nome'
                                                {...getFieldProps('name')}
                                                error={Boolean(touched.name && errors.name)}
                                                helperText={touched.name && errors.name}
                                            />
                                        </Stack>
                                    }

                                    <LoadingButton
                                        fullWidth
                                        size='large'
                                        type='submit'
                                        variant='contained'
                                        loading={isSubmitting}
                                    >
                                        Criar projeto
                                    </LoadingButton>

                                    <Button
                                        fullWidth
                                        color={'secondary'}
                                        size='large'
                                        type='button'
                                        variant='contained'
                                        onClick={() => navigate('/projects')}
                                    >
                                        Voltar para listagem de projetos
                                    </Button>

                                </Stack>
                            </Form>
                        </FormikProvider>
                    </>
                </ContentStyle>
            </Container>
        </>
    );
}

export default CreateProjectForm;
