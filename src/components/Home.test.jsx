import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/posts/postSlice';
import Home from './Home';

// Create a mock store for testing
const createMockStore = (initialState) => {
  return configureStore({
    reducer: {
      posts: postReducer
    },
    preloadedState: initialState
  });
};

describe('Home Component', () => {
  it('renders loading state', () => {
    const store = createMockStore({
      posts: { posts: [], status: 'loading' }
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', async () => {
    vi.doMock('../features/posts/postSlice', () => ({
      fetchPosts: vi.fn(() => ({ type: 'mock/action' })),
      searchPosts: vi.fn(() => ({ type: 'mock/action' })),
      default: postReducer // Preserve reducer
    }));

    const { default: MockedHome } = await import('./Home');

    const store = createMockStore({
      posts: { posts: [], status: 'failed' }
    });

    render(
      <Provider store={store}>
        <MockedHome />
      </Provider>
    );

    expect(screen.getByText('Error loading posts.')).toBeInTheDocument();

    // Clean up mock after test
    vi.restoreAllMocks();
  });

  it('renders posts when loaded', async () => {
    vi.doMock('../features/posts/postSlice', () => ({
      fetchPosts: vi.fn(() => ({ type: 'mock/action' })),
      searchPosts: vi.fn(() => ({ type: 'mock/action' })),
      default: postReducer // Preserve reducer
    }));

    const { default: MockedHome } = await import('./Home');

    const mockPosts = [
      { id: '1', title: 'Test Post 1', selftext: 'Test Content 1' },
      { id: '2', title: 'Test Post 2', selftext: 'Test Content 2' }
    ];

    const store = createMockStore({
      posts: { posts: mockPosts, status: 'succeeded' }
    });

    render(
      <Provider store={store}>
        <MockedHome />
      </Provider>
    );

    // Update to check actual rendered content (e.g., h1 or a post title)
    expect(screen.getByText('MiniReddits')).toBeInTheDocument();
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();

    // Clean up mock after test
    vi.restoreAllMocks();
  });
});