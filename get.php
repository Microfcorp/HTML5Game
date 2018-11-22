<?php
$link = mysqli_connect('localhost', 'root', 'newpassword', 'Game');

$session = $_POST['session'];
	
$results = mysqli_query($link, "SELECT * FROM Game WHERE `ID`='$session'");	
	
while($row = $results->fetch_assoc()) {
	$x1 = explode(';', $row['X'])[0];
	$y1 = explode(';', $row['Y'])[0];
	$score1 = explode(';', $row['Score'])[0];
	
	$x2 = explode(';', $row['X'])[1];
	$y2 = explode(';', $row['Y'])[1];
	$score2 = explode(';', $row['Score'])[1];
	
	exit($x1.";".$y1.';'.$score1."/n".$x2.";".$y2.';'.$score2);
}
?>