require('dotenv').config()
let express = require('express');
let app = express();

let jsonObj = {"message": "Hello json"}

absPathhtml = __dirname + '/views/index.html'
absPathCss = __dirname + '/public'

app.use('/public',express.static(absPathCss))

app.get('/',(req, res)=>{
    res.sendFile(absPathhtml)
})

app.get('/json',(req, res)=>{
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        res.json(jsonObj.message.toUpperCase())
      } else {
        res.json(jsonObj)
      }
    
})







 module.exports = app;
