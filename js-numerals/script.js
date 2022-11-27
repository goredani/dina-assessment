const ones = {
    0: 'zero',
    1:  'one',
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

const numLimit = 100000000000;

let numText = '';



const convertNum = (num) => {
    const absNum = Math.abs(num);

    try {
        if (num > numLimit) {
            throw "Number is too big";
        }
    }
    catch(err) {
        alert(err);
        return 'ERROR';
    }

    if(num.toString().includes('-') && absNum != 0) {
        numText += 'negative ';
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
                numText += "and ";
                numText += threeDigitConvert(parseInt(numArray[i]));
                numText += " " + suffixes[count];
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

    return numText;
}

const threeDigitConvert = (num) => {
    let currentNumText = '';

    if(num === 0) {
        return '';
    }

    if(num < 100) {
        currentNumText += twoDigitOrLessConvert(num);
        return currentNumText;
    }

    currentNumText += ones[num.toString().charAt(0)];
    
    currentNumText += " hundred ";

    if(num.toString().substr(1) !== '00') {
        currentNumText += "and ";
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
        currentNumText += prefixes[num.toString().charAt(0)];

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

console.log(convertNum(1999));