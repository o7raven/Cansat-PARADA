const express = require('express');
const {readFile, readFileSync} = require('fs');
const app = express();

app.use(express.static('public'));

app.get('/', (request, response) => {
        readFile('./index.html', 'utf8', (err, html) =>{
        if(err){
            response.status(500).send("Internal server error 500")
        }
        response.send(html);
    })
});

app.listen(process.env.PORT || 80, () => console.log('Site is running | http://localhost:80'));