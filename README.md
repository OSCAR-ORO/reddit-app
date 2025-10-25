# Reddit App

A simple web application that allows users to view and search Reddit posts using the Reddit API. Built as a portfolio project to practice React, Redux, and modern web development tools.

## Wireframes
- **Home Page**: Displays a list of posts from `r/popular` with titles and text.  
  <image-card alt="Home Page Wireframe" src="wireframes/home-page.png" ></image-card>
- **Search Page**: Includes a search bar to query posts by term, showing results in a list.  
  <image-card alt="Search Page Wireframe" src="wireframes/search-page.png" ></image-card>

*Note*: Wireframes are placeholders. Actual wireframes will be added in the `wireframes/` folder.

## Technologies Used
- **React**: Frontend library for building the UI.
- **Redux Toolkit**: State management for handling API data.
- **React Router**: Navigation between home and search pages.
- **Vite**: Build tool for fast development and production builds.
- **Git/GitHub**: Version control and hosting.
- **Reddit API**: Fetches posts and search results.

## Features
- View a list of popular Reddit posts on the home page (`/`).
- Search for posts using terms on the search page (`/search`).
- Display loading and error states during API requests.

## Future Work
- Add filtering by predefined categories (e.g., subreddit or post type).
- Implement a detailed post view (modal or new route).
- Enhance UI with a cohesive design system and animations.
- Write unit and end-to-end tests.
- Optimize for 90+ Lighthouse scores.
- Deploy the app to a public URL.

## Setup Instructions
1. Clone the repository: `git clone https://github.com/<your-username>/reddit-app.git`
2. Navigate to the project: `cd reddit-app`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open `http://localhost:5173` in your browser.

## Usage
- Visit `/` to see popular Reddit posts.
- Navigate to `/search` to search posts by keyword.

## License
MIT License