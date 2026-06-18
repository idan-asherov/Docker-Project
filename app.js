const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const userRoutes = require("./routes/users");

const app = express();
const PORT = 3000;
//express.json our server can perse json data
app.use(express.json());

// app.use(cors({ origin: "*" }));
//make it specific for localhost:5500
app.use(cors({ origin: "*" }));
connectDB();

app.get("/", (req, res) => {
  res.send("Hello Idan its your user management app!!!");
});

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`App is running on cdsd???!!! http://localhost:${PORT}`);
});
