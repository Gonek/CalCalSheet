// DATA MODEL

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
    this.calorieDensity = calorieDensity;
    this.checkCalorie = checklist[0];
    this.checkMacro = checklist[1];
    this.checkDensity = checklist[2];
    this.checkNoom = '';
  }
}

// REPOSITORY

class HistoryRepository{

  constructor(){
     this.spr = new Spr(HISTORY);
  }

  addOrUpdate(history){
    let originalPos = new Rng(RNG_SELECETED_HISTORY_DAY).getValue();
    if(originalPos != 0){
      this.update(history, originalPos + 9);
    } else {
      this.add(history);
    }
  }

  add(history){
    let row = this.spr.getLastRow()+1;
    let rowData = this.fieldsToRow(history, row);
    this.spr.appendRow(rowData);
    this.spr.sort(2);
  }
  
  update(history, originalPos){
    this.spr.setAreaValue(originalPos, 1, 1, 19, [this.fieldsToRow(history, originalPos)]);
  }

  fieldsToRow(history, row){
    return ['', 
      history.date, 
      history.calorieInput,
      history.calorieOutput,
      `=IFERROR(D${row}-C${row})`,
      history.totalFat,
      history.saturatedFat,
      history.transFat,
      history.carbohydrate,
      history.fiber,
      history.sugar,
      history.sugarAlcohol,
      history.protein,
      history.salt,
      history.calorieDensity,
      history.checkCalorie,
      history.checkMacro,
      history.checkDensity,
      history.checkNoom
    ];
  }

}

// REPOSITORY SINGLETON
var historyRepositorySingleton;

/** 
 * Returns the history repository sigleton
 * @returns {HistoryRepository} item repository singleton
 */
var historyRepository = () => historyRepositorySingleton = historyRepositorySingleton || new HistoryRepository();