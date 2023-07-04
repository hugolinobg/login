const btn = document.querySelector("#logIn")

btn.addEventListener("click", () => {
  //capturar dados do formulário
  const data = getFormCredentials()
  //enviar os dados para api
  submitDataApi(data)
})

function getFormCredentials() {
  const inputEmail = document.querySelector("#email")
  const inputPassword = document.querySelector("#password")

  if (inputEmail.value === "" || inputPassword.value === "") {
    alert("Preencha todos os campos!")
    return
  }

  const dataFormLogin = {
    email: inputEmail.value,
    password: inputPassword.value,
  }

  return dataFormLogin
}

async function submitDataApi(dataFormLogin) {
  try {
    const res = await fetch("http://localhost:3000/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataFormLogin),
    })
    if (res.status === 200) {
      clearField()
      window.location.href = "./user/"
    } else {
      alert("Email ou Senha incorreta!")
    }
  } catch (erro) {
    console.log(erro)
  }
}

function clearField() {
  document.querySelector("#email").value = ""
  document.querySelector("#password").value = ""
}
