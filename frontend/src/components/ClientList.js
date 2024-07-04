import React, { useState } from 'react';

const ClientList = ({ clients, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [error, setError] = useState(null);

  const handleEditClick = (client) => {
    setEditingId(client._id);
    setEditFormData(client);
  };

  const handleEditFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (id) => {
    try {
      await onUpdate(id, editFormData);
      setEditingId(null);
      setError(null);
    } catch (err) {
      setError(`Failed to update client: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await onDelete(id);
      setError(null);
    } catch (err) {
      setError(`Failed to delete client: ${err.message}`);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">Client List</h3>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          {error}
        </div>
      )}
      <ul className="space-y-2">
        {clients.map(client => (
          <li key={client._id} className="bg-white p-4 rounded shadow">
            {editingId === client._id ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditFormChange}
                  className="border rounded px-2 py-1 mb-2 w-full"
                />
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditFormChange}
                  className="border rounded px-2 py-1 mb-2 w-full"
                />
                <input
                  type="tel"
                  name="phone"
                  value={editFormData.phone}
                  onChange={handleEditFormChange}
                  className="border rounded px-2 py-1 mb-2 w-full"
                />
                <button
                  onClick={() => handleUpdate(client._id)}
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
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold">{client.name}</h4>
                  <p>{client.email}</p>
                  <p>{client.phone}</p>
                </div>
                <div>
                  <button
                    onClick={() => handleEditClick(client)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(client._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;