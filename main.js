const wordsArray = [
  //palavras aleatórias
  "banana",
  "abacaxi",
  "morango",
  "laranja",
  "uva",
  "melancia",
  "abacate",
  "pera",
  "manga",
];

let word = wordsArray[Math.floor(Math.random() * wordsArray.length)].split("");
const wordLength = word.length;
let wordDisplay = [];
let wrongLetters = [];
let allLetters = [];
let win = [];

const wordContainer = document.querySelector(".container-word");
const letterKeys = [...document.querySelectorAll(".key")];
const allLettersDisplay = document.getElementById("all-letters");
const wrongLettersDisplay = document.getElementById("wrong-letters");
const wordDisplayElement = document.getElementById("word");

//

word.map((letter) => {
  win.push(false);
  wordDisplay.push("<span class='letter'>_</span>");
  wordDisplayElement.innerHTML = wordDisplay.join(" ");
})

console.log(word)

const checkLetter = (letter) => {
  letter = letter.toLowerCase();
  !allLetters.includes(letter) ? allLetters.push(letter) : null;
  if (word.includes(letter)){
    word.map((el, index) => {
      if (el === letter) {
        win[index] = true;
        wordDisplay[index] = `<span class="letter">${letter}</span>`;
      }
    })
  } else {
    !wrongLetters.includes(letter) ? wrongLetters.push(letter) : null;
  }
  return;
}

const updateWord = () => {
  wordDisplayElement.innerHTML = wordDisplay.join(" ");
  allLettersDisplay.innerHTML = allLetters.join(", ");
  wrongLettersDisplay.innerHTML = wrongLetters.join(", ");
}

const winCheck = () => {
  if (win.includes(false)) {
    return false;
  }
  wordContainer.classList.add("win");
  resetGame();
  return true;
}

const resetGame = () => {
  setTimeout(() => {
    word = wordsArray[Math.floor(Math.random() * wordsArray.length)].split("");
  wordDisplay = [];
  wrongLetters = [];
  allLetters = [];
  win = [];
  wordContainer.classList.remove("win");
  word.map((letter, index) => {
    win.push(false);
    wordDisplay.push("<span class='letter'>_</span>");
    updateWord();
  })
  }, 2000)
}

const keyBoardEvents = (evt) => {
  
  letterKeys.map((key) => {
    key.addEventListener("click", (evt) => {

      if(word.includes(evt.target.innerText.toLowerCase())){
        evt.target.classList.add("correctKey");
        setTimeout( () => {
          evt.target.classList.remove("correctKey");
        }, 1000);
      } else {
        evt.target.classList.add("wrongKey");
        setTimeout( () => {
          evt.target.classList.remove("wrongKey");
        }, 1000);
      }
        
      checkLetter(key.innerHTML);
      updateWord();
      winCheck() ? resetGame() : null;
    })
  })
}

keyBoardEvents();


