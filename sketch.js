// Configurações do jogo
let canvas;
let player;
let obstacles = [];
let score = 0;

function setup() {
  canvas = createCanvas(800, 400);
  canvas.parent("game-container");
  player = createSprite(50, height - 50, 50, 50);
}

function draw() {
  background(220);

  // Verifica se o jogador está pulando
  if (player.position.y < height - 50) {
    player.velocity.y += 0.5;
  } else {
    player.velocity.y = 0;
    player.position.y = height - 50;
  }

  // Verifica se o jogador colidiu com os obstáculos
  for (let i = 0; i < obstacles.length; i++) {
    if (player.collide(obstacles[i])) {
      gameOver();
    }
  }

  // Cria novos obstáculos a cada 2 segundos
  if (frameCount % 120 === 0) {
    let obstacle = createSprite(width, height - 50, 50, 50);
    obstacle.velocity.x = -3;
    obstacles.push(obstacle);
  }

  // Remove obstáculos que saíram da tela
  for (let i = obstacles.length - 1; i >= 0; i--) {
    if (obstacles[i].position.x < -50) {
      obstacles[i].remove();
      obstacles.splice(i, 1);
      score++;
    }
  }

  // Exibe a pontuação na tela
  textSize(24);
  fill(0);
  text("Score: " + score, 20, 40);

  // Atualiza a animação do jogador
  drawSprites();
}

function keyPressed() {
  // Verifica se a tecla de espaço foi pressionada para fazer o jogador pular
  if (keyCode === 32 && player.position.y === height - 50) {
    player.velocity.y = -10;
  }
}

function gameOver() {
  noLoop();
  alert("Game Over! Your score: " + score);
  location.reload(); // Reiniciar o jogo após o game over
}
