/* import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  
   const getUsers = async () => {
    getUsers();
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };g

  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.log(err));
  }, []); 
  const addUser = async () => {
    await axios.post("http://localhost:5000/api/users", {
      name,
      email,
    });

    setName("");
    setEmail("");

    getUsers();
  };


  return (
    <div>
      <h1>MERN App</h1>
      <p>{message}</p>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={addUser}>Add User</button>
      <h2>Users:</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App; */

import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch users
  const getUsers = async () => {
    console.log("Fetching users...");
    const res = await axios.get("http://localhost:5000/api/users");
    console.log("Fetched users-------:", res);
    setUsers(res.data);
  };

  useEffect(() => {
    getUsers();
  }, []);
  console.log("hello-----------------",users)
  // Add user
  const addUser = async () => {
    console.log("Adding user:", { name, email });
    await axios.post("http://localhost:5000/api/users", {
      name,
      email,
    });

    setName("");
    setEmail("");

    getUsers();
    
  };
  console.log(users);
  return (
    <div style={{ padding: "20px" }}>
      <h1>MERN App</h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <button onClick={addUser}>
        Add User
      </button>

       <button onClick={getUsers}>
        Get Users
      </button>
      <hr />

      <h2>Users</h2>
      {users.map((user) => (
        console.log("last print---------------------",user),
        <div key={user._id}>
          <p>{user.name} - {user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default App;