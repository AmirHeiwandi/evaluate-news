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
    console.log(json);
}

formBox.addEventListener('submit', () => {
    data.text = document.getElementById('textBox').value;
    postData('/post', data);
});