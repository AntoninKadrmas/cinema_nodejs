var lastPOcetVSkupin=0;
function startFilm()
{
  var pom = parseInt(window.innerWidth);
  console.log(pom);

  if(pom>1000){
    pocetVSkupin = 4;
    if(lastPOcetVSkupin!=pocetVSkupin)    {vsechnyFilmy();lastPOcetVSkupin=pocetVSkupin;};
    // document.querySelector('ul').style.flexFlow = "row";
    // document.querySelector('.header').style.flexFlow = "row";
  }
  else if(pom>700){
    pocetVSkupin = 3;
    if(lastPOcetVSkupin!=pocetVSkupin) {vsechnyFilmy();lastPOcetVSkupin=pocetVSkupin;};
    // document.querySelector('ul').style.flexFlow = "row";
    // document.querySelector('.header').style.flexFlow = "column";
   }
 else if(pom>450){
    pocetVSkupin = 2;
    if(lastPOcetVSkupin!=pocetVSkupin) {vsechnyFilmy();lastPOcetVSkupin=pocetVSkupin;};
    // document.querySelector('.header').style.flexFlow = "column";
    // document.querySelector('ul').style.flexFlow = "column";
   }
   else{ pocetVSkupin = 1;
    if(lastPOcetVSkupin!=pocetVSkupin) {  vsechnyFilmy();lastPOcetVSkupin=pocetVSkupin;};
  }
 
}  
document.onload = startFilm();
window.addEventListener('resize', function(event) {
  startFilm();

}, true);
