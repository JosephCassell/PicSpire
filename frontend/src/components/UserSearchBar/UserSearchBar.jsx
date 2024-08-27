import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers } from '../../store/session';
import './UserSearchBar.css';

const UserSearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchedUsers = useSelector(state => state.session.searchedUsers);

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchUsers(searchTerm));
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchTerm, dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBlur = () => {
     setTimeout(() => setShowResults(false), 200);
  };

  const handleFocus = () => {
    if (searchedUsers.length > 0) {
      setShowResults(true);
    }
  };

  return (
    <div className="search-bar-container" onBlur={handleBlur} onFocus={handleFocus}>
      <form className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search users..."
        />
      </form>
      {showResults && searchedUsers.length > 0 && (
        <ul className="search-results">
          {searchedUsers.slice(0, 5).map(user => (
            <li key={user.id}>
              {user.profilePicture ? (
                <img src={user.profilePicture} alt={`${user.username}'s profile`} className="search-profile-picture" />
              ) : (
                <div className="search-profile-picture-placeholder"></div>
              )}
              <a href={`/${user.username}/profile`}>{user.username}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserSearchBar;
