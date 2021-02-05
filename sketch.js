var canvas;
var greenHero, hImage;
var weapon,weaponImg;
var bgImg,bgSprite;
var tree,tcImage,treeCutter,tImage,tcAnimation,tdAnimation;
var plasticBag,pImg;
var car,carImg;
var factory,fImage;
var insecticides,iImage;
var pollutionLevel;
var weaponGrp;
var obstacle;
var plBar;
var obstacle1;
var obstacle2;
var obstacle3;
var obstacle4;
// var obstacle5;
var gameState="serve";
var r=1;
var obstacleGrp;
var obstacle1Grp;
var obstacle2Grp;
var obstacle3Grp;
var obstacle4Grp;
var obstacleLt;
var obstacle1Lt;
var obstacle2Lt;
var obstacle3Lt;
var obstacle4Lt;

function preload() {
  hImage=loadImage("images/green-hero.png")
  bgImg=loadImage("images/background.png")
  tImage=loadImage("images/tree-standing.png")
  weaponImg=loadImage("images/rocket.png")
  tcAnimation=loadAnimation("images/c1.png","images/c2.png","images/c3.png","images/c4.png","images/c5.png","images/c6.png")
  tdAnimation=loadAnimation("images/d1.png","images/d2.png","images/d3.png","images/d4.png","images/d5.png","images/d6.png")
  pImg=loadImage("images/plasticbag.png")
  carImg=loadImage("images/vehicle.png")
  fImage=loadImage("images/factory.png")
  iImage=loadImage("images/insecticide.png")
  tcImage=loadImage("images/tree fallen.png")
  car1Img=loadImage("images/vehicle1.png")
  f1Image=loadImage("images/factory1.png")
  arrowTouching=loadAnimation("images/tile002.png","images/tile003.png","images/tile004.png","images/tile005.png","images/tile006.png","images/tile007.png");
}

function setup(){
  canvas = createCanvas(displayWidth-150, displayHeight-150);

  greenHero = createSprite(width/8,height-150,200,height/3);
  greenHero.addImage(hImage);
  greenHero.scale=0.6
  
  // treeCutter=createSprite(tree.x-width/11,tree.y+height/6,10,10)
  // treeCutter.addAnimation("tree-cutting",tcAnimation);
  // treeCutter.addAnimation("treecutter-die",tdAnimation);
  // treeCutter.scale=3
  // treeCutter.debug=true

  // plasticBag=createSprite(width+width+50,height-height/4,30,30)
  // plasticBag.addImage(pImg);
  // plasticBag.scale=0.15

  // car=createSprite(width+width+width+50,height-height/4,30,30);
  // car.addImage(carImg);

  // factory=createSprite(width+width+width+width+50,height-height/1.8);
  // factory.addImage(fImage);
  // factory.scale=1.3

  // insecticides=createSprite(width+width+width+width+width+50,height-height/4);
  // insecticides.addImage(iImage);
  // insecticides.scale=0.3;

  weaponGrp=createGroup();
  obstacleGrp=createGroup();
  obstacle1Grp=createGroup();
  obstacle2Grp=createGroup();
  obstacle3Grp=createGroup();
  obstacle4Grp=createGroup();

  pollutionLevel=51;
}

function draw(){
  background(bgImg);

  r=Math.round(random(1,5));

  if (gameState==="serve") {
    textSize(30)
    fill("darkgreen");
    text("Press space to start",width/2-width/10,height/2)
    text("Use arrow keys to move",width/2-width/8,height/2+50)
    text("Use space to shoot obstacles",width/2-width/7,height/2+100);

    if (keyDown("space")) {
      gameState="play";
    }
  }

  drawSprites();

  textSize(20)
  text("Pollution",camera.position.x+width/3,height/10);
  fill(255)
  rect(camera.position.x+width/3+85,height/10-20,100,32)
  fill("red")
  rect(camera.position.x+width/3+85,height/10-19,pollutionLevel,30)

  // if (weaponGrp.isTouching(plasticBag)) {
  //   plasticLifetime=plasticLifetime-1
  // }
  
  if (greenHero.x>width/2) {
    camera.position.x=greenHero.x;  
  }

  if (gameState==="play") {
    if (keyDown(UP_ARROW)) {
      greenHero.y=greenHero.y-5;
    }
    if (keyDown(DOWN_ARROW)) {
      greenHero.y=greenHero.y+5;
    }
    if (keyDown(LEFT_ARROW)) {
      greenHero.x=greenHero.x-5;
    }
    if (keyDown(RIGHT_ARROW)) {
      greenHero.x=greenHero.x+5;
    }
  
    if (keyDown("space")) {
      weapon=createSprite(greenHero.x,greenHero.y,10,10)
      weapon.velocityX=8;
      weapon.addImage(weaponImg);
      weapon.addAnimation("arrow",arrowTouching);
      weapon.scale=0.1
      weapon.lifetime=150
      weaponGrp.add(weapon);
      weapon.debug=true;
    }
  
    console.log(pollutionLevel);
  
    spawnObstacle();
    spawnTC();
    spawnCar();
    spawnFactory();
    
    if (frameCount>120) {
      for(var k=0;k<obstacle1Grp.length;k++) {
        if (weaponGrp.isTouching(obstacle1Grp.get(k))) {
          obstacle1Grp.get(k).changeAnimation("treecutter-die",tdAnimation);
          obstacle1Grp.get(k).lifetime=15
          weapon.velocityX=0;
          weapon.x=obstacle1Grp.get(k).x-110
          
          weapon.changeAnimation("arrow",arrowTouching);
          weapon.setCollider("rectangle",0,0,30,30)
          // weapon.destroy()
          weapon.lifetime=10
          weapon.scale=3
          pollutionLevel=pollutionLevel-1
          console.log(obstacle1Grp.get(k).lifetime);
        }
      }

      for(var k=0;k<obstacleGrp.length;k++) {
        if (weaponGrp.isTouching(obstacleGrp.get(k))) {
          obstacleGrp.get(k).destroy();
          weapon.velocityX=0;
          // weapon.x=obstacleGrp.get(k).x-10
          // obstacleGrp.get(k).lifetime=25
          
          weapon.changeAnimation("arrow",arrowTouching);
          weapon.setCollider("rectangle",0,0,30,30)
          // weapon.destroy()
          weapon.lifetime=10
          weapon.scale=3
          pollutionLevel=pollutionLevel-5
          // console.log(obstacleGrp.get(k).lifetime);
        }
      }

      if (obstacle!==undefined) {
        if (greenHero.x>=obstacle.x && greenHero.x<obstacle.x+20) {
          pollutionLevel=pollutionLevel+5
          obstacle.destroy();
        }
      }

      if (obstacle1!==undefined) {
        if (greenHero.x>=obstacle1.x && greenHero.x<obstacle1.x+20) {
          pollutionLevel=pollutionLevel+5
          obstacle1.destroy();

          tree.changeImage("tree-fallen",tcImage);
          tree.scale=1.5
          tree.y=width/2-width/8
        }
      }

      for(var k=0;k<obstacle2Grp.length;k++) {
        if (weaponGrp.isTouching(obstacle2Grp.get(k))) {
          obstacle2Grp.get(k).destroy();
          weapon.velocityX=0;
          // weapon.x=obstacle2Grp.get(k).x-110
          // obstacle2Grp.get(k).lifetime=25
          
          weapon.changeAnimation("arrow",arrowTouching);
          weapon.setCollider("rectangle",0,0,30,30)
          // weapon.destroy()
          weapon.lifetime=10
          weapon.scale=3

          pollutionLevel=pollutionLevel-5
          // console.log(obstacle2Grp.get(k).lifetime);
        }
      }

      if (obstacle2!==undefined) {
        if (greenHero.x>=obstacle2.x && greenHero.x<obstacle2.x+20) {
          pollutionLevel=pollutionLevel+5
          obstacle2.destroy();
        }
      }

      for(var k=0;k<obstacle3Grp.length;k++) {
        if (weaponGrp.isTouching(obstacle3Grp.get(k))) {
          obstacle3Grp.get(k).changeImage("car",car1Img);
          // obstacle3Grp.debug=true
          // obstacle3Grp.get(k).setCollider()
          weapon.velocityX=0;
          weapon.x=obstacle3Grp.get(k).x-310
          obstacle3Grp.get(k).lifetime=25
          
          weapon.changeAnimation("arrow",arrowTouching);
          weapon.setCollider("rectangle",0,0,30,30)
          // weapon.destroy()
          weapon.lifetime=10
          weapon.scale=3

          pollutionLevel=pollutionLevel-0.5
        }
      }

      if (obstacle3!==undefined) {
        if (greenHero.x>=obstacle3.x && greenHero.x<obstacle3.x+20) {
          pollutionLevel=pollutionLevel+5
          obstacle3.destroy();
        }
      }

      for(var k=0;k<obstacle4Grp.length;k++) {
        if (weaponGrp.isTouching(obstacle4Grp.get(k))) {
          obstacle4Grp.get(k).changeImage("factory-closed",f1Image);
          weapon.velocityX=0;
          weapon.x=obstacle4Grp.get(k).x-410
          obstacle4Grp.get(k).lifetime=25
          
          weapon.changeAnimation("arrow",arrowTouching);
          weapon.setCollider("rectangle",0,0,30,30)
          // weapon.destroy()
          weapon.lifetime=10
          weapon.scale=3

          console.log(obstacle4Grp.get(k).lifetime);
          pollutionLevel=pollutionLevel-5
        }
      }

      if (obstacle4!==undefined) {
        if (greenHero.x>=obstacle4.x && greenHero.x<obstacle4.x+20) {
          pollutionLevel=pollutionLevel+5
          obstacle4.destroy();
        }
      }
    }
  
    for(var i=0;i<weaponGrp.length;i++) {
      if (weaponGrp.get(i).x<greenHero.x) {
        weaponGrp.destroyEach();
      }
    }
  
    if (pollutionLevel>=99 || pollutionLevel<=1) {
      gameState="end"  
    }
  }

  if (gameState==="end") {
    textSize(30);
    if (pollutionLevel>=99) {
      text("You were unable to save the world",camera.position.x-width/8,height/2)  
    }
    if (pollutionLevel<=1) {
      text("You saved the World",camera.position.x-width/8,height/2)
    }

    text("Press 'r' to play again",camera.position.x-width/8+50,height/2+50);

    if (keyDown("r")) {
      gameState="play";
      pollutionLevel=51
      obstacleGrp.destroyEach();
      obstacle1Grp.destroyEach();
      obstacle2Grp.destroyEach();
      obstacle3Grp.destroyEach();
      obstacle4Grp.destroyEach();
    }
  }
}

function spawnObstacle() {
  if (frameCount%200===0) {
    if (r===1 || r===2) {
      if (r===1) {
        obstacle=createSprite(camera.position.x+width,Math.round(random(200,500)))

        obstacle.addImage(pImg);
        obstacle.scale=0.15;
        obstacle.lifetime=500;  

        obstacleGrp.add(obstacle);
      }

      if (r===2) {
        obstacle2=createSprite(camera.position.x+width,Math.round(random(200,500)))

        obstacle2.addImage(iImage);
        obstacle2.scale=0.3;
        obstacle2.lifetime=500;

        obstacle2Grp.add(obstacle2);
      }
    }
          
      // if (r===2) {
      //   obstacle.addImage(pImg);
      //   obstacle.scale=0.15;
      //   obstacle.lifetime=500;
      //   if (obstacle.lifetime===1) {
      //     pollutionLevel=pollutionLevel+10
      //     obstacle.destroy();
      //   }

      //   if (weaponGrp.isTouching(obstacle)) {
      //     obstacle.destroy()
      //     weapon.velocityX=0;
      //   }
      // }

    // if (r===4) {
    //   obstacle3=createSprite(camera.position.x+width,Math.round(random(200,500)))

    //   obstacle3.addImage(carImg);
    //   obstacle3.lifetime=500;
    //   if (weaponGrp.isTouching(obstacle)) {
    //     obstacle3.changeImage(car1Img);
    //     weapon.velocityX=0;
    //   }
    //   // if (obstacle.lifetime===1) {
    //   //   pollutionLevel=pollutionLevel+10
    //   //   obstacle.destroy();
    //   // }
    // }

    // if (r===5) {
    //   obstacle4=createSprite(camera.position.x+width,Math.round(random(200,500)))

    //   obstacle4.addImage(fImage);
    //   obstacle4.scale=1
    //   obstacle4.lifetime=500;
    //   if (weaponGrp.isTouching(obstacle4)) {
    //     obstacle4.changeImage(f1Image);
    //     weapon.velocityX=0;
    //   }
    //   // if (obstacle.lifetime===1) {
    //   //   pollutionLevel=pollutionLevel+10
    //   //   obstacle.destroy();
    //   // }
    // }  

      // if (r===5) {
      //   obstacle.addImage(iImage);
      //   obstacle.scale=0.3;
      //   obstacle.lifetime=500;
      //   if (weaponGrp.isTouching(obstacle)) {
      //     obstacle.destroy()
      //     weapon.velocityX=0;
      //   }

      //   if (obstacle.lifetime===1) {
      //     pollutionLevel=pollutionLevel+10
      //     obstacle.destroy();
      //   }
      // }
  }
}

function spawnTC() {
  if (frameCount%200===0) {    
    if (r===3) {
      obstacle1=createSprite(camera.position.x+width,width/2-width/8)
  
      obstacle1.addAnimation("tree-cutting",tcAnimation);
      obstacle1.addAnimation("treecutter-die",tdAnimation);
      obstacle1.scale=3
      obstacle1.debug=true
      obstacle1.setCollider("rectangle",-10,10,20,30)
      tree = createSprite(obstacle1.x+80,obstacle1.y-150,width/2,height/2);
      tree.addImage("tree",tImage)
      tree.addImage("tree-fallen",tcImage);

      obstacle1Grp.add(obstacle1);
    }
  } 
}

function spawnCar () {
  if (frameCount%200===0) {
    if (r===4) {
      obstacle3=createSprite(camera.position.x+width,height/2)
  
      obstacle3.addImage(carImg);
      obstacle3.addImage("car",car1Img);
      obstacle3.lifetime=500;
      
      obstacle3Grp.add(obstacle3);
    }  
  }
}

function spawnFactory () {
  if (frameCount%200===0) {
    if (r===5) {
      obstacle4=createSprite(camera.position.x+width,height/2)

      obstacle4.addImage(fImage);
      obstacle4.addImage("factory-closed",f1Image);
      obstacle4.scale=1
      obstacle4.lifetime=500;

      obstacle4Grp.add(obstacle4);
    }  
  }
}