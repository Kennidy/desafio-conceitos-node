const express = require("express");
const cors = require("cors");
const {uuid} = require("uuidv4");


const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;

  const newRepositorie = {id: uuid(), title, url, techs, likes: 0};

  repositories.push(newRepositorie);

  return response.json(newRepositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, url, techs,likes} = request.body;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (repositorieIndex < 0){
    return response.status(400).json({ error: 'Project not found' })
  }

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes: 0
  }
  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (repositorieIndex < 0){
    return response.status(400).json({ error: 'Project not found' })
  }

  repositories.splice(repositorieIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorie = repositories.find(repositorie => repositorie.id === id);

  if (!repositorie){
    return response.status(400).json({ error: 'Project not found'})
  }

  repositorie.likes += 1;

  return response.json(repositorie);

});

module.exports = app;
