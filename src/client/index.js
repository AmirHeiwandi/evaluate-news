// Import statements
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

// Variable declarations
let formBox = document.getElementById('formBox');
let data = {};


// Functions
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
    // console.log(json); Used for control
    return json;
}

function updateUI(info){
    // console.log('updating UI') Used for control
    // console.log(info);
    let text = info.text;
    text = text.slice(0, 40);
    text = `${text}...`;
    let lang = info.language;
    let label = info.categories[0].label;

    let section = document.createElement('section');

    let textElement = document.createElement('p');
    textElement.innerHTML = `Text: ${text}`;
    section.appendChild(textElement);

    let langElement = document.createElement('p');
    langElement.innerHTML = `Language: ${lang}`;
    section.appendChild(langElement);

    let labelElement = document.createElement('p');
    labelElement.innerHTML = `Label: ${label}`;
    section.appendChild(labelElement);

    let footer = document.getElementById('footer');
    let body = document.getElementsByTagName("BODY")[0];
    body.insertBefore(section, footer);
}

formBox.addEventListener('submit', (e) => {
    e.preventDefault();
    data.text = document.getElementById('textBox').value;
    postData('/post', data).then(function (json){
        updateUI(json);
    })
    document.getElementById('textBox').value = '';
});