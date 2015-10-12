// creamos la variable para nuestra ventana
var miVentana = Ti.UI.currentWindow;
 
var dataArray = [];
 
function traerDatos(){
    var httpClient = Titanium.Network.createHTTPClient();
    // Aquí me conecto a mi servidor Apache en local
    httpClient.open('GET','http://192.168.1.175/datos.php');
    // Enviamos la peticion
    httpClient.send();
    // Obtenemos los resultados
    httpClient.onload = function()
    {
        data = JSON.parse(this.responseText);
        var dataTotal = (data.length-1);
 
        for(i=0; i<=dataTotal;i++)
        {
            // Cargamos algunos datos a nuestro array
            dataArray.push({title:'' + data[i].nombre + ''});
            // Enviar nuestro array al tableView
            tableview.setData(dataArray);
        } // fin para el loop
    }; // fin de onload
 
    // Comprobar si ocurre un error
    httpClient.onerror = function(e)
    {
        Ti.API.info("Error");
        // llamamos la función de error
        error();
    };
 
    function error()
    {
        // Aquí mostraremos una alerta del error que nos pueda devolver con createAlertDialog
        // aunque podríamos hacer simplemente un alert simple de javascript, pero este es mas didactico
        var alert = Titanium.UI.createAlertDialog(
        {
            title: 'Conexion',
            message: 'Error ' + httpClient.connected  + ' ' + httpClient.statusText,
            buttonNames: ['OK']
        });
        alert.show();
    }
}
 
// creamos el table view
var tableview = Ti.UI.createTableView({
});
 
// agregamos el tableView a nuestra ventana
miVentana.add(tableview);
 
// Llamamos a la funcion traerDatos
traerDatos();