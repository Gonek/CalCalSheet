class Day{
    constructor(dayItems){
      this.items = dayItems;
    }

    toString(){
      let itemsString = this.items.map((i) => `[${i[0]},${i[2]}]`).join(",");
      return `Day([${itemsString}])`;
    }

    isEqual(other){
      return arraysEqual(this.items, other.items);
    }
  }