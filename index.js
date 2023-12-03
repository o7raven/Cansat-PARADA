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

app.use((req, res) => {
    res.status(404).sendFile(__dirname + '/public/404.html');
});

app.listen(process.env.PORT || 3443, () => console.log('Site is running | http://localhost:3443'));


//sslServer.listen(3443, () => console.log("Secure server on port 3443 localhost:3443"));


function ise(){
            response.status(500).send("Internal server error 500")
}