class Block {

  constructor(x, y) {
    this.x = x;
	this.y = y;
  }

  X() {
    return this.x;
  }
  
  Y() {
    return this.Y;
  }
  
  /*ScaleX() {
    return this.wi;
  }
  
  ScaleY() {
    return this.he;
  }*/
}

class Player {

  constructor(x, y, wi, he) {
    this.x = x;
	this.y = y;
	this.wi = wi;
	this.he = he;
	this.dx = 0;
	this.dy = 0;
	this.score = 0;
  }

  X() {
    return this.x;
  }
  
  Y() {
    return this.Y;
  }
  
  ScaleX() {
    return this.wi;
  }
  
  ScaleY() {
    return this.he;
  }
	
}

class TouchEv{
	constructor(keyCode) {
    this.keyCode = keyCode;
  }
}

function getRandomArbitrary(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}
function checkForCollision(Player) {
  // Перебираем все пикселы и инвертируем их цвет
  var imgData = ctx.getImageData(Player.x-1, Player.y-1, 15+2, 15+2);
  var pixels = imgData.data;

  // Получаем данные для одного пиксела
  for (var i = 0; n = pixels.length, i < n; i += 4) {
    var red = pixels[i];
    var green = pixels[i+1];
    var blue = pixels[i+2];
    var alpha = pixels[i+3];

    // Смотрим на наличие черного цвета стены, что указывает на столкновение
    if (red == 0 && green == 0 && blue == 0) {
      return true;
    }
    // Смотрим на наличие серого цвета краев, что указывает на столкновение
    if (red == 169 && green == 169 && blue == 169) {
      return true;
    }
  }
  // Столкновения не было
  return false;
}

function Trigger(Player1, Player2){
			var result = false;
            var result1 = false;

            for (var i = 0; i < Player2.he; i++)
            {
                for (var ia = 0; ia < Player1.he; ia++)
                {
                    if (Player2.y + i + -ia == Player1.y)
                    {
                        result1 = true;
                    }
                }
            }
            if (result1)
            {
                for (var i = 0; i < Player2.wi; i++)
                {
                    for (var ia = 0; ia < Player1.wi; ia++)
                    {
                        if (Player2.x + i + -ia == Player1.x)
                        {
                            result = true;
                        }
                    }
                }
            }
            return result;
}

// Таймер, включающий и отключающий новый лабиринт в любое время
var timer, timer1, timer2;

function drawMaze(mazeFile) {
  // Остановить таймер (если запущен)
  clearTimeout(timer);
  clearTimeout(timer1);
  clearTimeout(timer2);

  // Остановить перемещение значка
  player.dx = 0;
  player.dy = 0;

  // Загружаем изображение лабиринта
  var imgMaze = new Image();
  imgMaze.onload = function() {

	// Изменяем размер холста в соответствии 
	// с размером изображения лабиринта
    example.width = imgMaze.width;
    example.height = imgMaze.height;
  
    // Рисуем лабиринт
    ctx.drawImage(imgMaze, 0,0);					
	
	if(checkForCollision(player)){
		ctx.fillStyle = "white";
		ctx.fillRect(player.x-5, player.y-5, 25, 25);	
	}
	
    var imgFace = document.getElementById("face");
    ctx.drawImage(imgFace, player.x, player.y);
	var imgFace2 = document.getElementById("face2");
    ctx.drawImage(imgFace2, AI.x, AI.y);
    ctx.stroke();

    // Рисуем следующий кадр через 10 миллисекунд
    timer = setTimeout("drawFrame()", 10);
	timer1 = setTimeout("GetPers()", 300);
	timer2 = setTimeout("FrameAI()", 1000);
  };
  imgMaze.src = mazeFile;
}

function upKey(){
  player.dx = 0;
  player.dy = 0;
}
var tmp = "", st = 0;
function processKey(e) {
  // Если значок находится в движении, останавливаем его
  
  
if(e.keyCode == 0x20){
	  tmp = tmp+",["+player.dx+","+player.dy+","+st+"]"
	  st = 0;
	  console.log(tmp);
  }
  
  player.dx = 0;
  player.dy = 0;
  
  // Если нажата стрелка вверх, начинаем двигаться вверх
  if (e.keyCode == 38) {
    player.dy = -1;	
  }

  // Если нажата стрелка вниз, начинаем двигаться вниз
  if (e.keyCode == 40) {
    player.dy = 1;
  }

  // Если нажата стрелка влево, начинаем двигаться влево
  if (e.keyCode == 37) {
    player.dx = -1;
  }

  // Если нажата стрелка вправо, начинаем двигаться вправо
  if (e.keyCode == 39) {
    player.dx = 1;
  }
  
}
var sending = false;
function GetPers(){
	if(!sending){
		sending = true;
	postAjax("get.php", "POST", "player="+Params[3]+"&session="+Params[2], function(d){
		
		var sx = enem.x, sy = enem.y;
		
		enem.x = d.split('/n')[Params[4]].split(';')[0];
		enem.y = d.split('/n')[Params[4]].split(';')[1];
		enem.score = parseInt(d.split('/n')[Params[4]].split(';')[2], 10);
		
		player.score = parseInt(d.split('/n')[Params[3]].split(';')[2], 10);
		
		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.rect(sx, sy, 15, 15);
		ctx.fill();					
		
		var imgFace1 = document.getElementById("face1");
		ctx.drawImage(imgFace1, enem.x, enem.y);					
		
		sending = false;
	});	
	}
	timer1 = setTimeout("GetPers()", 300);
}
function Trigging(){
	if(Trigger(enem, player) || Trigger(player, enem)){
		player.score += 1;
		ctx.beginPath();
		ctx.fillStyle = /*"rgb(254,244,207)"*/ "white";
		ctx.rect(player.x, player.y, 15, 15);
		ctx.fill();
		if(Params[3] == 0){
			player.x = 45;
			player.y = 20;
		}
		else{
			player.x = 590;
			player.y = 619;
		}
		postAjax("set.php", "POST", "x="+player.x+"&y="+player.y+"&score="+player.score+"&player="+Params[3]+"&session="+Params[2], function(d){});		
	}
	if(Trigger(player, AI) || Trigger(AI, player)){
		if(player.score > 0){
		player.score -= 1;
		}
		ctx.beginPath();
		ctx.fillStyle = /*"rgb(254,244,207)"*/ "white";
		ctx.rect(player.x, player.y, 15, 15);
		ctx.fill();
		if(Params[3] == 0){
			player.x = 45;
			player.y = 20;
		}
		else{
			player.x = 590;
			player.y = 619;
		}
		postAjax("set.php", "POST", "x="+player.x+"&y="+player.y+"&score="+player.score+"&player="+Params[3]+"&session="+Params[2], function(d){});		
	}
}
var isSuper = false;
function StartSuper(e){
	if(e == 0){
	if(player.score > 15){
		player.score -= 8;
		postAjax("set.php", "POST", "x="+player.x+"&y="+player.y+"&score="+player.score+"&player="+Params[3]+"&session="+Params[2], function(d){});		
		isSuper = true;
		setTimeout("StopSuper(0)", 5000);
	}
	}
}	
function StopSuper(e){
	if(e == 0){
		isSuper = false;
	}
}
function clamp(value, min, max){
    if(value < min) return min;
    else if(value > max) return max;
    return value;
}
function Stepper(dx, dy, steep){
	for(var i = 0; i < steep; i++){
		// Закрашиваем перемещение значка желтым цветом
		ctx.beginPath();
		ctx.fillStyle = /*"rgb(254,244,207)"*/ "white";
		ctx.rect(AI.x, AI.y, 15, 15);	
		ctx.fill();
		
		AI.x += dx;
		AI.y += dy;
		
		if (checkForCollision(AI)) {
			AI.x -= dx;
			AI.y -= dy;
		}
		
		AI.x = parseInt(AI.x, 10);
		AI.y = parseInt(AI.y, 10);
		
		// Перерисовываем значок
		var imgFace2 = document.getElementById("face2");
		ctx.drawImage(imgFace2, AI.x, AI.y);
	}
}
function StepReverse(e){
	if(e == -1){return 1;}
	if(e == 1){return -1;}
	if(e == 0){return 0;}
}
var steparr = 0, sled = false, reverse = false;
function FrameAI(){
	
	var arr = GetMaps();
	
	if(!sled){
		if(reverse){
			reverse = false;
			arr = arr.reverse();
		}
		Stepper(arr[steparr][0],arr[steparr][1],arr[steparr][2]);
		if(steparr == arr.length - 1){
			sled = true;
			steparr = 0;
		}
		else{
		steparr += 1;
		}
	}
	else{
		if(!reverse){
			reverse = true;
			arr = arr.reverse();
		}		
		//alert(arr);
		//console.log(StepReverse(arr[steparr][0])+' '+StepReverse(arr[steparr][1])+' '+arr[steparr][2])
		Stepper(StepReverse(arr[steparr][0]),StepReverse(arr[steparr][1]),arr[steparr][2]);
		if(steparr == arr.length - 1){
			sled = false;	
			steparr = 0;			
		}
		else{
		steparr += 1;
		}
	}
	Trigging();
	timer2 = setTimeout("FrameAI()", 1500);
}
function drawFrame() {	
	document.getElementById("scor").innerHTML = player.score+"/"+enem.score;
	if(player.score >= 15){
		document.getElementById("super").style.display = "block";
	}
	else{
		document.getElementById("super").style.display = "none";
	}
	
	if(isSuper){
		ctx.strokeStyle = "red";
		ctx.strokeRect(player.x-10, player.y-10, player.he+20, player.wi+20);
	}
  
  // Обновляем кадр только если значок движется
  if (player.dx != 0 || player.dy != 0) {	
    // Закрашиваем перемещение значка желтым цветом
    ctx.beginPath();
    ctx.fillStyle = /*"rgb(254,244,207)"*/ "white";
    ctx.rect(player.x, player.y, 15, 15);	
    ctx.fill();

    // Обновляем координаты значка, создавая перемещение
    player.x += player.dx;
    player.y += player.dy;	
	
	st++;
	
	postAjax("set.php", "POST", "x="+player.x+"&y="+player.y+"&score="+player.score+"&player="+Params[3]+"&session="+Params[2], function(d){});		

    // Проверка столкновения со стенками лабиринта
	// (вызывается доп. функция)
    if (checkForCollision(player)) {
      player.x -= player.dx;
      player.y -= player.dy;
      player.dx = 0;
      player.dy = 0;
    }

	player.x = parseInt(player.x, 10);
	player.y = parseInt(player.y, 10);
	
    // Перерисовываем значок
    var imgFace = document.getElementById("face");
    ctx.drawImage(imgFace, player.x, player.y);			
    Trigging();
  }

  // Рисуем следующий кадр через 10 миллисекунд
  timer = setTimeout("drawFrame()", 10);
}