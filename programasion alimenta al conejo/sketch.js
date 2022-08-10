const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;




let engine;
let world;

var globo;
var fruta, cuerda;
var fruta_restriccion;
var ground
var botoncut;
var fondo,conejo,sandia,conejoimage;
var parpadeo,comiendo,triste;
var sonido_fondo,sonido_corte,sad_sonido,eat_sonido,aire_sonido;
var muteo

function preload(){//aqui precargamos todo
fondo=loadImage("background.png");



conejoimage=loadImage("Rabbit-01.png");
sandia=loadImage("melon.png");
parpadeo=loadAnimation("blink_1.png","blink_2.png","blink_3.png");
comiendo=loadAnimation("eat_1.png","eat_2.png","eat_3.png","eat_4.png");
triste=loadAnimation("sad_1.png","sad_2.png","sad_3.png");

//cargando sonidos 
sonido_fondo=loadSound("sound1.mp3");
sonido_corte=loadSound("cortando.mp3");
sad_sonido=loadSound("sad.wav");
eat_sonido=loadSound("eating_sound.mp3");
aire_sonido=loadSound("air.wav");




//aqui se reproducen las animaciones 
parpadeo.playing=true;
comiendo.looping=false
triste.looping=false
}

function setup() 
{

  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

sonido_fondo.play();
sonido_fondo.setVolume(0.1);

//"crando al conejo"
conejo=createSprite(255,620,100,100);
conejo.addImage(conejoimage);
conejo.scale=0.3;

parpadeo.frameDelay=10

conejo.addAnimation("parpadeando",parpadeo);
conejo.addAnimation("llorando",triste);
conejo.addAnimation("comer",comiendo);

conejo.changeAnimation("comer")




//creando boton de corte
botoncut=createImg("boton.png");
botoncut.position(210,1);
botoncut.size(70,70)
botoncut.mouseClicked(drop);

globo=createImg("balloon.png");
globo.position(10,160);
globo.size(155,125);
globo.mouseClicked(airblow);

muteo=createImg("llt.png")
muteo.position(400,3);
muteo.size(60,60)
muteo.mouseClicked(mute);

  cuerda = new Rope (7,{x:245,y:0.1});
fruta = Bodies.circle(500,400,10);
  ground = new Ground(200,690,600,30);
Matter.Composite.add(cuerda.body,fruta);
fruta_restriccion=new Link(cuerda,fruta);

rectMode(CENTER);
ellipseMode(RADIUS);

imageMode(CENTER)
}

function draw() 
{
  background("red");
  //cargando imagen de fondo 
  image(fondo,width/2,height/2,500,700);
  ground.show();
    cuerda.show();
    image(sandia,fruta.position.x,fruta.position.y,80,80);
  Engine.update(engine);
//asiendo que el conejo choque con la fruta
  if(collide(fruta,conejo)==true){
//conejo.changeAnimation("comer");
eat_sonido.play();
}





   drawSprites();
}
function drop(){
  sonido_corte.play();
  cuerda.break();
  fruta_restriccion.detach();
  fruta_restriccion=null;

  

}
function airblow(){
Matter.Body.applyForce(fruta,{x:0,y:0},{x:0.030,y:0.050});
aire_sonido.play();
aire_sonido.setVolume(0.4)
}

function collide(body,sprite){
if(body!=null){
  var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);

if(d<=80){
World.remove(engine.world,fruta);
fruta=null;
return true
}
}





}
function mute(){
if(sonido_fondo.isPlaying()){
sonido_fondo.stop();
}else{
  sonido_fondo.play();


}

}
