import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchPosts } from "../features/posts/postSlice";
import styles from "./Search.module.css";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.posts);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    dispatch(searchPosts(searchTerm));
  };

  return (
    <div className={styles.search}>
      <h1>Search Reddit Posts</h1>
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
      {status === "loading" && <p>Searching...</p>}
      {status === "failed" && <p>Error searching posts.</p>}
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

export default Search;
