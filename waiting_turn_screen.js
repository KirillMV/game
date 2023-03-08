function renderTurnWaitingScreen() {
    const main = document.querySelector(".main");
    main.textContent = "";
    const title = document.createElement("h1");
    title.textContent = "Ожидание хода противника";
  
    function сheckingOpponent() {
      fetch(
        `${window.backUrl}/game-status?token=${window.token}&id=${window.gameId}`
      )
        .then((response) => response.json())
        .then((posts) => {
            console.log(posts);
          if (posts["game-status"].status === "waiting-for-your-move") {
            console.log('--->gameScreen');
            window.application.renderScreen("gameScreen");
            clearInterval(timerStop)
          }
          if (posts["game-status"].status === "win") {
            window.application.renderScreen("winScreen");
            clearInterval(timerStop)
          }
          if (posts["game-status"].status === "lose") {
            window.application.renderScreen("loseScreen");
            clearInterval(timerStop)
          }
        });
    }
  
    let timerStop = setInterval(сheckingOpponent,500)
  
    main.appendChild(title);
  }
  
  window.application.screens["waitingTurnScreen"] = renderTurnWaitingScreen;