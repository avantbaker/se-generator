<?php

error_reporting(E_ALL ^ E_NOTICE);
ini_set('display_errors', '1');

/*----------------------------------------------------------------------------
 Site Configuration
-----------------------------------------------------------------------------*/

/* General Settings */
date_default_timezone_set('GMT');
define('TIMESTAMP', date("Y-m-d H:i:s"));

/* Protocol Setting */
if (empty($_SERVER['HTTPS'])) {
	define('PROTOCOL', 'http://');
}
else {
	define('PROTOCOL', 'https://');
}

/* Absolute Server Path Setting */
define('ABSOLUTE_SERVER_PATH', str_replace('includes/base.php', '', __FILE__));

/* Absolute Domain Path Setting */
define('ABSOLUTE_DOMAIN_PATH', PROTOCOL . $_SERVER['HTTP_HOST'] . dirname($_SERVER["PHP_SELF"]) . '');
define('ABSOLUTE_DOMAIN_ROOT', PROTOCOL . $_SERVER['HTTP_HOST'] .  '');

/* Database Settings */
$dsn = 'mysql:dbname=***********;host=localhost';
$user = '*********';
$password = '******';


$pdo = new PDO($dsn, $user, $password);



