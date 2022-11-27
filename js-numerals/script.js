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

const numLimit = 9999999999999;

let numText = '';

const result = document.querySelector('#result-text');
const form = document.querySelector('#form');

const convertNum = (num) => {
    numText = '';
    const absNum = Math.abs(num);

    try {
        if (isNaN(num)) {
            throw "Number is too big";
        } else if (num > numLimit) {
            throw 'The input is not a number'
        }
    }
    catch(err) {
        return 'ERROR';
    }

    if(num.toString().includes('-') && absNum != 0) {
        numText += 'minus ';
    }
    
    

    if(absNum in ones) {
        numText += ones[absNum];
    } else if (absNum < 100) {
        numText += twoDigitOrLessConvert(absNum);
    } else {
        const numArray = splitNum(absNum);

        let count = numArray.length;



        for (let i = 0; i< numArray.length; i++) {
           

          if (numArray[i][0] !== '000') {
            

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


    if (lastRun === true && num.toString().charAt(1) != 0 || num.toString().charAt(2) != 0) {
        currentNumText += ' and ';
    }

    if(num.toString().substr(1) !== '00') {
        currentNumText += twoDigitOrLessConvert(parseInt(num.toString().substr(1)));
    }

    return currentNumText;
}

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

const splitNum = (num) => {
    let numArray = [];
    const numString = num.toString();
    let count = 0;

    let tempArray = [];

    const singleDigits = numString.split('');

    const digits = singleDigits.length;

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




const logSubmit = (event) => {
    event.preventDefault();
    let numberToConvert = event.target.elements.quantity.value;
    result.innerHTML = convertNum(numberToConvert);
    
}

form.addEventListener('submit', logSubmit);

module.exports = convertNum;