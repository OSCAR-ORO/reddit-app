import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Home from './Home'

// mock react-redux hooks used by Home
vi.mock('react-redux', () => ({
  useDispatch: () => vi.fn(),
  useSelector: (selector) =>
    selector({
      posts: {
        status: 'succeeded',
        posts: [{ id: '1', title: 'Test title', selftext: 'Test body' }]
      }
    })
}))

test('renders posts when status is succeeded', () => {
  render(<Home />)
  expect(screen.getByText('Reddit Posts')).toBeInTheDocument()
  expect(screen.getByText('Test title')).toBeInTheDocument()
  expect(screen.getByText('Test body')).toBeInTheDocument()
})