import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

MarkAllDoneModal.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func
};

export default function MarkAllDoneModal({onCancel, onSubmit}) {

  const [loading, setLoading] = useState(false);

  const onConfirm = () => {
    setLoading(true);
    onSubmit();
  }

  return (
    <Dialog open={true} onClose={onCancel} disableEnforceFocus>
      <DialogTitle>
        Confirme atualizar status de todas as tarefas
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja concluir todas as tarefas?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          style={{ color: 'gray' }}
          onClick={onCancel}>
          Não
        </Button>
        <LoadingButton
          size='medium'
          variant='contained'
          loading={loading}
          onClick={onConfirm}
        >
          Sim
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
