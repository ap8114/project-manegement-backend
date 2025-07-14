const db = require("../config/db");

// Get all clients
exports.getAll = (callback) => {
  db.query("SELECT * FROM Clients", callback);
};

// Get client by ID
exports.findById = (id, callback) => {
  db.query("SELECT * FROM Clients WHERE client_id = ?", [id], callback);
};

// Create new client
exports.create = (clientData, callback) => {
  db.query("INSERT INTO Clients SET ?", clientData, callback);
};

// Update client by ID
exports.update = (id, data, callback) => {
   
  console.log("Updating client with ID:", id);
  console.log("Data to update:", data);
  const sql = "UPDATE clients SET client_name = ? WHERE client_id = ?";
  db.query(sql, [data.client_name, id], callback);
};

// Delete client by ID
exports.delete = (id, callback) => {
  db.query("DELETE FROM Clients WHERE client_id = ?", [id], callback);
};
