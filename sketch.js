var bedda, beddaImg, carne, carneImg, corazon, corazonImg;
var pilares, pilaresImg, bc, bcImg;
var pisoinv;
var obstaclesGroup;
var gameState = "play";
var meatGroup;
var restart, restartImg;
var score = 0;
var lives = [];



function preload(){
  beddaImg = loadImage("Bedda.png");
  carneImg = loadImage("carne.png");
  corazonImg = loadImage("Corazon.png");
  pilaresImg = loadImage("Pilar.png");
  bcImg = loadImage("bc.png");
  restartImg = loadImage("restart.png");
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  bc = createSprite(500,500,1000,20);
  bc.addImage(bcImg);
  bc.scale=0.3;

  bedda = createSprite(70,530,100,50);
  bedda.addImage(beddaImg);
  bedda.scale = 1.7;

  pisoinv = createSprite(70,580,500,20);
  pisoinv.visible = false;

  restart = createSprite(width/2, height/2-150);
  restart.addImage(restartImg);
  restart.scale = 0.06;
  

  for(var i = 0; i < 3; i++){
    corazon = createSprite((width - 140) - 50*i, 30);
    corazon.addImage(corazonImg);
    corazon.scale = 0.035;
    //lives.push(i);
  }
  console.log(lives);

  obstaclesGroup = new Group();
  meatGroup = new Group();

  bedda.setCollider("circle",0,0,20);
  bedda.debug = true;
}

function draw(){
  background("white");
  
  if(meatGroup.isTouching(bedda)){
    score = score +10
    meatGroup.destroyEach(); 
  }
  
  restart.visible = false;
  bedda.collide(pisoinv);
  
  if(gameState === "play"){
    bc.velocityX = -4;
    if(bc.x < 0 ){
      bc.x = (width/1.5);
    }
  
    if(keyDown("space") && bedda.y > 500){
      bedda.velocityY = -13;
    }
  
    if(keyDown("space")&& keyDown("c") && bedda.y > 500){
      bedda.velocityY = -17;
    }
  
    console.log(bedda.y);
    bedda.velocityY = bedda.velocityY + 0.5;

    obstacles();
    meat();

    if(obstaclesGroup.isTouching(bedda)){
      bedda.velocityY = 0;
      bc.velocityX = 0;
      gameState = "end";
    }

    textSize(30);
    text("Vidas: ", width - 350, 40)
    textSize(20);
    text("Pulsa espacio para saltar, combina esta tecla con el boton C para un super salto", 20,20);
    textSize(30);
    text("Puntuacion:" + score, width -350, 70);
  }
  
  else if(gameState === "end"){
    restart.visible = true;
    stroke("red");
    fill("red");
    textSize(50);
    text("Game Over", width/2 -100 , height/2 -200);
    obstaclesGroup.setVelocityXEach(0);
    meatGroup.destroyEach()
    obstaclesGroup.setLifetimeEach(-1);
    //for(var j = 2; j >= 0; j--){
      //lives.pop(corazon.destroy());
      
    //}
    

    if(mousePressedOver(restart)) {
      reset();

      
    }
  }

  drawSprites();
  
}

function obstacles(){
  if(frameCount%100 === 0){
    var obstaculo = createSprite(width,500,50,100);
    obstaculo.velocityX = -10;
    obstaculo.addImage(pilaresImg);
    var rand = Math.round(random(1,2));
    switch(rand){
      case 1: 
        obstaculo.scale = 0.3;
        obstaculo.setCollider("rectangle",0,0,380,500);
        break;
      case 2:
        obstaculo.scale = 0.6;
        obstaculo.setCollider("rectangle",0,0,250,500);
        break;
      default: break;
    }
    obstaclesGroup.add(obstaculo);
    obstaculo.debug = true;
  }
}

function meat(){
  if(frameCount%240 === 0){
  carne = createSprite(width,Math.round(random(250,300)),50,50);
  carne.addImage(carneImg);
  carne.scale = 0.05;
  carne.velocityX = -8;
  meatGroup.add(carne);
  } 
}

function reset(){
  gameState = "play";
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  score = 0;
  corazon = corazon - 1
}