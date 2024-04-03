require('dotenv').config()
let express = require('express');
let app = express();

let jsonObj = {"message": "Hello json"}

absPathhtml = __dirname + '/views/index.html'
absPathCss = __dirname + '/public'

//middlewares
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
    } else if(process.env.MESSAGE_STYLE === 'lowercase'){
        res.json(jsonObj.message.toLowerCase())
    } else {
        res.json(jsonObj)
    }
    
})







 module.exports = app;
