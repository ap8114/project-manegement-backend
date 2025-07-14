const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


const createprojectRoutes = require("./routes/createprojectroutes");
const usersRoutes = require("./routes/Usersroutes");
const clientsRoutes = require("./routes/ClientsRoutes");
const projectsRoutes = require("./routes/ProjectsRoutes");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  console.log("Incoming Content-Type:", req.headers["content-type"]);
  next();
});





app.use("/api/manager/createprojects", createprojectRoutes);
app.use("/api/manager/users", usersRoutes);
app.use("/api/manager/clients", clientsRoutes);
app.use("/api/manager/projects", projectsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
