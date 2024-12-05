import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ErrorIcon from '@mui/icons-material/Error';
import { format } from 'date-fns';
//import { getPatients } from '../services/api'; // Import the getPatients function from the api.js file in case of call to the API to fetch the patients

const PatientGrid = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        // const response = await getPatients(); // In case of call to the API to fetch the patients decomment this line and comment the two lines below
        const response = await fetch('/patients.json');
        const data = await response.json();
        setPatients(data); // In case of call to the API to fetch the patients change to setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPatients();
  }, []);

  const columns = [
    { field: 'familyName', headerName: 'Family Name', width: 130 },
    { field: 'givenName', headerName: 'Given Name', width: 130 },
    { field: 'sex', headerName: 'Sex', width: 90 },
    { 
      field: 'birthDate',
      headerName: 'Birth Date',
      width: 130,
      renderCell: (params) => {
        const [date] = params.row.birthDate.split('T');
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
      }
     },
    { 
      field: 'paramCount', 
      headerName: 'Parameters', 
      width: 100,
      renderCell: (params) => params.row.parameters.length
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
  ];

// Map the original API data to add a uniqueId to each patient and to remove duplicates, in case of call to the API to fetch the patients
/* const uniquePatients = patients.map((patient, index, array) => {

  const isDuplicate = array.some((p, earlierIndex) => 
    earlierIndex < index &&
    p.id === patient.id );
  
  const uniqueId = isDuplicate ? index + 1000 : patient.id;
  return { ...patient, uniqueId };
})
.filter((patient, index, array) => {

  const isDuplicate = array.some((p, earlierIndex) => 
      earlierIndex < index &&
      p.familyName === patient.familyName &&
      p.givenName === patient.givenName &&
      p.sex === patient.sex &&
      p.birthDate === patient.birthDate
  );
  
  return !isDuplicate;
}); */

/* If using uniquePatients, then instead of 'patients' use 'uniquePatients', and 'row.id' becomes 'row.uniqueId' */
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
