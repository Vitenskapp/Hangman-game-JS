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
let life = 6;
let wordDisplay = [];
let wrongLetters = [];
let allLetters = [];
let win = [];

const wordContainer = document.querySelector(".container-word");
const letterKeys = [...document.querySelectorAll(".key")];
const allLettersDisplay = document.getElementById("all-letters");
const wrongLettersDisplay = document.getElementById("wrong-letters");
const wordDisplayElement = document.getElementById("word");
const lifeBars = [...document.querySelectorAll(".life-bar-inner")];

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
    life--;
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
  letterKeys.map((key) => {
    key.disabled = true;
  })
  setTimeout(() => {
    word = wordsArray[Math.floor(Math.random() * wordsArray.length)].split("");
  wordDisplay = [];
  wrongLetters = [];
  allLetters = [];
  win = [];
  life = 6;
  handleLifeBar()
  wordContainer.classList.remove("win");
wordContainer.classList.remove("lose");
  word.map((letter, index) => {
    win.push(false);
    wordDisplay.push("<span class='letter'>_</span>");
    updateWord();
  })
  letterKeys.forEach((key) => {
    key.disabled = false;
  })
  }, 2000)
}

const handleLifeBar = () => {
  lifeBars.forEach((el) => {
    el.classList.remove("life-bar-active")
  })
  for(let i = 0; i < life; i++) {
    lifeBars[i].classList.add("life-bar-active")
  }

  if(life <= 0){
    wordContainer.classList.add("lose");
    resetGame();
  }
}

const keyBoardEvents = (evt) => {
  
  letterKeys.map((key) => {
    key.addEventListener("click", (evt) => {

      if(word.includes(evt.target.innerText.toLowerCase())){
        evt.target.disabled = true;
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
      handleLifeBar();
      winCheck() ? resetGame() : null;
    })
  })
}

handleLifeBar();
keyBoardEvents();


