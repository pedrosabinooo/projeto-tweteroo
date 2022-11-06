import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

let user = "";
const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;
  if (!username || !avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  user = username;
  users.push({ username, avatar });
  res.status(201).send("Usuário cadastrado com sucesso!");
});

app.post("/tweets", (req, res) => {
  const username = req.headers.user;
  const { tweet } = req.body;
  if (!username || !tweet) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  const avatar = users.find((user) => user.username === username).avatar;
  tweets.push({ username, avatar, tweet });
  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  const { page } = req.query;
  if (!page) {
    res.status(400).send("Informe uma página válida!");
    return;
  }

  const tweetsPerPage = 10;
  const initial = (page - 1) * tweetsPerPage;
  const final = page * tweetsPerPage - 1;

  const slicedTweets = tweets.reverse().slice(initial, final + 1);

  res.status(201).send(slicedTweets);
});

app.get("/tweets/:username", (req, res) => {
  const { username } = req.params;
  if (!username) {
    res.status(400).send("Informe um usuário válido!");
    return;
  }

  const filteredTweets = tweets
    .filter((tweet) => tweet.username === username)
  
  res.status(201).send(filteredTweets);
});

app.listen(5000, () => console.log("Server running on port 5000!"));
