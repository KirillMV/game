function renderWinScreen() {
    const main = document.querySelector(".main");
    main.textContent = "";
    const title = document.createElement("h1");
    title.textContent = "Вы победили";
    const buttonBox = document.createElement('div')
  
    window.application.renderBlock("button", buttonBox, "В Лобби", ()=>{window.application.renderScreen("lobbyScreen")});
    window.application.renderBlock("button", buttonBox, "Начать с начала", lobbyLogick);
    
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

   
    main.appendChild(title);
    main.appendChild(buttonBox)

  }
  
  window.application.screens["winScreen"] = renderWinScreen;