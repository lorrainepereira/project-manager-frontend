import * as Yup from 'yup';
import React, {useEffect, useState} from 'react';
import {Form, FormikProvider, useFormik} from 'formik';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Container, MenuItem, Stack, TextField, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {get, put} from '../../common/client/fetchApi';
import {errorMessage} from '../../common/misc/utils';
import Navbar from '../../layouts/Navbar';
import {ContentStyle} from '../../layouts/MainLayout';
import {toast} from "react-toastify";

function EditTaskForm() {
    const { state } = useLocation();
    console.log('state=', state);

    const navigate = useNavigate();
    const [taskStatus, setTaskStatus] = useState([]);


    const schema = Yup.object().shape({
        title: Yup
            .string()
            .required('Please enter a valid string'),
        status: Yup
            .string()
            .required('Please enter a valid string'),
        description: Yup
            .string()
            .required('Please enter a valid string'),
        due_date: Yup
            .date()
            .required('Please enter a valid string'),
    });

    const fetchStatus = async () => {
        const response = await get(`/tasks/all-status`);

        if (response) {
            console.log('response=', response);
            const data = await response.json();
            console.log('data=', data);
            setTaskStatus(data);
        }

    };

    useEffect(() => {
        fetchStatus();
    }, []);

    const formik = useFormik({
        initialValues: {
            title: state.row.title,
            status: state.row.status,
            description: state.row.description,
            due_date: state.row.due_date
        },
        validationSchema: schema,
        onSubmit: async (values, { setSubmitting }) => {
            if (values.title === null || values.title === undefined || values.title === '') {
                errorMessage('Title is required');
                setSubmitting(false);
                return;
            }

            const body = {
                id:state.row.id,
                title: values.title,
                status: values.status,
                description: values.description,
                due_date: values.due_date,
                project: state.idProject,
            };

            console.log('body',body);
            const response = await put(`/tasks/${state.row.id}`, body);

            if (response && response.status === 200) {
                toast.success('Task updated successfully');
            }else{
                toast.error('Task not updated successfully');
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
                                Create new task from project id {state.idProject}
                            </Typography>
                        </Stack>
                        <FormikProvider value={formik}>
                            <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
                                <Stack spacing={3}>

                                    {formik.values.title !== 'RANDOM_STRING' &&
                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                            <TextField
                                                fullWidth
                                                type='String'
                                                label='Title'
                                                {...getFieldProps('title')}
                                                error={Boolean(touched.title && errors.title)}
                                                helperText={touched.title && errors.title}
                                            />
                                        </Stack>
                                    }

                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                        {taskStatus && <TextField
                                            select
                                            fullWidth
                                            label='Status'
                                            {...getFieldProps('status')}
                                            error={Boolean(touched.status && errors.status)}
                                            helperText={touched.status && errors.status}
                                        >
                                            {taskStatus.map(status => {
                                                return (
                                                    <MenuItem key={status.name} value={status.description}>{status.description}</MenuItem>
                                                )
                                            })
                                            }
                                        </TextField>
                                        }

                                    </Stack>

                                    {formik.values.description !== 'RANDOM_STRING' &&
                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                            <TextField
                                                fullWidth
                                                type='String'
                                                label='Description'
                                                {...getFieldProps('description')}
                                                error={Boolean(touched.description && errors.description)}
                                                helperText={touched.description && errors.description}
                                            />
                                        </Stack>
                                    }

                                    {formik.values.due_date !== 'RANDOM_STRING' &&
                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                            <TextField
                                                fullWidth
                                                type='Date'
                                                label='Due Date'
                                                {...getFieldProps('due_date')}
                                                error={Boolean(touched.due_date && errors.due_date)}
                                                helperText={touched.due_date && errors.due_date}
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
                                        onClick={() => navigate('/projects/list-task',{state: { idProject: state.idProject}})}
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

export default EditTaskForm;
