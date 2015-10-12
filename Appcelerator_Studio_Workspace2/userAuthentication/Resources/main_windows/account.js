var win = Titanium.UI.currentWindow;
 
/*
* Interface
*/
var scrollView = Titanium.UI.createScrollView({
    contentWidth:'auto',
    contentHeight:'auto',
    top:0,
    showVerticalScrollIndicator:true,
    showHorizontalScrollIndicator:false
});
win.add(scrollView);
 
//Se crea textfield de username
var username = Titanium.UI.createTextField({
    color:'#336699',
    top:10,
    left:10,
    width:300,
    height:40,
    hintText:'Username',
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
scrollView.add(username);
 
//Se crea textfield de password 
var password1 = Titanium.UI.createTextField({
    color:'#336699',
    top:60,
    left:10,
    width:300,
    height:40,
    hintText:'Password',
    passwordMask:true,
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
scrollView.add(password1);

//Se crea textfield de password confirmacion
var password2 = Titanium.UI.createTextField({
    color:'#336699',
    top:110,
    left:10,
    width:300,
    height:40,
    hintText:'Password Again',
    passwordMask:true,
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
scrollView.add(password2);
 
//Se crea textfield de nombres
var names = Titanium.UI.createTextField({
    color:'#336699',
    top:160,
    left:10,
    width:300,
    height:40,
    hintText:'Name',
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
scrollView.add(names);
 
//Se crea textfield de email
var email = Titanium.UI.createTextField({
    color:'#336699',
    top:210,
    left:10,
    width:300,
    height:40,
    hintText:'email',
    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
scrollView.add(email);
 
//Se crea botón crear cuenta
var createBtn = Titanium.UI.createButton({
    title:'Crear Cuenta',
    top:260,
    width:130,
    height:35,
    borderRadius:1,
    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});
scrollView.add(createBtn);

var testresults;
 
//Funcion que revisa el email 
function checkemail(emailAddress)
{
    var str = emailAddress;
    var filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (filter.test(str))
    {
        testresults = true;
    }
    else
    {
        testresults = false;
    }
    return (testresults);
};
 
//Variable create request para el HTTP Client 
var createReq = Titanium.Network.createHTTPClient();
createReq.onload = function()
{
    if (this.responseText == "Fallo al insertar" || this.responseText == "Ya existe el nombre o el email")
    {
        createBtn.enabled = true;
        createBtn.opacity = 1;
        alert(this.responseText);
    } 
    else
    {
        var alertDialog = Titanium.UI.createAlertDialog({
            title: 'Alert',
            message: this.responseText,
            buttonNames: ['OK']
        });
        alertDialog.show();
        alertDialog.addEventListener('click',function(e)
        {
            win.tabGroup.setActiveTab(0);
        });
    }
};
 
//Listener del botón crear
createBtn.addEventListener('click',function(e)
{
    if (username.value != '' && password1.value != '' && password2.value != '' && names.value != '' && email.value != '')
    {
        if (password1.value != password2.value)
        {
            alert("Las contraseñas no coinciden");
        }
        else
        {
            if (!checkemail(email.value))
            {
                alert("Ingresa un email válido");
            }
            else
            {
                createBtn.enabled = false;
                createBtn.opacity = 0.3;
                //Se pone la IP del equipo en el cual se esta realizando el servidor apache
                //Se pone el archivo post_register.php en el htdocs del XAMPP
                createReq.open("POST","http://192.168.137.100/post_register.php");
                var params = {
                    username: username.value,
                    password: Ti.Utils.md5HexDigest(password1.value),
                    names: names.value,
                    email: email.value
                };
                createReq.send(params);
            }
        }
    }
    else
    {
        alert("Se requieren todos los campos");
    }
});

//Se reciben los datos en account.js
createReq.onload = function()
{
    if (this.responseText == "Fallo al insertar" || this.responseText == "Ya existe el nombre o el email")
    {
        win.remove(overlay);
        alert(this.responseText);
    } 
    else
    {
        var alertDialog = Titanium.UI.createAlertDialog({
            title: 'Alert',
            message: this.responseText,
            buttonNames: ['OK']
        });
        alertDialog.show();
        alertDialog.addEventListener('click',function(e)
        {
            win.tabGroup.setActiveTab(0);
        });
    }
};
