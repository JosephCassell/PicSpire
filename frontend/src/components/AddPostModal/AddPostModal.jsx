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
  

  return (
    <div className="add-post-modal-backdrop">
      <div className="add-post-modal-content">
        <form onSubmit={handleSubmit}>
          <h2>Add New Post</h2>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="What's on your mind?"
            rows="4"
          />
          <label>
            Images to Upload
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              multiple
              onChange={updateFiles} />
          </label>
          <button type="submit">Post</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddPostModal;
