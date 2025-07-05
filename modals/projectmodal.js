const db = require("../config/db");

exports.getAll = (callback) => {
  db.query("SELECT * FROM projects", callback);
};

exports.create = (data, callback) => {
  db.query("INSERT INTO projects SET ?", data, callback);
};


exports.findById = (id, callback) => {
  db.query("SELECT * FROM projects WHERE id = ?", [id], callback);
};

exports.update = (id, data, callback) => {
  db.query("UPDATE projects SET ? WHERE id = ?", [data, id], callback);
};

exports.delete = (id, callback) => {
  db.query("DELETE FROM projects WHERE id = ?", [id], callback);
};
