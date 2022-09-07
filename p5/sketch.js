//criação das variáveis globais
var carro, Pista, carroImg, carro2Img, carro3Img,  PistaImg, buraco,buracoImg
var pontuacao = 0;
var up, bottom;
var gameState = 0;
var startButton, texto;
var fim;


//função para pre-carregar as imagens dos sprites
function preload(){
  carroImg = loadImage ("carro.png");
  carro2Img = loadImage("carro2.png");
  carro3Img = loadImage("carro3.png");
  PistaImg = loadImage("Pista.png");
  buracoImg = loadImage("buraco.png")

}


//função para iniciar elementos e função que estão no inicio do jogo,
//quando o gameState é 0 (esperar)

function setup(){
  //uma tela gigante
  createCanvas(6000,600);
  
  //uma pista maneirassa
Pista = createSprite(0,200);
Pista.scale= 7;
Pista.addImage(PistaImg);

//um carro, apenas, com 3 possiveis imagens
carro = createSprite(200,500);
carro.addImage("1", carroImg);
carro.addImage("2", carro2Img);
carro.addImage("3", carro3Img);

//grupo dos buraco tudo
grupoDeburaco = new Group();


//uma parede em cima e uma embaixo da pista pro carro não voar nem cair
bottom = createSprite(width/2, 580, width, 10);
bottom.visible = false;
up = createSprite(width/2, 400, width, 10)
up.visible = false;


//botão pra começar o jogo
startButton = createButton("COMEÇAR");
startButton.position(300, height/2)

//texto explicativo que aparece no começo do jogo
texto = createElement("h2");
texto.position(200,150)
var message = `
      Para controlar o carro, use: "W" para subir
    </br>e "S" para descer. Desvie dos buracos. 
    </br> Clique em Começar para Jogar.
      `;
    texto.html(message); 


//manda executar o que acontece quando vc clica no botão de começar
    cliqueComecar();

}



//cria os buraco tudo
function gerarburaco(){
  if(frameCount % 60 === 0) {
   buraco = createSprite(2000,100,40,10);

    buraco.addImage(buracoImg);

    buraco.y = Math.round(random(380,580));
  
    buraco.scale = 0.2;
  
    buraco.velocityX = -10;

    buraco.lifetime = 300;

    grupoDeburaco.add(buraco);
  }

}


//volta com a animação do carro pra frente quando solta os botoes
function keyReleased(){

  if (keyCode === 87) {
    carro.changeImage("1");
  
  }
  
  if (keyCode === 83) {
    carro.changeImage("1");
  }

  }


//desenha as coisas na tela e as lógicas em loop
function draw(){
 background("gray");

if(carro.collide(grupoDeburaco)){
  gameState = 2
 }

 if(gameState === 1){
  jogando()
 } else if(gameState === 2){
  fimDeJogo();
 }

}


//esconde o texto inicial e o botão começar
function esconder(){
  startButton.hide();
  texto.hide();
}

//o que acontece quando a gente clica em começar
function cliqueComecar(){
  startButton.mouseClicked(()=>{
    gameState = 1;
    esconder();
  })
}


//o que acontece quando o gameState é 1 (jogando)
function jogando(){
  Pista.velocityX = -10
  if (Pista.x <0) {
    Pista.x = Pista.width/2
  }

  drawSprites();
  gerarburaco();

  if (keyIsDown(87)) {
    carro.y -= 10;
    carro.changeImage("2");
  }

  if (keyIsDown(83)) {
    carro.y += 10;
    carro.changeImage("3");
  }

  textSize(50)
  fill("red")
  text("Pontuação: " + pontuacao, 70,150 );

  pontuacao = pontuacao + Math.round(frameRate()/60); 

  carro.collide(bottom)
  carro.collide(up)

}

//o que acontece quando o gameState é 2 (fim)
function fimDeJogo(){
gameState=0

//pop up pra lembrar que vc é ruim jogando isso =)
  swal({
    title: `Como conseguiu perder esse jogo??`,
    text:  `Clique no botão para jogar novamente.
    Sua pontuação foi ${pontuacao}`,
    imageUrl:
      "fim.png",
    imageSize: "100x100",
    confirmButtonText: "Jogar novamente"
  },
  function(isConfirm) {
    if (isConfirm) {
      location.reload();
    }
  });
    
}
  






