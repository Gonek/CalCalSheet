// DATA MODEL
class Day{
  constructor(dayItems){
    this.items = dayItems;
  }
}

// REPOSITORY

class DayRepository{

  constructor(){
     this.spr = new Spr(DAYS);
  }

  save(day){
    let prevDayIndex = new Rng(RNG_DAY_PREV_DAY_INDEX).getValue();
    this.spr.setAreaValueAtPos(prevDayIndex + 3, 2, this.rearrangeItems(day));
    return prevDayIndex > 1;
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

  deletePastDays(){
    let lastRowToDelete = new Rng(RNG_DELETE_DAYS_UNTIL).getValue();
    if(lastRowToDelete > 0){
      this.spr.deleteRows(19, lastRowToDelete+1);
    }
  }

  deleteFutureDays(){
    let firstRowToDelete = new Rng(RNG_DELETE_DAYS_FROM).getValue()
    let newDayRow = new Rng(RNG_FIRST_EMPTY_DAY_INDEX).getValue();
    if(firstRowToDelete > 0){
      this.spr.deleteRows(firstRowToDelete, newDayRow);
    }
  }

  copyDefaultForFutureDays(){
    let defaultDayRng = new Rng(RNG_DEFAULT_DAY);
    let createDaysFrom = new Date(new Rng(RNG_CREATE_DAYS_FROM).getValue());
    let createDays = new Rng(RNG_CREATE_DAYS).getValue();
    let newDayRow = new Rng(RNG_FIRST_EMPTY_DAY_INDEX).getValue();
    for(let i = 0; i < createDays; i++){
      let newDayA1 = "A"+(newDayRow + 15 * i)+":M"+(newDayRow + ((i + 1) * 15));
      defaultDayRng.copyTo(this.spr.getRng(newDayA1));
      this.spr.setPosValue(newDayRow + 15 * i, 1, createDaysFrom);
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
}

// REPOSITORY SINGLETON
var dayRepositorySingleton;

/** 
 * Returns the day repository sigleton
 * @returns {DayRepository} item repository singleton
 */
var dayRepository = () => dayRepositorySingleton = dayRepositorySingleton || new DayRepository();