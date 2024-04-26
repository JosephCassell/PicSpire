import { useState, useEffect, useRef } from 'react';
import "./EditPostModal.css";

function EditPostModal({ post, show, onClose, onSubmit }) {
  const [caption, setCaption] = useState(post.caption);
  const [images, setImages] = useState([]);
  const [removedImageUrls, setRemovedImageUrls] = useState([]);
  const captionRef = useRef(caption);
  const imagesRef = useRef(images);
  const removedImageUrlsRef = useRef(removedImageUrls);
  
  useEffect(() => {
    captionRef.current = caption;
    imagesRef.current = images;
    removedImageUrlsRef.current = removedImageUrls;
  }, [caption, images, removedImageUrls]);

  useEffect(() => {
    setImages(post.images.map(img => ({ ...img, file: null })));
  }, [post]);

  if (!show) {
    return null;
  }

  const handleFilesChange = (e) => {
    const fileImages = Array.from(e.target.files).map(file => ({ file, image_url: URL.createObjectURL(file) }));
    setImages(prevImages => [...prevImages, ...fileImages]);
  };

  const handleRemoveImageClick = (imageToRemove) => {
    if (imageToRemove.file) {
      setImages(images.filter(image => image.file !== imageToRemove.file));
    } else {
      setRemovedImageUrls([...removedImageUrlsRef.current, imageToRemove.image_url]);
      setImages(images.filter(image => image.image_url !== imageToRemove.image_url));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('caption', captionRef.current);
    imagesRef.current.forEach((image, index) => {
      if (image.file) {
        formData.append(`images`, image.file);
      }
    });
    formData.append('removedImages', JSON.stringify(removedImageUrlsRef.current));
    for (let [key, value] of formData.entries()) {
      console.log('key', key, 'value', value);
    }
    onSubmit(post.id, formData);
  };

  const renderImages = () => {
    return images.map((image, index) => (
      <div key={index} className="image-preview">
        <img src={image.image_url}/>
        <button type="button" onClick={() => handleRemoveImageClick(image)} className="remove-image">Remove Image</button>
      </div>
    ));
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
          <input
            type="file"
            multiple
            onChange={handleFilesChange}
            className="custom-file-upload"
          />
          <div className="image-preview-container">
            {renderImages()}
          </div>
          <div className='edit-buttons'>
            <button className='post-save' type="submit">Save Changes</button>
            <button className='post-cancel' onClick={onClose} type="button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPostModal;
