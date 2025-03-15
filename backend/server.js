require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const shortenRoute = require("./routes/shorten");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", shortenRoute);

// Database Connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("DB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
