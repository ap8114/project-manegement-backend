const db = require("../config/db"); // adjust path if needed

exports.getAll = (callback) => {
  db.query("SELECT * FROM Users", callback);
};

exports.create = (userData, callback) => {
  console.log("Creating user with data:", userData);
  const sql = "INSERT INTO users ( name, email, role) VALUES ( ?, ?, ?)";
  db.query(sql, [userData.name, userData.email, userData.role], callback);
};

exports.findById = (id, callback) => {
  db.query("SELECT * FROM Users WHERE user_id = ?", [id], callback);
};

exports.update = (id, userData, callback) => {
  db.query("UPDATE Users SET ? WHERE user_id = ?", [userData, id], callback);
};

exports.delete = (id, callback) => {
  db.query("DELETE FROM Users WHERE user_id = ?", [id], callback);
};
