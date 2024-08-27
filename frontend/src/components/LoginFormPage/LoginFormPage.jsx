import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import phoneImage from '../../../public/phone.png'
import './LoginFormPage.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.currentUser);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  if (sessionUser) return <Navigate to="/" replace={true} />;
  const handleSignUpClick = () => {
    navigate('/signup');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        navigate(`/feed`); 
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      });
  };

  const handleDemoLogin = () => {
    setErrors({});
    dispatch(sessionActions.login({ credential: 'JohnDoe123', password: 'securePass1' }))
    .then(() => {
      navigate(`/feed`); 
    })
    .catch(async (res) => {
      const data = await res.json();
      if (data?.errors) setErrors(data.errors);
    });
  };

  return (
    <div className='login-form-page'>
  <img src={phoneImage} alt="Phone" />
  <div className="form-container">
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          placeholder="Username or Email"
        />
      </label>
      <label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </label>
      {errors.credential && <p>{errors.credential}</p>}
      <div className="button-group"> 
        <button type="button" className='demo-user' onClick={handleDemoLogin}>Demo User</button>
        <button type="submit" className='login-login'>Log In</button>
      </div>
    </form>
    <div className='signup-prompt'>Dont have an account?</div>
      <button type="button" className = 'login-signup' onClick={handleSignUpClick}>Sign up</button> 
  </div>
</div>

  );
}

export default LoginFormPage;