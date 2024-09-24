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
        Confirm done tasks
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want change status all tasks like a done?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          style={{ color: 'gray' }}
          onClick={onCancel}>
          No
        </Button>
        <LoadingButton
          size='medium'
          variant='contained'
          loading={loading}
          onClick={onConfirm}
        >
          Yes
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
