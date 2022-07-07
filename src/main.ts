import "./style.css";

// The essence of Hangman AKA "Guess the word":
// Enter characters
// See which characters they guessed
// See which characters they got wrong
// Be told when they guessed the word
// Be told when they lose the game

// Q: How do you get a random word?
function getRandomWord(): string {
  const words = ["apple", "banana", "orange", "coconut", "strawberry", "lime", "grapefruit", "watermelon", "blueberry", "blackberry", "raspberry"];
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

let state = {
  word: "start",
  characters: [`e`, `d`, `f`, `g`, `z`],
  maxMistakes: 6,
};
//Q: What's the word we're guseeing? state.word✅

//Q: What letters has the user guessed? state.characters✅

//Q: How many attempts do they have? state.maxMistakes ✅
//Note: Don't allow the user to enter the same letters more than once

//Q:How many mistakes has the user made so far? ✅
//Count the letters in state.guessedLetters that ARE NOT in state.word
function getMistakes() {
  let mistakes = state.characters.filter((char) => !state.word.includes(char));
  return mistakes;
}

function getMistakeCount() {
  let mistakes = getMistakes();
  return mistakes.length;
}
// Q: How many correct guesses has the user made so far?
// Count the letters in state.guessedLetters that ARE in state.word
function getCorrectGuesses() {
  let correctGuesses = state.characters.filter((char) => state.word.includes(char));
  return correctGuesses;
}
function getCorrectGuessesCount() {
  let correctGuesses = getCorrectGuesses();
  return correctGuesses.length;
}
// Q: Has the user won?
function checkIfUserWon(): boolean {
  // are all the letters in state.word in state.guessedLetters?
  if (getCorrectGuessesCount() === state.word.length) {
    return true; // user won

  } else {
    return false; // user lost
  }
}

// Q: Has the user lost?
function checkIfUserLost(): boolean {
  // is the user out of attempts?
  return true;
}

function render() {
  let appEl = document.querySelector("#app");
  if (appEl === null) return;
  let mistakesH3El = document.createElement("h3");
  mistakesH3El.className = "mistakes";
  mistakesH3El.textContent = `Wrong guesses: ${getMistakes()} (${getMistakeCount()})`;
  
  let correctGuessesH3El1 = document.createElement("h3");
  correctGuessesH3El1.className = "correctGuesses";
  correctGuessesH3El1.textContent = `Correct guesses: ${getCorrectGuesses()} (${getCorrectGuessesCount()})`;

  appEl.append(mistakesH3El, correctGuessesH3El1);
}
render();
window.state = state;
window.getMistakeCount = getMistakeCount;
window.getMistakes = getMistakes;
window.getCorrectGuesses = getCorrectGuesses;
window.getCorrectGuessesCount = getCorrectGuessesCount;
window.getRandomWord = getRandomWord;
