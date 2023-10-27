import React, { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await resp.json()
      // console.log('D', data);
      setData(data);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="App">
      <label>Search Name: </label>
      <input type='text' 
        onChange={handleChange}
        value={search}
      />
      <br /><br />
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>UserName</th>
          <th>Email ID</th>
          <th>Address</th>
        </tr>
        <tbody>
          {
            data
              ?.sort((a, b) => b.id - a.id) // for descending
              // ?.sort((a, b) => a.id - b.id)  // for ascending 
              ?.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
              // ?.filter(item => item.username.toLowerCase().includes(search.toLowerCase()))
              ?.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.address.street}, 
                    {item.address.suite}, 
                    {item.address.city}, 
                    {item.address.zipcode}
                  </td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
