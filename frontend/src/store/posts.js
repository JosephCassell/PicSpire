import { csrfFetch } from './csrf';

const GET_POSTS = 'posts/getPosts';
const REQUEST_START = 'posts/requestStart';
const REQUEST_FAIL = 'posts/requestFail';
const ADD_POST = 'posts/addPost';
const DELETE_POST = 'posts/deletePost';
const UPDATE_POST = 'posts/updatePost';
const FETCH_FEED_REQUEST = 'FETCH_FEED_REQUEST';
const FETCH_FEED_SUCCESS = 'FETCH_FEED_SUCCESS';
const FETCH_FEED_FAILURE = 'FETCH_FEED_FAILURE';


const updatePost = (post) => ({
  type: UPDATE_POST,
  payload: post
});

const setPosts = (posts) => ({
  type: GET_POSTS,
  payload: posts
});

const requestStart = () => ({
  type: REQUEST_START
});

const requestFail = (error) => ({
  type: REQUEST_FAIL,
  error
});

const addPost = (post) => ({
  type: ADD_POST,
  payload: post
});

const deletePost = (postId) => ({
  type: DELETE_POST,
  payload: postId
});
// Get posts from people the user is following
export const fetchFeed = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_FEED_REQUEST });
  try {
    const response = await csrfFetch(`api/posts/feed/${userId}`);
    if (response.ok) {
      const data = await response.json();
      dispatch({
        type: FETCH_FEED_SUCCESS,
        payload: data 
      });
    } else {
      throw new Error('Network response was not ok.');
    }
  } catch (error) {
    dispatch({
      type: FETCH_FEED_FAILURE,
      payload: error.message
    });
  }
};
// Create a post with multiple images
export const createPost = (postDetails) => async (dispatch, getState) => {
  dispatch(requestStart());
  const { session: { currentUser } } = getState();

  if (!currentUser) {
    dispatch(requestFail('No authenticated user.'));
    return;
  }

  const formData = new FormData();
  if (postDetails.caption) formData.append('caption', postDetails.caption);

  if (postDetails.images && postDetails.images.length > 0) {
    postDetails.images.forEach((image) => {
      formData.append('images', image);
    });
  }

  try {
    const response = await csrfFetch('/api/posts', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addPost(data));
    } else {
      const errorData = await response.json();
      throw new Error(`Failed to create post: ${errorData.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error:', error);
    dispatch(requestFail(error.message));
  }
};
// Delete a post
export const removePost = (postId) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const response = await csrfFetch(`/api/posts/${postId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      dispatch(deletePost(postId));
    } else {
      throw new Error('Failed to delete post');
    }
  } catch (error) {
    dispatch(requestFail(error.message));
  }
};
// Get posts by id
export const fetchPosts = (userId) => async (dispatch) => {
    dispatch(requestStart());
    try {
      const response = await csrfFetch(`/api/posts/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        dispatch(setPosts(data));
      } else {
        throw new Error('Failed to fetch posts');
      }
    } catch (error) {
      dispatch(requestFail(error.message));
    }
  };
// Update a post
export const editPost = (postId, formData) => async (dispatch, getState) => {
  dispatch(requestStart());
  const { session: { currentUser } } = getState();

  if (!currentUser) {
    dispatch(requestFail('No authenticated user.'));
    return;
  }

  try {
    const response = await csrfFetch(`/api/posts/${postId}`, {
      method: 'PATCH',
      body: formData
    });

    if (response.ok) {
      const updatedPost = await response.json();
      dispatch(updatePost(updatedPost));
    } else {
      const errorData = await response.json();
      throw new Error(`Failed to update post: ${errorData.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error:', error);
    dispatch(requestFail(error.message));
  }
};

  const initialState = {
    currentUser: null,
    isLoading: false,
    error: null,
    posts: []
  };
  
  const postsReducer = (state = initialState, action) => {
    switch (action.type) {
      case REQUEST_START:
        return { ...state, isLoading: true, error: null };
      case REQUEST_FAIL:
        return { ...state, isLoading: false, error: action.error };
      case GET_POSTS:
        return { ...state, posts: action.payload, isLoading: false };
      case ADD_POST:
        return { ...state, posts: [...state.posts, action.payload], isLoading: false };
      case DELETE_POST:
        return { ...state, posts: state.posts.filter(post => post.id !== action.payload), isLoading: false };
      case UPDATE_POST:
        return {...state, posts: state.posts.map(post => post.id === action.payload.id ? action.payload : post), isLoading: false};
      case FETCH_FEED_REQUEST:
        return {...state, isLoading: true, error: null};
      case FETCH_FEED_SUCCESS:
        return {...state, isLoading: false, posts: action.payload, error: null};
      case FETCH_FEED_FAILURE:
        return {...state, isLoading: false, error: action.payload};
      default:
        return state;
    }
  };
  
  export default postsReducer;
  
