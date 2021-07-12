class Pipes {
  constructor(){
    this.x = width;
    this.w = 75;
    this.spacing = 100;
    this.min = 25;
    this.top = random(this.min, height - this.min - this.spacing);
    this.bottom = this.top + this.spacing;
  }

  update(){
    this.x -= 5;
  }

  draw(){
    fill(255);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, this.bottom, this.w, height - this.top);
  }

  hits(bird){
    if(bird.x >= this.x && bird.x <= this.x + this.w){
      if((bird.y >= 0 && bird.y <= this.top) || (bird.y >= this.bottom && bird.y <= height)){
        return true;
      }
    }
    
    return false;
  }
}
