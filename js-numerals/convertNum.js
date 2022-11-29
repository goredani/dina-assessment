// DICTIONARIES

const ones = {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten'
}

const tens = {
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    14: 'fourteen',
    15: 'fifteen',
    16: 'sixteen',
    17: 'seventeen',
    18: 'eighteen',
    19: 'nineteen'
}

const prefixes = {
    2: 'twenty',
    3: 'thirty',
    4: 'forty',
    5: 'fifty',
    6: 'sixty',
    7: 'seventy',
    8: 'eighty',
    9: 'ninety'
}

const suffixes = {
    1: '',
    2: 'thousand ',
    3: 'million ',
    4: 'billion ',
    5: 'trillion '
}



/// GLOBALS

const numLimit = 9999999999999;

let numText = '';


// FUNCTION WHICH CONVERTS THE NUMBERS TO TEXT

const convertNum = (num) => {

    numText = '';

    //Check if the number is a number, or it's too long
    try {
        if (isNaN(num)) {
            throw "The input is not a number";
        } else if (num > numLimit) {
            throw 'The number is too long'
        }
    }
    catch(err) {
        return 'ERROR';
    }
    
    
    // calculate the absolute value
    const absNum = Math.abs(num);

    // check if the number is 1 digit
    if(absNum in ones) {
        numText += ones[absNum];

    // check if the number is 2 digit
    } else if (absNum < 100) {
        numText += twoDigitOrLessConvert(absNum);
    } else {
        // the number is 3 digits or more, send it to splitNum
        const numArray = splitNum(absNum);

        let count = numArray.length;

        // iterating on the numArray array
        for (let i = 0; i< numArray.length; i++) {
           

          if (numArray[i][0] !== '000') {
            
            // passing to three digit conversion if the array length is 3
              if(numArray[i][0].length === 3){
                  if (count === 1) {
                      numText += threeDigitConvert(parseInt(numArray[i]), true);
                      numText += " " + suffixes[count];
                  } else {
                    numText += threeDigitConvert(parseInt(numArray[i]), false);
                    numText += " " + suffixes[count];
                  }
                  
                } else {
                    
                        numText += twoDigitOrLessConvert(parseInt(numArray[i]));
                        numText += " " + suffixes[count];       
            }

            

            count--;
          } 
          else {
            count--;
          }
        }
    }

    numText = numText.replace(/\s+/g,' ').trim();
    return numText;
}

// three digit conversion
const threeDigitConvert = (num, lastRun) => {
    let currentNumText = '';

    if(num === 0) {
        return '';
    }

    if(num < 100) {
        if (lastRun === true) {
            currentNumText += ' and ';
        }
        currentNumText += twoDigitOrLessConvert(num, lastRun);
        return currentNumText;
    }

    currentNumText += ones[num.toString().charAt(0)];

    currentNumText += " hundred";

    // if its the last run and the last 2 digits are not equal to 0, add an 'and' before the text
    if (lastRun === true && num.toString().charAt(1) != 0 || num.toString().charAt(2) != 0) {
        currentNumText += ' and ';
    }

    if(num.toString().charAt(1) != 0 || num.toString().charAt(2) != 0) {
        currentNumText += twoDigitOrLessConvert(parseInt(num.toString().substr(1)));
    }

    return currentNumText;
}

// two digits conversion
const twoDigitOrLessConvert = (num) => {
    let currentNumText = '';

    if (num < 10) {
        return ones[num];
    }

    if(num in tens) {
        currentNumText += tens[num];
    } else {
        currentNumText += ' ' + prefixes[num.toString().charAt(0)];

        if(num.toString().charAt(1) !== '0') {
            currentNumText += '-' + ones[num.toString().charAt(1)];
        }
    }
   
    return currentNumText;


}

// split the numbers into 3 digit arrays
const splitNum = (num) => {
    let numArray = [];
    let tempArray = [];
    let count = 0;

    // convert the numbers into string, eg. "123"
    const numString = num.toString();

    // split it to individual string numbers, eg. [1, 2, 3]
    const singleDigits = numString.split('');

    const digits = singleDigits.length;

    // iterating on the single digits and splitting the values into 3 digit arrays, eg. [[1,2,3], [4,5,6]]
    for (let i = digits - 1; i >= 0; i--) {
        
        tempArray[0] = singleDigits[i] + tempArray[0];
        count++;

        tempArray[0] = tempArray[0].replace('undefined', '');
        
        if(count % 3 === 0) {
            numArray.unshift(tempArray);
            tempArray = [];
        }

    }

    if(tempArray.length != 0) {
        numArray.unshift(tempArray);
    }

    return numArray;
}


var module = module || {};
module.exports = convertNum;