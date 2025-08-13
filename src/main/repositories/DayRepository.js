class DayRepository{

  constructor(){
     this.sht = getSht(SHT.DAYS);
  }

  saveAs(day){
    if(!day.name) return;
    let defaultDayRng = getRng(RNG.DEFAULT_DAY);
    let newDayRow = getRng(RNG.FIRST_EMPTY_TEMPLATE_INDEX).getValue();
    let newDayA1 = `P${newDayRow}:AC${newDayRow + 15}`;
    defaultDayRng.copyTo(this.sht.getRng(newDayA1), SpreadsheetApp.CopyPasteType.PASTE_FORMAT);
    let toSave = this.rearrangeItemsForSave(day);
    this.sht.setAreaValueAtPos(newDayRow, 16, toSave);
  }

  update(index, day){
    let row = this.getRowFromIndex(index);
    let col = this.getColFromIndex(index);
    let toSave = this.rearrangeItemsForSave(day);
    this.sht.setAreaValueAtPos(row, col, toSave);
  }

  load(index){
    if(index == 0) return;
    let day = new Day();
    let loaded = this.sht.getAreaValues(this.getRowFromIndex(index), this.getColFromIndex(index), 15, 13);
    day.items = this.rearrangeItemsForLoad(loaded);
    day.outputCalories = loaded[0][12];
    day.macroProfile = loaded[1][12];
    return day;
  }

  delete(index){
    if(index == 0) return;
    this.sht.deleteCellsInArea(this.getRowFromIndex(index), this.getColFromIndex(index)-1, 15, 14);
  }

  deletePastDays(){
    let lastRowToDelete = getRng(RNG.DELETE_DAYS_UNTIL).getValue();
    if(lastRowToDelete > 0){
      this.sht.deleteCellsInArea(6, 1, lastRowToDelete-5, 14);
    }
  }

  deleteFutureDays(){
    let firstRowToDelete = getRng(RNG.DELETE_DAYS_FROM).getValue()
    let newDayRow = getRng(RNG.FIRST_EMPTY_DAY_INDEX).getValue();
    if(firstRowToDelete > 0){
      this.sht.deleteCellsInArea(firstRowToDelete, 1, newDayRow - firstRowToDelete, 14);
    }
  }

  copyDefaultForFutureDays(){
    let defaultDayRng = getRng(RNG.DEFAULT_DAY);
    let createDaysFrom = new Date(getRng(RNG.CREATE_DAYS_FROM).getValue());
    let createDays = getRng(RNG.CREATE_DAYS).getValue();
    let newDayRow = getRng(RNG.FIRST_EMPTY_DAY_INDEX).getValue();
    if(createDays > 0){
      for(let i = 0; i < createDays; i++){
        let row = newDayRow + 15 * i;
        let newDayA1 = `A${row}:N${row + 15}`;
        let nextprofile = getRng(RNG.NEXT_PROFILE).getValue();
        let defaultCalorieOutput = getRng(RNG.DEFAULT_CALORIE_OUTPUT).getValue();
        defaultDayRng.copyTo(this.sht.getRng(newDayA1));
        this.sht.setPosValue(row, 1, new Date(createDaysFrom));
        this.setDefaultAdditinalData(row, defaultCalorieOutput, nextprofile);
        createDaysFrom.setDate(createDaysFrom.getDate() + 1);
      }
    }
  }

  setDefaultAdditinalData(row, defaultCalorieOutput, nextprofile){
    this.sht.setPosValue(row, 14, defaultCalorieOutput);
    this.sht.setPosValue(row+1, 14, nextprofile);
  }

  copyMealsTo(mealsMaps, copyToIndexes){
    copyToIndexes.forEach(index => 
      mealsMaps.forEach((values, i) =>
        this.sht.setAreaValue(this.getRowFromIndex(index), this.getColFromIndex(index) + (i-1) * 2, 15, 2, values)
      )
    )
  }

  rearrangeItemsForSave(day){
    let data = [...Array(15).keys()].map(i => [
      day.items[i][0], day.items[i][1],
      day.items[i + 15][0], day.items[i + 15][1],
      day.items[i + 30][0], day.items[i + 30][1],
      day.items[i + 45][0], day.items[i + 45][1],
      day.items[i + 60][0], day.items[i + 60][1],
      day.items[i + 75][0], day.items[i + 75][1],
      this.getAdditionalDataForSave(i, day)
    ]);
    if(day.name) data.forEach(a => a.unshift(day.name));
    return data;
  }

  rearrangeItemsForLoad(savedItems){
    return Array.from({length:6},(v, j)=> 
      Array.from(
        {length:15},(v, i)=> [savedItems[i][j*2], savedItems[i][j*2+1]]
      )
    ).flat();
  }

  getAdditionalDataForSave(i, day){
    switch (i) {
      case 0: return day.outputCalories;
      case 1: return day.macroProfile;
      default : return '';
    }
  }

  getRowFromIndex(index){
    return Math.abs(index) + 5;
  }

  getColFromIndex(index){
    return index > 0 ? 2 : 17;
  }
}