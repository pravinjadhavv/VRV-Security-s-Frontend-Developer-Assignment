import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]); 
  const [newUser, setNewUser] = useState({ name: '', email: '', status: '', role: '' }); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [showForm, setShowForm] = useState(false); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const usersPerPage = 7; 


  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

 
  const addUser = (e) => {
    e.preventDefault();

  
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers([...users, data]);
        setNewUser({ name: '', email: '', status: '', role: '' }); 
        setShowForm(false); 
      })
      .catch((error) => console.error('Error adding user:', error));
  };

  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + usersPerPage);


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  const filteredUsers = paginatedUsers.filter((user) => {
    return (
      (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (user.status?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (user.role?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <h1>Users Management</h1>

    
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        
        <button onClick={() => setShowForm(!showForm)} style={{ padding: '10px 20px', fontSize: '16px' }}>
          {showForm ? 'Cancel' : 'Add New User'}
        </button>

       
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '8px', fontSize: '16px', borderRadius: '10px', width: '250px', marginRight: '10px' }}
          />
        </div>
      </div>


      {showForm && (
        <form onSubmit={addUser} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newUser.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleInputChange}
            required
          />
          <select
            name="status"
            value={newUser.status}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Deactivated">Deactivated</option>
            <option value="Pending">Pending</option>
          </select>
          <select
            name="role"
            value={newUser.role}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Role</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
            <option value="Team Leader">Team Leader</option>
            <option value="Other">Other</option>
          </select>
          <button type="submit">Add User</button>
        </form>
      )}

 
      <table className="user-table" style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

  
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={startIndex + usersPerPage >= users.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
