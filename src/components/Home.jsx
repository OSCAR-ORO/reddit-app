import { useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/posts/postSlice";
import styles from "./Home.module.css";

function Home() {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.posts);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  return (
    <div className={styles.home}>
      <h1> Reddit Posts</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error loading posts.</p>}
      {status === "succeeded" && (
        <ul className={styles.postList}>
          {posts.map((post) => (
            <li key={post.id} className={styles.postItem}>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.postContent}>{post.selftext}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;