import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserProfile, fetchFollowers, fetchFollowing, uploadProfilePicture, followUser, unfollowUser, updateUserBio } from '../../store/session';
import { fetchPosts, removePost, editPost } from '../../store/posts';
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
    const [showEditModal, setShowEditModal] = useState(false);
    const [editablePost, setEditablePost] = useState(null);
    const [showPostOptions, setShowPostOptions] = useState({});
    const postOptionsMenuRefs = useRef({});
    const [isEditingBio, setIsEditingBio] = useState(false); 
    const [bio, setBio] = useState(''); 

    const { currentUser, followersCount, followingCount, posts, viewedUser, followers, } = useSelector(state => ({
        ...state.session,
        posts: state.posts.posts,
    }));

    useEffect(() => {
        if (username) {
            dispatch(getUserProfile(username));
        }
    }, [dispatch, username]);

    useEffect(() => {
        document.body.classList.toggle('modal-open', showAddPostModal || showPostModal || showEditModal);
    }, [showAddPostModal, showPostModal, showEditModal]);

    useEffect(() => {
        if (viewedUser && viewedUser.id) {
            dispatch(fetchFollowers(viewedUser.id));
            dispatch(fetchFollowing(viewedUser.id));
            dispatch(fetchPosts(viewedUser.id));
        }
    }, [dispatch, viewedUser]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            Object.keys(postOptionsMenuRefs.current).forEach(postId => {
                const menuRef = postOptionsMenuRefs.current[postId];
                if (menuRef && !menuRef.contains(event.target)) {
                    setShowPostOptions(prevState => {
                        const newState = { ...prevState, [postId]: false };
                        const postItem = document.getElementById(`post-item-${postId}`);
                        if (postItem) {
                            postItem.classList.remove('no-hover');
                        }
                        return newState;
                    });
                }
            });
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOpenModal = (postId) => {
        setDeletePostId(postId);
    };

    const handleCloseModal = () => {
        setDeletePostId(null);
    };
    
    const handleFollowClick = async () => {
        try {
            const isFollowing = followers.some(follower => follower.id === currentUser.id);

            if (isFollowing) {
                await dispatch(unfollowUser(currentUser.id, viewedUser.id));
                dispatch(fetchFollowers(viewedUser.id));
            } else {
                await dispatch(followUser(currentUser.id, viewedUser.id));
                dispatch(fetchFollowers(viewedUser.id)); 
            }
        } catch (error) {
            console.error('Error updating follow status:', error);
        }
    };

    const followButton = () => {
        if (currentUser?.id !== viewedUser?.id) {
            const isFollowing = followers.some(follower => follower.id === currentUser.id);
            const buttonClass = isFollowing ? "unfollow" : "follow";
            return (
                <button className={`follow-button ${buttonClass}`} onClick={handleFollowClick}>
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
            );
        }
        return null;
    };

    const handleDeletePost = () => {
        if (deletePostId) {
            dispatch(removePost(deletePostId));
            setDeletePostId(null);
        }
    };

    const openPostModal = (post) => {
        const postOwner = {
            username: viewedUser?.username,
            profilePicture: viewedUser?.profilePicture
        };
        setCurrentPost({ ...post, ...postOwner });
        setShowPostModal(true);
    };
    
    const closePostModal = () => {
        setShowPostModal(false);
        setCurrentPost(null);
    };

    const openEditModal = (post) => {
        setEditablePost(post);
        setShowEditModal(true);
        setShowPostOptions((prev) => ({ ...prev, [post.id]: false }));
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setEditablePost(null);
    };

    const handleSaveChanges = (postId, formData) => {
        dispatch(editPost(postId, formData))
            .then(() => {
                closeEditModal();
                dispatch(fetchPosts(viewedUser.id));
            })
            .catch(error => {
                console.error('Failed to update post:', error);
            });
    };

    const handleProfilePicUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                await dispatch(uploadProfilePicture(currentUser.id, file));
                window.location.reload();
            } catch (error) {
                console.error('Failed to upload profile picture:', error);
            }
        }
    };

    const togglePostOptions = (postId) => {
        setShowPostOptions(prev => {
            const newState = { ...prev, [postId]: !prev[postId] };
            const postItem = document.getElementById(`post-item-${postId}`);
            if (newState[postId]) {
                postItem.classList.add('no-hover');
            } else {
                postItem.classList.remove('no-hover');
            }
            return newState;
        });
    };
    const handleEditBio = () => {
        setIsEditingBio(true);
        setBio(viewedUser.bio || '');
    };
    
    const handleSaveBio = async () => {
        if (bio.length <= 150) {
            try {
                await dispatch(updateUserBio(viewedUser.id, bio));
                dispatch(getUserProfile(username)); 
                setIsEditingBio(false);
            } catch (error) {
                console.error('Failed to update bio:', error);
            }
        }
    };
    
    const isCurrentUser = currentUser && viewedUser && currentUser.id === viewedUser.id;

    return (
            <div className="profile-page">
                <div className="profile-content">
                    <div className="profile-detail">
                        {viewedUser?.profilePicture ? (
                            <img
                                src={viewedUser.profilePicture}
                                alt="Profile"
                                className={isCurrentUser ? "profile-picture-clickable" : ""}
                                onClick={isCurrentUser ? () => document.getElementById('profilePicUpload').click() : null}
                            />
                        ) : (
                            <div
                                className={`profile-picture-placeholder ${isCurrentUser ? "profile-picture-placeholder-clickable" : ""}`}
                                onClick={isCurrentUser ? () => document.getElementById('profilePicUpload').click() : null}
                            ></div>
                        )}
                        {isCurrentUser && (
                            <input
                                type="file"
                                id="profilePicUpload"
                                style={{ display: 'none' }}
                                onChange={handleProfilePicUpload}
                                accept="image/*"
                            />
                        )}
                    </div>
                    <div className="user-info">
                        <div className='username-edit'>
                            <h1 className='profile-username'>{viewedUser?.username}</h1>
                            {followButton()}
                            {isCurrentUser && (
                                <>
                                    <button onClick={handleEditBio}className="edit-profile-button">Edit</button>
                                </>
                            )}
                        </div>
                        <p className='profile-name'>{`${viewedUser?.firstName} ${viewedUser?.lastName}`}</p>
                        <div className='follow-info'>
                            <div className="followers-info">
                                <strong>Followers:</strong> {followersCount}
                            </div>
                            <div className="following-info">
                                <strong>Following:</strong> {followingCount}
                            </div>
                        </div>
                        <div className="profile-bio">
                            {isEditingBio ? (
                                <>
                                    <textarea
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        maxLength={150}
                                        className="bio-edit-input"
                                    />
                                    <div className="bio-button-group">
                                        <button onClick={handleSaveBio} className="save-bio-button">Save</button>
                                        <button onClick={() => setIsEditingBio(false)} className="cancel-bio-button">Cancel</button>
                                    </div>
                                </>
                            ) : (
                                <div className="bio-display">
                                    <p>{viewedUser?.bio || "No bio yet."}</p>
                                </div>
                            )}
                        </div>
                    </div>
            </div>
            <div className="posts-section">
                <div className="posts-header">
                    <h2 className="posts-heading">
                        {isCurrentUser ? "Add Post" : `${viewedUser?.username}'s Posts`}
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
                    {posts?.map((post) => (
                        <div
                            key={post.id}
                            id={`post-item-${post.id}`}
                            className={`post-item ${post.images && post.images.length > 0 ? 'with-image' : 'without-image'}`}
                            onClick={() => openPostModal(post)}
                        >
                            <div className='post-without-img'> 
                                <div className="post-header">
                                    <div className="post-header-left">
                                        {viewedUser?.profilePicture ? (
                                            <img
                                                src={viewedUser.profilePicture}
                                                alt="User Profile"
                                                className="post-profile-picture"
                                            />
                                        ) : (
                                            <div className="post-profile-picture-placeholder"></div>
                                        )}
                                        <span className="post-username">{viewedUser?.username}</span>
                                    </div>
                                    {isCurrentUser && (
                                        <div className="post-options" ref={(el) => postOptionsMenuRefs.current[post.id] = el}>
                                            <button
                                                className="post-options-button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    togglePostOptions(post.id);
                                                }}
                                            >...</button>
                                            {showPostOptions[post.id] && (
                                                <div className="post-options-menu">
                                                    <button onClick={(e) => {
                                                        e.stopPropagation();
                                                        openEditModal(post);
                                                    }} className="post-options-menu-item">
                                                        Edit
                                                    </button>
                                                    <button onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleOpenModal(post.id);
                                                    }} className="post-options-menu-item">
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {post.caption && (
                                    <div className={post.images && post.images.length > 0 ? "caption-with-image" : "caption-no-image"}>
                                        {post.caption}
                                    </div>
                                )}
                                {post.images && post.images.length > 0 && (
                                    <img
                                        src={post.images[0].image_url}
                                        alt="Post"
                                    />
                                )}
                            </div>
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
                {showPostModal && (
                    <PostModal 
                        post={currentPost} 
                        onClose={closePostModal} 
                        postOwnerUsername={currentPost?.username} 
                        postOwnerProfilePicture={currentPost?.profilePicture}
                    />
                )}
            </div>
            {deletePostId && (
                <div className="delete-modal-backdrop" onClick={handleCloseModal}>
                    <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Are you sure you want to delete your post?</h2>
                        <button type="button" className='deletePost-button' onClick={handleDeletePost}>Delete my post</button>
                        <button type="button" className='keepPost-button' onClick={handleCloseModal}>Keep my post</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;
