const User = require("../models/userModel");

class UserController {
  constructor(database) {
    this.database = database;
  }

  show = (req, res) => {
    const name = req.params.name;

    this.database.all(
      `SELECT * FROM USUARIOS WHERE NOME LIKE '%${name}%'`,
      (err, result) => {
        if (!err) {
          res.send(result[0]);

          return;
        } else {
        }
      }
    );
  };

  index = (req, res) => {
    this.database.all("SELECT * FROM USUARIOS", (err, rows) => {
      if (err) {
        throw new Error(`ERROR na consulta ${err}`);
      } else {
        console.log(rows);
        res.send(rows);
      }
    });
  };

  store = (req, res) => {
    const { name, email, password } = req.body;

    const user = new User(name, email, password);

    this.database.run(
      `INSERT INTO USUARIOS (NOME, EMAIL, SENHA) VALUES ('${user.name}', '${user.email}', '${user.password}')`
    );

    res.send({
      message: "Usuário salvo no banco de dados",
      data: user,
    });
  };

  update = (req, res) => {
    const userName = req.params.name;

    const { name, email, password } = req.body;

    const user = new User(name, email, password);

    this.database.run(
      `UPDATE USUARIOS SET NOME = '${user.name}', EMAIL = '${user.email}', SENHA = '${user.password}' WHERE NOME = '${userName}'`
    );

    res.send({ message: "Usuário alterado com sucesso", data: user });
  };

  delete = (req, res) => {
    const name = req.params.name;

    this.database.run(`DELETE FROM USUARIOS WHERE NOME like '${name}'`);

    res.send({
      message: "Usuário removido do banco de dados",
      data: name,
    });
  };
}

module.exports = UserController;
