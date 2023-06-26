import React, { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  });
  const [registrationStatus, setRegistrationStatus] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('/api/workouts/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Registration successful, handle further actions
        console.log('Registration successful! Username:', data.username);
        setRegistrationStatus('Registration successful!');
        setFormData({
          name: '',
          email: '',
          username: '',
          password: '',
        });
      } else {
        // Registration failed
        console.log('Registration failed:', data.message);
        setRegistrationStatus('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
      setRegistrationStatus('An error occurred during registration. Please try again.');
    }
  };
  
  

  return (
    <div className="center">
      <h3>Create an Account</h3>
      <div className="row mt-3">
        <div className="col">
          <input
            type="text"
            placeholder="Name"
            style={{ width: '400px', backgroundColor: 'white', color: 'black', padding: '5px' }}
            name="firstname"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <input
            type="text"
            placeholder="Email address"
            style={{ width: '400px', backgroundColor: 'white', color: 'black', padding: '5px' }}
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <input
            type="text"
            placeholder="Username"
            style={{ width: '400px', backgroundColor: 'white', color: 'black', padding: '5px' }}
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <input
            type="password"
            placeholder="Password"
            style={{ width: '400px', backgroundColor: 'white', color: 'black', padding: '5px' }}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <button onClick={handleRegister}>Register</button>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
          {registrationStatus && <p>{registrationStatus}</p>}
        </div>
      </div>
    </div>
  );
  
  
  };  
