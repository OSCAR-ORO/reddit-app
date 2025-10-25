import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await fetch('https://corsproxy.io/?https://www.reddit.com/r/popular.json');
    const data = await response.json();
    return data.data.children.map(post => post.data);
});

const postSlice = createSlice({
    name: 'posts',
    initialState: {posts: [], status: 'idle'},
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export const { setPosts } = postSlice.actions;
export default postSlice.reducer;
