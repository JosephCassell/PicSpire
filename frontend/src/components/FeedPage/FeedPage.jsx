import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { fetchFeed } from '../../store/posts'
import PostModal from '../PostModal/PostModal'; 
import './FeedPage.css'
const FeedComponent = () => {
  const dispatch = useDispatch();
  const [currentPost, setCurrentPost] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const navigate = useNavigate();
  const isLoading = useSelector(state => state.session.isLoading);
  const posts = useSelector(state => state.posts.posts);
  const error = useSelector(state => state.session.error);
  const currentUser = useSelector(state => state.session.currentUser);

  useEffect(() => {
    dispatch(fetchFeed(currentUser.id));
  }, [dispatch, currentUser.id]);
  useEffect(() => {
    document.body.classList.toggle('modal-open',  showPostModal );
  }, [showPostModal]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const feedPosts = posts.filter(post => post.user_id !== currentUser.id);
  
  const openPostModal = (post) => {
    const postOwner = {
        username: post.user?.username,
        profilePicture: post.user?.profilePicture
    };
    setCurrentPost({ ...post, ...postOwner });
    setShowPostModal(true);
  };

  const closePostModal = () => {
    setShowPostModal(false);
    setCurrentPost(null);
  };
  const goToUserProfile = (username) => {
    navigate(`/${username}/profile`);
  };  
  return (
    <div className="feed-profile-page">
    <div className="feed-posts-section">
      <div className="feed-posts-header">
        <h2 className="feed-posts-heading">
          Your Feed
        </h2>
      </div>
      <div className="feed-posts-line"></div>
      <div className="feed-posts-grid">
        {feedPosts.map((post) => (
          <div
            key={post.id}
            className={`feed-post-item ${post.images && post.images.length > 0 ? 'with-image' : 'without-image'}`}
            onClick={() => openPostModal(post)}
          >
            <div className='feed-post-header'>
              {post.user?.profilePicture ? (
                <img
                    src={post.user?.profilePicture}
                    alt="User Profile"
                    className="feed-post-profile-picture"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToUserProfile(post.user.username)}}/>
              ) : (
                <div className="feed-post-profile-picture-placeholder" onClick={(e) => {
                  e.stopPropagation();
                  goToUserProfile(post.user.username)}}></div>
              )}
              <div className="feed-post-username" onClick={(e) => {
                e.stopPropagation();
                goToUserProfile(post.user.username)}}>
                {post.user?.username}
            </div>
            </div>
            {post.caption && (
              <div className={post.images && post.images.length > 0 ? "feed-caption-with-image" : "feed-caption-no-image"}>
                {post.caption}
              </div>
            )}
            {post.images && post.images.length > 0 && (
              <img src={post.images[0].image_url} alt="Post" />
            )}
            
          </div>
        ))}
        {showPostModal && (
            <PostModal 
                post={currentPost} 
                onClose={closePostModal} 
                postOwnerUsername={currentPost?.username} 
                postOwnerProfilePicture={currentPost?.profilePicture}
            />
        )}
      </div>
    </div>
  </div>
  );
};

export default FeedComponent;
