// Import statements
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import { splitObject } from './js/splitObject.js'
import { isURL } from './js/isURL.js'

// Variable declarations
let form = document.getElementById('formBox');
let textBox = document.getElementById('textBox');
let data = {};

// POST to server
async function postData (url, data) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch(url, options);
    const json = await response.json();
    return json;
}

// Update the UI based on the article.
function updateUI(info){
    let list = splitObject(info);
    // This is incase regex URL validation is not working.
    if (list === 'error'){
        alert('URL provided not acceptable. Try another one.');
        return null;
    }
    else {
        // Remove latest post
        let sectionCollection = document.getElementsByClassName('remover');
        if (sectionCollection.length > 0) {
            sectionCollection[0].remove();
        }
        let section = document.createElement('section');
        section.classList.add('remover');
        let textElement = document.createElement('p');
        textElement.innerHTML = `<span>Text:</span> ${list[0]}`;
        section.appendChild(textElement);
        let polarElement = document.createElement('p');
        polarElement.innerHTML = `<span>Polarity:</span> ${list[1]}`;
        section.appendChild(polarElement);
        let subjElement = document.createElement('p');
        subjElement.innerHTML = `<span>Subjectivity:</span> ${list[2]}`;
        section.appendChild(subjElement);
        let footer = document.getElementById('footer');
        let body = document.getElementsByTagName("BODY")[0];
        body.insertBefore(section, footer);
    }
}

// Eventlistener for the submit form-button
form.addEventListener('submit', (e) => {
    e.preventDefault();
    data.text = textBox.value;
    if (isURL(data.text) === true) {
        postData('http://localhost:8082/post', data).then(function (json){
            updateUI(json);
        })
        textBox.value = '';
    } else {
        textBox.value = '';
        alert('URL provided not acceptable. Try another one.');
    }
});