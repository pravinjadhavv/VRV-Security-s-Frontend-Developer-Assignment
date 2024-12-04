import React, { useState, useEffect } from 'react';

const Permissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [newPermission, setNewPermission] = useState(''); 

  
  useEffect(() => {
    fetch('http://localhost:5000/permissions')
      .then((response) => response.json())
      .then((data) => setPermissions(data));
  }, []);

 
  const handleInputChange = (e) => {
    setNewPermission(e.target.value);
  };

  
  const addPermission = (e) => {
    e.preventDefault();
    const permission = { id: Date.now(), name: newPermission };
    fetch('http://localhost:5000/permissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(permission),
    })
      .then((response) => response.json())
      .then((data) => {
        setPermissions([...permissions, data]); 
        setNewPermission(''); 
      })
      .catch((error) => console.error('Error adding permission:', error));
  };

  return (
    <div>
      <h1>Permissions Management</h1>

     
      <form onSubmit={addPermission} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="New Permission"
          value={newPermission}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Permission</button>
      </form>

     
      <table className="permissions-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Permission Name</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission.id}>
              <td>{permission.id}</td>
              <td>{permission.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Permissions;
