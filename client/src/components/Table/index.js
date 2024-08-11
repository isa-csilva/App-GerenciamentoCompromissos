import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(title, description, date) {
  return { title, description, date};
}

const rows = [
  createData('Compromisso 1', 'Lorem ipsun', '01/01/01'),
  createData('Compromisso 2', 'Lorem ipsun', '01/01/01'),
  createData('Compromisso 3', 'Lorem ipsun', '01/01/01'),
  createData('Compromisso 4', 'Lorem ipsun', '01/01/01'),
  createData('Compromisso 5', 'Lorem ipsun', '01/01/01'),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Título</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}