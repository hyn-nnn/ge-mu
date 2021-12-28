let director1, director2, director3, director4, director5, director6, stage, goalFlag, gameclear;
let floorHeight;
let x, y, vx, vy, ax, g;
let bgx,bgw;

let direction;       //方向　右：１　左：−１
let jump;

function setup(){
  let canvas = createCanvas(500,250);
  canvas.parent('game');

  noStroke();
  
  floorHeight = 0.75*height;
  direction = 1;
  x = 0;
  y = floorHeight;
  vx = 0;
  vy = 0;
  ax = 0;
  g = 1;

  bgx = 0;
  bgw = width * 2;
  
  jump = 10;

//画像イメージの読み込み
  director1 = loadImage("images/director01.png");
  director2 = loadImage("images/director02.png");
  director3 = loadImage("images/director03.png");
  director4 = loadImage("images/director04.png");
  director5 = loadImage("images/director_jumpR.png");
  director6 = loadImage("images/director_jumpL.png");
  goalFlag  = loadImage("images/goalFlag.png");
  gameclear = loadImage("images/gameclear.png");
}


function draw(){
  background(102, 153, 204);
  fill(95,0,0);
  rect(0,floorHeight+30,width,floorHeight);

  velocity();
  Jump();
  drawBackground();
  drawBackgrounds(bgx);
  walkMotion();
  Goal();
}

//横移動のモーション
function walkMotion(){
  if(direction == 1){
    if(x%2 == 0){
      image(director1, x, y);
    } else{
      image(director2, x, y);
    }
    if(y < floorHeight){
      image(director5, x, y);
    }
  } else{
    if(x%2 == 0){
      image(director3, x, y);
    } else{
      image(director4, x, y);
    }
    if(y < floorHeight){
      image(director6, x, y);
    }
  }
  
  if(keyIsPressed == false){
    if(1<abs(vx)){
      vx *= 0.8;
    } else {
      vx = 0;
    }
  }
}

function keyPressed(){
  if(keyCode == RIGHT_ARROW){
    ax = 1;
    direction = 1;
  } else if(keyCode == LEFT_ARROW){
    ax = -1;
    direction = -1;
  } else if(keyCode == UP_ARROW){
    if(y == floorHeight){
      vy = -1*jump;
    }
  }
  
  //左の枠外から出ないように
  if(x < 0){
    x = 0;
  }
}

//横　速度
function velocity(){
  vx += ax;
  
  if(5 < vx){
    vx = 5;
  } else if(vx < -5){
    vx = -5;
  }
}

//上　ジャンプ
function Jump(){
  vy += g;
  y += vy;
  if(floorHeight<y){
    y = floorHeight;
  }
}

function drawBackground(){
  if(bgx <= 0){
    x += vx;
    if(width/2 < x){
      bgx += x-width/2;
      x = width/2;
    }
    if(x < 0){
      x = 0;
    }
  } else if(bgw <= bgx){
    x += vx;
    if(x < width/2){
      bgx -= width/2-x;
      x = width/2;
    }
    if(width-16 < x){
      x = width-16;
    }
  } else{
    bgx += vx;
    if(bgx < 0){
      x += bgx;
      bgx = 0;
    }
    if(bgw < bgx){
      x += bgx-bgw;
      bgx = bgw;
    }
  }
}

function drawBackgrounds (backgroundX){
  fill(255);
  ellipse(50-backgroundX,50,16,16);
  ellipse(270-backgroundX,70,16,16);
  ellipse(320-backgroundX,50,16,16);
  ellipse(530-backgroundX,60,16,16);
  
}

function Goal(){
  image(goalFlag, 450, floorHeight-20);
  if(450 < x){
    let btnX = width / 5 * 1;
    let btnY = height / 10 * 7;
    let btnW = width / 5;
    let btnH = height / 10;
    fill(0);
    rect(btnX, btnY, btnW, btnH);
    textSize(20);
    fill(255);
    text("TRY AGAIN", width / 5+10, btnY + btnH / 2+5);
    if(isInside(mouseX, mouseY, btnX, btnX + btnW, btnY, btnY + btnH)){
      if (mousePressed) {
        mapX = 0;
        mapY = 0;
        x = initX;
        y = initY;
        pcSpX = 0;
        pcSpY = 0;
        gameMode = 0;
      }
    }
    image(gameclear, 80, 0);
    textSize(60);
    text("GAME CLEAR", 60, 120);
    x = 460;
    y = floorHeight;
  }
}