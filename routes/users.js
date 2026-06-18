const express = require("express");
const router = express.Router();

// Import ALL functions, including deleteUser
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser, // Make sure this is imported!
} = require("../controllers/users.controller");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser); // Add this final line!

module.exports = router;
