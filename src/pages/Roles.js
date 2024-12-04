import React, { useState, useEffect } from 'react';

const Roles = () => {
  const [roles, setRoles] = useState([]); 
  const [newRole, setNewRole] = useState({ name: '', permissions: '' }); 

  useEffect(() => {
    fetch('http://localhost:5000/roles')
      .then((response) => response.json())
      .then((data) => setRoles(data));
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRole((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  
  const addRole = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/roles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRole),
    })
      .then((response) => response.json())
      .then((data) => {
        setRoles([...roles, data]); 
        setNewRole({ name: '', permissions: '' }); 
      })
      .catch((error) => console.error('Error adding role:', error));
  };

  return (
    <div>
      <h1>Roles Management</h1>

  
      <form onSubmit={addRole} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="name"
          placeholder="Role Name"
          value={newRole.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="permissions"
          placeholder="Permissions (comma-separated)"
          value={newRole.permissions}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Role</button>
      </form>

   
      <table className="roles-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Role Name</th>
            <th>Permissions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.name}</td>
              <td>{role.permissions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Roles;
