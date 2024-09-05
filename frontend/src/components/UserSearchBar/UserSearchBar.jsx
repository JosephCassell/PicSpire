import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers } from '../../store/session';
import './UserSearchBar.css';

const UserSearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchedUsers = useSelector((state) => state.session.searchedUsers);
  const searchBarRef = useRef(null); 

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchUsers(searchTerm));
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchTerm, dispatch]);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchBarRef]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFocus = () => {
    if (searchedUsers.length > 0) {
      setShowResults(true);
    }
  };

  return (
    <div className="search-bar-container" ref={searchBarRef}>
      <form className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search users..."
          onFocus={handleFocus}
        />
      </form>
      {showResults && searchedUsers.length > 0 && (
        <ul className="search-results">
          {searchedUsers.slice(0, 5).map(user => (
            <a href={`/${user.username}/profile`} key={user.id} className="search-result-link">
              <li>
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={`${user.username}'s profile`}
                    className="search-profile-picture"
                  />
                ) : (
                  <div className="search-profile-picture-placeholder"></div>
                )}
                <span>{user.username}</span>
              </li>
            </a>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserSearchBar;
