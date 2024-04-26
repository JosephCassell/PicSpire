import { csrfFetch } from './csrf';


const UPLOAD_IMAGE = 'images/uploadImage';
const REQUEST_START = 'images/requestStart';
const REQUEST_FAIL = 'images/requestFail';


const uploadImageAction = (image) => ({
  type: UPLOAD_IMAGE,
  payload: image,
});

const requestStart = () => ({
  type: REQUEST_START,
});

const requestFail = (error) => ({
  type: REQUEST_FAIL,
  error,
});

// Upload an image
export const uploadImage = (file, imageableId, imageableType) => async (dispatch) => {
  dispatch(requestStart());
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('imageable_id', imageableId);
  formData.append('imageable_type', imageableType);

  try {
    const response = await csrfFetch('/api/images/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(uploadImageAction(data));
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(`Failed to upload image: ${errorData.message || 'Unknown error'}`);
    }
  } catch (error) {
    dispatch(requestFail(error.message));
    throw error;
  }
};

const initialState = {
  isLoading: false,
  error: null,
  images: [],
};

const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_START:
      return { ...state, isLoading: true, error: null };
    case REQUEST_FAIL:
      return { ...state, isLoading: false, error: action.error };
    case UPLOAD_IMAGE:
      return { ...state, images: [...state.images, action.payload], isLoading: false };
    default:
      return state;
  }
};

export default imagesReducer;
