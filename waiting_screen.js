function renderWaitingScreen() {
  const main = document.querySelector(".main");
  main.textContent = "";
  const title = document.createElement("h1");
  title.textContent = "Ожидание противника";

  function сheckingOpponent() {
    fetch(
      `${window.backUrl}/game-status?token=${window.token}&id=${window.gameId}`
    )
      .then((response) => response.json())
      .then((posts) => {
        if (posts["game-status"].status === "waiting-for-your-move") {
          window.enemy = posts["game-status"].enemy.login
          window.application.renderScreen("gameScreen");
          clearInterval(timerStop)
        }
      });
  }

  let timerStop = setInterval(сheckingOpponent,500)

  main.appendChild(title);
}

window.application.screens["waitingScreen"] = renderWaitingScreen;
