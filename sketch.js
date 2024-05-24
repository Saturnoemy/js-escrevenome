// Variáveis da Bolinha
let xBolinha = 300
let yBolinha = 200
let diametro = 25
let raio = diametro /2;

let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// Variáveis da Raquete
let xRaquete = 5;
let yRaquete = 150;
let compRaquete = 10;
let alturRaquete = 90;

let colisao = false;

// Variáveis da Raquete Oponente
let xRaqueteOpo = 585;
let yRaqueteOpo = 150;
let velocidadeYOpo;

let meusPontos = 0;
let pontosOpo = 0;

// Variáveis dos sons
let trilha;
let raquetada;
let ponto;

let chanceDeErrar = 0;

function preload(){
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  desenhaBolinha();
  moveBolinha();
  verificaBorda();
  desenhaRaquete(xRaquete, yRaquete);
  moveRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  desenhaRaquete(xRaqueteOpo, yRaqueteOpo);
  moveRaqueteOpo();
  verificaColisaoRaquete(xRaqueteOpo, yRaqueteOpo);
  placar();
  marcaPonto();
  calculaChanceDeErrar();
}

function desenhaBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function moveBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function desenhaRaquete(x, y){
  rect(x, y, compRaquete, alturRaquete); 
}

function moveRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && 
      yBolinha - raio < yRaquete + raqueteAltura && 
      yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
  }
}

function verificaColisaoRaquete(x, y){
  colisao = collideRectCircle(x, y,
  compRaquete, alturRaquete, xBolinha, yBolinha, raio);
  if(colisao){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function moveRaqueteOpo(){
  velocidadeYOpo = yBolinha -yRaqueteOpo - compRaquete / 2 - 30;
  yRaqueteOpo += velocidadeYOpo + chanceDeErrar
  calculaChanceDeErrar()
}

function placar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 25);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOpo, 470, 25);
}

function marcaPonto(){
  if (xBolinha >= 600){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha <= 0){
    pontosOpo += 1;
    ponto.play();
  }
}

function calculaChanceDeErrar() {
  if (pontosOpo >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}