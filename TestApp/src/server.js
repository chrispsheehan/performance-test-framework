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

app.listen(config.port, config.host, (e)=> {
    if(e) {
        throw new Error('Internal Server Error');
    }
});
