const clientModel = require("../modals/ClientsModal");
const db = require('../config/db'); // adjust path if needed

exports.getAllClients = (req, res) => {
  clientModel.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getClientById = (req, res) => {
  clientModel.findById(req.params.id, (err, results) => {
    if (err) return res.status(500).send(err);
    if (!results.length) return res.status(404).send("Client not found");
    res.json(results[0]);
  });
};

exports.createClient = (req, res) => {
  const { client_name } = req.body;

  if (!client_name) {
    return res.status(400).json({ error: "Missing client_name" });
  }

  clientModel.create({ client_name }, (err, result) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    res.status(201).json({ id: result.insertId, client_name });
  });
};

exports.updateClient = (req, res) => {
  
  console.log("REQ PARAMS ID:", req.params.id);
  console.log("REQ BODY ===>", req.body);

  const id = req.params.id;
  const { client_name } = req.body || {};

  if (!id) {
    return res.status(400).json({ error: "ID is missing in params." });
  }

  if (!client_name) {
    return res.status(400).json({ error: "Nothing to update. 'client_name' is required." });
  }

  clientModel.update(id, { client_name }, (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Client not found." });
    }
    res.send("Client updated");
  });
};





exports.deleteClient = (req, res) => {
  const clientId = req.params.id;

  // Step 1: Delete all projects related to this client
  const deleteProjectsSql = "DELETE FROM projects WHERE client_id = ?";
  db.query(deleteProjectsSql, [clientId], (err) => {
    if (err) {
      console.error("Error deleting projects:", err);
      return res.status(500).json({ error: "Failed to delete related projects" });
    }

    // Step 2: Delete the client after projects are removed
    const deleteClientSql = "DELETE FROM clients WHERE client_id = ?";
    db.query(deleteClientSql, [clientId], (err2, result) => {
      if (err2) {
        console.error("Error deleting client:", err2);
        return res.status(500).json({ error: "Failed to delete client" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Client not found" });
      }

      res.send("Client and associated projects deleted successfully");
    });
  });
};

