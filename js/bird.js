let f = function(x){
  if(random(1) < 0.1){
    return x + randomGaussian() * 0.5;
  }
  return x;
}

class Bird {
  constructor(brain){
    this.x = 100;
    this.y = height / 2;
    this.r = 30;
    this.vel = 0;
    this.acc = 0.25;
    this.lift = 6;
    this.score = 0;
    this.fitness = 0;

    if(brain){
      this.brain = brain.copy();
    }else{
      this.brain = new NeuralNetwork(5, 8, 2);
    }
  }

  think(pipes){
    let closest = null;
    let dist = Infinity;
    for(let i=0; i<pipes.length; i++){
      let d = pipes[i].x + pipes[i].w - this.x;
      if(d > 0 && d < dist){
        closest = pipes[i];
        dist = d;
      }
    }

    if(closest != null){
      let inputs = [];
      inputs[0] = map(this.y, 0, height, 0, 1);
      inputs[1] = map(this.vel, -10, 10, 0, 1);
      inputs[2] = map(closest.x, 0, width, 0, 1);
      inputs[3] = map(closest.top, 0, height, 0, 1);
      inputs[4] = map(closest.bottom, 0, height, 0, 1);

      let actions = this.brain.predict(inputs);
      if(actions[0] > actions[1]){
        this.flap();
      }
    }
  }

  update(){
    this.vel += this.acc;
    this.y += this.vel;
    this.score++;
  }

  draw(){
    noStroke();
    fill(255, 100);
    ellipse(this.x, this.y, this.r);
  }

  flap(){
    this.vel = -1*this.lift;
  }

  inBounds(){
    return (this.y > 0 && this.y < height);
  }

  copy(){
    return new Bird(this.brain.copy());
  }

  mutate(){
    this.brain.mutate(f);
  }
}
