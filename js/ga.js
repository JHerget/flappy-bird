let resetGame = function(){
  if(runBest){
    let bestBird = allBirds[0];
    for(let bird of allBirds){
      if(bird.score > bestBird.score){
        bestBird = bird;
      }
    }

    counter = 0;
    pipes = [];
    activeBirds = [bestBird.copy()];
  }else{
    counter = 0;
    pipes = [];
  }
}

let nextGeneration = function(){
  resetGame();
  calculateFitness(allBirds);
  activeBirds = createPopulation(allBirds);
  allBirds = activeBirds.slice();
}

let calculateFitness = function(birds){
  for(let bird of birds){
    bird.score = pow(bird.score, 2);
  }

  let sum = 0;
  for(let bird of birds){
    sum += bird.score;
  }

  for(let bird of birds){
    bird.fitness = bird.score / sum;
  }
}

let createPopulation = function(birds){
  newBirds = [];

  for(let i=0; i<TOTAL; i++){
    newBirds.push(poolSelection(birds));
  }

  return newBirds;
}

let poolSelection = function(birds){
  let index = 0;
  let r = random(1);

  while(r > 0){
    r -= birds[index].fitness;
    index++;
  }
  index--;

  let birdPick = birds[index].copy();
  birdPick.mutate();

  return birdPick;
}
