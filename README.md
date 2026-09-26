# TasteOfThai

TasteOfThai is a React application for discovering Thai recipes using TheMealDB API.

Users can search for recipes, filter recipes by category, view recipe details, save favorite recipes, and add their own recipes.

## Technologies

- React
- JavaScript
- React Router
- CSS
- TheMealDB API
- LocalStorage
- Vite

## Features

- Browse Thai recipes
- Search for recipes
- Filter recipes by category
- View recipe details
- Add and remove favorite recipes
- Save favorites using LocalStorage
- Add your own recipes
- Edit or delete your added personal recipe
- Save personal recipes using LocalStorage
- Form validation with error feedback
- Loading and error states
- Responsive design

## How to run the project locally

1. Clone the repository.
2. Open the project folder in the terminal.
3. Install the dependencies:
```bash
npm install
```
4. Start the development server: 
```bash
npm run dev
```
5. Open the local URL shown in the terminal.

## Requirements fulfilled

### G requirements

- At least 5 clearly separated React components with clear responsibilities
- Reasonable folder structure separating components, pages/views, and helper functions
- React Router with multiple pages/views and navigation without page reload
- Shared state between components using React Context
- Local state used for form fields and shared state used where needed
- External API integration using TheMealDB API
- Loading state while recipes are being fetched
- Error handling for failed API requests
- Form for creating and editing personal recipes
- Required-field validation with clear error feedback
- Data persistence using LocalStorage
- Consistent naming and formatting
- No unused variables, components, or console.log statements
- Project maintained with Git and multiple descriptive commits
- README with project description and local setup instructions

### VG requirements

- Extended error handling with empty states and API/network error feedback
- Thoughtful component architecture with reusable components and a custom `useRecipes` hook
- Responsive design for mobile and larger screens
- Extended functionality including search, category filtering, favorites, and personal recipes
- Clear and maintained Git commit history with descriptive commit messages