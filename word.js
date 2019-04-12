var Letter = require("./letter.js");

function Word(word) {
    this.word = word;
    this.letterArray = [];

    this.letterCreate = function() {
    var words = this.word.split("");
    for (var i = 0; i < words.length; i++) {
        var inputLetter = new Letter(words[i]);
        this.letterArray.push(inputLetter);
    }
}

    this.getGuess = function (guess) {
        this.letterArray.forEach(letter => {
            letter.checkLetter(guess)
        })
    }

    this.display = function() {
        var shownWord = "";
        this.letterArray.forEach(letter => {
            shownWord += letter.getGuessedLetter() + " ";
        })
        return shownWord;
    }
}


module.exports = Word;