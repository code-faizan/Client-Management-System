import React, { useState, useEffect } from 'react';
import ClientList from '../components/ClientList';
import ClientForm from '../components/ClientForm';
import api from '../utils/api';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      console.log('Fetching clients...');
      const response = await api.get('/clients');
      console.log('Clients response:', response.data);
      setClients(response.data);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error fetching clients:', err);
      setError(err.response?.data?.message || 'Failed to fetch clients');
      setLoading(false);
    }
  };

  const addClient = async (clientData) => {
    try {
      const response = await api.post('/clients', clientData);
      setClients([...clients, response.data]);
      setError(null);
    } catch (err) {
      console.error('Error adding client:', err);
      setError(err.response?.data?.message || 'Failed to add client');
    }
  };

  // In Clients.js
const updateClient = async (id, clientData) => {
  try {
    const response = await api.put(`/clients/${id}`, clientData);
    setClients(clients.map(client => client._id === id ? response.data : client));
  } catch (err) {
    console.error('Error updating client:', err);
    throw new Error(err.response ? err.response.data.message : 'Failed to update client');
  }
};

  // const deleteClient = async (id) => {
  //   try {
  //     await api.delete(`/clients/${id}`);
  //     setClients(clients.filter(client => client._id !== id));
  //     setError(null);
  //   } catch (err) {
  //     console.error('Error deleting client:', err);
  //     setError(err.response?.data?.message || 'Failed to delete client');
  //   }
  // };
  const deleteClient = async (id) => {
    try {
      await api.delete(`/clients/${id}`);
      setClients(clients.filter(client => client._id !== id));
    } catch (err) {
      console.error('Detailed delete error:', err.response ? err.response.data : err.message);
      throw new Error(err.response ? err.response.data.message : 'Failed to delete client');
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Clients</h2>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      <ClientForm onSubmit={addClient} />
      {clients.length > 0 ? (
        <ClientList clients={clients} onUpdate={updateClient} onDelete={deleteClient} />
      ) : (
        <div className="text-center py-4">No clients found.</div>
      )}
    </div>
  );
};

export default Clients;