import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from '../ProfileButton/ProfileButton';
import './Navigation.css';
import logo from '../../../public/images/Logo.png'
function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.currentUser);
  const sessionLinks = sessionUser ? (
    <><ProfileButton user={sessionUser} /></>
  ) : (
    <div className="auth-links">
      <div className='login'><NavLink to="/login">Log in</NavLink></div>
      <div className='signup'><NavLink to="/signup">Sign up</NavLink></div>
    </div>
  );
  const logoLink = sessionUser ? '/feed' : '/';
  return (
    <ul className="navbar">
      <li className="logo">
        <img src={logo} alt="PicSpire Logo" />
        <NavLink to={logoLink}>PicSpire</NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
