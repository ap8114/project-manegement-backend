const express = require("express");
const router = express.Router();
const userController = require("../controllers/UsersController");

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.get("/:id", userController.getUserById);
router.patch("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
