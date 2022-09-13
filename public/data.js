
var list = [
    // { nazev: 'Dune', zanr: 'drama sci-fi', img: '/public/img/film2.jpg' },
    // {nazev: 'Resident evil', zanr: 'akce horor drama', img: '/public/img/film3.jpg'},
    // {nazev: 'Matrix Resurrections', zanr: 'akce sci-fi drama', img: '/public/img/film1.jpg'},
    // {nazev: 'Spiderman no way home', zanr: 'akce sci-fi drama komedie', img: '/public/img/film4.jpg'},
    // {nazev: 'Uncharted', zanr: 'akce komedie drama', img: '/public/img/film5.jpg'},
    // {nazev: 'The Batman', zanr: 'drama akce thriller', img: '/public/img/film6.jpg'},
    // {nazev: 'Doctor Strange v mnohovesmíru šílenství', zanr: 'akce fantasy drama hrror', img: '/public/img/film7.jpg'}
];
loaded =false;
async function vsechnyFilmy()
{
    await loadFilms();
    newOne = 0;
    hlavni.innerHTML = "";
     red= 255;
     green = 145;
     var count = 0;
     list.forEach(element=>
        {
            AddFilm(element.nazev,element.zanr ,element.img,element.id);
            count++;
        }
        );
console.log(list)
}
function loadFilms(){
    console.log("Ahoj");
    if(!loaded)
    {
    return new Promise((resolve,reject)=>
    {
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
        
    });
    }
    return null;
}
