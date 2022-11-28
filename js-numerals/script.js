// DOM related globals
const result = document.querySelector('#result-container');
const form = document.querySelector('#form');
const input = document.querySelector('input');

// copying the generated text into the clipboard
const copyText = () => {
    const text = document.querySelector('#result-text').innerText;

    navigator.clipboard.writeText(text);

    alert('Copied the number: ' + text);
}

// submit handle function
const logSubmit = (event) => {
    event.preventDefault();
    let numberToConvert = event.target.elements.quantity.value;
    
    const resultText = convertNum(numberToConvert);

    const resultHTML = `
    <div class="result">
        <p id="result-text">${resultText}</p>
        <button class="copy">Copy</button>
    </div>
    `;

    result.innerHTML = resultHTML;

    input.value = '';

    const copy = document.querySelector('.copy');
    copy.addEventListener('click', copyText);
    
}

form.addEventListener('submit', logSubmit);



