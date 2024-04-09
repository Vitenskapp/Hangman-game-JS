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
  const letterInput = document.getElementById("word-input");
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
    allLetters.push(letter);
    if (word.includes(letter)){
      word.map((el, index) => {
        if (el === letter) {
          win[index] = true;
          wordDisplay[index] = `<span class="letter">${letter}</span>`;
        }
      })
      return;
    }
    wrongLetters.includes(letter) ? null : wrongLetters.push(letter)
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
  
  letterInput.addEventListener("focusout", (event) => {
    event.preventDefault();
  
    if (event.target.value.length > 0){
      const letter = event.target.value;
      checkLetter(letter);
      updateWord();
      winCheck() ? resetGame() : null;
      
      event.target.value = "";
    }
    
  })
  
  