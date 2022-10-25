const winCondition = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["2", "5", "8"],
  ["1", "4", "7"],
  ["3", "6", "9"],
  ["1", "5", "9"],
  ["3", "5", "7"],
];

const modal = {
  playerData: { circle: [], cross: [] },
  gameFinished: false,
};

const controller = {
  turn: "circle",

  draw(position, symbol) {
    const target = document.querySelector(`[data-index="${position}"]`);
    target.innerHTML = `<p class=${symbol}></p>`;
  },

  recordPlay(player, index) {
    modal.playerData[player].push(index);
  },

  checkWinCon(playerPosition) {
    for (const con of winCondition) {
      if (con.every((position) => playerPosition.includes(position))) {
        return true;
      }
    }

    return false;
  },

  whoWins(player) {
    if (this.checkWinCon(modal.playerData[player])) {
      this.removeEventListener();
      modal.gameFinished = true; // one player win, stop moving
      return alert(`${player} player is win`);
    }

    if(this.emptyPosition().length === 0){
      return alert('Tied')
    }
  },

  // when game over, need to avoid player moving
  removeEventListener() {
    document
      .querySelector(".app")
      .removeEventListener("click", this.onTableClicked);
  },

  emptyPosition() {
    const occupiedPosition = modal.playerData["circle"].concat(
      modal.playerData["cross"]
    );

    return ["1", "2", "3", "4", "5", "6", "7", "8", "9"].filter((position) => {
      return !occupiedPosition.includes(position);
    });
  },

  computerMove() {
    const bestPosition = this.getBetterPosition();
    console.log(bestPosition);
    this.draw(bestPosition, "cross");
    this.recordPlay("cross", bestPosition);
    this.whoWins("cross");
    this.turn = "circle";
  },

  getBetterPosition() {
    const emptyPos = this.emptyPosition();
    for (const assumePosition of emptyPos) {
      const copiedCrossPosition = Array.from(modal.playerData["cross"]);
      const copiedCirclePosition = Array.from(modal.playerData['circle'])
      copiedCirclePosition.push(assumePosition)
      copiedCrossPosition.push(assumePosition);

      if (this.checkWinCon(copiedCrossPosition)) {
        // cross win if only one move
        return assumePosition;
      }

      if(this.checkWinCon(copiedCirclePosition)) {
        // circle win if only one move
        return assumePosition
      }
    }

    if (emptyPos.includes("5")) {
      return "5";
    }

    return emptyPos[Math.floor(Math.random() * emptyPos.length)];
  },

  onTableClicked(event) {
    if (event.target.tagName !== "TD") {
      return;
    }

    if (controller.turn === "circle") {
      controller.draw(event.target.dataset.index, "circle");
      controller.recordPlay("circle", event.target.dataset.index);
      controller.whoWins("circle"); // check win or not
      controller.turn = "cross"; // change player
    }

    if (controller.turn === "cross" && modal.gameFinished === false) {
      controller.computerMove();
    }
  },
};

document
  .querySelector(".app")
  .addEventListener("click", controller.onTableClicked);
