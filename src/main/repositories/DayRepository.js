class DayRepository{

  constructor(){
     this.sht = getSpr(SHT.DAYS);
  }

  save(day){
    let prevDayIndex = getRng(RNG.DAY_PREV_DAY_INDEX).getValue();
    this.sht.setAreaValueAtPos(prevDayIndex + 3, 2, this.rearrangeItems(day));
    this.sht.setAreaValueAtPos(prevDayIndex + 3, 14, [[day.outputCalories], [day.macroProfile]]);
    return prevDayIndex > 1;
  }

  deletePastDays(){
    let lastRowToDelete = getRng(RNG.DELETE_DAYS_UNTIL).getValue();
    if(lastRowToDelete > 0){
      this.sht.deleteRows(19, lastRowToDelete+1);
    }
  }

  deleteFutureDays(){
    let firstRowToDelete = getRng(RNG.DELETE_DAYS_FROM).getValue()
    let newDayRow = getRng(RNG.FIRST_EMPTY_DAY_INDEX).getValue();
    if(firstRowToDelete > 0){
      this.sht.deleteRows(firstRowToDelete, newDayRow);
    }
  }

  copyDefaultForFutureDays(){
    let defaultDayRng = getRng(RNG.DEFAULT_DAY);
    let createDaysFrom = new Date(getRng(RNG.CREATE_DAYS_FROM).getValue());
    let createDays = getRng(RNG.CREATE_DAYS).getValue();
    let newDayRow = getRng(RNG.FIRST_EMPTY_DAY_INDEX).getValue();
    if(createDays > 0){
      this.sht.insertRows(newDayRow, 15 * createDays);
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

  copyMeals(mealsMaps, copyToRows){
    copyToRows.forEach(startRow => 
      mealsMaps.forEach((values, i) =>
        this.sht.setAreaValue(startRow, i * 2, 15, 2, values)
      )
    )
  }

  rearrangeItems(day){
    return [...Array(15).keys()].map(i => [
      day.items[i][0], day.items[i][2],
      day.items[i + 15][0], day.items[i + 15][2],
      day.items[i + 30][0], day.items[i + 30][2],
      day.items[i + 45][0], day.items[i + 45][2],
      day.items[i + 60][0], day.items[i + 60][2],
      day.items[i + 75][0], day.items[i + 75][2]
    ]);
  }
}