require("dotenv").config();

const express = require("express");
const cors = require("cors");

const sequelize = require("./config/db");
const Profile = require("./models/Profile");

const app = express();

app.use(cors());
app.use(express.json());

//server health check
app.get("/", (req, res) => {
  res.json({
    application: "GitHub Profile Analyzer API",
    version: "1.0.0",
    status: "Running",
  });
});

//routes
const githubRoutes = require("./routes/githubRoutes");
app.use("/api/github", githubRoutes);
//routes

const PORT = process.env.PORT || 5000;

sequelize.authenticate().then(async () => {
  console.log("Database Connected");

  await sequelize.sync();

  console.log("Models Synced");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
