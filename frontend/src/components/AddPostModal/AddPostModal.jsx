import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../store/posts';
import './AddPostModal.css';

const AddPostModal = ({ show, onClose }) => {
  const [caption, setCaption] = useState('');
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (caption.trim() || images.length > 0) {
      const imagesArray = Array.from(images);
      dispatch(createPost({ caption, images: imagesArray }));
      onClose();
    } else {
      alert('Please provide either a caption or upload an image.');
    }
  };

  if (!show) {
    return null;
  }

  const updateFiles = (e) => {
    const newFiles = Array.from(e.target.files);
    setImages(prevImages => [...prevImages, ...newFiles]);
  };

  const removeImage = (indexToRemove, event) => {
    event.preventDefault();  
    event.stopPropagation();
    setImages(images.filter((_, index) => index !== indexToRemove));
  };
  

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderImages = () => {
    return images.map((image, index) => (
      <div key={index} className="image-preview">
        <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
        <button
          className="remove-image"
          onClick={(event) => removeImage(index, event)}
        >
          Remove
        </button>
      </div>
    ));
  };
  
  return (
    <div className="add-post-modal-backdrop" onClick={handleBackdropClick}>
      <div className="add-post-modal-content">
        <form onSubmit={handleSubmit}>
          <h2>Add New Post</h2>
          <textarea
            className='addpost-textarea'
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="What's on your mind?"
            rows="4"
          />
          <label htmlFor="file-upload" className="add-file-upload-label">
            Choose Images
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".jpg, .jpeg, .png"
            multiple
            onChange={updateFiles}
            className="add-file-upload"
          />
          <div className="image-preview-container">
            {renderImages()}
          </div>
          <div className='addpost-buttons'>
            <button type="submit" className='addpost-submit'>Post</button>
            <button type="button" className='addpost-cancel' onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPostModal;
