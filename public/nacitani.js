
var list = [];
var sekce = document.querySelector(".pole");
var mista = [];
showSedadla();
async function showSedadla(){
    await loadSedadla();
    const character = String.fromCharCode(65);
    for (let i = 0; i < mista.length; i++)
    {
        const flex = document.createElement('div');
        flex.id = i;
        flex.className="flexbox";
        const character = String.fromCharCode(i+65);
        const ctverec = document.createElement('div');
        ctverec.id = character;
        ctverec.textContent = character;
        ctverec.className = "pismeno item";
        ctverec.style.color = "black";
        flex.appendChild(ctverec);
        var lisMist = mista[i].split(" ");
        var count=1;
    for (let index = 0; index < lisMist.length; index++) {
        if(lisMist[index]=="null")
        {
            flex.appendChild(Bilo());
        }
        else{
            const ctverec = document.createElement('div');
            ctverec.className =classMap(lisMist[index])+" item tooltip";
            ctverec.id = character+"|"+count.toString();
            if (ctverec.className[0]!="O") {
                ctverec.onclick = function(){click(ctverec);};
                ctverec.style.cursor = "pointer"; 
            }
           try
           {
            ctverec.appendChild(ocenit(ctverec));
           }catch{};
            flex.appendChild(ctverec);
            count++;
        }
    }
    
    flex.appendChild(Bilo());
    sekce.appendChild(flex);
    }
}

function classMap(misto)
{
    var pom = "";
switch(misto.split(":")[0])
{
    case "S":
        pom+="Standard "+misto.split(":")[1];
        break;
    case "D":
        pom+="Deluxe "+misto.split(":")[1];
        break;
    case "U":
        pom+="UltraDeluxe "+misto.split(":")[1];
        break;
    case "O":
    pom+="Obsazeno "+misto.split(":")[1];
        break;

}
    return pom;
}
function Bilo()
{
    var bilo = document.createElement('div');
bilo.className = "item";
return bilo;
}
function loadSedadla(){
    var actualFilm = window.location.href.split('/');

    return new Promise((resolve,reject)=>
    {
            var opm = new XMLHttpRequest();
            opm.onreadystatechange= function (){
                if(this.readyState ==4 && this.status==200)
                {
                    list=[];
                    var data = JSON.parse(this.responseText)[0].sedadla[0];
                    var count =0;
                   data.struktura.forEach(element => {
                        var pomString = ConvertToBetterForm(element[0],data.price);
                        element.forEach(sedadla=>{
                            if(count!=0) pomString+=" "+ConvertToBetterForm(sedadla,data.price);
                            count++;
                        });
                        mista.push(pomString);
                       count=0;
                    });
                    resolve();
                }
            }
            opm.open('GET','/filmy/'+actualFilm[actualFilm.length-2]+'/'+actualFilm[actualFilm.length-1].split('?')[0]+'/api/list?'+actualFilm[actualFilm.length-1].split('?')[1]);
            opm.send();
            loaded=true;
        
    });
    return null;
}
function ConvertToBetterForm(type,price){
    var pom = "";
    switch(type)
    {
        case "S":
            pom+=type+":"+price.S+" ";
            break;
        case "D":
            pom+=type+":"+price.D+" ";
            break;
        case "U":
            pom+=type+":"+price.U+" ";
            break;
        case "O":
            pom+=type+":"+0+" ";
            break;
        case "N":
            pom="null ";
    
    }
        return pom.substring(0,pom.length-1);
}