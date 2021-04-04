var dog,dogImg, happyDog,happyDogImg, database, foodS, foodStock

function preload()
{
	dogImg=loadImage("images/dogImg.png");
  happyDogImg=loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  console.log(database);
 foodStock=database.ref('food');
  foodStock.on("value",readStock);
   createCanvas(500, 500);

  dog =createSprite(250,250);
  dog.addImage(dogImg);
  dog.scale=0.4;




  
}


function draw() {  
  background(46,139,87);

  if(foodS!== undefined){

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
  }
  textSize(20);
  fill("white");
  text("feed the Dog by pressing up arrow key",20,50);
  text("food remaining : "+ foodS, 180,100);
}

  drawSprites();
  //add styles here

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref("/").update({
    food : x
  })
}

