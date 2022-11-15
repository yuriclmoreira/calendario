import { db } from "../db.js";

export const getTask = (_, res) => {
  const q = "SELECT * FROM tarefa";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addTask = (req, res) => {
  const q =
    "INSERT INTO tarefa(`titulo`, `descricao`, `data`, `duracao`) VALUES(?)";

  const values = [
    req.body.titulo,
    req.body.descricao,
    req.body.data,
    req.body.duracao,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Tarefa criada com sucesso.");
  });
};

export const updateTask = (req, res) => {
  const q =
    "UPDATE tarefa SET `titulo` = ?, `descricao` = ?, `data` = ?, `duracao` = ? WHERE `id` = ?";

  const values = [
    req.body.titulo,
    req.body.descricao,
    req.body.data,
    req.body.duracao,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Tarefa atualizada com sucesso.");
  });
};

export const deleteTask = (req, res) => {
  const q = "DELETE FROM tarefa WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Tarefa deletado com sucesso.");
  });
};
