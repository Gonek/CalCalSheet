class Item{
    constructor(name, fields, price = null, pricePerUnit = null, noomColour = null, autoDelete = null){
      this.name = name;
      this.amount = fields[0];
      this.unit = fields[1];
      this.weight = fields[2];
      this.calories = fields[3];
      this.totalFat = fields[4];
      this.saturatedFat = fields[5];
      this.transFat = fields[6];
      this.carbohydrate = fields[7];
      this.fiber = fields[8];
      this.sugar = fields[9];
      this.sugarAlcohol = fields[10];
      this.protein = fields[11];
      this.salt = fields[12];
      this.price = price;
      this.pricePerUnit = pricePerUnit;
      this.noomColour = noomColour;
      this.autoDelete = autoDelete;
    }
  
    toString(){
      return `Item(${this.name},${this.amount},${this.unit},${this.weight},${this.calories},${this.totalFat},${this.saturatedFat},${this.transFat},${this.carbohydrate},${this.fiber},${this.sugar},${this.sugarAlcohol},${this.protein},${this.salt},${this.price},${this.pricePerUnit},${this.noomColour},${this.autoDelete})`;
    }

    isEqual(other){
      return this.name === other.name &&
             this.amount === other.amount &&
             this.unit === other.unit &&
             this.weight === other.weight &&
             this.calories === other.calories &&
             this.totalFat === other.totalFat &&
             this.saturatedFat === other.saturatedFat &&
             this.transFat === other.transFat &&
             this.carbohydrate === other.carbohydrate &&
             this.fiber === other.fiber &&
             this.sugar === other.sugar &&
             this.sugarAlcohol === other.sugarAlcohol &&
             this.protein === other.protein &&
             this.salt === other.salt &&
             this.price === other.price &&
             this.pricePerUnit === other.pricePerUnit &&
             this.noomColour === other.noomColour &&
             this.autoDelete === other.autoDelete;
    }
  }