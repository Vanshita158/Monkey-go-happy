var PLAY=1;
var END=0;
gameState= PLAY;

var monkey, monkey_Running;
var bananaImg, bananaGroup;
var obstacleGroup,obstacle_Img;
var ground;

var score;

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImg = loadImage("banana.png");

  obstacle_Img = loadImage("obstacle.png");

}

function setup() {
  createCanvas(600, 200);

  monkey = createSprite(41, 151);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;



  // ground move
  ground = createSprite(300, 190, 600, 20);
      ground.velocityX = -4;

  ground.x = ground.width / 2;

  
  bananaGroup= new Group();
  obstacleGroup= new Group();
  
  score=0;
}

function draw() {
  background("cyan");

  text("(" + mouseX + "," + mouseY + ")", mouseX, mouseY);
  // ground
  monkey.collide(ground);
  obstacleGroup.collide(ground);
  if(ground.x<0){
    ground.x=ground.width/2;
  }

  var survivalTime=0;
  textSize(20);
  fill("white");
  
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime= Math.ceil(frameCount/frameRate());
  text("Survival Time:"+survivalTime,100,50);
  
  
    //monkey jump
  if (keyDown("space") && monkey.y > 130) {
    monkey.velocityY = -10;
  }
   food();
   spawnObstacles();
  
  
   if(obstacleGroup.isTouching(monkey)){
                               
                             
      bananaGroup.setVelocityXEach=0;
      obstacleGroup.setVelocityXEach=0;
      bananaGroup.setLifetimeEach(-1);
      obstacleGroup.setLifetimeEach(-1);
      ground.velocityX=0;
      monkey.velocityY=0;
}
    

  
  

  monkey.velocityY = monkey.velocityY + 0.4;   

  drawSprites()
}

function food() {
 
  
  if(frameCount%80===0){
   banana = createSprite(600,200);
  banana.y = Math.round(random(80 ,180));
  banana.addImage(bananaImg);
  banana.scale = 0.08;
  banana.velocityX = -4;
  banana.lifetime=150;
  bananaGroup.add(banana);
    
    banana.depth=ground.depth+1;
  
  }
  
}
function spawnObstacles(){
  if(frameCount%100===0){
  obstacle= createSprite(600,200);
  obstacle.addImage(obstacle_Img);
  obstacle.velocityX=-4;
  obstacle.lifetime=150;
  obstacle.scale= 0.25;
  obstacleGroup.add(obstacle);
  
    monkey.depth= obstacle.depth;
  obstacle.depth= monkey.depth+1;
  }
}

