import React, { useState, useEffect } from 'react';

const Logs = () => {
  const [logs, setLogs] = useState([]); 


  useEffect(() => {
    fetch('http://localhost:5000/logs')
      .then((response) => response.json())
      .then((data) => setLogs(data))
      .catch((error) => console.error('Error fetching logs:', error));
  }, []);

  return (
    <div>
      <h1>Activity Logs</h1>
      <table className="logs-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Action</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.user}</td>
              <td>{log.action}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Logs;
