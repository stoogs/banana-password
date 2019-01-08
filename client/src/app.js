//import words from file
const everyDayWords = require('../../dictionary/everyDayWords');
const top10kWords = require('../../dictionary/top10kWords');
const top20kWords = require('../../dictionary/top20kWords');
const top30kWords = require('../../dictionary/top30kWords');


const Password = function () {
    this.wordsRequired = 4; //DEFAULT
    this.minWordLength = 6; //DEFAULT
    this.specialCharacter = "-"; //DEFAULT
    this.userWordListChoice = ''; //TODO LET USER CHOICE FROM LISTS OF WORDS
    this.wordsToCarryAround = []; //FOR FILTERING PURPOSES
    this.cleanWords = "clean";  //LIST OF ALL THE WORDS TO CHOOOSE FROM
    this.finalResult = [] //ARRAY OF FINAL WORDS
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript loaded from bundle.js to app.js');

    let generate = document.querySelector(".Logo");
    generate.addEventListener("click", function() {beginFiltering()});

    //RUN FUNCTIONS SYNCHRONOUSLY
    function beginFiltering() {
        getUserChoices();  //NUM WORDS, WORD LENGTH
        prepareWords(); //FILTER TO LENGTH, REGEX TO a-Z
        finalResult(); //MAKE AN ARRAY OF THE NICE WORDS
        displayResults(); //DISPLAY IN GRID CONTAINER RESULTS
        console.log(this.finalResult);//TODO ARRAY OF WORDS TO CLICK AND CHANGE INDIVIDUALLY

        //FUNCTIONS FROM beginFiltering function
        function getUserChoices() {
            //Get value from word-form
            let formNumWords = document.getElementById("word-form");
            console.log("You want", formNumWords.value, "words");
            this.wordsRequired = formNumWords.value;
            //Get value from word-length-form
            let formWordLength = document.getElementById("word-length-form");
            console.log("You want", formWordLength.value, "letters");
            this.minWordLength = formWordLength.value;
            console.log("function userChoices Complete");
            //SIMULATE CHOOSING WORDLIST TO USE
            this.userWordListChoice = top10kWords;
            //TODO MAKEL33T FUNCTION
            //GET DROPDOWN VALUE OF !@£$%^&*()_+
            let getSpecialCharacter = document.getElementById("special-character");
            this.specialCharacter = getSpecialCharacter.value;
            console.log("You want a special character of ", this.specialCharacter);
            }

        function prepareWords() {
            //SPLIT HUGE LIST INTO ARRAY OF WORDS
            this.wordsToCarryAround = this.userWordListChoice.split(' ');
            console.log("Total Words ", this.wordsToCarryAround.length);
            //MIN WORD LENGTH DEFINED BY USER
            this.wordsToCarryAround = createMinimumWordLengthArray(this.wordsToCarryAround, word => word.length >= this.minWordLength);
            console.log("Dirty Words ", this.wordsToCarryAround.length);
            //DO REGEXP FUNCTION STUFF & CONVERT TO LOWERCASE
            this.cleanWords = regExCleanUp(this.wordsToCarryAround);
            console.log("function prepareWords Complete")

            function createMinimumWordLengthArray(array, test) {
                let passed = [];
                for (let element of array) {
                    if (test(element)) {
                        passed.push(element);
                    }
                }
                return passed;
            }

            function regExCleanUp(words) {
                const regExFilter = new RegExp(/[^a-zA-Z ]/g);
                let arrayLength = words.length; //?
                let cleanWords = [];
                for (let i = 0; i < arrayLength; i++) {
                    if (regExFilter.test(words[i]) === false) {
                        cleanWords.push(words[i].toLowerCase())
                    }
                }
                console.log("Clean Words ", cleanWords.length)
                return cleanWords;
            }
        }

        function finalResult() {
            let result = [];
            let chosenWord = '';

            for (let i = 0; i < this.wordsRequired; i++) {
                chosenWord = this.cleanWords[Math.floor(Math.random() * cleanWords.length)];
                result.push(chosenWord)
            }
            this.finalResult = result
        }
        function displayResults() {
            let displayWords = document.querySelector(".Results");
            let passwordString = makeString(this.finalResult);

            function makeString(resultsToString) {
                let stringResult = '';

                for (let i = 0; i < resultsToString.length; i++) {
                    if (i != 0 ? stringResult += this.specialCharacter + resultsToString[i] : stringResult += resultsToString[i]);
                }
                return stringResult
            }
            displayWords.innerHTML = passwordString;
        }
    }
});

//EVERY DAY WORDS
// //Prepare Characters for Array
// let splitWords = everyDayWords.split('\n');
// //Filter words to be of a minimum determined size
// let minWordLength = 7;
// let minWordLengthArray = createMinimumWordLengthArray(splitWords, word => word.length > minWordLength);
// console.log(minWordLengthArray)
// console.log(minWordLengthArray.length)
// console.log(top10kWords.split(' '))
// console.log(top20kWords.split(' ').length)
// filter function.

