import "./style.css";

// The essence of Hangman AKA "Guess the word":
// Enter characters
// See which characters they guessed
// See which characters they got wrong
// Be told when they guessed the word
// Be told when they lose the game

// Q: How do you get a random word?

let state = {
  word: "Welcome",
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
  return true;
}

// Q: Has the user lost?
function checkIfUserLost(): boolean {
  // is the user out of attempts?
  return true;
}
function render() {
  let appEl = document.querySelector("#app");
  if (appEl === null) return;
  let mistakesSpan = document.createElement("span");
  mistakesSpan.textContent = `Mistakes: ${getMistakes()} (${getMistakeCount()})`;

  appEl.append(mistakesSpan);
}
render();
window.state = state;
window.getMistakeCount = getMistakeCount;
window.getMistakes = getMistakes;
window.getCorrectGuesses = getCorrectGuesses;
window.getCorrectGuessesCount = getCorrectGuessesCount;
