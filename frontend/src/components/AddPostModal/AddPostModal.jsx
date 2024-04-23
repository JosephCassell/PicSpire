import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../store/posts';
import './AddPostModal.css';
const AddPostModal = ({ show, onClose }) => {
  const [caption, setCaption] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (caption) {
      dispatch(createPost(caption));
      onClose();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h2>Add New Post</h2>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="What's on your mind?"
            rows="4"
            required
          />
          <button type="submit">Post</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddPostModal;
