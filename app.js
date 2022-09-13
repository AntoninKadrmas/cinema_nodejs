const lib = require("./api");
const express = require('express');
var qs = require('querystring');
const session = require('express-session');
const app = express();
const port = 22127;
app.use(session({
	secret: 'secret',
	resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 8*60*60*1000 },
}));

app.set('view engine','ejs');


app.get('/',(req,res)=>res.redirect("/filmy"));
app.get('/filmy',function(request,res){
    console.log(request.session.expires+"  "+Math.floor(new Date().getTime() / 1000) + " " + request.session.name);
    console.log(request.session.expires==undefined);
	if ((parseInt(request.session.expires)<Math.floor(new Date().getTime() / 1000)||request.session.expires==undefined)) {
        request.session.destroy((err) => {});
        res.redirect("/login");
	} else {
        var sessData = request.session;
        sessData.expires = Math.floor(new Date().getTime() / 1000)+1200;
        res.render('filmy');
	}
}); 
app.get('/filmy/api/list',(req,res)=> res.json([{filmy:lib.vsechnyFilmy()}]));
app.get('/login',(req,res)=>{
    req.session.destroy((err) => {});
    res.render('login')
});
app.get('/login/check',(req,res)=>res.render('login'));
app.get('/login/new',(req,res)=>res.render('login'));
app.post('/login/check', function(request,response){
    if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;
            if (body.length > 1e6)
                request.connection.destroy();
        });
        request.on('end', function () {
            var post = qs.parse(body);
            if(lib.checkUser(post['mail'])){
                var login = lib.loginUser(post['mail'],post['password']);
                if(!login){
                    response.redirect("/login/check");
                    response.end();
                }
                else{
                    var sessData = request.session;
                    sessData.name = login;
                    sessData.expires = Math.floor(new Date().getTime() / 1000)+1200;
                    response.redirect("/filmy");
                    response.end();
                }
            }
            else{
                response.redirect("/login/check");
                response.end();
            }
        });
    }
});
app.post('/login/new', function(request,response){
    if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;   
            if (body.length > 1e6)
                request.connection.destroy();
        });
        request.on('end', function () {
            var post = qs.parse(body);
            if(!lib.checkUser(post['mail'])){
              if(lib.createUser(post['mail'],post['name'],post['password'])){
                var sessData = request.session;
                sessData.name = post['name'];
                sessData.expires = Math.floor(new Date().getTime() / 1000)+1200;
                console.log(sessData.expires );
                response.redirect("/filmy");
                console.log(request.session.expires+"  "+Math.floor(new Date().getTime() / 1000) + " " + request.session.name);
              }
              else{
                response.redirect("/login/new");
              }
            }
            else{
                response.redirect("/login/new");
            }
            response.end();
        });
    }
});
app.get('/filmy/:film/api/list',(req,res)=> res.json([{kina:lib.vsechnyKina(req.params.film)}]));
app.get('/filmy/:film/',(request,res)=>{
    var sessData = request.session;
    if ((parseInt(request.session.expires)<Math.floor(new Date().getTime() / 1000)||request.session.expires==undefined)) {
        request.session.destroy((err) => {});
        res.redirect("/login");
	} else {
        sessData.expires = Math.floor(new Date().getTime() / 1000)+1200;
        res.render('film',{film:request.params.film});
	}
});
app.get('/filmy/:film/:datum/api/list',(req,res)=> res.json([{sedadla:lib.sal(req.params,req.query)}]));
app.get('/filmy/:film/:datum',(request,res)=>{
    var sessData = request.session;
    if ((parseInt(request.session.expires)<Math.floor(new Date().getTime() / 1000)||request.session.expires==undefined)) {
        request.session.destroy((err) => {});
        res.redirect("/login");
	} else {
        sessData.expires = Math.floor(new Date().getTime() / 1000)+1200;
        res.render('sedadla',{film:request.params.film,datum:request.params.datum});
	}
});
app.post('/filmy/:film/:datum',(request,response)=>{
    if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;   
            if (body.length > 1e6)
                request.connection.destroy();
        });
        request.on('end', function () {
            var post = qs.parse(body);
            if(lib.getPosition(request.params,post))response.redirect("/filmy");
            else response.redirect(request.originalUrl);
            response.end();
        });
    }
});
app.use('/public',express.static('public'));
//app.use('/',(req,res)=>res.sendFile(__dirname+"/public/index.html"));
app.listen(port,()=> console.log('posloucham na portu '+ port));