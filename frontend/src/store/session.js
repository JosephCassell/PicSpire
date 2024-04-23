import { csrfFetch } from './csrf';

const SET_CURRENT_USER = "session/setCurrentUser";
const SET_VIEWED_USER = "session/setViewedUser";
const REMOVE_USER = "session/removeUser";
const REQUEST_START = "session/requestStart";
const REQUEST_FAIL = "session/requestFail";
const GET_FOLLOWERS = 'session/getFollowers';
const GET_FOLLOWING = 'session/getFollowing';

const requestStart = () => ({
  type: REQUEST_START
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


// Fetch a user's followers
export const fetchFollowers = (userId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/users/${userId}/followers`);
    if (response.ok) {
      const data = await response.json();
      dispatch(setFollowers(data.followers));
    } else {
      throw new Error('Failed to fetch followers');
    }
  } catch (error) {
    console.error(error);
  }
};

// Fetch who a user follows
export const fetchFollowing = (userId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/users/${userId}/following`);
    if (response.ok) {
      const data = await response.json();
      dispatch(setFollowing(data.following));
    } else {
      throw new Error('Failed to fetch following');
    }
  } catch (error) {
    console.error(error);
  }
};
export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE'
  });
  dispatch(removeUser());
  return response;
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
  posts: []
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
    default:
      return state;
  }
};
export default sessionReducer;