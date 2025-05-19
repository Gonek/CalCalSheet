class Input{

  constructor(name, service, event){
    this.name = name;
    this.service = service
    this.event = event;
    this.rng = undefined;
  }

  getRng(){
    if(!this.rng) 
      this.rng = getRng(this.name);
    return this.rng
  }

  isSamePos(a1Pos){
    return a1Pos == this.getRng().getA1Pos();
  }

  run(){
    let serviceObj = getObj(this.service);
    serviceObj[this.event](this);
  }

  toString(){
    return `Input()`;
  }
}
