var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacle1, obstacle2, obstacle3
var obstacleGroup, birdGroup;
var gameState= "play";
var score=0;
function preload(){
  bgImg = loadImage("assets/bg.png")

  balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

  balloonoverImg= loadAnimation("assets/balloon1.png")

  obstacle1 = loadImage("assets/obsBottom1.png")
  obstacle2 = loadImage("assets/obsBottom2.png")
  obstacle3 = loadImage("assets/obsBottom3.png")
  gameoverImg = loadImage("assets/EndGameBG.jpeg")

  birdImg = loadImage("assets/obsTop2.png")

  restartImg = loadImage("assets/restart.png")
  
}

function setup(){
  canvas = createCanvas(800,600);
  //background image
  bg = createSprite(400,500,800,600);
  bg.addImage(bgImg);
  
  bg.scale = 2
  bg.velocityX = -3

  //balloon 
  balloon = createSprite(100,200,50,300)
  balloon.addAnimation("balloonam" , balloonImg );
  balloon.addAnimation("over" , balloonoverImg );
  balloon.debug=true;
  balloon.setCollider("rectangle",0,0,140,540)
  balloon.scale = 0.35

  restart = createSprite(400,300,50,50);
  restart.addImage(restartImg);
  restart.visible= false;

  birdGroup = new Group();
  obstacleGroup = new Group();
  
}

function draw() {
  
  background("black");

  if(gameState === "play"){

    score = score + Math.round(frameCount/500);

  
    //Key System
    if(keyDown("SPACE")){
      balloon.velocityY =  -7
    }

    balloon.velocityY = balloon.velocityY + 0.8

    //calling functions
    spawnobstacles(); 
    spawnbirds();

    if(bg.x < 0){
      bg.x = bg.width/2

      
    }

    if(balloon.isTouching(obstacleGroup) || balloon.isTouching(birdGroup)){
      gameState = "end" 
    }

  }
  else if(gameState === "end"){
    bg.velocityX = 0

    obstacleGroup.setVelocityXEach(0);
    birdGroup.setVelocityXEach(0);
    obstacleGroup.destroyEach();
    birdGroup.destroyEach();
    
    balloon.changeAnimation("over",balloonoverImg);
    balloon.velocityY=1
    
    bg.addImage(gameoverImg);
    bg.scale= 1.2

    restart.visible= true;

    if(mousePressedOver(restart)){
      reset();
    }
    
  }


  drawSprites();
  fill("black");
  textSize(20);
  text("Score: "+ score, 20,50);
  
}

function reset(){
  gameState = "play";
  bg.addImage(bgImg)
  bg.scale = 2
  restart.visible = false;
  bg.velocityX = -3;
  score = 0;

}

function spawnobstacles(){

  if(frameCount % 240 === 0){
    obstacle = createSprite(800,440,50,50);
    //obstacle.velocityX = -3

    obstacle.velocityX = -(3+score/100);

    //lifetime
    obstacle.lifetime = 600

    r = Math.round(random(1,3))
    switch(r){
      
      case 1 : obstacle.addImage(obstacle1);
               break;
      case 2 : obstacle.addImage(obstacle2);
               break;
      case 3 : obstacle.addImage(obstacle3);
               break;
               default : break;
              
    }
    obstacle.scale = 0.17
    obstacleGroup.add(obstacle)
  }
}

  function spawnbirds(){

    if(frameCount % 170 === 0){
      bird = createSprite(900,500,50,50);
      //bird.velocityX = -3
      
      bird.velocityX = -(3+score/100);

      //lifetime
      bird.lifetime = 600
      bird.addImage(birdImg)
      bird.y = Math.round(random(25,60))
      bird.scale = 0.10
      birdGroup.add(bird);
      
    }
  }
