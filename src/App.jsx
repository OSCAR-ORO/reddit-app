import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./features/posts/postSlice";
import Search from "./components/Search";

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
