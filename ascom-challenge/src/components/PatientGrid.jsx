import React, { useState, useEffect } from 'react';
import { 
  DataGrid,
  GridToolbar 
} from '@mui/x-data-grid';
import { getPatients } from '../services/api';
import ErrorIcon from '@mui/icons-material/Error';
import { format } from 'date-fns';
// import PatientDialog from './PatientDialog';

const PatientGrid = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await getPatients();
    //   console.log('Patient Data:', response.data);
      console.log('Before setting patients:', response.data);
      setPatients(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: 'familyName', headerName: 'Family Name', width: 130 },
    { field: 'givenName', headerName: 'Given Name', width: 130 },
    { field: 'sex', headerName: 'Sex', width: 90 },
    { field: 'birthDate', headerName: 'Birth Date', width: 130 },
    { 
      field: 'paramCount', 
      headerName: 'Parameters', 
      width: 100,
      valueGetter: (params) => params?.row?.parameters?.length || 0
    }
  ];

  /* const columns = [
    { field: 'familyName', headerName: 'Family Name', flex: 1 },
    { field: 'givenName', headerName: 'Given Name', flex: 1 },
    { field: 'sex', headerName: 'Sex', width: 100 },
    { 
      field: 'birthDate', 
      headerName: 'Birth Date', 
      flex: 1,
      valueFormatter: (params) => {
        if (!params.value) return '';
        return new Date(params.value).toLocaleDateString();
      }
    },
    {
      field: 'parameterCount',
      headerName: 'Parameters',
      width: 120,
      valueGetter: (params) => params.row?.parameters?.length || 0
    },
    {
      field: 'alarm',
      headerName: 'Alarm',
      width: 100,
      renderCell: (params) => {
        const hasAlarm = params.row?.parameters?.some(param => param.alarm);
        return hasAlarm ? <ErrorIcon color="error" /> : null;
      }
    }
  ]; */

  /* const columns = [
    { field: 'familyName', headerName: 'Family Name', flex: 1 },
    { field: 'givenName', headerName: 'Given Name', flex: 1 },
    { field: 'sex', headerName: 'Sex', width: 100 },
    {
      field: 'birthDate', 
      headerName: 'Birth Date', 
      flex: 1,
      valueFormatter: (params) => format(new Date(params.value), 'dd/MM/yyyy')
    },
    {
      field: 'parameters',
      headerName: 'Parameters',
      width: 120,
      valueGetter: (params) => params.row.parameters.length
    },
    {
      field: 'hasAlarm',
      headerName: 'Alarm',
      width: 100,
      renderCell: (params) => {
        const hasAlarm = params.row.parameters.some(param => param.alarm);
        return hasAlarm ? <ErrorIcon color="error" /> : null;
      }
    }
  ]; */

  const handleRowClick = (params) => {
    setSelectedPatient(params.row);
    setDialogOpen(true);
  };

  console.log('Patients state:', patients);

  return (
    <div style={{ height: 600, width: '100%' }}>
    {patients.length > 0 && (
      <DataGrid
        rows={patients}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.id}
      />
    )}
    </div>
  );
};

export default PatientGrid;

/* <DataGrid
rows={patients}
columns={columns}
loading={loading}
components={{ Toolbar: GridToolbar }}
onRowClick={handleRowClick}
getRowId={(row) => row.id}
/> */
/* {selectedPatient && (
<PatientDialog
    open={dialogOpen}
    patient={selectedPatient}
    onClose={() => setDialogOpen(false)}
    onUpdate={fetchPatients}
/>
)} */