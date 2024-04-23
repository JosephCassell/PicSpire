import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserProfile, fetchFollowers, fetchFollowing } from '../../store/session';
import { fetchPosts, removePost, editPost} from '../../store/posts';
import AddPostModal from '../AddPostModal/AddPostModal';
import EditPostModal from '../EditPostModal/EditPostModal';
import PostModal from '../PostModal/PostModal'; 
import './ProfilePage.css';

function ProfilePage() {
    const dispatch = useDispatch();
    const { username } = useParams();
    const [deletePostId, setDeletePostId] = useState(null);
    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [showPostModal, setShowPostModal] = useState(false);
    const [editPostId, setEditPostId] = useState(null);
    const [showEditPostModal, setShowEditPostModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editablePost, setEditablePost] = useState(null);

    const { currentUser, followersCount, followingCount, posts, viewedUser
    } = useSelector(state => ({
      ...state.session,
      posts: state.posts.posts
    }));

    useEffect(() => {
      if (username) {
       dispatch(getUserProfile(username));
      }
    }, [dispatch, username]);

    useEffect(() => {
      if (viewedUser && viewedUser.id) {
        dispatch(fetchFollowers(viewedUser.id));
        dispatch(fetchFollowing(viewedUser.id));
        dispatch(fetchPosts(viewedUser.id));
      }
    }, [dispatch, viewedUser]);

    const handleOpenModal = (postId) => {
      setDeletePostId(postId);
    };
    const handleCloseModal = () => {
      setDeletePostId(null);
    };
  
    const handleDeletePost = () => {
      if (deletePostId) {
        dispatch(removePost(deletePostId));
        setDeletePostId(null);
      }
    };
    const openPostModal = (post) => {
      setCurrentPost(post);
      setShowPostModal(true);
    };

    const closePostModal = () => {
      setShowPostModal(false);
      setCurrentPost(null);
    };

    
    const openEditModal = (post) => {
      setEditablePost(post);
      setShowEditModal(true);
    };

    const closeEditModal = () => {
      setShowEditModal(false);
      setEditablePost(null);
    };

    const handleSaveChanges = (postId, newCaption) => {
      dispatch(editPost(postId, newCaption))
        .then(() => {
          console.log('Post updated successfully');
          closeEditModal();
        })
        .catch(error => {
          console.error('Failed to update post:', error);
        });
    };
    
    if (!viewedUser) {
      return <div>No user data available.</div>;
    }
    const isCurrentUser = currentUser && viewedUser && currentUser.id === viewedUser.id;
    
    return (
      <div className="profile-page">
        <div className="profile-content">
          <div className="profile-detail">
            {viewedUser.profilePicture ? (
              <img src={viewedUser.profilePicture} alt="Profile" />
            ) : (
              <div className="profile-picture-placeholder"></div>
            )}
          </div>
          <div className="user-info">
            <div className='username-edit'>
              <h1 className='profile-username'>{viewedUser.username}</h1>
              {isCurrentUser && (
                <button className="edit-profile-button">Edit</button>
              )}
            </div>
            <p className='profile-name'>{`${viewedUser.firstName} ${viewedUser.lastName}`}</p>
            <div className='follow-info'>
              <div className="followers-info">
                <strong>Followers:</strong> {followersCount}
              </div>
              <div className="following-info">
                <strong>Following:</strong> {followingCount}
              </div>
            </div>
            <div className="profile-bio">
              {viewedUser.bio || "No bio yet."}
            </div>
          </div>
        </div>
        <div className="posts-section">
          <div className="posts-header">
            <h2 className="posts-heading">
              {isCurrentUser ? "Your Posts" : `${viewedUser.username}'s Posts`}
            </h2>
            {isCurrentUser && (
              <>
                <button className="add-post-button" onClick={() => setShowAddPostModal(true)}>+</button>
                <AddPostModal
                  userId={currentUser && currentUser.id}
                  show={showAddPostModal}
                  onClose={() => setShowAddPostModal(false)}
                />
              </>
            )}
          </div>
          <div className="posts-line"></div>
          <div className="posts-grid">
            {posts.map((post) => (
              <div key={post.id} className="post-item" onClick={() => openPostModal(post)}>
                {isCurrentUser && (
                  <>
                    <button onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(post);
                    }} className="edit-post-button">
                      Edit
                    </button>
                    <button onClick={(e) => {
                      e.stopPropagation(); 
                      handleOpenModal(post.id);
                    }} className="delete-post-button">
                      Delete
                    </button>
                  </>
                )}
                {post.imageUrl ? (
                  <img src={post.imageUrl} alt={post.caption || "No caption"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div className="caption-only">
                    {post.caption || "No caption provided"}
                  </div>
                )}
              </div>
            ))}
          </div>
          {showEditModal && editablePost && (
            <EditPostModal
              post={editablePost}
              show={showEditModal}
              onClose={closeEditModal}
              onSubmit={handleSaveChanges}
            />
          )}
          {showPostModal && <PostModal post={currentPost} onClose={closePostModal} />}
        </div>
        {deletePostId && (
          <div className="delete-modal">
            <div className="delete-modal-content">
              <h2>Are you sure you want to delete your post?</h2>
              <button type="button" onClick={handleDeletePost}>Delete my post</button>
              <button type="button" onClick={handleCloseModal}>Keep my post</button>
            </div>
          </div>
        )}
      </div>
    );    
}

export default ProfilePage;
