describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/'); // Vite default port
  });

  it('displays loading state while fetching posts', () => {
    // Mock the API to delay response, ensuring loading state is visible
    cy.intercept('GET', 'https://corsproxy.io/?https://www.reddit.com/r/popular.json', {
      delay: 1000, // Simulate network delay
      statusCode: 200,
      body: {
        data: {
          children: [
            { data: { id: '1', title: 'Test Post', selftext: 'Test Content' } },
          ],
        },
      },
    }).as('getPosts');

    cy.contains('Loading...').should('be.visible'); // Check loading state
    cy.wait('@getPosts');
  });

  it('displays posts when API call succeeds', () => {
    // Mock the Reddit API response
    cy.intercept('GET', 'https://corsproxy.io/?https://www.reddit.com/r/popular.json', {
      statusCode: 200,
      body: {
        data: {
          children: [
            { data: { id: '1', title: 'Test Post', selftext: 'Test Content' } },
          ],
        },
      },
    }).as('getPosts');

    cy.wait('@getPosts');
    cy.contains('MiniReddits').should('be.visible'); // Matches your Home.test.jsx
    cy.contains('Test Post').should('be.visible');
    cy.contains('Test Content').should('be.visible');
  });

  it('displays error message when API call fails', () => {
    // Mock a failed API response
    cy.intercept('GET', 'https://corsproxy.io/?https://www.reddit.com/r/popular.json', {
      statusCode: 500,
    }).as('getPosts');

    cy.wait('@getPosts');
    cy.contains('Error loading posts.').should('be.visible'); // Matches your Home.test.jsx
  });
});