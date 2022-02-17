const X_CLASS = "cross";
const CIRCLE_CLASS = "circle";
const winingCombos = [
  // Horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagnal
  [0, 4, 8],
  [6, 4, 6],
];
const gameCards = document.querySelectorAll(".game-card");
const alertContent = document.querySelector(".alert-content");
const alert = document.querySelector(".alert");
const restartBtn = document.querySelector(".restart-btn");
const playerOne = document.querySelector(".player-one");
const playerTwo = document.querySelector(".player-two");

let circleTurn;

class UI {
  static placeMarker(card, currentClass) {
    card.classList.add(currentClass);
  }

  static turnIndicator(classApplied) {
    if (classApplied === "circle") {
      playerOne.classList.remove("current");
      playerTwo.classList.add("current");
    } else if (classApplied === "cross") {
      playerTwo.classList.remove("current");
      playerOne.classList.add("current");
    }
  }

  static resetBoard(card) {
    card.classList.remove(X_CLASS);
    card.classList.remove(CIRCLE_CLASS);
    card.removeEventListener("click", GameLogic.handleClick);
    alert.classList.remove("show");
  }

  static endGame() {
    if (GameLogic.checkIfDraw()) {
      alertContent.innerText = "Draw!";
    } else {
      alertContent.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    }
    alert.classList.add("show");
  }

  //update Score

  //update round
}

class GameLogic {
  static startGame() {
    circleTurn = false;
    GameLogic.getCurrentTurn();
    gameCards.forEach((card) => {
      UI.resetBoard(card);
      card.addEventListener("click", GameLogic.handleClick, { once: true });
    });
  }

  static handleClick(e) {
    const card = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    UI.placeMarker(card, currentClass);
    if (GameLogic.checkWin(currentClass)) {
      UI.endGame();
    } else if (GameLogic.checkIfDraw()) {
      UI.endGame();
    } else {
      //switch turns
      GameLogic.nextTurn();
      GameLogic.getCurrentTurn();
    }
  }




  static getCurrentTurn() {
    if (circleTurn) {
      UI.turnIndicator(CIRCLE_CLASS);
    } else {
      UI.turnIndicator(X_CLASS);
    }
  }

  static checkWin(currentClass) {
    // check winning combinations to see if current combinations match
    return winingCombos.some((combination) => {
      return combination.every((index) => {
        return gameCards[index].classList.contains(currentClass);
      });
    });
  }

  static checkIfDraw() {
    return [...gameCards].every((card) => {
      return (
        card.classList.contains(X_CLASS) ||
        card.classList.contains(CIRCLE_CLASS)
      );
    });
  }

  static nextTurn() {
    circleTurn = !circleTurn;
  }
}
GameLogic.startGame();
restartBtn.addEventListener("click", GameLogic.startGame);
