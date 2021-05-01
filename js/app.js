// DOM selectors
const qwerty = document.getElementById("qwerty")
const phrase = document.getElementById("phrase")
const startButton = document.querySelector(".btn__reset")
const startScreen = document.getElementById("overlay")
const ul = phrase.firstElementChild

// In-game variable(s)
let missed = 0

// Begin game
startButton.addEventListener("click", () => {
  startScreen.style.display = "none"
})

// Phrases to select
const phrases = [
  "Mortal Kombat",
  "Jurassic Park",
  "Nobody",
  "Watchmen",
  "Justice League",
]

// Pick a random phrase from array
function getRandomPhraseAsArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex].split("")
}

const phraseArray = getRandomPhraseAsArray(phrases)

// Only letters and spaces included in display
function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    const listItem = document.createElement("LI")
    listItem.textContent = arr[i]
    ul.appendChild(listItem)
    if (arr[i] !== " ") {
      listItem.className = "letter"
    } else {
      listItem.className = "space"
    }
  }
}

addPhraseToDisplay(phraseArray)

// Checking button click for same letter in dispplay
function checkLetter(btn) {
  const letters = document.getElementsByClassName("letter")
  let letterFound = null
  for (let i = 0; i < letters.length; i++) {
    if (
      btn.textContent.toLowerCase() === letters[i].textContent.toLowerCase()
    ) {
      letters[i].classList.add("show")
      letterFound = letters[i].textContent.toLowerCase()
    }
  }
  return letterFound
}

// Delegated click event listener attached to parent of on-screen keyboard
qwerty.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const btnClicked = e.target
    btnClicked.classList.add("chosen")
    btnClicked.setAttribute("disabled", true)
    const letterFound = checkLetter(e.target)
    if (letterFound === null) {
      missed = missed + 1
      document.querySelectorAll(".tries img")[missed - 1].src =
        "images/lostHeart.png"
    }
    checkWin()
  }
})

// Check condition for winning or losing current game display appropriate overlay
function checkWin() {
  let show = document.querySelectorAll(".show")
  let letter = document.querySelectorAll(".letter")
  if (missed > 4) {
    startScreen.className = "lose"
    startScreen.style.display = "flex"
    document.querySelector("#overlay h2").textContent = "You lose!"
    reset()
  } else if (letter.length === show.length) {
    startScreen.className = "win"
    startScreen.style.display = "flex"
    document.querySelector("#overlay h2").textContent = "You Win!"
    reset()
  }
}

// Reset game
function reset() {
  startButton.textContent = "Try Again?"
  missed = 0
  ul.textContent = ""
  const chosenLetters = document.querySelectorAll(".chosen")
  for (let i = 0; i < chosenLetters.length; i++) {
    chosenLetters[i].classList.remove("chosen")
    chosenLetters[i].disabled = false
  }
  const phraseArray = getRandomPhraseAsArray(phrases)
  addPhraseToDisplay(phraseArray)
  let liveHearts = document.querySelectorAll(".tries img")
  for (let i = 0; i < liveHearts.length; i++) {
    liveHearts[i].src = "images/liveHeart.png"
  }
}
