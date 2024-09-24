import {useEffect, useState} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {
  Button,
  Card, CircularProgress,
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
import {get, del} from '../../common/client/fetchApi';
import {RiDeleteBin5Line} from "react-icons/ri";
import {FaEdit} from "react-icons/fa";
import {GrView} from "react-icons/gr";

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'view' },
  { id: 'edit' },
  { id: 'delete' }
];

export default function ProjectList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [deleteProjectId, setDeleteProjectId] = useState(null);

  const fetchAllProjects = async () => {

    const response = await get(`/projects`);

    if (response) {
      const data = await response.json();
      setProjects(data);
      setLoading(false);
    }
  };

  useEffect(   () => {
    setLoading(true);
    if (!projects || projects.length === 0) {
      fetchAllProjects();
    }
    setLoading(false);
  }, [projects]);

  const handleOpenModalDeleteProject = async (id) => {
    setDeleteProjectId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteProject = async () => {
    setShowDeleteModal(false);
    const response = await del(`/projects/${deleteProjectId}`);

    if (response && response.status === 200) {
      toast.success('Project deleted successfully');
      await fetchAllProjects();
      setLoading(true);
    }

  };

  return (
      <Container>
        {showDeleteModal && <DeleteModal onCancel={() => setShowDeleteModal(false)} onSubmit={handleDeleteProject} />}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button
              color={'secondary'}
              variant="contained"
              component={RouterLink}
              to="/projects/new-project"
          >
            New Project
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
                      {projects.map((row) => {
                        return (
                            <TableRow
                                hover
                                key={row.id}
                                tabIndex={-1}
                            >
                              <TableCell align="left">{row.id}</TableCell>
                              <TableCell align="left">{row.name}</TableCell>
                              <TableCell align="right"><Button onClick={() => navigate('/projects/list-task', {state: { idProject: row.id}})}><GrView title={'View Task'}/></Button></TableCell>
                              <TableCell align="right"><Button onClick={() => navigate('/projects/edit-project', {state: {row}})}><FaEdit title={'Edit'}/></Button></TableCell>
                              <TableCell align="right"><Button onClick={() => handleOpenModalDeleteProject(row.id)}><RiDeleteBin5Line title={'Delete'}/></Button></TableCell>
                            </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </>
        }
      </Container>
  );
}
