require('dotenv').config()
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

let jsonObj = {"message": "Hello json"}

absPathhtml = __dirname + '/views/index.html'
absPathCss = __dirname + '/public'

//root-level middlewares
app.use('/public',express.static(absPathCss))
app.use((req, res, next)=>{
    console.log(req.method, req.path,'-', req.ip);
    next();
})


//routes
app.get('/',(req, res)=>{
    res.sendFile(absPathhtml)
})

app.get('/json',(req, res)=>{
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        res.json(jsonObj.message.toUpperCase())
    } 
    else if(process.env.MESSAGE_STYLE === 'lowercase'){
        res.json(jsonObj.message.toLowerCase())
    } 
    else { res.json(jsonObj) }
})

//using route parameters.
app.get("/:param/echo", (req, res) => {
    const {param} = req.params;
    res.json({ echo: param });
});

//middleware mounted at a specific route
app.get('/now',(req, res, next)=>{
    req.time = new Date().toString();
    next();
  },(req, res)=>res.send(req.time)
)

// middleware to parse the request body
app.use(bodyParser.urlencoded({extended: false}))   

app.post("/name", (req, res) => {
    res.json(req.body)		//json format
    const { first, last } = req.body;
    res.send('Name: ' + first + ' Last name: ' + last)		//string format
});




 module.exports = app;
