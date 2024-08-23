// index.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./route/auth.route');
const taskRoutes = require('./route/task.route');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use(cors({
    origin: "*"
}))

// Use routes
app.use("/auth", authRoutes)
app.use("/task", taskRoutes)



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
