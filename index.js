const express = require('express');

const {readFile, readFileSync} = require('fs');
const app = express();


app.use(express.static('public'));

app.get('/', (request, response) => {
        readFile('./index.html', 'utf8', (err, html) =>{
        if(err){
            ise();
        }
        response.send(html);
    })
});

app.get('*' , (request, response) => {
    readFile('./404.html', 'utf8', (err, html) =>{
        if(err){
            ise();
        }
        response.send(html);
    }) 
});

app.listen(process.env.PORT || 80, () => console.log('Site is running | http://localhost:80'));


//sslServer.listen(3443, () => console.log("Secure server on port 3443 localhost:3443"));


function ise(){
            response.status(500).send("Internal server error 500")
}