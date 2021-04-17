const express = require('express');

const app = express();
const port = 3000

app.get('/', (req, res) => {

    console.log('hit OK endpoint');
    res.status(200)
    .json({"status": "OK"});
});

app.get('/slow/', (req, res) => {
    
    console.log('hit slow endpoint');
    setTimeout(function() {
        res.json(["badgers"]);
    }, 5000);    
});

app.get('/error/', (req, res) => {
    
    console.log('hit error endpoint');
    throw new Error('blah errors'); 
});

app.listen(port, () => {
  console.log(`running on http://localhost:${port}/`)  
})