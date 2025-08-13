class Recipe extends Group{
    constructor(name, items){
      super(name, items);
    }
  
    toString(){
      let itemsString = this.items.map((i) => `[${i[0]},${i[1]}]`).join(",");
      return `Recipe(${this.name},[${itemsString}])`;
    }
}