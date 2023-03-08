function renderGameScreen() {
  const main = document.querySelector(".main");
  main.textContent = "";
  const title = document.createElement("h1");
  title.textContent = "Игра";
  const enemy = document.createElement("p");
  enemy.textContent = `Вы против ${window.enemy}`;

  const subTitle = document.createElement("h3");
  subTitle.textContent ='';
  if (window.tie){
    subTitle.textContent = "Ничья";
    window.tie = false
  }
  const buttonBox = document.createElement("div");
  window.application.renderBlock("button", buttonBox, "Rock", gameLogick);
  window.application.renderBlock("button", buttonBox, "Paper", gameLogick);
  window.application.renderBlock("button", buttonBox, "Scissors", gameLogick);

  function gameLogick(e) {
    const move = e.target.textContent.toLowerCase();
    console.log(e.target.textContent.toLowerCase());
    fetch(
      `${window.backUrl}/play?token=${window.token}&id=${window.gameId}&move=${move}`
    )
      .then((response) => response.json())
      .then((posts) => {
        console.log(posts);
        if (posts["game-status"].status === "waiting-for-enemy-move") {
          window.application.renderScreen("waitingTurnScreen");
        }
        if (posts["game-status"].status === "waiting-for-your-move") {
          window.tie = true;
          window.application.renderScreen("gameScreen");
        }
        if (posts["game-status"].status === "lose") {
          window.application.renderScreen("loseScreen");
        }
        if (posts["game-status"].status === "win") {
          window.application.renderScreen("winScreen");
        }
      });

    // fetch(
    //   `${window.backUrl}/game-status?token=${window.token}&id=${window.gameId}`
    // )
    //   .then((response) => response.json())
    //   .then((posts) => {
    //     // console.log(posts);
    //     console.log(posts["game-status"].status);
    //   });
  }main.appendChild(title)
  main.appendChild(enemy)
  main.appendChild(subTitle)
  main.appendChild(buttonBox);
}

window.application.screens["gameScreen"] = renderGameScreen;
