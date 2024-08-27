import { csrfFetch } from './csrf';

const SET_CURRENT_USER = "session/setCurrentUser";
const SET_VIEWED_USER = "session/setViewedUser";
const REMOVE_USER = "session/removeUser";
const REQUEST_START = "session/requestStart";
const REQUEST_FAIL = "session/requestFail";
const GET_FOLLOWERS = 'session/getFollowers';
const GET_FOLLOWING = 'session/getFollowing';
const SET_PROFILE_PICTURE = 'session/updateUserProfilePicture';
const ADD_FOLLOWING = 'session/addFollowing'
const REMOVE_FOLLOWING = 'session/removeFollowing'
const SET_SEARCHED_USERS = 'session/setSearchedUsers';

const setSearchedUsers = (users) => ({
  type: SET_SEARCHED_USERS,
  payload: users,
});

const requestStart = () => ({
  type: REQUEST_START
});

export const updateUserProfilePicture = (imageUrl) => ({
  type: SET_PROFILE_PICTURE,
  payload: imageUrl,
});

const requestFail = (error) => ({
  type: REQUEST_FAIL,
  error
});

const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user
});

const setViewedUser = (user) => ({
  type: SET_VIEWED_USER,
  payload: user
});

const setFollowers = (followers) => ({
  type: GET_FOLLOWERS,
  payload: followers
});

const setFollowing = (following) => ({
  type: GET_FOLLOWING,
  payload: following
});

const removeUser = () => ({
  type: REMOVE_USER
});

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE'
  });
  dispatch(removeUser());
  return response;
};

const addFollowing = (user) => ({
  type: ADD_FOLLOWING,
  payload: user
});

const removeFollowing = (userId) => ({
  type: REMOVE_FOLLOWING,
  payload: userId
});

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password
    })
  });
  const data = await response.json();
  dispatch(setCurrentUser(data.user));
  return response;
};
// Upload profile picture
export const uploadProfilePicture = (userId, file) => async (dispatch) => {
  dispatch(requestStart());
  const formData = new FormData();
  formData.append('profilePicture', file);

  try {
    const response = await csrfFetch(`/api/users/${userId}/profile-picture`, {
      method: 'PATCH',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to upload profile picture');
    }

    const data = await response.json();
    dispatch(updateUserProfilePicture(data.profilePicture));
  } catch (error) {
    dispatch(requestFail(error.message));
    throw error;
  }
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setCurrentUser(data.user));
  return response;
};
export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password
    })
  });
  const data = await response.json();
  dispatch(setCurrentUser(data.user));
  return response;
};
// Gets details of a User
export const getUserDetails = () => async (dispatch) => {
  dispatch({REQUEST_START });
  try {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    if (data.user) {
      dispatch(setCurrentUser(data.user));
    } else {
      dispatch(setCurrentUser(null));
    }
  } catch (error) {
    dispatch({ type: REQUEST_FAIL, error: 'Failed to fetch user details' });
  }
  return;
};
// Gets details of a User by username
export const getUserProfile = (username) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const response = await csrfFetch(`/api/users/${username}`);
    if (response.ok) {
      const data = await response.json();
      dispatch(setViewedUser(data));
    } else {
      throw new Error('Profile not found');
    }
  } catch (error) {
    dispatch(requestFail(error.message));
  }
};

// Get a user's followers
export const fetchFollowers = (userId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/users/${userId}/followers`);
    
    if (response.ok) {
      const data = await response.json();
      dispatch(setFollowers(data.followers));
    } else {
      throw new Error('Failed to fetch followers');
    }
  } catch (error) {
    console.error('Error in fetchFollowers:', error);
  }
};

// Get all users current user follows
export const fetchFollowing = (userId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/users/${userId}/following`);
    
    if (response.ok) {
      const data = await response.json();
      dispatch(setFollowing(data.following));
    } else {
      throw new Error('Failed to fetch following');
    }
  } catch (error) {
    console.error('Error in fetchFollowing:', error);
  }
};

// Follow a user
export const followUser = (userId, followedId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/users/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ followedId }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addFollowing(data));
    } else {
      throw new Error('Failed to follow user');
    }
  } catch (error) {
    console.error(error);
  }
};

// Unfollow a user
export const unfollowUser = (userId, followedId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/users/unfollow`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ followedId }),
    });

    if (response.ok) {
      dispatch(removeFollowing(followedId));
    } else {
      throw new Error('Failed to unfollow user');
    }
  } catch (error) {
    console.error(error);
  }
};
// Update a user's bio
export const updateUserBio = (userId, bio) => async (dispatch) => {
  dispatch(requestStart());
  
  try {
    const response = await csrfFetch(`/api/users/${userId}/bio`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bio }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setViewedUser(data));  
    } else {
      throw new Error('Failed to update bio');
    }
  } catch (error) {
    dispatch(requestFail(error.message));
  }
};
// Search for users by username
export const searchUsers = (query) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const response = await csrfFetch(`/api/users/search?q=${query}`);
    if (response.ok) {
      const data = await response.json();
      dispatch(setSearchedUsers(data.users)); 
    } else {
      throw new Error('Search failed');
    }
  } catch (error) {
    dispatch(requestFail(error.message));
  }
};
const initialState = {
  currentUser: null,
  viewedUser: null,
  isLoading: false,
  error: null,
  followers: [],
  following: [],
  followersCount: 0,
  followingCount: 0,
  posts: [],
  searchedUsers: []
  };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload, isLoading: false };
    case SET_VIEWED_USER:
      return { ...state, viewedUser: action.payload, isLoading: false };
    case REQUEST_START:
      return { ...state, isLoading: true };
    case REQUEST_FAIL:
      return { ...state, isLoading: false, error: action.error };
    case REMOVE_USER:
      return { ...state, currentUser: null, viewedUser: null };
    case GET_FOLLOWERS:
      return { ...state, followers: action.payload, followersCount: action.payload.length };
    case GET_FOLLOWING:
      return { ...state, following: action.payload, followingCount: action.payload.length };
    case ADD_FOLLOWING:
      if (state.currentUser && state.currentUser.id === action.payload.userId) {
        return { ...state, following: [...state.following, action.payload], followingCount: state.followingCount + 1 };}
      return state;
    case REMOVE_FOLLOWING: 
      if (state.currentUser && state.currentUser.id === action.payload.userId) {
        return { ...state, following: state.following.filter(f => f.id !== action.payload), followingCount: state.followingCount - 1 };}
      return state;
    case SET_PROFILE_PICTURE: 
      return {...state, viewedUser: {...state.viewedUser, profilePicture: action.payload} }
    case SET_SEARCHED_USERS:
      return { ...state, searchedUsers: action.payload, isLoading: false };
    default:
      return state;
  }
};
export default sessionReducer;