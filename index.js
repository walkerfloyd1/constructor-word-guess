var inquirer = require('inquirer');
var Word = require('./word.js');

var wordList = ["JSON", "HTML", "Javascript", "CSS", "Node", "jQuery"];

var guessNum;

var wordsChosen;

var word;

var chosenWord;

function gameReady() {
    wordsChosen = [];
    startGame();
}

function startGame() {
    console.log("You have started the game!")
    guessNum = 20;
    chosenWord = "";
    if (wordsChosen.length < wordList.length) {
        chosenWord = getNewWord();
        console.log("Generating new word");
    } else {
        endGame();
        console.log("Aww, you lost!");
    }
    if (chosenWord) {
        word = new Word(chosenWord);
        word.letterCreate();
        getGuess();
    }
}
function getNewWord () {
    var i = Math.floor(Math.random() * wordList.length);
    var iWord = wordList[i];
        if (wordsChosen.indexOf(iWord) === -1) {
            wordsChosen.push(iWord);
            return iWord;
        }
        else {
            return getNewWord();
        }
    }

function getGuess() {
    var checkArr = [];
    inquirer.prompt([{
        type: "input",
        name: "letterInput",
        message: word.display() + "Guesses: " + guessNum,
    }]).then(function (data, err)  {
        if (err) {
            console.log(err)
        }
        var letters = word.letterArray;
        letters.forEach(letter => {
            letter.isLetter(data.letterInput);
            checkArr.push(letter.getGuessedLetter());
        });
    if (checkArr.indexOf("*") >= 0) {
        guessNum--;
        if (guessNum === 0) {
            endGame();
        }
        else {
            getGuess();
        }
    } else {
        console.log(word.display());
        endGame();
    }
    });
}


function endGame() {
    console.log("You have completed the game!");
    inquirer.prompt([{
        type: "list",
        name: "endGame",
        choices: ["Yes", "No"],
        message: "You have finished the game. Would you like to restart?",
    }]).then(function(user) {
        if (user.endGame === "Yes") {
            guessNum = 20;
            word = " ";
            wordsChosen = [];
            startGame();
        }
        else {
            console.log("Goodbye!")
        }
    })
}
gameReady();