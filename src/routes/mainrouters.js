import express from "express";
// import { getHomepage, createData } from "../controllers/mainController.js";
import Movie from "../model/Movie.js";
const router = express.Router();

// router.get("/", getHomepage);

// router.post("/create", createData)

router.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find().limit(10);
        res.json(movies);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
export default router;
