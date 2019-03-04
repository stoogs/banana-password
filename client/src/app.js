//import words from file
const top1kWords = require('../../dictionary/top1kWords');
const top10kWords = require('../../dictionary/top10kWords');
const top20kWords = require('../../dictionary/top20kWords');
const top30kWords = require('../../dictionary/top30kWords');
//import password tester library
const taiPasswordStrength = require("tai-password-strength");

const Password = function () {
//ALL USER SELECTED VARIABLES INITIALIZED AS DEFAULT HERE
    this.wordsRequired = 4; //DEFAULT
    this.minWordLength = 6; //DEFAULT
    this.specialCharacter = "-"; //DEFAULT
    this.l33t = "false"; //DEFAULT
    this.userWordsChosen = "1k"; // DEFAULT,  LET USER CHOICE FROM LISTS OF WORDS
//START CRUNCHING THROUGH userWords TILL END RESULT
    this.userWords = ""; //WORDS WE START WITH
    this.wordsOfCorrectLength = []; //WORDS OF MINIMUM LENGTH
    this.cleanWords = "clean";  //LIST OF ALL THE WORDS TO CHOOSE FROM
    this.arrayOfFilteredWords = []; //ARRAY OF FINAL WORDS
    this.passwordString = "makString()";
    this.finishedPassword = "error";
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript loaded from bundle.js to app.js');

    let generate = document.querySelector(".Logo");
    generate.addEventListener("click", function() {bananaClicked()});

    //RUN FUNCTIONS SYNCHRONOUSLY
    function bananaClicked() {
        /*OK*/getUserChoices();  //NUM WORDS, WORD LENGTH, BREAK CHR, L33T, WORDCOUNT
        /*OK*/createWordList(); //MAKE 1K-30K WORDLIST
        /*OK*/prepareWords(); //FILTER TO LENGTH, REGEX TO a-Z
        finalResult(); //MAKE AN ARRAY OF THE NICE WORDS
        prepareResults(); //PREPARE RESULTS - APPLY BREAK, L33T, SUBS.
        console.log(this.arrayOfFilteredWords);//TODO ARRAY OF WORDS TO CLICK AND CHANGE INDIVIDUALLY
        l33tFunction();
        displayPassword();

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
            //GET DROPDOWN VALUE OF !@£$%^&*()_+
            let getSpecialCharacter = document.getElementById("special-character");
            this.specialCharacter = getSpecialCharacter.value;
            //MAKE L33T FUNCTION
            let formL33tCheckBox = document.getElementById("l33t");
            this.l33t = formL33tCheckBox.value;
            //CHOOSE WORDLIST TO USE
            let wordListChoice = document.getElementById("word-count");
            this.userWordsChosen = wordListChoice.value;
        }

        function createWordList() {
            if (this.userWordsChosen === '1k') {
                this.userWords = top1kWords;
            } else if (this.userWordsChosen === '10k') {
                this.userWords = top1kWords + top10kWords;
            } else if (this.userWordsChosen === '20k') {
                this.userWords = top1kWords + top10kWords + top20kWords;
            } else if (this.userWordsChosen === '30k') {
                this.userWords = top1kWords + top10kWords + top20kWords + top30kWords;
            }
        }

        function prepareWords() {
        //SPLIT STRING INTO ARRAY OF WORDS
        this.userWords = this.userWords.split(' ');
        console.log("Total Words ", this.userWords.length);

            //MIN WORD LENGTH DEFINED BY USER
            this.wordsOfCorrectLength = createMinimumWordLengthArray(this.userWords, word => word.length >= this.minWordLength);
            console.log(" Words ", this.userWords.length);
            //DO REGEXP FUNCTION STUFF & CONVERT TO LOWERCASE
            this.cleanWords = regExCleanUp(this.wordsOfCorrectLength);
            console.log("regEX Completed");

            function createMinimumWordLengthArray(array, test) {
                let passed = [];
                for (let element of array) {
                    if (test(element)) {
                        passed.push(element);
                    }
                }
                return passed;
            }

            //REMOVE ANY FOREIGN CHARACTERS & CONVERT TO LOWERCASE WILE ITERATING
            function regExCleanUp(words) {
                const regExFilter = new RegExp(/[^a-zA-Z]/g);
                let arrayLength = words.length; //?
                let cleanWords = [];
                for (let i = 0; i < arrayLength; i++) {
                    if (regExFilter.test(words[i]) === false) {
                        cleanWords.push(words[i].toLowerCase())
                    }
                }
                console.log("Clean Words ", cleanWords.length);
                return cleanWords;
            }
        }

        function finalResult() {
            let result = [];
            let chosenWord = '';
            let testChosenWord = [];



            for (let i = 0; i < this.wordsRequired; i++) {
                chosenWord = this.cleanWords[Math.floor(Math.random() * cleanWords.length)];

                testChosenWord = chosenWord.split('');
                for (let j=0; j < testChosenWord.length; j++) {
                    if (testChosenWord[j] == "0") {
                        console.log("***********NUMBER ALERT*******");
                        console.log("***********BAD WORD WAS*******", chosenWord);
                        chosenWord = this.cleanWords[Math.floor(Math.random() * cleanWords.length)];
                        break;
                    }
                }
                result.push(chosenWord)
            }
            this.arrayOfFilteredWords = result
        }

        function prepareResults() {

            this.passwordString = makeString(this.arrayOfFilteredWords);

            function makeString(resultsToString) {
                let stringResult = '';

                for (let i = 0; i < resultsToString.length; i++) {
                    if (i != 0 ? stringResult += this.specialCharacter + resultsToString[i] : stringResult += resultsToString[i]) ;
                }
                return stringResult
            }

            // displayWords.innerHTML = passwordString;
        }

        function l33tFunction() {

            if (this.l33t === "true") {
                let convertToL33t = this.passwordString.split('');

                for (let i = 0; i < convertToL33t.length; i++) {
                    if (convertToL33t[i] === 'e') {
                        convertToL33t[i] = "3"
                    } else if (convertToL33t[i] === 'a') {
                        convertToL33t[i] = "4"
                    } else if (convertToL33t[i] === 'o') {
                        convertToL33t[i] = "0"
                    } else if (convertToL33t[i] === 'i') {
                        convertToL33t[i] = "1"
                    }
                }

                console.log(convertToL33t.join(''))
                this.l33tPassword = convertToL33t.join('');
                console.log(this.l33tPassword)
            }

        }

        function displayPassword() {
            let finalResult = document.querySelector(".Results");

            //SHOW A HEADING OF WORDS IN LIST
            //DISPLAY PASSWORD IN RESULTS
            if (this.l33t === "true") {
                finalResult.innerHTML = `${this.passwordString} <br> --------<br>${this.l33tPassword}`
            } else {
                finalResult.innerHTML = this.passwordString
            }

            //DISPLAY ADDITIONAL INFORMATION IN FOOTER
            let footerInformation = document.querySelector(".Footer");
            //DISPLAY PASSWORD STRENGTH DETAILS
            let strengthTester = new taiPasswordStrength.PasswordStrength();
            strengthTester.addTrigraphMap(taiPasswordStrength.trigraphs);
            let strengthResult = strengthTester.check(this.passwordString);
            console.log(strengthResult);

            footerInformation.innerHTML = 
                `</br>This password is <br> ${strengthResult.strengthCode} ~ 2^${strengthResult.nistEntropyBits} Entropy Bits
            </br>
                ${this.passwordString.length} Characters chosen from ${this.cleanWords.length} Words`
        }
       
    }
});
