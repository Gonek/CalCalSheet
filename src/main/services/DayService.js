class DayService{

  constructor(){
    this.spr = getSpr(SPR.DAY);
    this.app = getObj(App);
    this.dayRepository = getObj(DayRepository);
  }

  finishDay(){
    let lastFinishedDayRng = getRng(RNG.LAST_FINISHED_DAY);
    let today = getRng(RNG.TODAY).getDisplayValue();
    if(lastFinishedDayRng.getDisplayValue() != today){
      this.saveDay();
      this.dayRepository.deletePastDays();
      this.dayRepository.copyDefaultForFutureDays();
      lastFinishedDayRng.setValue(today);
      getRng(CBOX.DAY_NAME).setValueAndFlush("🚩 " + today);
      var preDayIndexRng = getRng(RNG.DAY_PREV_DAY_INDEX);
      var dayIndexRng = getRng(RNG.DAY_INDEX);
      this.loadDay(preDayIndexRng, dayIndexRng);
      this.app.flush();
    }
  }

  changeDay(){
    var preDayIndexRng = getRng(RNG.DAY_PREV_DAY_INDEX);
    var dayIndexRng = getRng(RNG.DAY_INDEX);
    if(preDayIndexRng.getValue() != dayIndexRng.getValue()){
      this.saveDay();
      this.loadDay(preDayIndexRng, dayIndexRng);
      this.app.flush();
    }
  }

  loadMeal(cbox){
    let mealName = cbox.getRng().getValue();
    if(mealName.indexOf('🥣') == 0){
      let startrow = cbox.getRng().getRow();
      getSpr(SPR.DAY).setValue(`V${startrow}`, mealName.substring(3));
      let sourceData = getRng(`${RNG.SELECTED_MEAL_ITEMS}`)
                          .getValues()
                          .map(row => [row[0], '', row[1]]);
      getRng(`Meal${(startrow / 15)}`).setValues(sourceData);
    }
  }

  saveMeal(){
    var nameRng = getRng(RNG.SAVE_MEAL_AS);
    var name = nameRng.getValue();
    if(name){
      var dayMeal = 'Meal' + getRng(RNG.SAVE_MEAL_FROM_MEAL_ID).getValue();
      var items = getRng(dayMeal)
                  .getValues()
                  .filter(row => row[0] != '')
                  .map(row => [row[0], row[2]]);
      let meal = new Meal(name, items);
      getObj(MealRepository).saveMeal(meal);
      nameRng.clear();
      getRng(RNG.SAVE_MEAL_FROM).clear();
    }
  }

  copyMeals(){
    let copyMealIds = getRng(RNG.COPY_MEAL_FROM_MEAL_IDS).getValue();
    let copyMealToRows = getRng(RNG.COPY_MEAL_TO_ROWS).getValue();
    if(copyMealIds && copyMealToRows){
      var mealMap = new Map();
      copyMealIds.split(",").forEach(
        id => mealMap.set(id, getRng(`Meal${id}`)
                          .getValues()
                          .map(row => [row[0], row[2]]))
      );
      this.dayRepository.copyMeals(mealMap, copyMealToRows.split(",").map(Number));
      getRng(RNG.COPY_MEAL_FROM).clear();
      getRng(RNG.COPY_MEAL_TO).clear();
    }
  }

  loadDay(preDayIndexRng, dayIndexRng){
    let dayItems = getRng(RNG.SELECTED_DAY_ITEMS)
                        .getValues()
                        .map(row => [row[0], '', row[1]]);
    getRng(RNG.DAY_ITEMS).setValues(dayItems);
    preDayIndexRng.setValue(dayIndexRng.getValue());
    getRng(RNG.MEAL_NAMES).clear();
  }

  saveDay(){
    let dayItems = getRng(RNG.DAY_ITEMS).getValues();
    if(this.dayRepository.save(new Day(dayItems))){
      this.saveToHistory();
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

// TODO FIX THIS
  profileAutoCycle(){
    if(getRng(RNG.GENERAL_SETTINGS).getValue(4)){
      let numberOfProfiles = getRng(RNG.NUMBER_OF_PROFILES).getValue();
      if(numberOfProfiles > 1){
        let profileIndex = getRng(`${YESTERDAY}!${RNG.SELECTED_PROFILE_INDEX}`).getValue();
        if(profileIndex > numberOfProfiles){
          profileIndex = 1;
        } else {
          profileIndex = profileIndex + 2;
        }
        let nextProfile = getRng(RNG.MACRO_PROFILES).getValue(1, profileIndex);
        getRng(`${TODAY}!${RNG.SELECTED_PROFILE}`).setValue(nextProfile);
      }
    }
  }
}
