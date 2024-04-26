import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import './ProfileButton.css'
function ProfileButton() {
  const currentUser = useSelector(state => state.session.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate('/')
  };

  const profile = (e) => {
    e.preventDefault();
    navigate(`/${currentUser.username}/profile`)
  };
  return (
    <>
      <div className='ulClassName' ref={ulRef}>
        <button onClick={profile} className='nav-user'>{currentUser.username}</button>
        <button onClick={logout} className='logout-button'>Log Out</button>
      </div>
    </>
  );
}

export default ProfileButton;