const userModel = require("../modals/projectmodal");

exports.getAllUsers = (req, res) => {
  userModel.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.createUser = (req, res) => {
 const {
  project_name,
  client_name,
  application,
  total_pages,
  actual_due_date,
  qc_deadline,
  qc_hours_allocated,
  qc_due_date,
  status
} = req.body;

if (!project_name || !client_name || !application || !total_pages || !actual_due_date || !qc_deadline || !qc_hours_allocated || !qc_due_date || !status) {
  return res.status(400).json({ error: "Missing required fields." });
}


  const userData = { 
    project_name,
    client_name,
    application,
    total_pages,
    actual_due_date,
    qc_deadline,
    qc_hours_allocated,
    qc_due_date,
    status
  };

  userModel.create(userData, (err, result) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    res.status(201).json({ id: result.insertId, ...userData });
  });
};


exports.getUserById = (req, res) => {
  userModel.findById(req.params.id, (err, result) => {
    if (err) return res.status(500).send(err);
    if (!result.length) return res.status(404).send("User not found");
    res.json(result[0]);
  });
};

exports.updateUser = (req, res) => {
  userModel.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.send("User updated");
  });
};

exports.deleteUser = (req, res) => {
  userModel.delete(req.params.id, (err) => {
    if (err) return res.status(500).send(err);
    res.send("User deleted");
  });
};


