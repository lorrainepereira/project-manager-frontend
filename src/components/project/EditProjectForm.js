import {useLocation, useNavigate} from 'react-router-dom';
import React from "react";
import * as Yup from "yup";
import {Form, FormikProvider, useFormik} from "formik";
import {errorMessage} from "../../common/misc/utils";
import {put} from "../../common/client/fetchApi";
import Navbar from "../../layouts/Navbar";
import {Button, Container, Stack, TextField, Typography} from "@mui/material";
import {ContentStyle} from "../../layouts/MainLayout";
import {LoadingButton} from "@mui/lab";
import {toast} from "react-toastify";


function EditProjectForm() {
    const { state } = useLocation();

    const navigate = useNavigate();

    const schema = Yup.object().shape({
        name: Yup
            .string()
            .required('Por favor, informe um nome válido.'),
    });

    const formik = useFormik({
        initialValues: {
            name: state.row.name,
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

            const response = await put(`/projects/${state.row.id}`, body);

            if(response && response.status === 200){
                toast.success('Projeto atualizado com sucesso.');
            }

            setSubmitting(false);
        }
    });

    const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

    return (
        <>
            <Navbar />
            <Container maxWidth="sm">
                <ContentStyle>
                    <>
                        <Stack sx={{ mb: 5 }}>
                            <Typography variant="h4" gutterBottom>
                                Editar Projeto
                            </Typography>
                        </Stack>
                        <FormikProvider value={formik}>
                            <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
                                <Stack spacing={3}>

                                    {formik.values.operationType !== 'RANDOM_STRING' &&
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
                                        Editar projeto
                                    </LoadingButton>

                                    <Button
                                        fullWidth
                                        color={'secondary'}
                                        size='large'
                                        type='button'
                                        variant='contained'
                                        onClick={() => navigate('/projects')}
                                    >
                                        Voltar para listagem de projeto
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

export default EditProjectForm;
