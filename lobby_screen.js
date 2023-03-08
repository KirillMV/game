function renderLobbyScreen() {
  const main = document.querySelector(".main");
  main.textContent = "";
  const title = document.createElement("h1");
  title.textContent = 'Лобби'
  const playersBox = document.createElement("div");
  const buttonBox = document.createElement("div");

  window.application.renderBlock("button", buttonBox, "Войти", lobbyLogick);

  function lobbyLogick() {
    fetch(`${window.backUrl}/start?token=${window.token}`)
      .then((response) => response.json())
      .then((posts) => {
        console.log(posts);
        window.gameId = posts["player-status"].game.id;
        console.log(window.gameId);
        fetch(
          `${window.backUrl}/game-status?token=${window.token}&id=${window.gameId}`
        )
          .then((response) => response.json())
          .then((posts) => {
            if (posts["game-status"].status === "waiting-for-start") {
              window.application.renderScreen("waitingScreen");
            }
            if (posts["game-status"].status === "waiting-for-your-move") {
              window.enemy = posts["game-status"].enemy.login
              window.application.renderScreen("gameScreen");
            }
          });
      });
  }

  function getPlayers() {
    fetch(`${window.backUrl}/player-list?token=${window.token}`)
      .then((response) => response.json())
      .then((posts) => {
        window.players = posts.list.map((el) => el.login);
        console.log(window.players);
        window.players.forEach((el) => {
          let p = document.createElement("p");
          p.textContent = el;
          playersBox.appendChild(p);
        });
      });
  }
  main.appendChild(title);
  main.appendChild(playersBox);
  getPlayers();
  main.appendChild(buttonBox);
}
window.application.screens["lobbyScreen"] = renderLobbyScreen;
