import React, { useState, useEffect } from 'react';
import ServiceList from '../components/ServiceList';
import ServiceForm from '../components/ServiceForm';
import api from '../utils/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch services');
      setLoading(false);
    }
  };

  const addService = async (serviceData) => {
    try {
      const response = await api.post('/services', serviceData);
      setServices([...services, response.data]);
    } catch (err) {
      setError('Failed to add service');
    }
  };

  const updateService = async (id, serviceData) => {
    try {
      const response = await api.put(`/services/${id}`, serviceData);
      setServices(services.map(service => service._id === id ? response.data : service));
    } catch (err) {
      setError('Failed to update service');
    }
  };

  const deleteService = async (id) => {
    try {
      await api.delete(`/services/${id}`);
      setServices(services.filter(service => service._id !== id));
    } catch (err) {
      console.error('Error deleting service:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.msg : 'Failed to delete service');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Services</h2>
      <ServiceForm onSubmit={addService} />
      <ServiceList services={services} onUpdate={updateService} onDelete={deleteService} />
    </div>
  );
};

export default Services;