import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/posts/postSlice";
import styles from "./Home.module.css";

function Home() {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.posts);
  const [selectedCategory, setSelectedCategory] = useState("popular");

  useEffect(() => {
    dispatch(fetchPosts(selectedCategory));
  }, [dispatch, selectedCategory]);

  const renderPostMedia = (post) => {
    // 1️⃣ VIDEO
    const videoUrl =
      post?.secure_media?.reddit_video?.fallback_url ||
      post?.media?.reddit_video?.fallback_url;

    if (videoUrl) {
      return (
        <video
          src={videoUrl}
          controls
          className={styles.postVideo}
          style={{ maxWidth: "100%", borderRadius: "10px" }}
        />
      );
    }

    // 2️⃣ IMAGE
    const imageUrl =
      post?.preview?.images?.[0]?.source?.url?.replace(/&amp;/g, "&") ||
      (post?.thumbnail &&
      !["self", "default", "nsfw", "spoiler"].includes(post.thumbnail)
        ? post.thumbnail
        : null);

    if (imageUrl) {
      return (
        <img
          src={imageUrl}
          alt={post.title}
          className={styles.postImage}
          style={{ maxWidth: "100%", borderRadius: "10px" }}
        />
      );
    }

    // 3️⃣ FALLBACK: interesting data
    return (
      <div className={styles.postFallback}>
        {post.selftext ? (
          <p>{post.selftext}</p>
        ) : (
          <a
            href={`https://reddit.com${post.permalink}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Post ↗
          </a>
        )}
      </div>
    );
  };

  return (
    <div className={styles.home}>
      <h1>Reddit Posts</h1>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className={styles.categorySelect}
      >
        <option value="popular">Popular</option>
        <option value="news">News</option>
        <option value="technology">Technology</option>
        <option value="funny">Funny</option>
      </select>
    
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error loading posts.</p>}
      {status === "succeeded" && (
        <ul className={styles.postList}>
          {posts.map((post) => (
            <li key={post.id} className={styles.postItem}>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.postAuthor}>
                {post.author || post.author_fullname}
              </p>
              {renderPostMedia(post)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
