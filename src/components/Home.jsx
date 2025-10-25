import { useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/posts/postSlice";

function Home() {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.posts);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  return (
    <div>
      <h1> Reddit Posts</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error loading posts.</p>}
      {status === "succeeded" && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.selftext}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;