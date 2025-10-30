import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/posts/postSlice";
import styles from "./Home.module.css";
import { searchPosts } from "../features/posts/postSlice";

function Home() {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.posts);
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [searchTerm, setSearchTerm] = useState("");
  const [visiblePosts, setVisiblePosts] = useState(10);

  useEffect(() => {
    dispatch(fetchPosts(selectedCategory));
  }, [dispatch, selectedCategory]);

  const renderPostMedia = (post) => {
    const videoUrl =
      post?.secure_media?.reddit_video?.fallback_url ||
      post?.media?.reddit_video?.fallback_url;

    if (videoUrl) {
      return (
        <video
          src={videoUrl}
          controls
          style={{ width: "100%", maxWidth: "600px", borderRadius: "10px" }}
          loading="lazy"
        />
      );
    }

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
          loading="lazy"
        />
      );
    }

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    dispatch(searchPosts(searchTerm));
  };

  return (
    <div className={styles.home}>
      <h1>MiniReddits</h1>

      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term"
          className={styles.searchInput}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={styles.searchButton}
        >
          Search
        </button>
      </form>

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

      {status === "loading" && <p className={styles.loading}>Loading...</p>}
      {status === "failed" && <p>Error loading posts.</p>}
      {status === "succeeded" && (
        <div>
          <ul className={styles.postList}>
            {posts.slice(0, visiblePosts).map((post) => (
              <li key={post.id} className={styles.postItem}>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postAuthor}>
                  {post.author || post.author_fullname}
                </p>
                {renderPostMedia(post)}
              </li>
            ))}
          </ul>
          {visiblePosts < posts.length && (
            <button
              onClick={() => setVisiblePosts((prev) => prev + 10)}
              className={styles.loadMore}
            >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
