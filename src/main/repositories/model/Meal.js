const MEAL_ICON="🥣";

class Meal extends Group{
    constructor(name, items){
      super(`${MEAL_ICON} ${name}`, items);
    }

    toString(){
      let itemsString = this.items.map((i) => `[${i[0]},${i[1]}]`).join(",");
      return `Meal(${this.name},[${itemsString}])`;
    }
}