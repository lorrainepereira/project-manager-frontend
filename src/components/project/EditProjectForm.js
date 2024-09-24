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
    console.log('state=', state);

    const navigate = useNavigate();

    const schema = Yup.object().shape({
        name: Yup
            .string()
            .required('Please enter a valid string'),
    });

    const formik = useFormik({
        initialValues: {
            name: state.row.name,
        },
        validationSchema: schema,
        onSubmit: async (values, { setSubmitting }) => {
            if (values.name === null || values.name === undefined || values.name === '') {
                errorMessage('Name is required');
                setSubmitting(false);
                return;
            }

            const body = {
                name: values.name,
            };

            const response = await put(`/projects/${state.row.id}`, body);

            if(response){
                toast.success('Project updated successfully');
            }else{
                toast.error('Project not updated successfully');
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
                                Edit project
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
                                                label='Name'
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
                                        Execute
                                    </LoadingButton>

                                    <Button
                                        fullWidth
                                        color={'secondary'}
                                        size='large'
                                        type='button'
                                        variant='contained'
                                        onClick={() => navigate('/projects')}
                                    >
                                        Back
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
