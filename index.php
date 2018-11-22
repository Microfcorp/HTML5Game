<?php
$link = mysqli_connect('localhost', 'root', 'newpassword', 'Game');
$session = !empty($_GET['id']) ? $_GET['id'] : 0;
$player = !empty($_GET['player']) ? $_GET['player'] : 0;

$results = mysqli_query($link, "SELECT * FROM Game WHERE 1");

if($session == 0){
	while($row = $results->fetch_assoc()) {
		$session = $row['ID'] + 1;
	}
	//echo $session;
	$resultq = mysqli_query($link, "INSERT INTO `Game`(`X`, `Y`, `Score`, `ID`) VALUES ('45;590','20;619','0;0','$session')");
	header('location: index.php?id='.$session.'&player='.$player);
}
$resultsi = mysqli_query($link, "SELECT * FROM Game WHERE `ID`=".$session);

while($row = $resultsi->fetch_assoc()) {
	$x = explode(';', $row['X'])[$player];
	$y = explode(';', $row['Y'])[$player];
	$score = explode(';', $row['Score'])[$player];
}

function GetEnem($pl, $link, $session){
	$player = $pl == 0 ? 1 : 0;
	$resultsi = mysqli_query($link, "SELECT * FROM Game WHERE `ID`=".$session);

	while($row = $resultsi->fetch_assoc()) {
		$x = explode(';', $row['X'])[$player];
		$y = explode(';', $row['Y'])[$player];
		$score = explode(';', $row['Score'])[$player];
	}
	return Array($x, $y, $score, $player);
}
?>
<!doctype html>
<html>
	<head>
		<title>Моя игра</title>
		<script src="maps.js"></script>
		<script src="Pole.js"></script>
		<script src="MicrofLibrary.js"></script>
        <meta charset='utf-8' />
		<!-- <meta name="viewport" content="width=devicewidth, minimal-ui"> -->
		<style>
		.icon {
			width: 120px;
			height: 120px;
			float: left;
			background: url(img/gamepad.png) no-repeat;			
		}
		.up .icon {
			background-position: -3px -149px; /* вверх на 16px*/
			position: relative; 
			left: 120px;
			top: -60px;
			cursor: pointer;
			object-fit: cover; /* Вписываем фотографию в область */
		}
		.down .icon {
			background-position: -3px -295px; /* вверх на 16px */
			position: relative; 
			top: 60px;
			cursor: pointer;
			object-fit: cover; /* Вписываем фотографию в область */
		}
		.left .icon {
			background-position: -3px -1px; /* вверх на 16px */
			position: absolute; 
			left: 0px;
			cursor: pointer;
			object-fit: cover; /* Вписываем фотографию в область */
		}
		.right .icon {
			background-position: -305px -1px; /* вверх на 16px */
			position: absolute; 
			left: 240px;
			cursor: pointer;
			object-fit: cover; /* Вписываем фотографию в область */
		}
		.super .icon {
			background-position: -155px -151px; /* вверх на 16px */
			position: absolute; 
			cursor: pointer;
			object-fit: cover; /* Вписываем фотографию в область */
		}
		.crest {
			position: relative; 
			top: 60px;
		}
		</style>
	</head>
	<body>		
		<canvas id='example'>Обновите браузер</canvas>
		<p id="scor"></p>					
		<div id="crest" class="crest">
		<div id="gamepad" class="up">
			<button type="button" ontouchstart="processKey(new TouchEv(38))" ontouchend="upKey()" class="icon" name="button2"></button>
		</div>	
		<div id="gamepad" class="left">
			<button type="button" class="icon" ontouchstart="processKey(new TouchEv(37))" ontouchend="upKey()" name="button2"></button>
		</div>
		<div id="gamepad" class="right">
			<button type="button" class="icon" ontouchstart="processKey(new TouchEv(39))" ontouchend="upKey()" name="button2"></button>
		</div>
		<div id="gamepad" class="down">
			<button type="button" class="icon" ontouchstart="processKey(new TouchEv(40))" ontouchend="upKey()" name="button2"></button>
		</div>
		</div>	
		
			<div id="super" style="display: none;" class="super">
				<button type="button" onclick="StartSuper(0)" class="icon" name="button2"></button>
			</div>
		<img style="display: none;" id="face" src="face.png">
		<img style="display: none;" id="face1" src="face1.png">
		<img style="display: none;" id="face2" src="face2.png">
		<script>
			var example = document.getElementById("example");		
			var ctx = example.getContext('2d');
			var block = new Array();
			var player = new Player(<? echo $x ?>,<? echo $y ?>,15,15);
			player.score = <? echo $score ?>;
			var enem = new Player(<? echo GetEnem($player, $link, $session)[0]; ?>,<? echo GetEnem($player, $link, $session)[1]; ?>,15,15);
			enem.score = <? echo GetEnem($player, $link, $session)[2]; ?>;
			var AI = new Player(267,443,15,15);
			var Params = [<? echo $x ?>,<? echo $y ?>,<? echo $session ?>,<? echo $player ?>,<? echo GetEnem($player, $link, $session)[3]; ?>];
			
			/*
				strokeRect(x, y, ширина, высота) // Рисует прямоугольник
				fillRect(x, y, ширина, высота)   // Рисует закрашенный прямоугольник
				clearRect(x, y, ширина, высота)  // Очищает область на холсте размер с прямоугольник заданного размера
				moveTo(x, y) // перемещает "курсор" в позицию x, y и делает её текущей
				lineTo(x1, x2) // ведёт линию из текущей позиции в указанную, и делает в последствии указанную текущей
				arc(x, y, radius, startAngle, endAngle, anticlockwise) // рисование дуги, где x и y центр окружности, далее начальный и конечный угол, последний параметр указывает направление
				ctx.drawImage(pic, 0, 0);  // Рисуем изображение от точки с координатами 0, 0
				ctx.fillText(text, x, y); //Текст
			*/	
			
			document.addEventListener("touchmove", function(e) { e.preventDefault() });
			window.addEventListener("load", function() { window. scrollTo(0, 0); });
			document.body.ontouchstart = function(e) {
				if (e && e.preventDefault) { e.preventDefault(); }
				if (e && e.stopPropagation) { e.stopPropagation(); }
			return false;
			}
 
			document.body.ontouchmove = function(e) {
				if (e && e.preventDefault) { e.preventDefault(); }
				if (e && e.stopPropagation) { e.stopPropagation(); }
			return false;
			}
			
			var supportsTouch = ('ontouchstart' in document.documentElement);
			if(supportsTouch){
				document.getElementById("crest").style.display = 'block';
			}
			else{
				document.getElementById("crest").style.display = 'none';
			}
			/*for(var Y1 = 0; Y1 < example.width/40; Y1++){
				if(Y1%2 == 0){				
					for(var X1 = 0; X1 < example.height/40; X1++){
						if(X1%2 == 0){
							block.push(new Block(X1*40, Y1*40));
							ctx.fillRect(X1*40, Y1*40, 30+getRandomArbitrary(10, 15), 30)   // Рисует закрашенный прямоугольник
						}
					}			
				}								
			}*/
			
			// Рисуем фон лабиринта
			drawMaze("pole.png");

			// При нажатии клавиши вызываем функцию processKey()
			window.onkeydown = processKey;
			window.onkeyup = upKey;
			
		</script>
	</body>
</html>