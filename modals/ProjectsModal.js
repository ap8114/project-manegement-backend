const db = require("../config/db");

// Get all projects
exports.getAll = (callback) => {
  db.query("SELECT * FROM projects", callback);
};

// Create project
exports.create = (projectData, callback) => {
  db.query("INSERT INTO projects SET ?", projectData, callback);
};

// Get project by ID
exports.findById = (id, callback) => {
  db.query("SELECT * FROM projects WHERE project_id = ?", [id], callback);
};

// Update project
exports.update = (id, projectData, callback) => {
  db.query("UPDATE projects SET ? WHERE project_id = ?", [projectData, id], callback);
};

// Delete project
exports.delete = (id, callback) => {
  db.query("DELETE FROM projects WHERE project_id = ?", [id], callback);
};
