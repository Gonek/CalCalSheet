class HistoryRepository{

  constructor(){
     this.sht = getSpr(SHT.HISTORY);
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
    let row = this.sht.getLastRow()+1;
    let rowData = this.fieldsToRow(history, row);
    this.sht.appendRow(rowData);
    this.sht.sort(2);
  }
  
  update(history, originalPos){
    this.sht.setAreaValue(originalPos + 9, 1, 1, 18, [this.fieldsToRow(history, originalPos + 9)]);
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
      history.checkDensity
    ];
  }
}