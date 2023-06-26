import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const [data, setData] = useState(null);
  const { username, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    try {
      // Fetch request to the login endpoint using axios
      const response = await axios.post('/api/workouts/login', credentials);
      const { data } = response;

      // Stores the token locally
      localStorage.setItem('token', data.token);
      console.log(data.message, data.token);
      setData('Login successful!');
      setCredentials({ username: '', password: '' }); // Clear text fields
    } catch (error) {
      console.log(error);
      setData(error.message);
    }
  };

  const logout = () => {
    // Remove the token from the local storage
    localStorage.removeItem('token');
    setData(null);
  };

  const requestData = async () => {
    try {
      const { data } = await axios('/api/workouts/profile', {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      setData(data.message);
      console.log(data.message);
    } catch (error) {
      console.log(error);
      setData(error.message);
    }
  };

  return (
    <div className="login-container">
      <h3 className="login-title text-center">Log in</h3>
      <div className="row mt-3">
        <div className="col text-center">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleChange}
            className="login-input"
            style={{ width: '37.5%', backgroundColor: 'white' }}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col text-center">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            className="login-input"
            style={{ width: '37.5%', backgroundColor: 'white' }}
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col text-center">
          <div className="button-row">
            <button className="login-button" onClick={login}>
              Log In
            </button>
            <button className="login-button ml-3" onClick={requestData}>
              Get Workouts
            </button>
            <button className="login-button ml-3" onClick={logout}>
              Log Out
            </button>
          </div>
        </div>
      </div>

      {/* <div className="col mt-8">
          <p className="login-message">Don't have an account?</p>
          <Link to="/login/components/Register" className="login-link">
            Create Account
          </Link>
        </div> */}

      {data && (
        <div className="text-center p-4">
          <div className="alert">{data}</div>
        </div>
      )}
    </div>
  );
}

export default Login;
