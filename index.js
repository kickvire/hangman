const wordE1 = document.getElementById("word");
const wrongLettersE1 = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById(
  "final-message-reveal-word"
);

const figureParts = document.querySelectorAll(".figure-part");
//  Array of words for game
const words = ["application", "programming", "interface", "wizard"];
//  Select word at  random
let selectedWord = words[Math.floor(Math.random() * words.length)];
//  To start the Game
let playable = true;
//  Conatins the Correct letter in a sequence order for to display notification that
//     is already pressed
const correctLetters = [];
//  Conatins the Wrong letter in a sequence order for to display notification that
//     is already pressed
const wrongLetters = [];

// this function for show notification if key is already pressed
//   and setTimeout for only 2 sec it will show
function showNotification() {
  notification.classList.add("show");

  setTimeout(function () {
    notification.classList.remove("show");
  }, 2000);
}
function updatewrongLetterEl() {
  wrongLettersE1.innerHTML = `${
    wrongLetters.length > 0 ? `<p>Wrong Letters</p>` : ""
  }
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerHTML = "unfortunately you lost!😥";
    popup.style.display = "flex";
  }
}
// use template for html
function displayWord() {
  wordE1.innerHTML = `
   ${selectedWord
     .split("") //split letter of selected word
     .map(
       (
         letter //mapping with index of  selected word letter which is pressed by keyboard
       ) => {
         return `<span class="letter">
     ${correctLetters.includes(letter) ? letter : ""}
     </span>`;
       }
     )
     .join("")}
  `;

  const innerWord = wordE1.innerText.replace(/[\n]/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulation ! you Won! 🤩";
    popup.style.display = "flex";
    playable = false;
  }
}

// add event Listener for key press
window.addEventListener("keydown", (e) => {
  if (playable) {
    // if playable true means Game is start
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      //e.Keycode give ascii value
      const letter = e.key.toLowerCase(); //e.key means event.key gives key pressed value
      if (selectedWord.includes(letter)) {
        //Check letter present in selected word
        if (!correctLetters.includes(letter)) {
          // if present in selected and it is first time then push
          correctLetters.push(letter);
          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
          updatewrongLetterEl();
        } else {
          showNotification();
        }
      }
    }
  }
});
playAgainBtn.addEventListener("click", function () {
  playable = true;
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updatewrongLetterEl();
  popup.style.display = "none";
});
displayWord();
