let express = require('express');
let app = express();

absPath = __dirname + '/views/index.html'

absPathCss = __dirname + '/public'

app.use('/public',express.static(absPathCss))

app.get('/',(req, res)=>{
    res.sendFile(absPath)
})

































 module.exports = app;
