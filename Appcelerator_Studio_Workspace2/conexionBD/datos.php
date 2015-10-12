<?php
$conexion = mysql_connect("localhost", "fat", "12345");
mysql_select_db("userAuthentication", $conexion);
 
$queTareas = "SELECT * FROM users ORDER BY username ASC";
$resTareas = mysql_query($queTareas, $conexion) or die(mysql_error());
$totTareas= mysql_num_rows($resTareas);
 
$arr = array();
 
if ($totTareas> 0) {
   while ($rowTareas = mysql_fetch_array($resTareas)) {
      $arr[] = $rowTareas;
   }
}
 
echo json_encode($arr);
 
?>
