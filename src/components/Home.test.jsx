import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postSlice'
import Home from './Home'

// Helper: create store with custom preloaded state
const renderWithStore = (preloadedState) => {
  const store = configureStore({
    reducer: { posts: postsReducer },
    preloadedState,
  })
  return render(
    <Provider store={store}>
      <Home />
    </Provider>
  )
}

test('shows loading when status is loading', () => {
  renderWithStore({ posts: { status: 'loading', posts: [] } })
  expect(screen.getByText('Loading...')).toBeInTheDocument()
})

test('shows error when status is failed', () => {
  renderWithStore({ posts: { status: 'failed', posts: [] } })
  expect(screen.getByText('Error loading posts.')).toBeInTheDocument()
})

test('renders posts when status is succeeded', () => {
  renderWithStore({
    posts: {
      status: 'succeeded',
      posts: [{ id: '1', title: 'Test title', selftext: 'Test body' }],
    },
  })
  expect(screen.getByText('MiniReddits')).toBeInTheDocument()
  expect(screen.getByText('Test title')).toBeInTheDocument()
  expect(screen.getByText('Test body')).toBeInTheDocument()
})
