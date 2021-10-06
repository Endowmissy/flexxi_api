const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require('cors')
const connectDB = require('./config/db')

// load environment variables
dotenv.config({ path: "./config/config.env" });

// connect to database
connectDB()

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
