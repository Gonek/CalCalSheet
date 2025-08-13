class History{
    constructor(date, summary, calorieOutput, calorieDensity, checklist){
      this.date = date;
      this.calorieInput = summary[0];
      this.calorieOutput = calorieOutput;
      this.totalFat = summary[1];
      this.saturatedFat = summary[2];
      this.transFat = summary[3];
      this.carbohydrate = summary[4];
      this.fiber = summary[5];
      this.sugar = summary[6];
      this.sugarAlcohol = summary[7];
      this.protein = summary[8];
      this.salt = summary[9];
      this.price = summary[10].toFixed(2);
      this.calorieDensity = calorieDensity;
      this.checkCalorie = checklist[0];
      this.checkMacro = checklist[1];
      this.checkDensity = checklist[2];
    }

    toString(){
      return `History(${this.date},${this.calorieInput},${this.calorieOutput},${this.totalFat},${this.saturatedFat},${this.transFat},${this.carbohydrate},${this.fiber},${this.sugar},${this.sugarAlcohol},${this.protein},${this.salt},${this.price},${this.calorieDensity},${this.checkCalorie},${this.checkMacro},${this.checkDensity})`;
    }

    isEqual(other){
      return this.date === other.date &&
             this.calorieInput === other.calorieInput && 
             this.calorieOutput === other.calorieOutput && 
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
             this.calorieDensity === other.calorieDensity && 
             this.checkCalorie === other.checkCalorie && 
             this.checkMacro === other.checkMacro && 
             this.checkDensity === other.checkDensity;
    }
}