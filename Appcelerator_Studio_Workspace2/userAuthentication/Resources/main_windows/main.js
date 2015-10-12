//Se crea la ventana
var win = Titanium.UI.currentWindow;
 
//Label para mostrar el mensaje de logeo
var msg = Titanium.UI.createLabel({
    text:"Acabas de realizar correctamente la demostración de Autenticación de Usuarios elaborada por FatOne para WebDev \n\nTu email es:\n" 
    + win.email 
    + "\n\nTu nombre es:\n" + win.name,
    top:10,
    left:10,
    width:300,
    height:'auto'
});
win.add(msg);

var ventanaBtn = Titanium.UI.createButton({
    title:'Ventana',
    top:110,
    width:90,
    height:35,
    borderRadius:1,
    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});
win.add(ventanaBtn);