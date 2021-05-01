// Variable decleration
const qwerty = document.getElementById("qwerty")
const phrase = document.getElementById("phrase")
const startButton = document.querySelector(".btn__reset")
const startScreen = document.getElementById("overlay")
const ul = phrase.firstElementChild
const liveHeart = document.querySelector(".tries")
const ol = liveHeart.parentElement

let missed = 0

// Begin game
startButton.addEventListener("click", () => {
  startScreen.style.display = "none"
})

// Phrases to select from
const phrases = [
  "Be yourself everyone else is already taken",
  "A Few Good Men",
  "Terms of Endearment",
  "Easy Rider",
  "They may take our lives, but they'll never take our freedom",
]

// Picks a randome phrase
function getRandomPhraseAsArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex].split("")
}

const phraseArray = getRandomPhraseAsArray(phrases)

// Only letters from the phrase included in the list display
function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    const listItem = document.createElement("LI")
    listItem.textContent = arr[i]
    ul.appendChild(listItem)
    if (arr[i] !== " ") {
      listItem.className = "letter"
    }
  }
}

addPhraseToDisplay(phraseArray)

// Checking button click for same letter in list dispplay
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

/* Delegated click event listener attached to parent of on-screen keyboard */
qwerty.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const btnClicked = e.target
    btnClicked.classList.add("chosen")
    btnClicked.setAttribute("disabled", true)
    const letterFound = checkLetter(e.target)
    if (letterFound === null) {
      missed = missed + 1
      ol.firstElementChild.remove()
    }
    checkWin()
  }
})

// Check conditions for winning or losing current game display appropriate overlay
function checkWin() {
  let show = document.querySelectorAll(".show")
  let letter = document.querySelectorAll(".letter")
  if (missed >= 5) {
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
    chosenLetters[i].setAttribute("disabled", false)
  }
  const phraseArray = getRandomPhraseAsArray(phrases)
  addPhraseToDisplay(phraseArray)
}
