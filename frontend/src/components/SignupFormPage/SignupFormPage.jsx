import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupFormPage.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.currentUser);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  if (sessionUser) return <Navigate to="/feed" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };
  const handleLoginClick = () => {
    navigate('/login');
  };
  return (
    <div className='signup-form-page'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First Name'
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit">Sign up</button>
        <div className='login-prompt'>Already a user?</div>
        <button type="button" className = 'signup-login' onClick={handleLoginClick}>Log in</button>
      </form>
    </div>
  );
}

export default SignupFormPage;