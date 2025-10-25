import {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { searchPosts } from "../features/posts/postSlice";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.posts);

  const handleSearch = (e) => {
    e.preventDefault();
    if(!searchTerm.trim()) return;
    dispatch(searchPosts(searchTerm));
  };

  return (
    <div>
        <h1>Search Reddit Posts</h1>
        <form onSubmit={handleSearch}>
            <input
                type="text"
                value={searchTerm}
                onChange = {(e) => setSearchTerm(e.target.value)}
                placeholder="Enter search term"
            />
            <button type="submit" disabled={status === "loading"}>
                Search
            </button>
        </form>
        {status === "loading" && <p>Searching...</p>}
        {status === "failed" && <p>Error searching posts.</p>}
        {status === "succeeded" && (
            <ul>
                {posts.map(post => (
                    <li key={post.id}><h2>{post.title}</h2><p>{post.selftext}</p></li>
                ))}
            </ul>
        )}
    </div>
  );
}

export default Search;
