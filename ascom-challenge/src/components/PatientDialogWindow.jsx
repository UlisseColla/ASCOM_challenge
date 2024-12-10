import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { format } from 'date-fns';

const PatientDetailDialog = ({ open, onClose, patient }) => {
  if (!patient) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Patient Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} className="mb-4">
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Family Name
            </Typography>
            <Typography variant="body1">
              {patient.familyName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Given Name
            </Typography>
            <Typography variant="body1">
              {patient.givenName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Sex
            </Typography>
            <Typography variant="body1">
              {patient.sex}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Birth Date
            </Typography>
            <Typography variant="body1">
              {format(new Date(patient.birthDate), 'PP')}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="h6" className="mb-2">
          Parameters
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Value</TableCell>
                <TableCell align="center">Alarm</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patient.parameters.map((param) => (
                <TableRow key={param.id}>
                  <TableCell>{param.name}</TableCell>
                  <TableCell>{param.value}</TableCell>
                  <TableCell align="center">
                    {param.alarm ? (
                      <span className="text-red-500">⚠️</span>
                    ) : (
                      '—'
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDetailDialog;
