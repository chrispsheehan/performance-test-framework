const express = require('express');

const app = express();

app.get('/', (req, res) => {
    console.log('yo')
    res.status(200).send('hello world :D');
});

app.get('/slow/', (req, res) => {
    
    setTimeout(function() {
        res.json(["badgers"]);
    }, 5000);    
});

app.get('/error/', (req, res) => {
    
    throw new Error('blah errors'); 
});