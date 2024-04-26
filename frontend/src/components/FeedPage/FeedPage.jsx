import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeed } from '../../store/posts'

const FeedComponent = () => {
  const dispatch = useDispatch();
  const { isLoading, posts, error, currentUser } = useSelector(state => ({
    ...state.session,
    posts: state.posts.posts
  }));
  useEffect(() => {
    dispatch(fetchFeed(currentUser.id));
  }, [dispatch, currentUser.id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
        </div>
      ))}
    </div>
  );
};

export default FeedComponent;
