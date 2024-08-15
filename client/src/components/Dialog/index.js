import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from 'axios';

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    name: props.name,
    description: props.description,
    date: props.date
  });


  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditCompromisse = () => {
      Axios.put('http://localhost:3001/edit', {
        id: editValues.id,
        title: editValues.title,
        description: editValues.description,
        date: editValues.date
      })
      handleClose();
  };


  const formatDate = () => {
    let date = props.date
    let arrayDate = date.split('');

    let year = (arrayDate[0] + arrayDate[1] + arrayDate[2] + arrayDate[3]);
    let month = (arrayDate[5] + arrayDate[6]);
    let day = (arrayDate[8] + arrayDate[9]);
    let newDate = [year, month, day];

    let formattedDate = (newDate.join('-'));
    return formattedDate;
  }

  const handleDeleteCompromisse = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`);
    handleClose();
  }

  const handleChangeValues = (value) => {
    setEditValues(prevValues => ({
      ...prevValues,
      [value.target.id]: value.target.value
    }))
  }

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            handleClose();
          },
        }}
      >
        <DialogTitle>Editar Compromisso</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            label="Título"
            defaultValue={props.title}
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChangeValues}
          />
          <TextField
            required
            margin="dense"
            id="description"
            label="Descrição"
            defaultValue={props.description}
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChangeValues}
          />
          <TextField
            required
            margin="dense"
            id="date"
            type="date"
            fullWidth
            defaultValue={formatDate(props.date)}
            variant="standard"
            onChange={handleChangeValues}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleDeleteCompromisse} type="submit" color='error'>Excluir</Button>
          <Button onClick={handleEditCompromisse} type="submit" color='success'>Salvar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
