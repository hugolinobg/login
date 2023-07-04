const btn = document.querySelector("#register")

btn.addEventListener("click", () => {
  //capturar dados do formulário
  const data = getDataForm()

  //enviar os dados para api
  submitDataApi(data)
})

function getDataForm() {
  const inputName = document.querySelector("#name")
  const inputEmail = document.querySelector("#email")
  const inputPassword = document.querySelector("#password")
  const confirmationPassword = document.querySelector("#passwordConf")

  if (
    inputName.value === "" ||
    inputEmail.value === "" ||
    inputPassword.value === "" ||
    confirmationPassword.value === ""
  ) {
    alert("Preencha todos os campos!")
    return
  }

  if (inputPassword.value !== confirmationPassword.value) {
    alert("Senha não conferem!")
    return
  }

  const dataForm = {
    name: inputName.value,
    email: inputEmail.value,
    password: inputPassword.value,
  }

  return dataForm
}

async function submitDataApi(dataForm) {
  try {
    const res = await fetch("http://localhost:3000/userRegister", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForm),
    })
    if (res.status === 200) {
      alert("Cadastro efetuado consucesso!")

      setTimeout(() => {
        clearField()
        window.location.href = "index.html"
      }, "1000")
    } else {
      alert("Email já utilizado ou Senha incorreta!")
    }
  } catch (erro) {
    console.log(erro)
  }
}

function clearField() {
  document.querySelector("#name").value = ""
  document.querySelector("#email").value = ""
  document.querySelector("#password").value = ""
  document.querySelector("#passwordConf").value = ""
}
