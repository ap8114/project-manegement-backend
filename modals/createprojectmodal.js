const db = require("../config/db");

exports.getAll = (callback) => {
  db.query("SELECT * FROM createproject", callback);
};

exports.create = (data, callback) => {
  db.query("INSERT INTO createproject SET ?", data, callback);
};


exports.findById = (id, callback) => {
  db.query("SELECT * FROM createproject WHERE id = ?", [id], callback);
};

exports.update = (id, data, callback) => {
  db.query("UPDATE createproject SET ? WHERE id = ?", [data, id], callback);
};

exports.delete = (id, callback) => {
  db.query("DELETE FROM createproject WHERE id = ?", [id], callback);
};
