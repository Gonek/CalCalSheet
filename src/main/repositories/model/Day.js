class Day{
    constructor(dayItems, outputCalories, macroProfile, name = undefined){
      this.items = dayItems;
      this.outputCalories = outputCalories;
      this.macroProfile = macroProfile;
      this.name = name;
    }

    toString(){
      let itemsString = this.items.map((i) => `[${i[0]},${i[1]}]`).join(",");
      return `Day([${itemsString}], ${this.outputCalories}, ${this.macroProfile})`;
    }

    isEqual(other){
      return arraysEqual(this.items, other.items) 
        && this.outputCalories === other.outputCalories
        && this.macroProfile === other.macroProfile
        && this.name === other.name;
    }
  }