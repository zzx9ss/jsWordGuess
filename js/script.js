// Testing Connection
console.log("Conectec 😊");

// ======= Number Guess ==========
console.log("====== Word Guess ======");

// Selectors
const inputs = document.querySelector(".inputs");
const resetBtn = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint span");
const guessLeft = document.querySelector(".guess-left span");
const typingInput = document.querySelector(".typing-input");
const wrongLetter = document.querySelector(".wrong-letter span");
const easyLvl = document.querySelector("#easy-lvl");
const mediumLvl = document.querySelector("#medium-lvl");
const hardLvl = document.querySelector("#hard-lvl");
const checkMessage = document.querySelector("#check-Message");


// GLOBAL VARIABLES
let wordVar
let maxGuesses=0;
let correctLetters = [];    // Array to capture the Incorrect Letters from the user guessing
let incorrectLetters = [];    // Array to capture the Incorrect Letters from the user guessing


function randomWord() {
    // Initiallyzing Variables
    maxGuesses = 10
    easyLvl.style.color = "red";
    mediumLvl.style.color = "black";
    hardLvl.style.color = "black";

    correctLetters = []; 
    incorrectLetters = [];

    checkMessage.style.padding = "0";
    checkMessage.innerText = "";

    // Using MATH Fuction to get a radom oject from WordList
    let ranWord = wordList[Math.floor(Math.random() * wordList.length)];
    // console.log(ranWord);  // checking the random word
    // Creating variable to assign random WORD and HINT
    wordVar = ranWord.word;
    let hintVar = ranWord.hint;
    console.log(wordVar);  // checking the word
    console.log(hintVar);  // checking the hint

    // Setting up the HINT, REMAINING GUESSES, WRONG LETTER SPAN texts
    hint.innerHTML = hintVar;
    guessLeft.innerText = maxGuesses; 
    wrongLetter.innerText = incorrectLetters;

    // Creating Imput Tags according to the Word Length
    let html = "";
    for (i = 0; i < wordVar.length; i++) {
        html += `<input type="text" disabled>`
    }
    inputs.innerHTML = html;
}

randomWord();

// Checking IF the user gets the CORRECT WORD
function checkWinner() {
    // IF user GUESSED the CORRECT WORD
    if (correctLetters.length === wordVar.length) {
        //alert(`CONGRATULATION !!!    ${wordVar.toUpperCase()} is the CORRECT WORD !`);
        checkMessage.style.padding = "20px 25px";
        checkMessage.innerText = `CONGRATULATION !!!    ${wordVar.toUpperCase()} is the CORRECT WORD !`;
    } else {
        // IF user do not have more GUESSES 
        if (maxGuesses < 1) {
            // alert("GAME OVER !!!  -  You don't have remaining GUESSES !");
            checkMessage.style.padding = "20px 25px";
            checkMessage.innerText = "GAME OVER !!!  -  You don't have remaining GUESSES !";
            // Displaying the COMPLETE WORD
            for (let i = 0; i < wordVar.length; i++) {
                inputs.querySelectorAll("input")[i].value = wordVar[i];
            }
        }
    }
}


// Initialize Function
function initGame(e){
    // Capturing the KEY that was typed by the user
    let key = e.target.value;

    // Using REGEX to only capture LETTERS  --  /^[A-Za-z]
    // Using array.includes() to avoid user enter the CORRECT and WRONG letters twice
    if (key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        console.log(key);
        // Checking if user letter is in the WORD GUESS (wordVar string)
        if (wordVar.includes(key)) {
            console.log("letter found");
            // FOR LOOP to show the letter matched in the correct position in the INPUT FIELD 
            for (let i = 0; i < wordVar.length; i++) {
                if (wordVar[i] === key) {
                    correctLetters.push(key);
                    // It is needed to access the inputs that was created by the script, that is the reason to call the selector again
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            console.log("letter NOT found");
            maxGuesses--;   // decrementing GUESSES when it is wrong
            // Using array.push() to add the INCORRECT LETTERS in the array
            incorrectLetters.push(` ${key}`);   // TEMPLATE LITERAL to store with space and ,
            console.log(incorrectLetters);
        }
        // Updating guessLeft
        guessLeft.innerText = maxGuesses; 
        // Displaying the Incorrect Letters
        wrongLetter.innerText = incorrectLetters;
    }
    
    // Let's empty the INPUT Field once the user entered any key
    typingInput.value = "";

    // Check if the user WIN the game
    checkWinner();
}


// Event listener
resetBtn.addEventListener("click", randomWord);

// Using Input to Initialize the Game as son the user type any key
typingInput.addEventListener("input", initGame);

// Automatically focusing input when user press any key
document.addEventListener("keydown", () => typingInput.focus());

// Controlling LEVELs
easyLvl.addEventListener("click", () => {
    easyLvl.style.color = "red";
    mediumLvl.style.color = "black";
    hardLvl.style.color = "black";
    maxGuesses=10;
    guessLeft.innerText = maxGuesses;
});

mediumLvl.addEventListener("click", function(event) {   
    easyLvl.style.color = "black";
    mediumLvl.style.color = "red";
    hardLvl.style.color = "black";
    maxGuesses=7;
    guessLeft.innerText = maxGuesses;
});

hardLvl.addEventListener("click", function(event) {   
    easyLvl.style.color = "black";
    mediumLvl.style.color = "black";
    hardLvl.style.color = "red";
    maxGuesses=3;
    guessLeft.innerText = maxGuesses;
});