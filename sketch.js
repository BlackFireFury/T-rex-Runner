var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score,gameover,gameover1,restart,restart1;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameover = loadImage("gameOver.png")
  restart = loadImage("restart.png")
}


function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  trex.setCollider("circle",0,0,40);
 
  score = 0
  gameover1 = createSprite(300,50,10,10);
  gameover1.addImage("gameo",gameover);
  gameover1.visible=false;

  restart1 = createSprite(300,150,10,10);
  restart1.addImage("restarto",restart);
  restart1.visible=false;
}

function draw() {
  background("white")
  
  text("Score: "+ score, 500,50);
   
  if(gameState === PLAY){
    ground.velocityX = -5;
    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& trex.y >=100) {
        trex.velocityY = -13;
    }
    
    trex.velocityY = trex.velocityY + 0.8
    spawnClouds();
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
    if (gameState === END) {
      ground.velocityX = 0;
     trex.changeAnimation("collided",trex_collided);
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     obstaclesGroup.setLifetimeEach(-1);
     cloudsGroup.setLifetimeEach(-1);
     trex.velocityY=0;
     gameover1.visible=true;
     restart1.visible=true;
 
     if(mousePressedOver(restart1)){
    reset();
    }
   }
  trex.collide(invisibleGround);
  console.log("Score ="+score);
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacles = createSprite(600,165,10,40);
   obstacles.velocityX = -5;
   
    var A = Math.round(random(1,6));
    switch(A) {
      case 1: obstacles.addImage(obstacle1);
              break;
      case 2: obstacles.addImage(obstacle2);
              break;
      case 3: obstacles.addImage(obstacle3);
              break;
      case 4: obstacles.addImage(obstacle4);
              break;
      case 5: obstacles.addImage(obstacle5);
              break;
      case 6: obstacles.addImage(obstacle6);
              break;
      default: break;
    }
   
    obstacles.scale = 0.5;
    obstacles.lifetime = 300;
    obstacles.depth=restart1.depth;
   restart1.depth=restart1.depth+1;
   
    obstaclesGroup.add(obstacles);
 }
}

function spawnClouds() {
   if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.7;
    cloud.velocityX = -3;
    cloud.lifetime = 210;
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
    gameover1.depth=gameover.depth+1;
     
   cloudsGroup.add(cloud);
    }
}

function reset(){
  
 gameState=PLAY;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  gameover1.visible=false;
  restart1.visible=false;
  score=0;
  
}