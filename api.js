const { time } = require('console');
//public functions
function vsechnyFilmy(){
    var fs = require('fs');
    var files = fs.readdirSync('./data/film');
    var string=[];
    files.forEach(file=>{
        string.push(file);
    });
    var returnPom=[];
    for(let i =0;i<string.length;i++){
        if(string[i].substring(0,6)=='active'){
            returnPom.push({"way":string[i]},readJSONFile('./data/film/'+string[i]+"/info.json"));
        }
    }
   return returnPom;
}
function vsechnyKina(url){
    var fs = require('fs');
    var kina = fs.readdirSync('./data/film/'+url+'/kino');
    var kinaJSON=[];
    var actual=0;
    kina.forEach(kino=>{
        kinaJSON.push(readJSONFile('./data/kino/'+kino+"/info.json"));
        var datumy = fs.readdirSync('./data/film/'+url+'/kino/'+kino);
        let text ="{";
        var datumyJSON=[];
        datumy.forEach(datum=>{
            var pom1=datum.split('.');
            if(getActualDate()<new Date(pom1[2]+"-"+pom1[1]+"-"+pom1[0]))//zmenit znaminko porovnavani ad to funguje pak
            {     
                datumyJSON.push(readJSONFile('./data/film/'+url+'/kino/'+kino+"/"+datum+"/info.json"));
            }
        });
        text+="}";
        kinaJSON[actual].date =datumyJSON;
        actual++;
    });
   return kinaJSON;
}
function sal(params, query){
    //return query;
    var time = query.time.split('|');
    var read = [];
    var fs = require('fs');
    read.push(JSON.parse(fs.readFileSync('./data/film/'+params.film+'/kino/'+query.kino+"/"+params.datum+"/"+time[1]+"/"+time[0].replace(':','-')+".json")));
    read[0].price = JSON.parse(fs.readFileSync('./data/film/'+params.film+'/kino/'+query.kino+"/"+params.datum+"/"+time[1]+"/"+time[0].replace(':','-')+"-cena.json"))["barva"];
    return read;
}
function loginUser(mail, password){
    var fs = require('fs');
    const bcrypt = require('bcrypt');
    var users = JSON.parse(fs.readFileSync('./data/users/users.json'));
    var exists = users['users'].find((user)=>{
        return user.email.toString() == mail.toString()&&bcrypt.compareSync(password.toString(),user.password.toString());
    })
     if(exists!=null){
        return exists.name.toString();
     }
    return false;
}
function checkUser(mail){
    var fs = require('fs');
    var users = JSON.parse(fs.readFileSync('./data/users/users.json'));
    var exists = users['users'].find((user)=>{
        return user.email.toString() == mail.toString();
    })
     if(exists!=null){
         return true;
     }
    return false;
}
 function createUser(mail,name,password){
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    var fs = require('fs');
    var done = false;
    var add = JSON.parse(fs.readFileSync('./data/users/users.json',function(err, result) {
    if(err) console.log('error', err);
    }));
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    let newUser = {
        "name":name.toString(),
        "email":mail.toString(),
        "password":hash 
    };
    add['users'].push(newUser);
    if(JSON.stringify(add)!=""){
        fs.writeFile('./data/users/users.json', JSON.stringify(add),function(err, result) {
        if(err) console.log('error', err);
        });
        return true;
    }
    else return false;
}
function getPosition(params, post){
    var fs = require('fs');
    var time0sal = post["time"].split("%7C");
    var list = JSON.parse(post["selected"]);
    var add = JSON.parse(fs.readFileSync(
    './data/film/'+params.film+'/kino/'+post["kino"]+'/'+params.datum+'/'+time0sal[1]+'/'+time0sal[0].replace("%3A","-")+'.json'
    ,function(err, result) {
        if(err) console.log('error', err);
    }));
    var volno = true;
    for(let i = 0;i<list.length;i++){
        var row0column = list[i].toString().split("|");
        if(add["struktura"][row0column[0].charCodeAt(0)-65][row0column[1]-1] == "O") {volno=false;break;};
        add["struktura"][row0column[0].charCodeAt(0)-65][row0column[1]-1] = "O";
    }
    if(volno){
        fs.writeFile(
            './data/film/'+params.film+'/kino/'+post["kino"]+'/'+params.datum+'/'+time0sal[1]+'/'+time0sal[0].replace("%3A","-")+'.json'
            , JSON.stringify(add),function(err, result) {
            if(err) console.log('error', err);
            });
        return true;
    }
    return false;
}
module.exports = {vsechnyFilmy,vsechnyKina,sal,checkUser,loginUser,createUser,getPosition};
function readJSONFile(file)
{
   const data = require(file, 'utf8');
   return data;
}
function getActualDate()
{   
return new Date();
}
