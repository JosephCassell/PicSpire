import { csrfFetch } from './csrf';
const GET_COMMENTS = 'posts/getComments';
const GET_COMMENTS_SUCCESS = 'posts/getCommentsSuccess';
const GET_COMMENTS_FAILURE = 'posts/getCommentsFailure';
const ADD_COMMENT = 'comments/addComment';
const SET_ERROR = 'comments/setError';
const REMOVE_COMMENT = 'comments/removeComment';
const UPDATE_COMMENT = 'comments/updateComment';

export const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  payload: comment
});

export const removeComment = (commentId) => ({
  type: REMOVE_COMMENT,
  payload: commentId
});

// Delete a comment
export const deleteComment = (id) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/comments/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      dispatch(removeComment(id));
    } else {
      const error = await response.json();
      dispatch(setError(error.message));
    }
  } catch (error) {
    console.error('Error deleting comment:', error);
    dispatch(setError(error.message));
  }
};
// Delete reply
const removeCommentById = (comments, idToRemove) => {
  return comments.reduce((acc, comment) => {
    if (comment.id === idToRemove) {
      return acc;
    }
    const updatedReplies = comment.childComments
      ? removeCommentById(comment.childComments, idToRemove)
      : comment.childComments;
    return [...acc, { ...comment, childComments: updatedReplies }];
  }, []);
};
export const addComment = (comment) => ({
  type: ADD_COMMENT,
  payload: comment
});


export const setError = (error) => ({
  type: SET_ERROR,
  error
});

// Create a comment
export const createComment = ({ postId, parentCommentId, text }) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        postId,
        parentCommentId,
        text
      })
    });

    if (response.ok) {
      const comment = await response.json();
      dispatch(addComment(comment));
    } else {
      const error = await response.json();
      dispatch(setError(error.message));
    }
  } catch (error) {
    console.error('Error creating comment:', error);
    dispatch(setError(error.message));
  }
};
// Get all comments on a post
export const fetchComments = (postId) => async (dispatch) => {
  dispatch({ type: GET_COMMENTS });
  try {
    const response = await csrfFetch(`/api/comments/${postId}`);
    if (response.ok) {
      const comments = await response.json();
      dispatch({
        type: GET_COMMENTS_SUCCESS,
        payload: comments
      });
    } else {
      throw new Error('Failed to fetch comments');
    }
  } catch (error) {
    dispatch({
      type: GET_COMMENTS_FAILURE,
      payload: error.message
    });
  }
};
// Edit a comment
export const editComment = ({ id, text }) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/comments/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });

    if (response.ok) {
      const updatedComment = await response.json();
      dispatch(updateComment(updatedComment));
    } else {
      const error = await response.json();
      dispatch(setError(error.message));
    }
  } catch (error) {
    console.error('Error editing comment:', error);
    dispatch(setError(error.message));
  }
};

const initialState = {
    comments: [],
    isLoading: false,
    error: null
  };
  
  const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMENTS:
            return { ...state, isLoading: true, error: null };
        case GET_COMMENTS_SUCCESS:
            return {...state, isLoading: false, comments: action.payload };
        case GET_COMMENTS_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        case ADD_COMMENT:
            return {...state,comments: [...state.comments, action.payload]};
        case REMOVE_COMMENT:
            return {...state, comments: removeCommentById(state.comments, action.payload)};
        case SET_ERROR:
            return {...state,error: action.error};
        case UPDATE_COMMENT:
            return {...state, comments: state.comments.map((comment) => comment.id === action.payload.id ? action.payload : comment)};
        default:
            return state;
    }
  };
  
export default commentsReducer;
  
