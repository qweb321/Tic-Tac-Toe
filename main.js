let turn = "circle";
const playerData = {
  circle: [],
  cross: [],
};

const winCondition = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [2, 5, 8],
  [1, 4, 7],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function draw(target, symbol) {
  target.innerHTML = `<p class=${symbol}></p>`;
}

function recordPlay(player, index) {
  playerData[player].push(index);
}

function checkWinCon(playerPosition) {
  for (const con of winCondition) {
    if (con.every((position) => playerPosition.includes(position))) {
      return true;
    }
  }

  return false;
}

function whoWins(player) {
  if (checkWinCon(playerData[player])) {
    removeEventListener();
    return alert(`${player} player is win`);
  }
}

function removeEventListener() {
  document.querySelector(".app").removeEventListener("click", onTableClicked);
}

function onTableClicked(event) {
  if (event.target.tagName === "TD") {
    if (turn === "circle") {
      draw(event.target, "circle");
      recordPlay("circle", Number(event.target.dataset.index));
      whoWins("circle");
      turn = "cross";
    } else if (turn === "cross") {
      draw(event.target, "cross");
      recordPlay("cross", Number(event.target.dataset.index));
      whoWins("cross");
      turn = "circle";
    }
  } else {
    return alert("This postion already has content!");
  }
}

document.querySelector(".app").addEventListener("click", onTableClicked);
