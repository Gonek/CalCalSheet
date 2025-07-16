class DayService{

  constructor(){
    this.app = getObj(App);
    this.dayRepository = getObj(DayRepository);
  }

  // DAY FUNCTIONS

  finishDay(){
    let lastFinishedDayRng = getRng(RNG.LAST_FINISHED_DAY);
    let today = getRng(RNG.TODAY).getDisplayValue();
    if(lastFinishedDayRng.getDisplayValue() != today){
      this.updateDay();
      this.dayRepository.deletePastDays();
      this.dayRepository.copyDefaultForFutureDays();
      lastFinishedDayRng.setValue(today);
      this.app.flush();
      getRng(CBOX.DAY_NAME).setValueAndFlush("🚩 " + today);
      this.loadDay();
      this.app.flush();
    }
  }

  changeDay(){
    this.updateDay();
    this.loadDay();
    this.app.flush();
  }

  loadDay(){
    let index = getRng(RNG.DAY_INDEX).getValue();
    let day = this.dayRepository.load(index);
    getRng(RNG.DAY_ITEMS).setValues(this.toDay(day.items));
    getRng(RNG.CALORIE_OUTPUT).setValue(day.outputCalories);
    getRng(RNG.SELECTED_PROFILE).setValue(day.macroProfile);
    getRng(RNG.DAY_PREV_DAY_INDEX).setValue(index);
    getRng(RNG.MEAL_NAMES).clear();
  }

  loadDayFrom(input){
    let day = this.dayRepository.load(input.getData());
    getRng(RNG.DAY_ITEMS).setValues(this.toDay(day.items));
    getRng(RNG.CALORIE_OUTPUT).setValue(day.calorieOutput);
    getRng(RNG.SELECTED_PROFILE).setValue(day.macroProfile);
    getRng(RNG.MEAL_NAMES).clear();
  }

  updateDay(){
    let dayItems = this.fromDay(getRng(RNG.DAY_ITEMS).getValues());
    let calorieOutput = getRng(RNG.CALORIE_OUTPUT).getValue();
    let profile = getRng(RNG.SELECTED_PROFILE).getValue();
    let prevDayIndex = getRng(RNG.DAY_PREV_DAY_INDEX).getValue();
    this.dayRepository.update(prevDayIndex, new Day(dayItems, calorieOutput, profile))
    if(prevDayIndex > 0){
      this.saveToHistory();
    }
  }

  saveDayAs(input){
    let dayItems = this.fromDay(getRng(RNG.DAY_ITEMS).getValues());
    let calorieOutput = getRng(RNG.CALORIE_OUTPUT).getValue();
    let profile = getRng(RNG.SELECTED_PROFILE).getValue();
    if(input.getData()){
      this.dayRepository.update(input.getData(), new Day(dayItems, calorieOutput, profile))
    } else {
      this.dayRepository.saveAs(new Day(dayItems, calorieOutput, profile, input.getValue()));
    }
  }

  saveToHistory(){
    let date = getRng(RNG.DAY_PREV_DATE).getValue();
    let summary = getRng(RNG.SUMMARY).getRowAsArray();
    let calDensity = getRng(RNG.CALORIE_DENSITY).getValue();
    let checklist = getRng(RNG.CHECKLIST).getColAsArray();
    let calorieOutput = getRng(RNG.CALORIE_OUTPUT).getValue();
    
    let history = new History(date, summary, calorieOutput, calDensity, checklist);

    getObj(HistoryRepository).addOrUpdate(history);
  }
  
  deleteDays(input){
    input.getData().split(",").sort((a,b) => a - b).forEach(
      index => this.dayRepository.delete(index)
    );
  }

  clearDay(){
    getRng(RNG.DAY_ITEMS).clear();
  }

  // MEAL FUNCTIONS

  loadMeal(cbox){
    let mealName = cbox.getValue();
    if(mealName.indexOf('🥣') == 0){
      let startrow = cbox.getRng().getRow();
      getSht(SHT.DAY).setValue(`V${startrow}`, mealName.substring(3));
      let sourceData = this.toDay(getRng(`${RNG.SELECTED_MEAL_ITEMS}`)
                                  .getValues());
      getRng(`Meal${(startrow / 15)}`).setValues(sourceData);
    }
  }

  saveAsMeal(input){
    let mealIds = getRng(RNG.SELECTED_MEAL_IDS).getValue().split(",");
    let names = input.getValue().split(",");
    let len = Math.min(mealIds.length, names.length);
    let mealRepository = getObj(MealRepository);

    for(var i = 0; i < len; i++){
      var items = this.fromDay(getRng('Meal' + mealIds[i])
                              .getValues()
                              .filter(row => row[0] != ''));
      let meal = new Meal(names[i].trim(), items);
      mealRepository.saveMeal(meal);
    }
  }

  copyMealsFrom(input){
    let mealIds = getRng(RNG.SELECTED_MEAL_IDS).getValue();
    let copyFromItems = this.toDay(this.dayRepository.load(input.getData()).items);
    mealIds.split(",").forEach(id => getRng(`Meal${id}`).setValues(copyFromItems.slice((id-1) * 15, id * 15)));
  }

  copyMealsTo(input){
    let mealIds = getRng(RNG.SELECTED_MEAL_IDS).getValue();
    let copyToIndexes = input.getData();
    if(mealIds && copyToIndexes){
      var mealMap = new Map();
      mealIds.split(",").forEach(
        id => mealMap.set(id, this.fromDay(getRng(`Meal${id}`).getValues()))
      );
      this.dayRepository.copyMealsTo(mealMap, copyToIndexes.split(",").map(Number));
    }
  }

  clearMeals(input){
    input.getData().split(",").forEach(id => 
      getRng(`meal${id}`).clear()
    );
  }

  deleteMeals(input){
    getObj(MealRepository).delete(input.getValue().split(", "));
  }

  // OTHER FUNCTIONS

  showHideTools(input){
    var sht = getSht(SHT.DAY);
    var areToolsOpen = input.getData() === 'true';
    sht.switchCols(!areToolsOpen, 25, 7);
    input.setData(!areToolsOpen);
  }

  fromDay(items){
    return items.map(row => [row[0], row[2]]);
  }

  toDay(items){
    return items.map(row => [row[0], '', row[1]]);
  }
}
