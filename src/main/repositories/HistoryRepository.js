class HistoryRepository{

  constructor(){
     this.spr = getSpr(SPR.HISTORY);
  }

  addOrUpdate(history){
    let originalPos = getRng(RNG.SELECETED_HISTORY_DAY).getValue();
    if(originalPos != 0){
      this.update(history, originalPos);
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
    this.spr.setAreaValue(originalPos + 9, 1, 1, 19, this.fieldsToRow(history, originalPos + 9));
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