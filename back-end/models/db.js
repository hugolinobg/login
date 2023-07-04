const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("loginsystem", "root", "", {
  host: "localhost",
  dialect: "mysql",
})

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com banco de dados realizado com sucesso!")
  })
  .catch(() => {
    console.log("Erro: Conexão com banco de dados não realizado com sucesso!")
  })

module.exports = sequelize
