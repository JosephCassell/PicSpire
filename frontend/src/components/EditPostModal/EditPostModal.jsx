import { useState } from 'react';
import "./EditPostModal.css"
function EditPostModal({ post, show, onClose, onSubmit }) {
  const [caption, setCaption] = useState(post.caption);

  if (!show) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(post.id, caption);
  };
  const handleBackdropClick = () => {
    onClose();
  };

  return (
    <div className="edit-modal-backdrop" onClick={handleBackdropClick}>
      <div className="edit-modal-content" onClick={(e) => e.stopPropagation()}>
        <form className="edit-modal-form" onSubmit={handleSubmit}>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="edit-caption-input"
          />
          <div className='edit-buttons'>
          <button className= 'post-save' type="submit">Save Changes</button>
          <button className= 'post-cancel'onClick={onClose} type="button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPostModal;
