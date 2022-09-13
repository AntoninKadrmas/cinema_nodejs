body.innerHTML = '<div class="form"style="background:var(--reversebackground);max-width:1000px;min-width:80%;height:400px; display: flex;flex-flow: column;align-items: center;justify-content: center;border-radius:15px"></div>';  


function selectForm()
{
    var content = document.querySelector(".form");
    content.innerHTML = ""; 
    var text = 
   '<a href="/login/check" style="text-decoration:none; width:100%;display: flex;flex-flow: column;align-items: center;justify-content: center;"><button style="background-color:white;border:none;max-width:400px; width:80%;height:50px;border:none;margin:50px;border-radius:15px">login</button></a>'
   +'<a href="/login/new" style="text-decoration:none; width:100%;display: flex;flex-flow: column;align-items: center;justify-content: center;"><button style="background=color:white;border:none;max-width:400px; width:80%;height:50px;border:none;margin:50px;border-radius:15px">register</button></a>';
   content.innerHTML += text;
}
function login()
{
    var content = document.querySelector(".form");
    content.innerHTML = "";
    var text = 
     '<form action="/login/check" method="POST"style="display: flex;flex-flow: column;align-items: center;justify-content: center;">'
    +'<p style="color:white;margin:12px;">Jmeno </p><input type="textbox" style="margin:-10px  0 10px 0" name="mail" pattern=".+@.+\..+" class = "input">'
    +'<p style="color:white;margin:12px;">Heslo </p><input type="password" style="margin:-10px  0 10px 0" name="password" required class = "input">'
    +'<input type="submit" class = "submit">'
    +'</form>'
    +''
    +'';
    content.innerHTML+=text;
}
function register() 
{
    var content = document.querySelector(".form");
    content.innerHTML = "";
    var text = 
     '<form action="/login/new" method="POST"style="display: flex;flex-flow: column;align-items: center;justify-content: center;" onsubmit="return registerSubmit()">'
    +'<p style="color:white;margin:12px;">Email </p><input type="textbox" style="margin:-10px  0 10px 0" name="mail" pattern=".+@.+\..+" class = "input">'
    +'<p style="color:white;margin:12px;">Jmeno </p><input type="textbox" style="margin:-10px  0 10px 0" name="name" required class = "input">'
    +'<p style="color:white;margin:12px;">Heslo </p><input type="password"style="margin:-10px  0 10px 0" name="password" required class = "input">'
    +'<p style="color:white;margin:12px;">Heslo Znovu</p><input type="password" style="margin:-10px  0 10px 0" required class = "input">'
    +'<input type="submit" class = "submit">'
    +'</form>'
    +'';
    content.innerHTML+=text;
}
    console.log(window.location.href.split('/')[window.location.href.split('/').length-1]);
    switch(window.location.href.split('/')[window.location.href.split('/').length-1]){
    case "login":
        document.onload = selectForm();
        break;
    case "check":
        document.onload = login();
        break;
    case "new":
        document.onload = register();
        break;
    }

function registerSubmit(){
    const inputs = document.querySelectorAll('input');
    if(inputs[2].value.length<8){
        alert("Heslo musí být delší jak osm znaků.");
        return false;
    }
    else if(inputs[2].value!=inputs[3].value){
        alert("Zadal jste rozdílná helsa");
        return false;
    }
   return true;
}