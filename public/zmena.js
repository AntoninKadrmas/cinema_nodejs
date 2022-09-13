function ocenit(b)
{
    const tooltiptext = document.createElement('span');
    tooltiptext.className = "tooltiptext";
    var pom = "";
 a= b.className
switch(a[0])
{
case "O":
    return null;
case "S":
    pom+="sedadlo "+b.id+"<br>cena: "+a.split(" ")[1]+"kč<br>typ: " +a.split(" ")[0];
    tooltiptext.innerHTML = pom;
    return tooltiptext;
case "D":
    pom+="sedadlo "+b.id+"<br>cena: "+a.split(" ")[1]+"kč<br>typ: " +a.split(" ")[0];
    tooltiptext.innerHTML = pom;
    return tooltiptext;
case "U":
    pom+="sedadlo "+b.id+"<br>cena: "+a.split(" ")[1]+"kč<br>typ: " +a.split(" ")[0];
    tooltiptext.innerHTML = pom;
    return tooltiptext;
}
function prepareParams(){
    var pomString="";
    list.forEach(elements=>{
        pomString+=elements;
        console.log(elements);
    })
    console.log(pomString);
    return pomString;
}
function bookPlace(){
    var http = new XMLHttpRequest();
    var url = '/login';
    var params = prepareParams();
    http.open('POST', url, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }
    http.send(params);
}
}
var celkem = document.querySelector(".celkem");


function click(e)
{
var a = e.className.split(" ");
var b = a[a.length-1];
if(b == "SELECTED")   
{
    var pom = a[0];
    for (let index = 1; index < a.length-1; index++) {
        pom+=" "+a[index];   
    }
    e.className = pom;
    console.clear();
    list = list.filter(function(value){ 
        return value !=e.id;
    });
    var count = 0;
    for(let i = 0; i<list.length; i++)
    {
        var pomID = document.getElementById(list[i]);
        console.log(list[i]);
        console.log(pomID.className);
        count+=parseInt(pomID.className.split(" ")[1]);
    }
    celkem.textContent = "Celková cena: "+count+"kč";
} 
else
{
    console.clear();
    list.push(e.id);
    var count = 0;
    for(let i = 0; i<list.length; i++)
    {
    var pomID = document.getElementById(list[i]);
    console.log(list[i]);
    console.log(pomID.className);
    count+=parseInt(pomID.className.split(" ")[1]);
    }
    celkem.textContent = "Celková cena: "+count+"kč";
    e.className += " SELECTED";
}
}
function getPosition(){
    console.log(list);
    var input = document.querySelector("input[name = 'selected']");
    input.value = JSON.stringify(list);
    if(input.value=="[]"){
        return false;
    }
    var url = window.location.href.split("?");
    document.querySelector("input[name = 'time']").value= url[1].split("&")[0].split("=")[1];
    document.querySelector("input[name = 'kino']").value = url[1].split("&")[1].split("=")[1]; 
    document.getElementById("form_id").action = url[0];
    return true;
}