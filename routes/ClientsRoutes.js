const express = require("express");
const router = express.Router();
const clientController = require("../controllers/ClientsController");

// Get all clients
router.get("/", clientController.getAllClients);

// Get client by ID
router.get("/:id", clientController.getClientById);

// Create new client
router.post("/", clientController.createClient);

// Update client by ID
router.patch("/update/:id", clientController.updateClient);

// Delete client by ID
router.delete("/delete/:id", clientController.deleteClient);

module.exports = router;
