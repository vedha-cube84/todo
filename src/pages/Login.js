import React, { useState } from 'react';
import { loginUser } from '../api/api';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError('Please fill in both username and password.');
      return;
    }
    try {
      setError('');
      // localStorage.setItem('authToken', username+ ' ' +password);
      // history.push('/dashboard')
      // const response = await loginUser(username, password);
      const response = await loginUser({ username, password });
      if (response.data.token) {
          // setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', response.data.username);
          history.push('/home');  // Redirect to todos page
      } else {
          setError('Invalid credentials');
      }
    } catch {
      setError('Invalid username or password');
    }
    // localStorage.setItem('user', JSON.stringify({ username, password }));
  };

  return (
    <div className='main-page'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </label>
        <label>Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </label>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Login;
