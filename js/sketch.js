const TOTAL = 300;

let activeBirds = [];
let allBirds = [];
let pipes = [];
let counter = 0;
let record = 0;
let runBest = false;

let slider;
let sliderDisplay;
let score;
let highscore;
let button;

function setup(){
  let canvas = createCanvas(700, 500);
  canvas.parent("canvas-parent");

  slider = document.querySelector("#slider");
  sliderDisplay = document.querySelector("#slider-display");
  score = document.querySelector("#score");
  highscore = document.querySelector("#highscore");
  button = document.querySelector("#button");

  button.onclick = function(e){
    runBest = !runBest;

    if(runBest){
      this.value = "Keep Training";
      resetGame();
    }else{
      this.value = "Run Best";
      nextGeneration();
    }
  }

  for(let i=0; i<TOTAL; i++){
    let bird = new Bird();
    activeBirds.push(bird);
    allBirds.push(bird);
  }
}

function draw(){
  background(50);

  let cycles = slider.value;
  sliderDisplay.innerHTML = cycles;
  score.innerHTML = `${counter} (${(counter/140)|0})`;
  highscore.innerHTML = `${record} (${(record/140)|0})`;

  for(let n=0; n<cycles; n++){
    for(let i=pipes.length-1; i>=0; i--){
      let pipe = pipes[i];
      pipe.update();

      if(pipe.x + pipe.w < 0){
        pipes.splice(i, 1);
      }
    }

    for(let i=pipes.length-1; i>=0; i--){
      let pipe = pipes[i];

      for(let j=activeBirds.length-1; j>=0; j--){
        let bird = activeBirds[j];

        bird.think(pipes);
        bird.update();

        if(pipe.hits(bird) || !bird.inBounds()){
          activeBirds.splice(j, 1);
        }
      }
    }

    if(counter % 75 == 0){
      pipes.push(new Pipes());
    }
    counter++;

    if(counter > record){
      record = counter;
    }
  }

  for(let pipe of pipes){
    pipe.draw();
  }

  for(let bird of activeBirds){
    bird.draw();
  }

  if(activeBirds.length == 0){
    if(!runBest){
      nextGeneration();
    }else{
      resetGame();
    }
  }
}

// function keyPressed(e){
//   if(e.keyCode == 32){
//     activeBirds[0].flap();
//   }
// }
