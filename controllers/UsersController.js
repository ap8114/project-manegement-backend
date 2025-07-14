const userModel = require("../modals/UsersModal");
const db = require('../config/db'); // adjust path if needed

exports.getAllUsers = (req, res) => {
  userModel.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// exports.createUser = (req, res) => {
//   console.log("REQ BODY ===>", req.body); // should now print full object

//   const { name, email, role } = req.body || {};



//   const newUser = {    name, email, role };

//   userModel.create(newUser, (err, result) => {
//     if (err) {
//       console.error("DB Error:", err);
//       return res.status(500).json({ error: "Database error", details: err });
//     }

//     res.status(201).json({ message: "User created", id: result.insertId });
//   });
// };

exports.createUser = (req, res) => {
  console.log("REQ BODY ===>", req.body); // must show full object

  const { name, email, role } = req.body || {};

  if (!name || !email || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newUser = { name, email, role };

  userModel.create(newUser, (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database error", details: err });
    }

    res.status(201).json({ message: "User created", id: result.insertId });
  });
};


exports.getUserById = (req, res) => {
  userModel.findById(req.params.id, (err, results) => {
    if (err) return res.status(500).send(err);
    if (!results.length) return res.status(404).send("User not found");
    res.json(results[0]);
  });
};

exports.updateUser = (req, res) => {
  const { name, email, role } = req.body;

  if (!name && !email && !role) {
    return res.status(400).json({ error: "Nothing to update." });
  }

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
