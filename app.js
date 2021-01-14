const express = require('express');
const bodyParser = require('body-parser');
const recipeScraper = require('recipe-scraper');
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/scrape', (req, res) => {
    console.log('recieved post request');
    if(req.body) {
        if(req.body.url) {
            recipeScraper(req.body.url).then(recipe => {
               res.send(recipe);
            })
            .catch(error => {
                console.log(error.message);
                res.send({error: error.message});
            })
        }
    } else {
        res.send({error: "Bad Request"});
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})