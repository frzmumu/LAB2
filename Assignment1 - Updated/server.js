const exphbs = require("express-handlebars");
const express = require("express");
const path = require('path');
const fs = require("fs");
var HTTP_PORT = process.env.PORT || 3000;
var app = express();
app.engine(".hbs", exphbs.engine({
    extname: ".hbs",
    defaultLayout: false,
    layoutsDir: path.join(__dirname, "/views")
}));


var rawData = fs.readFileSync(path.join(__dirname, "public/user.json"));
users = JSON.parse(rawData);
var placeholderdata;
app.set("view engine", ".hbs");
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/public/images')));
app.use(express.static(path.join(__dirname, '/public/css')));
app.use(express.static(path.join(__dirname, '/public/js')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('loginpage',{data:placeholderdata}); 
    placeholderdata=null;
})
app.post('/', (req, res) => {
    res.render('loginpage'); 
    placeholderdata=null;
})

app.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var found = false;

    for (var name in users) {
        if (name == username.toLowerCase().trim()) {
            found = true;
            break;
        }
    }
    if (!found) {
        placeholderdata = {
            username: username,
            password: password,
            message: "Not a registered username" 
        }
        return res.redirect ("/");
    }
    if (users[username.toLowerCase().trim()] != password){
        placeholderdata = {
            username: username,
            password: password,
            message: "Invalid password"
        }
        return res.redirect ("/");
    }
    res.render ("bankpage", {data : username.toLowerCase().trim()});
})


const server = app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}`);
});

