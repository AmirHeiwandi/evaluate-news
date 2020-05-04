// Import statements
import '../styles/base.scss'
import '../styles/footer.scss'
import '../styles/form.scss'
import '../styles/header.scss'

// Variable declarations
let formBox = document.getElementById('formBox');
let data = {};

// Split the object
function splitObject (info) {
    if (info === 'error'){
        return 'error';
    }
    else {
        let list = [];
        list[0] = `${info.text.slice(0, 40)}...`;
        list[1] = info.language;
        list[2] = info.hashtags.slice(0,5);
        return list;
    }
}

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
    if (list === 'error'){
        alert('URL provided not acceptable. Try another one.');
        return null;
    }
    else {
        let section = document.createElement('section');
        let textElement = document.createElement('p');
        textElement.innerHTML = `<span>Text:</span> ${list[0]}`;
        section.appendChild(textElement);
        let langElement = document.createElement('p');
        langElement.innerHTML = `<span>Language:</span> ${list[1]}`;
        section.appendChild(langElement);
        let hashtagsElement = document.createElement('p');
        hashtagsElement.innerHTML = `<span>Top 5 Hashtags:</span> ${list[2]}`;
        section.appendChild(hashtagsElement);
        let footer = document.getElementById('footer');
        let body = document.getElementsByTagName("BODY")[0];
        body.insertBefore(section, footer);
    }
}

// Eventlistener for the submit form-button
formBox.addEventListener('submit', (e) => {
    e.preventDefault();
    data.text = document.getElementById('textBox').value;
    postData('/post', data).then(function (json){
        updateUI(json);
    })
    document.getElementById('textBox').value = '';
});