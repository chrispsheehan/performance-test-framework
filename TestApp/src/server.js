const express = require('express');

const config = {
    name: 'test-app',
    port: 3000,
    host: '0.0.0.0',
};

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('hello world :D');
});

app.get('/slow/', (req, res) => {
    
    setTimeout(function() {
        res.json(["badgers"]);
    }, 5000);    
});

app.listen(config.port, config.host, (e)=> {
    if(e) {
        throw new Error('Internal Server Error');
    }
});
