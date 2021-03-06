import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';

export default function AwesomeList() {
  const [error, setError] = useState();
  const [state, setState] = useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Entreprise', field: 'company' },
      { title: 'Rôle', field: 'role' },
      { title: 'E-Mail', field: 'email' },
      {
        title: 'Status',
        field: 'status',
        lookup: { 1: 'A rapeller', 2: 'Video envoyée' },
      },
    ],
    data: [],
  });

  useEffect(() => {
    const getList = async () => {
      try {
        const list = await axios.get(`http://localhost:5000/form`);
        setState({ ...state, data: list.data });
      } catch (err) {
        setError(err);
      }
    };
    getList();
  }, []);

  return (
    <>
      {error ? (
        <div> Something went wrong </div>
      ) : (
        <MaterialTable
          style={{ width: '80vw' }}
          title="Demandes de contact"
          columns={state.columns}
          data={state.data}
          editable={{
            onRowAdd: (newData) => {
              return axios
                .post(`http://localhost:5000/form`, newData)
                .then(() => {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                  });
                });
            },
            onRowUpdate: (newData, oldData) => {
              return axios
                .put(`http://localhost:5000/form/${oldData.id}`, newData)
                .then(() => {
                  if (oldData) {
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
                });
            },
            onRowDelete: (oldData) => {
              return axios
                .delete(`http://localhost:5000/form/${oldData.id}`)
                .then(() => {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                });
            },
          }}
        />
      )}
    </>
  );
}
