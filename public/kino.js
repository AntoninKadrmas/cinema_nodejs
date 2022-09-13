var red= 255;
var green = 145;
var minus = 5;
var pocetVSkupin;
var newOne = 0;
var skupinyId = 0;
const hlavni = document.querySelector(".zaklad");
function AddFilm(nazev,zanry,obrazek,id){
    var skupinky;
    try{
        skupinky=document.querySelector('#skupinky'+skupinyId);
        skupinky.innerHTML=skupinky.innerHTML;
    } 
    catch(error){
        var div='<div class = "skupinky" id="'+"skupinky"+skupinyId+'"></div>';
        hlavni.innerHTML+=div;
        skupinky=document.querySelector('#skupinky'+skupinyId);
    }
    var html=
        '<div class="hlavni" id="'+id+'" style="box-shadow: rgb(255, 145, 0) 0px 0px 2px 2px;">'+
            '<img src="'+obrazek+'" class="img">'+
            '<p class="text">'+nazev+'</p>'+
            zanr(zanry,2)+
            '<a href="/filmy/'+id+'">'+
                '<div class="buttonDiv">'+
                    '<button class="kina" id="'+id+'" onclick="localStorage.setItem('+"'idFilm'"+','+"'"+id+"'"+')">Kina</button>'+
                '</div>'+
            '</a>'+
        '</div>';
    skupinky.innerHTML+=html;
newOne++;
if(newOne==pocetVSkupin){
    skupinyId++;
    newOne=0;
}
}
function zanrColour(barva)
{
    switch(barva)
    {
        case "akce":
            return "rgb(184, 1, 1)";
        case "sci-fi":
            return "rgb(0, 214, 211)";
        case "horor":
            return "rgb(1, 40, 92)";
        case "drama":
            return "rgb(107, 0, 121)";
        case "romance":
            return "rgb(224, 0, 142)";
        case "westeren":
            return "rgb(112, 49, 0)";
        case "muzikal":
            return "rgb(225, 88, 252)";
        case "thriller":
            return "rgb(0, 0, 0)";
        case "dokument":
            return "rgb(145, 144, 144)";
        case "komedie":
            return "rgb(237, 201, 0)";
        case "fantasy":
            return "rgb(187, 237, 5)";
          
    }
}
function zanr(zanry,pocet)
{
    var list = zanry.split(" ");
    const div2= document.createElement('div');
    div2.className = "vedlejsi";
    if(pocet==0)pocet = 2;
    var span="";
    var count = 1;
    list.forEach(element => {
        if(count<=pocet&&element!="")
        {
            span+='<span class="zanry" style="background-color: '+zanrColour(element)+';">'+element+'</span>';
        } 
        count++;
    });
    var div=
    '<div class = "vedlejsi" >'+
        span+
    '</div>';
    return div;
}

