
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground,player;
var invisibleGround,zombie;
var zombieImg,bg,boy,skullImg,handImg,deadImg,bg2,coinImg;
var gameOverImg,restartImg;

var handGroup,coinsGroup,skullGroup;
var gameOver,restart,score;
var heart;
var lives = 3;
var point,point2,bgm,growl;
var spook;
var spook1;
var spook2;


function preload(){
    bg=loadImage("images/background.jpeg");
    boy=loadAnimation("images/boy1.png","images/boy2.png","images/boy3.png","images/boy4.png","images/boy5.png","images/boy6.png");
    zombieImg=loadAnimation("images/girlzombie1.png","images/girlzombie2.png","images/girlzombie3.png","images/girlzombie4.png","images/girlzombie5.png","images/girlzombie6.png","images/girlzombie7.png","images/girlzombie8.png","images/girlzombie9.png","images/girlzombie10.png","images/girlzombie11.png","images/girlzombie12.png","images/girlzombie13.png","images/girlzombie14.png","images/girlzombie15.png","images/girlzombie16.png","images/girlzombie17.png","images/girlzombie18.png","images/girlzombie19.png","images/girlzombie20.png");
    handImg =loadImage("images/obstacle1.png");
    coinImg =loadImage("images/coin.png");
    skullImg =loadImage("images/skull.png");
    bg2 =loadImage("images/bg2.png");
    deadImg =loadImage("images/dead.png");
    gameOverImg =loadImage("images/gameOver.png");
    restartImg =loadImage("images/restore.png");   
    heartImg=loadImage("images/heart.png");
   bgm = loadSound("sounds/bgm.wav");
    point = loadSound("sounds/point.wav");
   point2 = loadSound("sounds/point2.wav");
    growl = loadSound("sounds/zombiegrowl.wav");
    spookImg = loadImage("images/spook.png");
    spook1Img = loadImage("images/spook1.png");
    spook2Img = loadImage("images/spook2.png");
}

function setup(){
    createCanvas(800,500);
    ground = createSprite(500,-120,0,0);
    ground.scale = 2;
    ground.x = ground.width/2;
    ground.velocityX = -4;
    ground.addImage(bg);

    invisibleGround = createSprite(400,470,800,10);
    invisibleGround.visible = false;

    player = createSprite(300,420,20,100);
    player.addAnimation("a",boy);
    player.scale = 0.5
    player.setCollider("rectangle",0,0,player.width,player.height);

    zombie = createSprite(150,410,20,100);
    zombie.addAnimation("z",zombieImg);
    zombie.scale = 0.4;

    heart1 = createSprite(600,100)
    heart1.addImage(heartImg);
    heart1.scale=0.1;

    heart2 = createSprite(660,100)
    heart2.addImage(heartImg);
    heart2.scale=0.1;

    heart3 = createSprite(720,100)
    heart3.addImage(heartImg);
    heart3.scale=0.1;

    gameOver = createSprite(400,80);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.40;

    restart = createSprite(400,200);
    restart.addImage(restartImg);
    restart.scale = 0.2;

    handGroup = new Group();

    spookGroup = new Group();

    spook1Group = new Group();

    spook2Group = new Group();

    coinsGroup = new Group();

    skullGroup = new Group();

    score = 0;

   //bgm.loop();
}

function draw(){

    background("black");

    player.velocityY = player.velocityY+0.8;

    if(gameState === PLAY){
      gameOver.visible = false;
      restart.visible = false;

      ground.velocityX = -(4+score/50);

      if(ground.x<80){
        ground.x=ground.width/2;
        }
    }

   

    if (keyDown("space") && player.y>=220){
    player.velocityY=-10;
}

    if(keyDown("left")){
    player.x -= 2;
}

    if(keyDown("right")){
    player.x += 2;
}

    spawnHands();
    spawnCoins();
    spawnSpook();
    spawnSpook1();
    spawnSpook2();
    spawnSkull();
  /*  
    if(score>200){
     // point2.play();
      point2.loop = false;
        level1();
    }

    if(score === 400){
    //  point2.play();
      point2.loop = false;
        level2();
    }
*/

    player.collide(invisibleGround);
    zombie.collide(invisibleGround);
//rules
    if(player.isTouching(coinsGroup)){
        player.velocityY = 3;
        score = score + 5;
        point.play();
        coinsGroup.setVisibleEach(false);
    }


  

    if(player.isTouching(handGroup)){
       // growl.play();
        heart1.visible = false;
        score=score-5
       // gameState = END;
    }

    if(player.isTouching(spook1Group)|| player.isTouching(spook2Group)||player.isTouching(spookGroup)){
      //  growl.play();
        heart2.visible = false;
        //gameState = END;
    }


    if(player.isTouching(skullGroup)){
        //  growl.play();
          heart3.visible = false;
          gameState = END;
      }
    
    if(gameState === END){

       
        if(zombie.isTouching(player)){
           //bgm.stop();
            zombie.addImage(deadImg);

        }

        gameOver.visible = true;
        restart.visible = true;


        ground.velocityX = 0;
        player.velocityY = 0;
        zombie.visible=true;
        player.visible=true;

     

        handGroup.setLifetimeEach(-1);
        handGroup.setVelocityXEach(0);  
        
       coinsGroup.destroyEach();
       skullGroup.destroyEach();

       coinsGroup.setVelocityXEach(0);
       skullGroup.setVelocityYEach(0);
       
       spookGroup.setVelocityXEach(0);
       spook1Group.setVelocityYEach(0);
    
         
       spook1Group.destroyEach();
       spook2Group.destroyEach();
       spook2Group.setVelocityXEach(0);
         score=0
    
    
       if(mousePressedOver(restart)){
        reset();
       }
     }

    drawSprites();

    fill("gold");
    textSize(30);
    text("Score: "+ score,650,50);
}

function spawnHands(){
    if(frameCount % 100 === 0){
        var hand= createSprite(800,450,10,40);
        hand.addImage("hand",handImg);
        hand.scale = 0.14;
        hand.velocityX = -(4 + score / 50);
        hand.lifetime = 200;
        handGroup.add(hand);
        hand.setCollider("circle",0,0,250);
        hand.debug=true
    }
}

function spawnSpook(){
    if(frameCount % 200=== 0){
        var spook= createSprite(500,350,10,40);
        spook.addImage("spook",spookImg);
        spook.scale = 0.14;
        spook.velocityY = -(4);
        spook.lifetime = 200;
        spookGroup.add(spook);
        spook.setCollider("circle",0,0,60);
    }
}

function spawnSpook1(){
    if(frameCount % 300 === 0){
        var spook1= createSprite(500,350,10,40);
        spook1.addImage("spook1",spook1Img);
        spook1.scale = 0.15;
        spook1.velocityY = -(3);
        spook1.lifetime = 200;
        spook1Group.add(spook1);
        spook1.setCollider("circle",0,0,1);
    }
}

function spawnSpook2(){
    if(frameCount % 340 === 0){
        var spook2= createSprite(400,280,10,40);
        spook2.addImage("spook2",spook2Img);
        spook2.scale = 0.15;
        spook2.velocityY = -(3);
        spook2.lifetime = 200;
        spook2Group.add(spook2);
        spook2.setCollider("circle",0,0,1);
    }
}


function spawnCoins(){
    if(frameCount % 100 === 0){
        var coin = createSprite(800,random(200,350),10,40);
       coin.addImage("coin",coinImg);
        coin.scale = 0.06;
       coin.velocityX = -6;
       coin.lifetime = 130;
       coinsGroup.add(coin);
        coin.setCollider("circle",0,0,30);
        coin.debug=true
    }
}
function spawnSkull(){
    if(frameCount % 500 === 0){
        var skull = createSprite(random(200,800),50,10,40);
        skull.addImage("skull ", skullImg);
        skull.scale = 0.1;
        skull.velocityY = 6;
        skull.lifetime = 200;
        skullGroup.add(skull);
        skull.setCollider("circle",0,0,1);
    }
}


//level 1
/*
function level1(){
    ground.shapeColor = "yellow";
    if(frameCount % 120 === 0){
        var skull = createSprite(random(200,800),50,10,40);
        skull.addImage("skull ", skullImg);
        skull.scale = 0.1;
        skull.velocityY = 6;
        skull.lifetime = 200;
        skullGroup.add(skull);
        skull.setCollider("circle",0,0,1);
    }
}
*/
//level 2
/*
function level2(){
    ground.addImage(bg2);
    skullGroup.collide(invisibleGround);
}

*/
function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    heart1.visible-=true;
    heart2.visible-=true;
    heart3.visible-=true;
    handGroup.destroyEach();
    score = 0;
    zombie.x = 150;
  // bgm.play();
    ground.addImage(bg);
}


