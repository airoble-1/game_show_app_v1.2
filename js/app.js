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
  "Minions would look really weird with contacts",
  "I still think Nicolas Cage would have made a great Superman",
  "The road to success is always under construction",
  "Education is important but big muscles are importanter",
  "The best chips are chocolate ones",
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

// Check conditions for winning or losing current game
function checkWin() {
  let show = document.querySelectorAll(".show")
  let letter = document.querySelectorAll(".letter")
  if (missed >= 5) {
    startScreen.className = "lose"
    startScreen.style.display = "flex"
    document.querySelector("#overlay h2").textContent = "You lose!"
  } else if (letter.length === show.length) {
    startScreen.className = "win"
    startScreen.style.display = "flex"
    document.querySelector("#overlay h2").textContent = "You Win!"
  }
}
