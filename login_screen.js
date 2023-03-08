function renderLoginScreen() {
  const main = document.querySelector(".main");
  main.textContent = "";
  const title = document.createElement("h1");
  title.textContent = "Камень-Ножницы-Бумага";
  const name = document.createElement('p')
  name.textContent = 'Никнейм'
  const loginInput = document.createElement("input");
  const buttonBox = document.createElement("div");
  window.application.renderBlock("button", buttonBox, "Войти", loginLogick);

  function loginLogick() {
    if (loginInput.value) {
      fetch(`${window.backUrl}/login?login=${loginInput.value}`)
        .then((response) => response.json())
        .then((posts) => {
          window.token = posts.token;
          window.application.renderScreen("lobbyScreen");
          console.log(window.token);
        });
    }
  }
  main.appendChild(title);
 main.appendChild(name)
  main.appendChild(loginInput);
  main.appendChild(buttonBox);
}
window.application.screens["loginScreen"] = renderLoginScreen;
window.application.renderScreen("loginScreen");
