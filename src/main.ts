import "./style.css";

// The essence of Hangman AKA "Guess the word":
// Enter characters
// See which characters they guessed
// See which characters they got wrong
// Be told when they guessed the word
// Be told when they lose the game
type State = {
  word: string;
  characters: string[];
  maxMistakes: number;
  streak: number;
};

const WORDS = [
  "javascript",
  "typescript",
  "react",
  "chair",
  "table",
  "pen",
  "book",
  "mouse",
  "keyboard",
  "monitor",
  "laptop",
  "cellphone",
  "headphones",
  "camera",
  "speaker",
  "microphone",
  "apple",
  "microsoft",
  "google",
  "amazon",
  "facebook",
  "potato",
  "tomato",
  "banana",
  "orange",
  "pear",
  "grape",
  "strawberry",
  "call",
  "text",
  "email",
  "sms",
  "message",
  "map",
  "navigation",
  "location",
  "address",
  "place",
  "placeholder",
  "search",
];

// Q: How do you get a random word?
function getRandomWord() {
  let randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex];
}
let state: State = {
  word: getRandomWord(),
  characters: [],
  maxMistakes: 5,
  streak: 0,
};

//Q: What's the word we're guseeing? state.word✅

//Q: What letters has the user guessed? state.characters✅

//Q: How many attempts do they have? MAX_MISTAKES✅
//Note: Don't allow the user to enter the same letters more than once

//Q:How many mistakes has the user made so far? ✅
function getMistakes() {
  let mistakes = state.characters.filter((char) => !state.word.includes(char));
  return mistakes;
}

//Count the letters in state.guessedLetters that ARE NOT in state.word ✅
function getMistakeCount() {
  let mistakes = getMistakes();
  return mistakes.length;
}

// Q: How many correct guesses has the user made so far? ✅
function getCorrectGuesses() {
  let correctGuesses = state.characters.filter((char) =>
    state.word.includes(char)
  );
  return correctGuesses;
}
// Count the letters in state.guessedLetters that ARE in state.word ✅
function getCorrectGuessesCount() {
  let correctGuesses = getCorrectGuesses();
  return correctGuesses.length;
}

// Q: Has the user won? ✅
function checkIfUserWon() {
  // are all the letters in state.word in state.characters?
  for (let char of state.word) {
    if (!state.characters.includes(char)) return false;
  }

  // We know that every single letter in the word is in the characters array
  return true;

  // approach 2: using array.every
  // state.word.split("").every((char) => state.characters.includes(char));
}

// Q: Has the user lost? ✅
function checkIfUserLost() {
  return getMistakeCount() >= state.maxMistakes;
}

function restartGame() {
  state.word = getRandomWord();
  state.characters = [];
  render();
}

function listenToUserKeyPresses() {
  document.addEventListener("keyup", function (event) {
    let guess = event.key.toLowerCase();
    let letters = "abcdefghijklmnopqrstuvwxyz";

    //GUARD STATEMENTS
    //1. No sppecial characters should be allowed onluy letters a-z
    if (!letters.includes(guess)) return;
    //2. No duplicate letters should be allowed
    if (state.characters.includes(guess)) return;
    //3. If the user lost, don't allow them to guess anymore
    if (checkIfUserLost()) return;
    //4. If the user won, don't allow them to guess anymore
    if (checkIfUserWon()) return;

    // This only happens if all the guard statements are FALSE
    state.characters.push(guess);
    render();
  });
}

function renderWord() {
  let wordDiv = document.createElement("div");
  wordDiv.className = "word";

  let correctGuesses = getCorrectGuesses();
  for (let char of state.word) {
    let charEl = document.createElement("span");
    charEl.className = "char";
    if (correctGuesses.includes(char)) {
      charEl.textContent = char;
    } else {
      charEl.textContent = "_";
    }
    wordDiv.append(charEl);
  }
  return wordDiv;
}

function renderMistakes() {
  let mistakesDivEl = document.createElement("div");
  mistakesDivEl.className = "mistakes";
  mistakesDivEl.textContent = `Wrong guesses: ${getMistakes()} (${getMistakeCount()})
  `;
  if (getMistakeCount()===state.maxMistakes - 4) {
    mistakesDivEl.className = "mistakes-warning";
  }
  if (getMistakeCount()===state.maxMistakes - 3) {
    mistakesDivEl.className = "more-mistakes-warning";
  }
  if (getMistakeCount()===state.maxMistakes - 2) {
    mistakesDivEl.className = "mistakes-danger";
  }
  if (getMistakeCount()===state.maxMistakes - 1) {
    mistakesDivEl.className = "almost-lost";
  }
  if (getMistakeCount()===state.maxMistakes) {
    mistakesDivEl.className = "lost";
  }

  return mistakesDivEl;
}
function renderLosingMessage() {
  let lostMessageDiv = document.createElement("div");
  let lostMessageP = document.createElement("p");
  lostMessageP.textContent = `You lose! ☹️ The word was ${state.word}`;

  let restartButton = document.createElement("button");
  restartButton.className = "restart-button";
  restartButton.textContent = "RESTART";
  restartButton.addEventListener("click", function () {
    state.streak = 0;
    restartGame();
  });

  lostMessageDiv.append(lostMessageP, restartButton);
  return lostMessageDiv;
}
function renderWinningMessage() {
  let wonMessageDiv = document.createElement("div");
  let wonMessageP = document.createElement("p");
  wonMessageP.textContent = "You win! 🎉";

  let restartButton = document.createElement("button");
  restartButton.className = "restart-button";
  restartButton.textContent = "RESTART";
  restartButton.addEventListener("click", function () {
    state.streak++
    restartGame();
  });

  wonMessageDiv.append(wonMessageP, restartButton);
  return wonMessageDiv;
}
function renderStreak() {
  let streakDiv = document.createElement("div");
  streakDiv.className = "streak";
  streakDiv.textContent = `Streak: ${state.streak}`;
  return streakDiv;
}
function render() {
  let appEl = document.querySelector("#app");
  if (appEl === null) return;
  appEl.textContent = "";

  let wordDiv = renderWord();
  let mistakesDivEl = renderMistakes();
  let streakDiv = renderStreak();
  appEl.append(wordDiv, mistakesDivEl, streakDiv);

  if (checkIfUserLost()) {
    let lostMessageDiv = renderLosingMessage();
    appEl.append(lostMessageDiv);
  }
  if (checkIfUserWon()) {
    let wonMessageDiv = renderWinningMessage();
    appEl.append(wonMessageDiv);
  }
}

listenToUserKeyPresses();
render();
