<?php
$link = mysqli_connect('localhost', 'root', 'newpassword', 'Game');

$x = $_POST['x'];
$y = $_POST['y'];
$score = $_POST['score'];
$player = !empty($_POST['player']) ? 1 : 2;
$session = $_POST['session'];
$X = ""; $Y = "";
$results = mysqli_query($link, "SELECT * FROM Game WHERE `ID`='$session'");

while($row = $results->fetch_assoc()) {
	if($player == 1){
		$X = explode(';', $row['X'])[0].";".$x;
		$Y = explode(';', $row['Y'])[0].";".$y;
		$Score =  explode(';', $row['Score'])[0].";".$score;
	}
	elseif($player == 2){
		$X = $x.";".explode(';', $row['X'])[1];
		$Y = $y.";".explode(';', $row['Y'])[1];
		$Score = $score.";".explode(';', $row['Score'])[1];
	}
}

$resultq = mysqli_query($link, "UPDATE `Game` SET `X`='$X',`Y`='$Y',`Score`='$Score' WHERE `ID`='$session'");
?>