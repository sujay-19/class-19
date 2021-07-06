var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300,70,80)
  ghost.addImage(ghostImg)
  ghost.scale=0.3

  doorsGroup=new Group()
  climbersGroup=new Group()
  invisibleBlockGroup=new Group()
  ghost.debug=true
  
  
}

function draw() {
  background(200);
  
if (gameState==="play") {
   if(keyDown("space")) {
     ghost.velocityY=-10
   }
   ghost.velocityY=ghost.velocityY+1   
   spawndoors()
    if (keyDown("left")) {
      ghost.x=ghost.x-4
    }
    if (keyDown("right")) {
      ghost.x=ghost.x+4
    }
  if(tower.y > 400){
      tower.y = 300
    }
    if(climbersGroup.isTouching(ghost)) {
      ghost.velocityY=0

    }
    if (invisibleBlockGroup.isTouching(ghost)||ghost.y>600) {
      gameState="end"
      ghost.destroy()

    } 

    
  }
   if(gameState==="end") {
     textSize(50)
     text("gameover",300,300)
     tower.destroy()
     doorsGroup.destroyEach()
     climbersGroup.destroyEach()
   }
    drawSprites()
}

function spawndoors() {
 if(frameCount%250===0) {
 door = createSprite(200,-50)
 door.addImage(doorImg)
door.velocityY=1
doorsGroup.add(door)
door.x=Math.round(random(150,350))

climber = createSprite(200,10)
 climber.addImage(climberImg)
climber.velocityY=1
climbersGroup.add(climber)
climber.x=door.x
ghost.depth=door.depth
ghost.depth=ghost.depth+1

 invisibleBlock = createSprite(200,15)
 invisibleBlockGroup.add(invisibleBlock)
 invisibleBlock.width=climber.width
 invisibleBlock.height=1 
 invisibleBlock.x=door.x
 
 }
}
