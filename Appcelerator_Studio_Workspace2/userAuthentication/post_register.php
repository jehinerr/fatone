<?php
$con = mysql_connect('localhost','fat','12345');
if (!$con)
{
    echo "Failed to make connection.";
    exit;
}
 
$db = mysql_select_db('userAuthentication');
if (!$db)
{
    echo "Failed to select db.";
    exit;
}
 
$username   = $_POST['username'];
$password   = $_POST['password'];
$names      = $_POST['names'];
$email      = $_POST['email'];
 
$sql        = "SELECT username,email FROM users WHERE username = '" . $username . "' OR email = '" . $email . "'";
$query      = mysql_query($sql);
if (mysql_num_rows($query) > 0)
{
    echo "That username or email already exists";
}
else
{
    $insert = "INSERT INTO users (username,password,name,email) VALUES ('" . $username . "','" . $password . "','" . $names . "','" . $email . "')";
    $query  = mysql_query($insert);
    if ($query)
    {
        echo "Thanks for registering. You may now login.";
    }
    else
    {
        echo "Insert failed";
    }
}
?>
