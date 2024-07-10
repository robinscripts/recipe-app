import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
import {
  searchRecipes,
  getRecipeSummary,
  getFavouriteRecipesByIds,
} from "./recipe-api.js";

dotenv.config();

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "recipe-app-db",
  password: "robb69;",
  port: 5432,
});
db.connect();
app.use(express.json());
app.use(cors());

app.get("/api/recipes/searches", async (req, res) => {
  const searchTerm = req.query.searchTerm?.toString();
  const page = parseInt(req.query.page);

  if (!searchTerm) {
    return res.status(400).json({ error: "Please provide a search term" });
  }

  const result = await searchRecipes(searchTerm, page);
  console.log(result);
  res.json(result);
});

app.get("/api/recipes/:recipeId/summary", async (req, res) => {
  const recipeId = req.params.recipeId;

  const result = await getRecipeSummary(recipeId);
  console.log(result);
  res.json(result);
});

app.post("/api/recipes/favourite", async (req, res) => {
  const recipeID = req.body.recipeID;
  try {
    const query =
      "INSERT INTO favouriteRecipes (recipeid) VALUES ($1) RETURNING *";
    const result = await db.query(query, [recipeID]);

    res.status(201).json({
      status: "success",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

app.get("/api/recipes/favourite", async (req, res) => {
  try {
    const query = "SELECT * FROM favouriteRecipes";
    const result = await db.query(query);
    const recipeIDs = result.rows.map((recipe) => recipe.recipeid);
    const favouriteRecipes = await getFavouriteRecipesByIds(recipeIDs);
    res.json(favouriteRecipes);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

app.delete("/api/recipes/favourite", async (req, res) => {
  const recipeId = req.body.recipeID;
  console.log(recipeId);
  try {
    const query =
      "DELETE FROM favouriteRecipes WHERE recipeid = $1 RETURNING *";
    const result = await db.query(query, [recipeId]);

    if (result.rowCount > 0) {
      res.status(200).json({
        status: "success",
        message: "Recipe deleted successfully",
        data: result.rows[0],
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Recipe not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

app.get("/", async (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
