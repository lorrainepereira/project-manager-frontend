import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {
  Button,
  Card,
  CircularProgress,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {toast} from 'react-toastify';
import DeleteModal from '../../components/common/DeleteModal';
import {del, get, patch} from '../../common/client/fetchApi';
import {RiDeleteBin5Line} from "react-icons/ri";
import {FaEdit} from "react-icons/fa";
import MarkAllDoneModal from "../common/MarkAllDoneModal";

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'title', label: 'Título', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'description', label: 'Descrição', alignRight: false },
  { id: 'due_date', label: 'Data de Vencimento', alignRight: false },
  { id: 'create' },
  { id: 'delete' }
];

export default function TaskList() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMarkDoneModal, setShowMarkDoneModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const fetchAllTasks = async () => {

    const response = await get(`/projects/${state.idProject}/tasks`);

    if (response) {
      const data = await response.json();
      setTasks(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchAllTasks();
  }, []);

  const handleOpenModalDeleteTask = (id) => {
    setDeleteTaskId(id);
    setShowDeleteModal(true);
  };

  const handleOpenModalDoneTask = () => {
    setShowMarkDoneModal(true);
  };

  const handleDeleteTask = async () => {
    setShowDeleteModal(false);
    const response = await del(`/tasks/${deleteTaskId}`);

    if (response && response.status === 200) {
      toast.success('Projeto deletado com sucesso.');
      setLoading(true);
      await fetchAllTasks();
    }
  };

  const handleMarkAllDoneTask = async () => {
    setShowMarkDoneModal(false);
    const response = await patch('/tasks/DONE');

    if (response && response.status === 200) {
      toast.success('Todas as tarefas foram atualizadas como concluídas com sucesso.');
      setLoading(true);
      await fetchAllTasks();
    }

  };

  return (
      <Container>
        {showDeleteModal && <DeleteModal onCancel={() => setShowDeleteModal(false)} onSubmit={handleDeleteTask} />}
        {showMarkDoneModal && <MarkAllDoneModal onCancel={() => setShowMarkDoneModal(false)} onSubmit={handleMarkAllDoneTask} />}

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button color={'secondary'}
                  variant="contained"
                  onClick={() => navigate('/projects/new-task', {state: { idProject: state.idProject}})}>
            Nova tarefa
          </Button>
          <Button color={'secondary'}
                  variant="contained"
                  onClick={handleOpenModalDoneTask}>
            Concluir todas tarefas
          </Button>
        </Stack>
        {loading && <Stack direction="row" alignItems="center" justifyContent="center" my={'25%'}><CircularProgress /></Stack>}
        {!loading &&
            <>
              <Card>
                <TableContainer sx={{ minWidth: 1000 }}>
                  <Table>
                    <TableHead key={'TableHead'}>
                      <TableRow key={'TableHeadRow'}>
                        {TABLE_HEAD.map((headCell) => (
                            <TableCell
                                key={headCell.id}
                                align={headCell.alignRight ? 'right' : 'left'}
                            >
                              {headCell.label}
                            </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tasks.map((row) => {
                        return (
                            <TableRow
                                hover
                                key={row.id}
                                tabIndex={-1}
                            >
                              <TableCell align="left">{row.id}</TableCell>
                              <TableCell align="left">{row.title}</TableCell>
                              <TableCell align="left">{row.status}</TableCell>
                              <TableCell align="left">{row.description}</TableCell>
                              <TableCell align="left">{row.due_date}</TableCell>
                              <TableCell align="right"><Button onClick={() => navigate('/projects/edit-task', {state: {row: row, idProject: state.idProject}})}><FaEdit title={'Editar Tarefa'}/></Button></TableCell>
                              <TableCell align="right"><Button onClick={() => handleOpenModalDeleteTask(row.id)}><RiDeleteBin5Line title={'Deletar Tarefas'}/></Button></TableCell>
                            </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </>
        }
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button color={'secondary'}
                  variant="contained"
                  onClick={() => navigate('/projects')}
                  style={{ marginTop: '30px' }} >
            Voltar para listagem de projetos
          </Button>
        </Stack>
      </Container>
  );
}
