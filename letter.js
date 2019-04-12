function Letter(letter) {
    this.letter = letter;
    this.isGuessedLetter = false;
    this.getGuessedLetter = function(err) {

        if (!this.isGuessedLetter) {
            return "*";
        }

        else if (err) {
            console.log(err);
        }

        else {
            return this.letter;
        }
    }
    this.isLetter = function(guess) {
        if (guess === this.letter) {
            this.isGuessedLetter = true;
        }
    }
}

module.exports = Letter;