import React, { useState } from 'react';

const ServiceList = ({ services, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [error, setError] = useState(null);

  const handleEditClick = (service) => {
    setEditingId(service._id);
    setEditFormData(service);
  };

  const handleEditFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (id) => {
    try {
      await onUpdate(id, editFormData);
      setEditingId(null);
      setError(null);
    } catch (err) {
      setError(`Failed to update service: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await onDelete(id);
      setError(null);
    } catch (err) {
      setError(`Failed to delete service: ${err.message}`);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Service List</h2>
      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}
      <ul>
        {services.map((service) => (
          <li key={service._id} className="mb-4">
            {editingId === service._id ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name || ''}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 border rounded mb-2"
                  placeholder="Service Name"
                />
                <input
                  type="text"
                  name="description"
                  value={editFormData.description || ''}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 border rounded mb-2"
                  placeholder = "Service Description"
                />
                <input
                  type="date"
                  name="startDate"
                  value={editFormData.startDate ? new Date(editFormData.startDate).toISOString().substr(0, 10) : ''}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 border rounded mb-2"
                />
                <input
                  type="date"
                  name="endDate"
                  value={editFormData.endDate ? new Date(editFormData.endDate).toISOString().substr(0, 10) : ''}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 border rounded mb-2"
                />
                <button
                  onClick={() => handleUpdate(service._id)}
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-500 text-white px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <p><strong>Name:</strong> {service.name}</p>
                <p><strong>Description:</strong> {service.description}</p>
                <p><strong>Start Date:</strong> {formatDate(service.startDate)}</p>
                <p><strong>End Date:</strong> {formatDate(service.endDate)}</p>
                <button
                  onClick={() => handleEditClick(service)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
