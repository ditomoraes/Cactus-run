// 1 - Draw the runway -> OK
// 2 - Draw the Dino -> OK
// 3 - Make Dino move up and down -> NOT OK
// 4 - Create obstacles -> OK
// 5 - Move the obstacles 
// 6 - Create point dashboard -> OK
// 7 - Collision logic
//  8 - Game over

/* CRAZY DINO
Regras do jogo
Metodos de start
Verificação de game over
Display de resultado final
Contagem de pontuação
Dino
Cactus
Runway
*/

class Game {
  constructor(canvas, context, runway, dino, cactoConstructor, cactoImg) {
    this.canvas = canvas;
    this.context = context;
    this.runway = runway;
    this.dino = dino;
    this.cactoConstructor = cactoConstructor;
    this.cactoImg = cactoImg;
    this.cactus = [];
    this.runwaySpeed = 10;
    this.gravity = 0.5;
    this.dinoSpeed = {
      initialSpeed: 0,
      speedIncrement: 1.5,
    };
    this.frames = 0;
    this.score = {
      points: 0,
      pointsIncrementFPS: 30,
    };
  }

  configureKeyboardControls() {
    document.onkeydown = (event) => {
      this.dinoSpeed.initialSpeed += this.dinoSpeed.speedIncrement;

      this.dino.move(event.keyCode, this.dinoSpeed.initialSpeed);
    };

    document.onkeyup = () => {
      this.dinoSpeed.initialSpeed = 0;
    };
  }

  startGame() {
    this.clearRunway();

    this.runway.drawRunway();
    this.runway.moveRunway(this.runwaySpeed);

    this.dino.drawDino();

    this.addCactus();
    this.moveCactus();

    this.frames += 1;

    this.updateScore();

    window.requestAnimationFrame(() => this.startGame());
  }

  moveCactus() {
    this.cactus.forEach(cactu => {
      cactu.drawCactus();
      cactu.moveCactus(this.runwaySpeed);
    });
  }

  addCactus() {
    if (this.frames % 120 === 0) {
      this.cactus.push(new this.cactoConstructor(
        this.canvas, this.context, 1500, 230, 72, 74, this.cactoImg,
      ));
    }
  }

  updateScore() {
    if (this.frames % this.score.pointsIncrementFPS) {
      this.score.points += 1;
    }
    this.drawScore();
  }

  drawScore() {
    this.context.font = '20px Comic Sans';
    this.context.fillStyle = 'grey';
    this.context.fillText(`SCORE: ${this.score.points}`, 25, 50);
  }

  clearRunway() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');

    const runwayImg = new Image();
    runwayImg.src = './Images/Runway.png';

    const dinoImg = new Image();
    dinoImg.src = './Images/Cacto 1.png';

    const cactoImg = new Image();
    cactoImg.src = './Images/Dino.png';

    runwayImg.onload = () => {
      dinoImg.onload = () => {
        cactoImg.onload = () => {
          const runway = new Runway(
            canvas, context, 0, 0, canvas.width, canvas.height, runwayImg,
          );
          const dino = new Dino(
            canvas, context, 64, 220, 65, 72, dinoImg,
          );
        
          const game = new Game(canvas, context, runway, dino, Cactus, cactoImg);
      
          game.configureKeyboardControls();
          game.startGame();
        };
      };
    };
  };
};