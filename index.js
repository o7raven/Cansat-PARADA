const express = require('express');

const {readFile, readFileSync} = require('fs');
const app = express();

const PORT = 80;
app.use(express.static('public'));
app.get('/live', (request, response) => {
    readFile("./public/live.html", "utf8", (err, html) =>{
        if(err){
            ise(response, err);
            return;
        }
        response.send(html);
    })
});

app.get('/', (request, response) => {
    readFile("./index.html", "utf8", (err, html) =>{
        if(err){
            ise(response, err);
            return;
        }
        response.send(html);
    })
});




app.use((req, res) => {
    res.status(404).sendFile(__dirname + '/public/404.html');
});

app.listen(process.env.PORT || PORT, () => console.log("Site is running | http://localhost:%d", PORT));


//sslServer.listen(3443, () => console.log("Secure server on port 3443 localhost:3443"));


function ise(response, err){
        response.status(500).send("Internal server error 500: " + err.message);
        return;
}