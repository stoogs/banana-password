//import words from file
const everyDayWords = require('../../dictionary/everyDayWords');
const top10kWords = require('../../dictionary/top10kWords');
const top20kWords = require('../../dictionary/top20kWords');
const top30kWords = require('../../dictionary/top30kWords');
let minWordLength = 6;
let wordsRequired = 4;


//TODO GET WHAT WORDS USR WANTS FROM CHECK BOX
//TODO MAKE LIST OF WORDS  - JOIN ARRAYS TOGETHER
//TODO SEARCH FOR WORDS FROM PREPARED LIST
//TODO TAKE top 10 words from a and filter. split, over5 characters, check regex [^a-zA-Z ], all to lowercase,
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript loaded from bundle.js to app.js');

    let generate = document.querySelector(".Logo");
    generate.addEventListener("click", function() {getWords()});


    //ONE MEGA FUNCTION - TO REFACTOR
    function getWords() {

        //Get value from word-form
        let formNumWords = document.getElementById("word-form");
        console.log("You want",formNumWords.elements[0].value, "words");
        wordsRequired = formNumWords.elements[0].value;
        //Get value from word-length-form
        let formWordLength = document.getElementById("word-length-form");
        console.log("You want", formWordLength.elements[0].value, "letters");
        minWordLength = formWordLength.elements[0].value;


        wordList = top10kWords.split(' ');
        console.log("Total Words ", wordList.length);

//Min word Length of 6...
        wordList = createMinimumWordLengthArray(wordList, word => word.length >= minWordLength);
        console.log("Dirty Words ", wordList.length);

//DO REGEXP FUNCTION STUFF & CONVERT TO LOWERCASE
        let cleanWords = regExCleanUp(wordList);

//FINAL RESULT
        let results = finalResult(wordsRequired);
        console.log("Banana Password Results Are: ", results);

//DISPLAY IN RESULTS

        let displayWords = document.querySelector(".Results");
        let passwordString = makeString(results)

        function makeString(resultsToString){
            let stringResult = ''
            for (let i = 0; i < resultsToString.length; i++) {
                if(i !=0 ? stringResult +=  "-" + resultsToString[i] : stringResult += resultsToString[i]);
            }
            return stringResult
        }
        displayWords.innerHTML = passwordString;


        
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

        function finalResult(wordsRequired) {
            console.log("Is this a string?", wordsRequired)
            let result = [];
            let chosenWord = '';

            for (let i = 0; i < wordsRequired; i++) {
                chosenWord = cleanWords[Math.floor(Math.random() * cleanWords.length)];
                result.push(chosenWord)
            }
            return result
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

