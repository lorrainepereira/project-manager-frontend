import * as Yup from 'yup';
import React, {useEffect, useState} from 'react';
import {Form, FormikProvider, useFormik} from 'formik';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Container, MenuItem, Stack, TextField, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {post, get} from '../../common/client/fetchApi';
import {errorMessage} from '../../common/misc/utils';
import Navbar from '../../layouts/Navbar';
import {ContentStyle} from '../../layouts/MainLayout';
import {toast} from "react-toastify";

function CreateTaskForm() {
    const { state } = useLocation();
    console.log('state=', state);

    const navigate = useNavigate();
    const [taskStatus, setTaskStatus] = useState([]);


    const schema = Yup.object().shape({
        title: Yup
            .string()
            .required('Por favor, informe um título válido.'),
        status: Yup
            .string()
            .required('Por favor, informe um status válido.'),
        description: Yup
            .string()
            .required('Por favor, informe uma descrição válida.'),
        due_date: Yup
            .date()
            .required('Por favor, informe uma data de vencimento válida.'),
    });

    const fetchStatus = async () => {
        const response = await get(`/tasks/all-status`);

        if (response) {
            const data = await response.json();
            setTaskStatus(data);
        }

    };

    useEffect(() => {
        fetchStatus();
    }, []);

    const formik = useFormik({
        initialValues: {
            title: '',
            status: '',
            description: '',
            due_date: ''
        },
        validationSchema: schema,
        onSubmit: async (values, { setSubmitting }) => {
            if (values.title.trim() === '') {
                errorMessage('Título é obrigatório.');
                setSubmitting(false);
                return;
            }

            const body = {
                title: values.title,
                status: values.status,
                description: values.description,
                due_date: values.due_date,
                project: state.idProject,
            };

            const response = await post('/tasks', body);

            if (response && response.status === 200) {
                toast.success('Tarefa criada com sucesso.');
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
                                Criar Tarefa - ID Projeto: {state.idProject}
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
                                                label='Título'
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
                                                label='Descrição'
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
                                                label='Data de Vencimento'
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
                                        Criar tarefa
                                    </LoadingButton>

                                    <Button
                                        fullWidth
                                        color={'secondary'}
                                        size='large'
                                        type='button'
                                        variant='contained'
                                        onClick={() => navigate('/projects/list-task',{state: { idProject: state.idProject}})}
                                    >
                                        Voltar para listagem de tarefas
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

export default CreateTaskForm;
