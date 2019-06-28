const express = require("express");

const server = express();

server.use(express.json());

const projects = [
  {
    id: "1",
    title: "Projeto 1",
    tasks: ["Tarefa 1"]
  },
  {
    id: "2",
    title: "Projeto 2",
    tasks: ["Tarefa 2"]
  },
  {
    id: "3",
    title: "Projeto 3",
    tasks: ["Tarefa 3"]
  }
];

let qtdRequisicoes = 0;

server.use((req, res, next) => {
  qtdRequisicoes++;

  console.log(`${qtdRequisicoes} requisições apresentadas!`);

  next();
});

function checkProjectExists(req, res, next) {
  const project = projects[req.params.id];

  if (!project) {
    res.status(400).json({ error: "Project not found" });
  }

  return next();
}

server.post("/projects", (req, res) => {
  const newProject = {
    id: req.body.id,
    title: req.body.title,
    tasks: []
  };

  projects.push(newProject);

  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects[id].title = title;

  return res.json(projects[id]);
});

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);

  return res.json(projects);
});

server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects[id].tasks.push(title);

  return res.json(projects[id]);
});

// Porta 9000 para projetos desafios
server.listen(9000);
