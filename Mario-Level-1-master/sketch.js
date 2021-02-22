var score=0
var gameState="play"
function preload(){
    mario_running =  loadAnimation("images/mar1.png","images/mar2.png","images/mar3.png",
    "images/mar4.png","images/mar5.png","images/mar6.png","images/mar7.png");
    bgimage= loadImage("images/bgnew.jpg");
    brickimage= loadImage("images/brick.png")
    coinimages= loadAnimation("images/con1.png","images/con2.png","images/con3.png","images/con4.png","images/con5.png","images/con6.png");
    coinsound= loadSound("sounds/coinSound.mp3")
    mushroomimages= loadAnimation("images/mush1.png","images/mush2.png","images/mush3.png","images/mush4.png","images/mush5.png","images/mush6.png")
    turtleimages= loadAnimation("images/tur1.png","images/tur2.png","images/tur3.png","images/tur4.png","images/tur5.png")
    deadmarioimage= loadAnimation("images/dead.png");
    deadmariosound= loadSound("sounds/dieSound.mp3");
  }


function setup() {
      createCanvas(1000, 600);
      // creating background
      bg = createSprite(580,300,1000,600);
        bg.addImage(bgimage);
        bg.scale =0.5;
      // creating mario
      mario = createSprite(200,505,20,50);
        mario.addAnimation("running", mario_running);
        mario.addAnimation("dead",deadmarioimage);
        mario.scale =0.3;

      // creating platform so that mario doesn't fall
      platform=createSprite(200,580,150,5)
      platform.visible=false;
      // creating groups
      brickgroup= new Group();
      coingroup= new Group();
      obstaclegroup= new Group();

}
// creating bricks
function generateBricks(){
        if (frameCount%65==0)
        {
          brick=createSprite(1200,random(100,400),40,10);
          brick.addImage(brickimage);
          brick.velocityX=-4;
          brick.scale=0.5
          brickgroup.add(brick);
          brick.lifetime=350;
        }
  
}
// creating coins
function generateCoins(){
      if (frameCount%50==0)
      {
        coin=createSprite(1200,random(100,400),40,10);
        coin.addAnimation("coin",coinimages);
        coin.velocityX=-4;
        coin.scale=0.1;
        coingroup.add(coin);
        coin.lifetime=350;
      }
}
// creating obstacles
function generateObstacles(){
      if (frameCount%80==0)
      {
        obs=createSprite(1200,525,40,10);
        obs.velocityX=-4;
        obs.scale=0.2;
        obstaclevalue= Math.round(random(1,2));
        if (obstaclevalue==1)
        {
          obs.addAnimation("mush",mushroomimages);
        }
        else
        {
          obs.addAnimation("tur",turtleimages);
        }
        obstaclegroup.add(obs);
        obs.lifetime=350;
  }
}
// execution
function draw() {
    if(gameState=="play")
      {
        bg.velocityX=-5
        // preventing bg from leaving canvas
        if (bg.x<50)
        {
        bg.x=580;
       }
        background("lightgreen");
        drawSprites();
        // mario to jump
        if (keyDown("up"))
          {
        mario.velocityY=-10
        }
         // gravity for mario
        mario.velocityY+=.5
        mario.collide(platform);
    
        // brick generation
          generateBricks();
          // checking if mario is colliding with the bricks
          for(i=0;i<brickgroup.length;i++)
            {
              temp=brickgroup.get(i);
              if (temp.isTouching(mario))
                {
                  mario.collide(temp);
                }
            }
          // preventing mario from leaving the canvas
          if (mario.x<100)
            {
              mario.x=100;
            }
          // coins generation
          generateCoins();
          // checking if mario is touching the coins
          for(i=0;i<coingroup.length;i++)
            {
              tempe= coingroup.get(i);
              if (mario.isTouching(tempe))
                {
                  score++;
                  tempe.destroy(coin);
                  coinsound.play();
                }

            }
          // coin collection
          text("COINS COLLECTED="+score,450,15);
          // generation obstacles
          generateObstacles();
          // stopping the game
          for(i=0;i<obstaclegroup.length;i++)
            {
              obstacles= obstaclegroup.get(i);
              if (mario.isTouching(obstacles))
                {
                  gameState="end"
                }
            }
      }
      // ending the game
      else
      {
        mario.changeAnimation("dead",deadmarioimage);
        mario.velocityX=0;
        mario.velocityY=0;
      }
    }
