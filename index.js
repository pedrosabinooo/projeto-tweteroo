import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;
  if (!username || !avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  users.push({ username, avatar });
  res.status(201).send("Usuário cadastrado com sucesso!");
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;
  if (!username || !tweet) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  const avatar = users.find((user) => user.username === username).avatar;
  tweets.push({ tweet, username, avatar });
  res.status(201).send("OK");
});

// app.get("/tweets", (req, res) => {
//   res.send(tweets);
// });

app.listen(5000, () => console.log("Server running on port 5000!"));
