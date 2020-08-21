/* objetos:
runway: width, height, posX, posY, context, canvas, image, drawRunway, moveRunway
cactus (obstacle): width, height, posX, posY, context, canvas, image, drawCactus, moveCactus, collisionVerification
dino (player): width, height, posX, posY, context, canvas, image, drawDino, moveDino, collisionVerification
*/

class Object {
  constructor(canvas, context, posX, posY, width, height) {
    this.canvas = canvas;
    this.context = context;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
  }
}

class Runway extends Object {
  constructor(canvas, context, posX, posY, width, height, image) {
    super(canvas, context, posX, posY, width, height);
    this.image = image;
    this.speed = 0;
  }
  drawRunway() {
    this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    this.context.drawImage(this.image, this.posX + this.width, this.posY, this.width, this.height);    
    
    this.resetRunwayPos();
  }

  moveRunway(speed){
    this.posX -= speed;
    this.speed = speed;
  }

  resetRunwayPos() {
    if(this.posX == -1500) {
      this.posX = 0;
    }
  }
}

class Cactus extends Object {
  constructor(canvas, context, posX, posY, width, height, image) {
    super(canvas, context, posX, posY, width, height);
    this.image = image;
  }
  drawCactus(){
    this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
  }
  moveCactus(speed){
    this.posX -= speed;
  }
}

class Dino extends Object {
  constructor(canvas, context, posX, posY, width, height, image) {
    super(canvas, context, posX, posY, width, height);
    this.image = image;
  }

  drawDino() {
    this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
  }

  moveDino(keyCode, speed) {
    
    switch (keyCode) {
      case 32:
        console.log('Invalid Key')
    }
  }
}
