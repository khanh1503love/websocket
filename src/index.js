const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io= require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session')
const credentials = require(`../../credentials.js`)
const url="";
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(credentials.cookieSecret))
app.use(expressSession({

    resave: false,

    saveUninitialized: false,

    secret: credentials.cookieSecret,

}))

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'resources/views'))

app.use((req, res, next) => {
    if(!req.session.user){
        res.redirect('/login')
    }else{
        next();
    }
})

app.use(express.static(path.join(__dirname, 'public')))
app.get('/login', function (req, res) {
    res.render('login')
})
app.post('/login', function (req, res) {
    if (req.body.email === 'khanhpro1250@gmail.com' && req.body.password == '12345') {
        req.session.user = "khanh1250"
        res.render('home')
    } else {
        res.redirect(303, '/login')
    }
})


app.get('/',(req, res) =>{
    res.render('home')
})

server.listen(8000,() => {console.log('Sever listening on port: 8000')})
