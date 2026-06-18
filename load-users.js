require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./model/User.js");

// Added the required "password" field to every user so Mongoose accepts them!
const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    age: 25,
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    age: 30,
  },
  {
    name: "Mike Johnson",
    email: "mike@example.com",
    password: "password123",
    age: 22,
  },
  {
    name: "Sarah Wilson",
    email: "sarah@example.com",
    password: "password123",
    age: 28,
  },
  {
    name: "David Brown",
    email: "david@example.com",
    password: "password123",
    age: 35,
  },
  {
    name: "Emily Davis",
    email: "emily@example.com",
    password: "password123",
    age: 27,
  },
  {
    name: "Chris Miller",
    email: "chris@example.com",
    password: "password123",
    age: 31,
  },
  {
    name: "Jessica Taylor",
    email: "jessica@example.com",
    password: "password123",
    age: 24,
  },
  {
    name: "Daniel Anderson",
    email: "daniel@example.com",
    password: "password123",
    age: 29,
  },
  {
    name: "Olivia Thomas",
    email: "olivia@example.com",
    password: "password123",
    age: 26,
  },
];

async function insertUsers() {
  try {
    // Swapped the cluster ID back to your original working one (qm94ulj)
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qm94ulj.mongodb.net/${process.env.DB_NAME}`,
    );

    console.log("we connected to db ✅");

    // I uncommented this so you don't get "Duplicate Email" errors if some users already exist!
    await User.deleteMany({});
    console.log("previous users deleted!");

    await User.insertMany(users);
    console.log("users loaded into the db successfully ✅");
  } catch (error) {
    console.error("something went wrong", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("closed connection bye bye 👋");
  }
}

insertUsers();
