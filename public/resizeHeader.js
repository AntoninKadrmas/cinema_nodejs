function start()
{
  var pom = parseInt(window.innerWidth);
  console.log(pom);

  if(pom>550){
    document.querySelector('ul').style.flexFlow = "row";
    document.querySelector('.header').style.flexFlow = "row";
    document.querySelector('.helper').style.height ="100px" ;
  }
  else if(pom>200){
    document.querySelector('ul').style.flexFlow = "row";
    document.querySelector('.header').style.flexFlow = "column";
    document.querySelector('.helper').style.height = "206px";
   }
}  
document.onload =start();
window.addEventListener('resize', function(event) {
  start();
}, true);