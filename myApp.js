require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

let jsonObj = {"message": "Hello json"}

absPathhtml = __dirname + '/views/index.html'
absPathCss = __dirname + '/public'

app.use('/public',express.static(absPathCss))
app.use((req, res, next)=>{
    console.log(req.method, req.path,'-', req.ip);
    next();
})

app.get('/',(req, res)=>{
    res.sendFile(absPathhtml)
})

app.get('/json',(req, res)=>{
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        res.json(jsonObj.message.toUpperCase())
    } else if(process.env.MESSAGE_STYLE === 'lowercase'){
        res.json(jsonObj.message.toLowerCase())
    } else {
        res.json(jsonObj)
    }
})

app.get("/:word/echo", (req, res) => {
    const {word} = req.params;
    res.json({ echo: word });
});

app.get('/now',(req, res, next)=>{
    req.time = new Date().toString()
    next();
  },(req, res)=>res.send(req.time)
)

app.use(bodyParser.urlencoded({extended: false}))

app.post("/name", (req, res) => {
    const { first, last } = req.body;
    let name = first +" "+ last;
    res.json({"name":name})
});


 module.exports = app;
