import express, {json} from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
  const {username, avatar} = req.body;
  if(!username || !avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  users.push({username, avatar});
  res.status(200).send("Usuário cadastrado com sucesso!");
});

// app.post("/tweets", (req, res) => {
//   res.send(userInfo);
// });

// app.get("/tweets", (req, res) => {
//   res.send(userInfo);
// });

app.listen(5000, () => console.log("Server running on port 5000!"));
