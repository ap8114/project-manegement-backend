const projectModel = require("../modals/ProjectsModal");
const userModel = require("../modals/UsersModal");
const clientModel = require("../modals/ClientsModal"); // Ye banale ya ProjectsModal me hi query daal de

// Get all projects
exports.getAllProjects = (req, res) => {
  projectModel.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Create project
exports.createProject = async (req, res) => {
  const {
    project_name,
    client_id,
    due_date,
    team_lead_id,
    budget,
    description,
    status,
    priority,
  } = req.body;

  if (
    !project_name ||
    !client_id ||
    !due_date ||
    !team_lead_id ||
    !budget ||
    !status ||
    !priority
  ) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  // 🔑 1️⃣: Check if client_id exists
  clientModel.findById(client_id, (err, clientResults) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    if (clientResults.length === 0) {
      return res.status(400).json({ error: "Invalid client_id. Client does not exist." });
    }

    // 🔑 2️⃣: Check if team_lead_id exists
    userModel.findById(team_lead_id, (err, userResults) => {
      if (err) return res.status(500).json({ error: "Database error", details: err });
      if (userResults.length === 0) {
        return res.status(400).json({ error: "Invalid team_lead_id. User does not exist." });
      }

      // ✅ 3️⃣: Sab exist karte hain, ab insert karo
      const projectData = {
        project_name,
        client_id,
        due_date,
        team_lead_id,
        budget,
        description,
        status,
        priority,
      };

      projectModel.create(projectData, (err, result) => {
        if (err) return res.status(500).json({ error: "Database error", details: err });
        res.status(201).json({ id: result.insertId, ...projectData });
      });
    });
  });
};

// Get project by ID
exports.getProjectById = (req, res) => {
  projectModel.findById(req.params.id, (err, results) => {
    if (err) return res.status(500).send(err);
    if (!results.length) return res.status(404).send("Project not found");
    res.json(results[0]);
  });
};

// Update project
exports.updateProject = (req, res) => {
  const projectData = req.body;
  if (Object.keys(projectData).length === 0) {
    return res.status(400).json({ error: "No data to update." });
  }

  projectModel.update(req.params.id, projectData, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Project updated");
  });
};

// Delete project
exports.deleteProject = (req, res) => {
  projectModel.delete(req.params.id, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Project deleted");
  });
};
