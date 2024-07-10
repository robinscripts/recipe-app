# Recipe App

The Recipe App is a web application that allows users to search for recipes, view recipe details, and manage favorite recipes. It integrates with the Spoonacular API to fetch recipe data.

## Features

- **Search Recipes**: Search for recipes by entering a search term.
- **View Recipe Details**: Click on a recipe card to view its summary in a modal.
- **Manage Favorites**: Add or remove recipes from favorites list.
- **Pagination**: Load more recipes as you scroll down.

## Technologies Used

- **Frontend**: React.js, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **External API**: Spoonacular API for recipe data

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/recipe-app.git
   cd recipe-app

2. Clone the repository:

   ```bash
    cd frontend
    npm install

    cd ../backend
    npm install

3. Set up environment variables:

    Create a .env file in the backend directory with the following:
    ```bash
    API_KEY=your_spoonacular_api_key

4. Start the backend server:
    ```bash
    cd backend
    npm start

5. Start the frontend development server:
    ```bash
    cd frontend
    npm start

6. Open your browser and navigate to http://localhost:5173 to view the application.

## API Endpoints

- **GET `/api/recipes/searches`**: Search recipes by `searchTerm` and `page`.
- **GET `/api/recipes/:recipeId/summary`**: Get summary of a recipe by `recipeId`.
- **POST `/api/recipes/favourite`**: Add a recipe to favorites.
- **GET `/api/recipes/favourite`**: Get all favorite recipes.
- **DELETE `/api/recipes/favourite`**: Remove a recipe from favorites.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your improvements.



