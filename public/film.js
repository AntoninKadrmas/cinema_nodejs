// function start()
// {
//     document.querySelector('.zaklad').style.minHeight  = (window.screen.height -700)+"px";
// }   
var cinema =[];
var body = document.querySelector('.zaklad');
async function show()
{ 
    //await loadFilms();
    await Promise.all([loadFilms(),loadCinemas()]);
    var id_key= window.location.href.split('/')[window.location.href.split('/').length-1];
    var id=0;
    var found= false;
    list.forEach(item=>{
        console.log(item.id+" = "+id_key);
        if(item.id!=id_key&&!found)id++;  
        else found =true;  
    });
    console.log(id);
    body.innerHTML = "";
    var celek = document.createElement('div');
    celek.className = 'celek';
    celek.innerHTML = 
     '<a href="/filmy"><button class="back">back</button></a>'
    +'<h1 style="color:black">'+list[id].nazev+'</h1>'
    +'<img class="nahled" src="'+list[id].img+'" style="width:400px;height:auto">'+
    zanr(list[id].zanr,0);
    body.appendChild(celek);
  
    cinema.forEach(element=>{
        element.date.forEach(date=>{
            var vysilani = [];
            date.cas.sal.forEach(info=>{
                vysilani.push(info);
            })
            console.log(vysilani);
            //vysilani.push(data.cas)
            celek.innerHTML+=nactiKino(element.name, element.address,date.date,vysilani,date.kino)
        })
    })
    // celek.innerHTML+=nactiKino("Edison Filmhub", "Jeruzalémská 1321/2, 110 00 Nové Město", "16.3.2022",vysilani);
    // celek.innerHTML+=nactiKino("Kino Lucerna", "Vodičkova 704, 110 00 Nové Město", "16.3.2022",vysilani);
    // celek.innerHTML+=nactiKino("Kino Pilotů", "Donská 168, 100 00 Praha 10-Vršovice", "16.3.2022",vysilani);
    // celek.innerHTML+=nactiKino("CineStar Praha Anděl", "Radlická 3179, 150 00 Praha 5-Anděl", "16.3.2022",vysilani);
    // celek.innerHTML+=nactiKino("Komorní kino Evald", "Národní 60/28, 110 00 Nové Město", "16.3.2022",vysilani);
} 
/*function exit()
{
    body.innerHTML = "";
    vsechnyFilmy();
}*/

function nactiKino(nazev,misto,datum,cas,id)
{
    var pom = "";
    cas.forEach(element => {
        str = element.split('|');
        pom+='<div><input type="radio" name="time" value='+element+' required><label>'+str[0]+'</label></div>'
    });

var p = 
'<form action="'+window.location.href+'/'+datum+'"style="margin: 10px 0;">'+
 '<div style="min-width:700px;width:auto;max-height:80px;height:auto;display:flex;flex-flow:row;justify-content: center;align-items: center;border-top: 2px solid var(--main1);border-bottom: 2px solid var(--main1)">'
    +'<div style="min-height:auto;height:auto;width:auto;flex:1;display:flex;align-items: center;flex-flow:row; ">'
        +'<div style="display:flex;flex-flow:column;flex:1;width:auto">'
            +'<div style="text-align:left;display:flex;width:max-content;padding:0px 5px">'
                +"<p style='font-size:20px;height:min-content;margin:auto;width:auto;'>"+nazev+"<p/>"
            +'</div>'
            +'<div style="display:flex;align-items: center;width:auto;padding:0px 5px;text-align:center">'
                +"<p style='font-size:12px;width:auto;margin:auto'>"+misto+"<p/>"
            +'</div>'
        +'</div>'
        +'<div style="display:flex;flex-flow:column;flex:4;align-items: center;justify-content: center;height:100%">'
            +'<div style="display:flex;align-items: center;justify-content: center;height:40px;">'
                +"<p>"+datum+"</p>"
            +'</div>'
            +'<div style="display:flex;flex-flow:row;align-items: center;justify-content: center;height:auto">'
                +pom
            +'</div>'
        +'</div>'
    +'</div>'
    +'<div style="display:flex;align-items: center;justify-content: center;height:80px ;border-left: 2px solid var(--main1);">'
        +'<input type="textbox"class="" name="kino" value="'+ id+'" style="margin:0 10px;visibility:hidden;width:0px;height:0px;margin:0px">'
        +'<input type="submit"class="kina" value="rezervovat" style="margin:0 10px;">'
    +'</div>'
  +'</div>'+
 '</form>';
 return p;
}
function loadCinemas(){
    var actualFilm = window.location.href.split('/')[window.location.href.split('/').length-1];
    // if(!loaded)
    // {
    return new Promise((resolve,reject)=>
    {
            var opm = new XMLHttpRequest();
            opm.onreadystatechange= function (){
                if(this.readyState ==4 && this.status==200)
                {
                    list=[];
                    console.log("sdfsdvs");
                    var data = JSON.parse(this.responseText)[0].kina
                    console.log(data);
                    console.log("Adoapno");
                    console.log(data);
                    data.forEach(element=>{
                        cinema.push(element);
                   
                    })
                    var opm = new XMLHttpRequest();
                    opm.onreadystatechange= function (){
                        if(this.readyState ==4 && this.status==200)
                        {
                            list=[];
                            var data = JSON.parse(this.responseText)[0].filmy;
                            console.log(data);
                            for(let i = 0; i<data.length;i+=2){               
                                data[i+1].id=data[i].way;
                                console.log(data[i+1]);
                                list.push(data[i+1]);
                                resolve();
                            }
                        }
                    }
                    opm.open('GET','/filmy/api/list');
                    opm.send();
                    loaded=true;
                    //resolve();
                }
            }
            opm.open('GET','/filmy/'+actualFilm+'/api/list');
            opm.send();
            loaded=true;
        
    });
  //  }
    return null;
}