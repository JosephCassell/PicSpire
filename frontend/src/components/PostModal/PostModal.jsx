import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchComments, createComment, deleteComment, editComment } from '../../store/comments';
import './PostModal.css';

const PostModal = ({ post, onClose, postOwnerUsername, postOwnerProfilePicture }) => {
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments.comments);
  const isLoading = useSelector(state => state.comments.isLoading);
  const currentUser = useSelector(state => state.session.currentUser);
  const [visibleReplies, setVisibleReplies] = useState({});
  const [newCommentText, setNewCommentText] = useState('');
  const [parentCommentId, setParentCommentId] = useState(null);
  const [replyBoxVisibleFor, setReplyBoxVisibleFor] = useState(null);
  const [replyText, setReplyText] = useState({});
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      dispatch(fetchComments(post.id));
    }
  }, [dispatch, post, replyBoxVisibleFor]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % post.images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + post.images.length) % post.images.length);
  };

  const toggleRepliesVisibility = (commentId) => {
    setVisibleReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const handleReplyClick = (commentId) => {
    setReplyBoxVisibleFor(prev => prev === commentId ? null : commentId);
    setReplyText(prev => ({ ...prev, [commentId]: '' }));
  };

  const handleEditClick = (comment) => {
    setEditingCommentId(comment.id);
    setEditingText(comment.text);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (newCommentText.trim()) {
      dispatch(createComment({ postId: post.id, parentCommentId, text: newCommentText }));
      setNewCommentText('');
      setParentCommentId(null);
    }
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(commentId));
  };
  
  if (!post) {
    return null;
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); 
      handleEditSubmit(editingCommentId); 
    }
  };

  const handleEditChange = (e) => {
    setEditingText(e.target.value);
  };

  const handleEditSubmit = (commentId, e) => {
    e.preventDefault();
    if (editingText.trim()) {
      dispatch(editComment({ id: commentId, text: editingText }));
      setEditingCommentId(null);
      setEditingText("");
    }
  };

  const goToUserProfile = (username) => {
    onClose();
    navigate(`/${username}/profile`);
  };

  const handleBackdropClick = () => {
    onClose();
  };

  const renderComments = (comments, isChild = false) => {
    return comments.map((comment) => (
      <div key={comment.id} className={`comment ${isChild ? 'child-comment' : ''}`}>
        {editingCommentId === comment.id ? (
          <form onSubmit={(e) => { handleEditSubmit(comment.id, e) }}>
            <textarea className='edit-comment-text-area'
              value={editingText}
              onChange={handleEditChange}
              onKeyPress={handleKeyPress}
              autoFocus
            />
            <button className="save-edit-comment" type="submit">Save</button>
            <button className="comment-delete-button" type="button" onClick={() => handleDeleteComment(comment.id)}>Delete</button>
          </form>
        ) : (
          <>
            <div className="comment-header">
              <div className="post-header-left">
                {comment.user?.profilePicture ? (
                  <img
                    src={comment.user.profilePicture}
                    alt="User Profile"
                    className="comment-profile-picture"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToUserProfile(comment.user?.username);
                    }}
                  />
                ) : (
                  <div className="comment-profile-picture-placeholder"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToUserProfile(comment.user?.username);
                    }}>

                  </div>
                )}
                <span 
                  className="comment-username"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToUserProfile(comment.user?.username);
                  }}
                >
                  {comment.user?.username}
                </span>
              </div>
              <div className="comment-text">
                {comment.text}
              </div>
            </div>
            <div className="comment-actions">
              <button onClick={() => handleReplyClick(comment.id)} className='reply-button'>Reply</button>
              {comment.user_id === currentUser.id && (
                <button className='comment-edit-button' onClick={() => handleEditClick(comment)}>Edit</button>
              )}
              {comment.childComments && comment.childComments.length > 0 && (
                <button
                  onClick={() => toggleRepliesVisibility(comment.id)}
                  className='view-reply-button'
                >
                  {visibleReplies[comment.id] ? 'Close Replies' :
                    `View ${comment.childComments.length} ${comment.childComments.length > 1 ? 'Replies' : 'Reply'}`}
                </button>
              )}
            </div>
            {replyBoxVisibleFor === comment.id && (
              <div className="reply-form">
                <textarea className='reply-text-area'
                  value={replyText[comment.id] || ''}
                  onChange={(e) => setReplyText({ ...replyText, [comment.id]: e.target.value })}
                  placeholder="Type your reply..."
                  autoFocus
                />
                <button className="post-reply" onClick={(e) => handleReplySubmit(e, comment.id)}>Post Reply</button>
              </div>
            )}
            {visibleReplies[comment.id] && renderComments(comment.childComments, true)}
          </>
        )}
      </div>
    ));
  };  
  
  const handleReplySubmit = (event, commentId) => {
    event.preventDefault();
    if (replyText[commentId].trim()) {
      dispatch(createComment({ postId: post.id, parentCommentId: commentId, text: replyText[commentId] }));
      setReplyText({ ...replyText, [commentId]: '' });
      setReplyBoxVisibleFor(null);
    }
  };

  const renderImages = () => {
    if (!post.images.length) return;
    const imageUrl = post.images[currentImageIndex].image_url;
    return (
      <div className="image-gallery">
        {post.images.length > 1 && <button onClick={handlePreviousImage} className="image-nav-button left">&lt;</button>}
        <img src={imageUrl} className="post-image" alt={`Post image ${currentImageIndex + 1}`} />
        {post.images.length > 1 && <button onClick={handleNextImage} className="image-nav-button right">&gt;</button>}
      </div>
    );
  };

  return (
    <div className="post-modal-backdrop" onClick={handleBackdropClick}>
      <div className="post-modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="post-modal-content">
          <div className="post-header">
            <div className="post-header-left"
              onClick={(e) => {
                e.stopPropagation();
                goToUserProfile(postOwnerUsername);
              }}>
              {postOwnerProfilePicture ? (
                <img
                  src={postOwnerProfilePicture}
                  alt={`${postOwnerUsername}'s profile`}
                  className="comment-profile-picture"
                />
              ) : (
                <div className="comment-profile-picture-placeholder"></div>
              )}
              <span 
                className="feed-post-username"
                onClick={(e) => {
                  e.stopPropagation();
                  goToUserProfile(postOwnerUsername);
                }}
              >
                {postOwnerUsername}
              </span>
            </div>
          </div>
          <div className="post-caption">{post.caption}</div>
          <div className="image-gallery">{renderImages()}</div>
          <div className="comments-section">
            {isLoading ? <p>Loading comments...</p> : renderComments(comments)}
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <div className="comment-input-wrapper">
                <textarea
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className='comment-text-area'
                />
                <button type="submit" className='post-button'>Post</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostModal;
