import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img1 from '../img/loginimg.jpg';
import axios from 'axios';

const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [err, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validatePassword = (password) => {
    // Password should be at most 10 characters with a combination of alphabets, letters, and special characters
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,10}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      setError('Invalid email format');
      return;
    }

    // Validate password format
    if (!validatePassword(inputs.password)) {
      setError('Password should be at most 10 characters with a combination of alphabets, letters, and special characters');
      return;
    }

    try {
      await axios.post('/auth/register', inputs);
      setSuccessMessage('Registration completed successfully!');
      // Clear the form and error message on successful registration
      setInputs({
        username: '',
        email: '',
        password: '',
      });
      setError(null);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className='auth' style={{ backgroundImage: `url(${img1})` }}>
      <h1>Register</h1>
      <form>
        <input required type='text' placeholder='username' name='username' value={inputs.username} onChange={handleChange} />
        <input required type='email' placeholder='email' name='email' value={inputs.email} onChange={handleChange} />
        <input required type='password' placeholder='password' name='password' value={inputs.password} onChange={handleChange} />
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <span>
          Do you have an account? <Link to='/login'>login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
