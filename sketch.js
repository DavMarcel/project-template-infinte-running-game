// Variáveis do jogo
var jogador;
var obstaculos = [];

// Configuração do jogo
function setup() {
  createCanvas(600, 400);
  jogador = new Quadrado(); // Cria o jogador
}

// Loop do jogo
function draw() {
  background(220);
  
  // Atualiza o jogador
  jogador.atualizar();
  jogador.mostrar();
  
  // Cria novos obstáculos aleatoriamente
  if (frameCount % 60 === 0) { // A cada segundo
    var obstaculo = new Obstaculo();
    obstaculos.push(obstaculo);
  }
  
  // Move e mostra os obstáculos
  for (var i = obstaculos.length - 1; i >= 0; i--) {
    obstaculos[i].atualizar();
    obstaculos[i].mostrar();
    
    // Verifica colisão com o jogador
    if (obstaculos[i].colidiu(jogador)) {
      // Fim de jogo
      console.log("Game Over");
      noLoop(); // Para o loop do jogo
    }
    
    // Remove os obstáculos fora da tela
    if (obstaculos[i].saiuDaTela()) {
      obstaculos.splice(i, 1);
    }
  }
}

// Classe do jogador
class Quadrado {
  constructor() {
    this.x = width/2;
    this.y = height - 40;
    this.largura = 20;
    this.altura = 20;
    this.velocidade = 0;
    this.gravidade = 0.6;
  }
  
  atualizar() {
    this.velocidade += this.gravidade;
    this.y += this.velocidade;
    
    // Verifica colisão com o chão
    if (this.y > height - this.altura/2) {
      this.y = height - this.altura/2;
      this.velocidade = 0;
    }
  }
  
  mostrar() {
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.largura, this.altura);
  }
  
  pular() {
    if (this.y === height - this.altura/2) {
      this.velocidade = -12;
    }
  }
}

// Classe dos obstáculos
class Obstaculo {
  constructor() {
    this.x = width;
    this.y = height - 20;
    this.largura = 20;
    this.altura = 20;
    this.velocidade = 5;
  }
  
  atualizar() {
    this.x -= this.velocidade;
  }
  
  mostrar() {
    fill(255, 0, 0);
    rectMode(CENTER);
    rect(this.x, this.y, this.largura, this.altura);
  }
  
  colidiu(quadrado) {
    return collideRectRect(this.x - this.largura/2, this.y - this.altura/2, this.largura, this.altura,
                            quadrado.x - quadrado.largura/2, quadrado.y - quadrado.altura/2, quadrado.largura, quadrado.altura);
  }
  
  saiuDaTela() {
    return this.x < -this.largura/2;
  }
}
