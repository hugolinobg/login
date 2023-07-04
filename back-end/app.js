const express = require("express")
const cors = require("cors")

let session = require("express-session")

const app = express()
const User = require("./models/User")

app.use(session({ secret: "abc123" }))
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("Api online")
  // res.redirect("/users.html")
})

app.post("/userRegister", async (req, res) => {
  const { name, email, password } = req.body

  //validando campos
  if (!name) {
    return res.status(422).json({ msg: "O nome é obrigatório!" })
  }

  if (!email) {
    return res.status(422).json({ msg: "O e-mail é obrigatório!" })
  }

  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatório!" })
  }
  //validando usuario se existe
  const userExists = await User.findOne({ where: { email: email } })

  if (userExists) {
    return res.status(422).json({ msg: "por favor, utilize outro e-mail" })
  }
  // criando usuario
  await User.create({
    name: name,
    email: email,
    password: password,
  })
    .then(() => {
      res.redirect("/")
    })
    .catch((erro) => {
      console.log(erro)
    })
})

app.post("/user", async (req, res) => {
  const { email, password } = req.body

  //validando campos
  if (!email) {
    return res.status(422).json({ msg: "O e-mail é obrigatório!" })
  }

  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatório!" })
  }

  //validando usuario se existe
  const user = await User.findOne({ where: { email: email } })

  if (!user) {
    return res.status(404).json({ msg: "usuário não encotrado!" })
  }

  //validando senha se existe
  const checkPassword = await User.findOne({
    where: { password: user.password },
  })

  if (!checkPassword) {
    return res.status(422).json({ msg: "senha invalidade!" })
  } else {
    return res.status(200).json({ msg: "senha confimada!" })
  }
})

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000: http://localhost:3000")
})

/*
npm install express
npm install express-session
npm install cors
npm install --save sequelize
npm install --save mysql2
npm install -g nodemon
*/

