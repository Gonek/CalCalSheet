class DayRepository{

  constructor(){
     this.spr = getSpr(SPR.DAYS);
  }

  save(day){
    let prevDayIndex = getRng(RNG.DAY_PREV_DAY_INDEX).getValue();
    this.spr.setAreaValueAtPos(prevDayIndex + 3, 2, this.rearrangeItems(day));
    this.spr.setAreaValueAtPos(prevDayIndex + 3, 14, [[day.outputCalories], [day.macroProfile]]);
    return prevDayIndex > 1;
  }

  deletePastDays(){
    let lastRowToDelete = getRng(RNG.DELETE_DAYS_UNTIL).getValue();
    if(lastRowToDelete > 0){
      this.spr.deleteRows(19, lastRowToDelete+1);
    }
  }

  deleteFutureDays(){
    let firstRowToDelete = getRng(RNG.DELETE_DAYS_FROM).getValue()
    let newDayRow = getRng(RNG.FIRST_EMPTY_DAY_INDEX).getValue();
    if(firstRowToDelete > 0){
      this.spr.deleteRows(firstRowToDelete, newDayRow);
    }
  }

  copyDefaultForFutureDays(){
    let defaultDayRng = getRng(RNG.DEFAULT_DAY);
    let createDaysFrom = new Date(getRng(RNG.CREATE_DAYS_FROM).getValue());
    let createDays = getRng(RNG.CREATE_DAYS).getValue();
    let newDayRow = getRng(RNG.FIRST_EMPTY_DAY_INDEX).getValue();
    for(let i = 0; i < createDays; i++){
      let newDayA1 = `A${newDayRow + 15 * i}:N${newDayRow + ((i + 1) * 15)}`;
      defaultDayRng.copyTo(this.spr.getRng(newDayA1));
      this.spr.setPosValue(newDayRow + 15 * i, 1, new Date(createDaysFrom));
      createDaysFrom.setDate(createDaysFrom.getDate() + 1);
    }
    this.spr.setPosValue(newDayRow + 15 * createDays, 1, '.');
  }

  copyMeals(mealsMaps, copyToRows){
    copyToRows.forEach(startRow => 
      mealsMaps.forEach((values, i) =>
        this.spr.setAreaValue(startRow, i * 2, 15, 2, values)
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