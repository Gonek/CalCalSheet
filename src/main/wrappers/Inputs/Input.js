class Input{

  constructor(name, event){
    this.name = name;
    this.event = event;
    this.rng = undefined;
  }

  getRng(){
    if(!this.rng) 
      this.rng = new Rng(this.name);
    return this.rng
  }

  isSamePos(a1Pos){
    return a1Pos == this.getRng().getA1Pos();
  }

  run(){
    this.event(this);
  }
}
