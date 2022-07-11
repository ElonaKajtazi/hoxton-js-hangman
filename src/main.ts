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
};
let state: State = {
  word: "start",
  characters: [],
  maxMistakes: 3,
};
// const MAX_MISTAKES = 6;

// Q: How do you get a random word?
// function getRandomWord(): string {
//   const words = [
//     "apple",
//     "banana",
//     "orange",
//     "coconut",
//     "strawberry",
//     "lime",
//     "grapefruit",
//     "watermelon",
//     "blueberry",
//     "blackberry",
//     "raspberry",
//   ];
//   const randomIndex = Math.floor(Math.random() * words.length);
//   return words[randomIndex];
// }

//Q: What's the word we're guseeing? state.word✅

//Q: What letters has the user guessed? state.characters✅

//Q: How many attempts do they have? MAX_MISTAKES✅
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
  let correctGuesses = state.characters.filter((char) =>
    state.word.includes(char)
  );
  return correctGuesses;
}
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
function render() {
  let appEl = document.querySelector("#app");
  if (appEl === null) return;
  appEl.textContent = "";

  let wordDiv = document.createElement("div");
  wordDiv.textContent = state.word;
  let mistakesDivEl = document.createElement("div");
  mistakesDivEl.className = "mistakes";
  mistakesDivEl.textContent = `Wrong guesses: ${getMistakes()} (${getMistakeCount()})`;

  let correctGuessesDivEl = document.createElement("div");
  correctGuessesDivEl.className = "correctGuesses";
  correctGuessesDivEl.textContent = `Correct guesses: ${getCorrectGuesses()} (${getCorrectGuessesCount()})`;

  appEl.append(wordDiv, mistakesDivEl, correctGuessesDivEl);
}

listenToUserKeyPresses();
render();
window.state = state;
window.checkifUserLost = checkIfUserLost;
