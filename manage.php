<html>
	<head>
		<title>Моя игра</title>
        <meta charset='utf-8' />
		<!-- <meta name="viewport" content="width=devicewidth, minimal-ui"> -->
		<script>
		var session = 0;
		function NewSession(e){
			if(e == ""){
				session = 0;
			}
			else{
				session = e;
			}
			document.getElementById('step1').style.display = "none";
			document.getElementById('step2').style.display = "block";
		}
		
		function SetPlayer(e){
			location.href = "index.php?id="+session+"&player="+e;
		}
		</script>
	</head>
	<body>
		<div id="step1">
		<H1>Добро пожаловать в HTML5-CSS-JS-PHP игру "Прятки"</H1>
		<H3>Выберите сессию или нажмите создать новую</H3>
		<input type="text" placeholder="Номер сессии" id="nummsession" oninput="if(document.getElementById('nummsession').value != ''){document.getElementById('newsession').innerHTML = 'Продолжить';}else{document.getElementById('newsession').innerHTML = 'Новая сессия';}" />
		<button type="button" id="newsession" onclick="NewSession(document.getElementById('nummsession').value)">Новая сессия</button>
		</div>
		<div style="display: none;" id="step2">
		<H1>Добро пожаловать в HTML5-CSS-JS-PHP игру "Прятки"</H1>
		<H3>Выберите игрока</H3>
		<button type="button" onclick="SetPlayer(0)">Игрок 1</button>
		<button type="button" onclick="SetPlayer(1)">Игрок 2</button>
		</div>
		<p id="scor"></p>
	</body>
</html>