var bg,backgroundImg;

var shooter,shooterImg,shooter_shooting;

var zombie,zombieImg;

var heart1,heart1Img;
var heart2,heart2Img;
var heart3,heart3Img;

var life=3

var score=0

var zombieGroup;
var bulletGroup;

var bullets=70;

var gameState="fight";

var win,lose,explosion;




function preload(){

    backgroundImg=loadImage("assets/bg.jpeg");
    shooterImg=loadImage("assets/shooter_2.png");
    shooter_shooting=loadImage("assets/shooter_3.png");
    zombieImg=loadImage("assets/zombie.png");
    heart1Img=loadImage("assets/heart_1.png");
    heart2Img=loadImage("assets/heart_2.png");
    heart3Img=loadImage("assets/heart_3.png");
    win=loadSound("assets/win.mp3")
    lose=loadSound("assets/lose.mp3")
    explosion=loadSound("assets/explosion.mp3")

}

function setup() {
  
  createCanvas(windowWidth,windowHeight);

  zombieGroup=new Group()
  bulletGroup=new Group()

  bg=createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(backgroundImg)
  bg.scale=1.1

  shooter=createSprite(displayWidth-1500,displayHeight-300,50,50)
  shooter.addImage(shooterImg)
  shooter.scale=0.3
  shooter.debug=true
  shooter.setCollider("rectangle",0,0,400,400)

  heart1=createSprite(displayWidth-150,40,20,20)
  heart1.addImage(heart1Img)
  heart1.scale=0.4
  heart1.visible=false

  heart2=createSprite(displayWidth-100,40,20,20)
  heart2.addImage(heart2Img)
  heart2.scale=0.4
  heart2.visible=false

  heart3=createSprite(displayWidth-150,40,20,20)
  heart3.addImage(heart3Img)
  heart3.scale=0.4

}

function draw() {

  background(0);

    if(gameState=="fight"){

      if(life==3){
        heart3.visible=true
        heart2.visible=false
        heart1.visible=false
      }

      if(life==2){
        heart3.visible=false
        heart2.visible=true
        heart1.visible=false
      }

      if(life==1){
        heart3.visible=false
        heart2.visible=false
        heart1.visible=true
      }
      
      if(life==0){
        gameState="lost"
        heart3.visible=false
        heart2.visible=false
        heart1.visible=false
      }

        if(keyDown(UP_ARROW)){
          shooter.y-=5
        }

        if(keyDown(DOWN_ARROW)){
          shooter.y+=5
        }

        if(keyWentDown("space")){
           shooter.addImage(shooter_shooting)
            bullet=createSprite(shooter.x+100,shooter.y-30,20,10)
            bullet.velocityX=20
            bulletGroup.add(bullet)
            bullets-=1
        }

        else if(keyWentUp("space")){
          shooter.addImage(shooterImg)
        }
        
        if(bullets==0){
          gameState="bullet"
        }

        if(score==50){
          gameState="won"
        }

        if(zombieGroup.isTouching(bulletGroup)){
            for(var i=0;i<zombieGroup.length;i++){
              if(zombieGroup[i].isTouching(bulletGroup)){
                zombieGroup[i].destroy()
                bulletGroup.destroyEach()
                score=score+2
                explosion.play()
              }
            }
          }

          if(zombieGroup.isTouching(shooter)){
            for(var i=0;i<zombieGroup.length;i++){
              if(zombieGroup[i].isTouching(shooter)){
                 zombieGroup[i].destroy()
                 life=life-1
                 lose.play()
              }
            }
          }

          spawnZombies();
    }

    drawSprites();

    fill("white")
    textSize(30)
    text("lives:"+life,displayWidth-200,displayHeight/2-280)

    text("bullets:"+bullets,displayWidth-210,displayHeight/2-200)

    text("score:"+score,displayWidth-220,displayHeight/2-150)

    

    if(gameState=="lost"){
      textSize(50)
      fill("yellow")
      text("YOU LOST",400,400)
      zombieGroup.destroyEach()
      bulletGroup.destroyEach()
      shooter.destroy()
    }

    else if(gameState=="won"){
      text(50)
      fill("yellow")
      text("YOU WON",400,400)
      zombieGroup.destroyEach()
      bulletGroup.destroyEach()
      shooter.destroy()
    }

    else if(gameState=="bullet"){
      background(0);
      zombieGroup.destroyEach()
      bulletGroup.destroyEach()
      shooter.destroy()
      textSize(50)
      fill("red")
      text("YOU RAN OUT OF BULLETS",470,410)
    }

}

function spawnZombies(){
  if(frameCount%50==0){
    zombie = createSprite(random(1000,1600),random(100,500),40,40)
    zombie.addImage(zombieImg)
    zombie.scale=0.15
    zombie.velocityX=-3
    zombie.lifetime=300
    zombieGroup.add(zombie)
    zombie.debug=true
    zombie.setCollider("rectangle",0,0,400,400)
  }
}
