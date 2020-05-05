// Dotenv
const dotenv = require('dotenv');
dotenv.config();

// Express
const express = require('express')
const app = express()
app.use(express.static('dist'))
app.use(express.json({limit: '3mb'}));

/* Middleware*/
const bodyParser = require('body-parser')

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Alyien API
const aylien = require("aylien_textapi");
const textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

app.listen(8082, function () {
    console.log('Server listening on port 8082!')
})

app.post('/post', (req, res) => {
    //console.log('I got a request.') Used for control
    const data = req.body;
    //console.log(data); Used for control
    textapi.sentiment({
        url: data.text,
        mode: 'document'
    }, function(error, response) {
        if (error === null) {
            console.log(response);
            res.json(response);
            res.end();
        } else {
            console.log('This is not a valid text or article to evaluate. Try again.')
            res.json('error'); //This is incase regex URL validation is not working.
            res.end();
        }
    });
});