// INTERFACE

var finishDay = () => dayService().finishDay();
var saveMeal = () => dayService().saveMeal();
var copyMeals = () => dayService().copyMeals();
var loadMeal1 = (cbox) => dayService().loadMeal(cbox, MEAL1, 15);
var loadMeal2 = (cbox) => dayService().loadMeal(cbox, MEAL2, 30);
var loadMeal3 = (cbox) => dayService().loadMeal(cbox, MEAL3, 45);
var loadMeal4 = (cbox) => dayService().loadMeal(cbox, MEAL4, 60);
var loadMeal5 = (cbox) => dayService().loadMeal(cbox, MEAL5, 75);
var loadMeal6 = (cbox) => dayService().loadMeal(cbox, MEAL6, 90);
var changeDay = () => dayService().changeDay();

// CLASS

class DayService{

  constructor(){
    this.spr = new Spr(DAY);
    this.dayRepository = dayRepository();
  }

  finishDay(){
    let lastFinishedDayRng = new Rng(RNG_LAST_FINISHED_DAY);
    let today = new Rng(RNG_TODAY).getDisplayValue();
    if(lastFinishedDayRng.getDisplayValue() != today){
      this.saveDay();
      this.dayRepository.deletePastDays();
      this.dayRepository.copyDefaultForFutureDays();
      lastFinishedDayRng.setValue(today);
      new Rng(RNG_DAY_NAME).setValueAndFlush("🚩 " + today);
      var preDayIndexRng = new Rng(RNG_DAY_PREV_DAY_INDEX);
      var dayIndexRng = new Rng(RNG_DAY_INDEX);
      this.loadDay(preDayIndexRng, dayIndexRng);
    }
  }

  changeDay(){
    var preDayIndexRng = new Rng(RNG_DAY_PREV_DAY_INDEX);
    var dayIndexRng = new Rng(RNG_DAY_INDEX);
    if(preDayIndexRng.getValue() != dayIndexRng.getValue()){
      this.saveDay();
      this.loadDay(preDayIndexRng, dayIndexRng);
      SpreadsheetApp.flush();
    }
  }

  loadDay(preDayIndexRng, dayIndexRng){
    let dayItems = new Rng(RNG_SELECTED_DAY_ITEMS)
                        .getValues()
                        .map(row => [row[0], '', row[1]]);
    new Rng(RNG_DAY_ITEMS).setValues(dayItems);
    preDayIndexRng.setValue(dayIndexRng.getValue());
    new Rng(RNG_MEAL_NAMES).clear();
  }

  saveDay(){
    let dayItems = new Rng(RNG_DAY_ITEMS).getValues();
    if(this.dayRepository.save(new Day(dayItems))){
      this.saveToHistory();
    }
  }

  saveToHistory(){
    let date = new Rng(RNG_DAY_PREV_DATE).getValue();
    let summary = new Rng(RNG_SUMMARY).getRowAsArray();
    let calDensity = new Rng(RNG_CALORIE_DENSITY).getValue();
    let checklist = new Rng(RNG_CHECKLIST).getColAsArray();
    let calorieOutput = new Rng(RNG_CALORIE_OUTPUT).getValue();
    
    let history = new History(date, summary, calorieOutput, calDensity, checklist);

    historyRepository().addOrUpdate(history);
  }

  loadMeal(cbox, meal, startrow){
    if(String(cbox.getRng().getValue()).indexOf(MEAL_ICON) == 0){
      let spr = new Spr(DAY);
      let targetRng = new Rng(`${meal}`);
      spr.setValue(`V${startrow + 2}`, targetRng.getValue().substring(2));
      let sourceData = new Rng(`${RNG_SELECTED_MEAL_ITEMS}`)
                          .getValues()
                          .map(row => [row[0], '', row[1]]);
      targetRng.setValues(sourceData);
    }
  }

  saveMeal(){
    var nameRng = new Rng(RNG_SAVE_MEAL_AS);
    var name = nameRng.getValue();
    if(name){
      var dayMeal = 'Meal' + new Rng(RNG_SAVE_MEAL_FROM_MEAL_ID).getValue();
      var items = new Rng(dayMeal)
                  .getValues()
                  .filter(row => row[0] != '')
                  .map(row => [row[0], row[2]]);
      let meal = new Meal(name, items);
      mealRepository().saveMeal(meal);
      nameRng.clear();
      new Rng(RNG_SAVE_MEAL_FROM).clear();
    }
  }

  copyMeals(){
    let copyMealIds = new Rng(RNG_COPY_MEAL_FROM_MEAL_IDS).getValue();
    let copyMealToRows = new Rng(RNG_COPY_MEAL_TO_ROWS).getValue();
    if(copyMealIds && copyMealToRows){
      var mealMap = new Map();
      copyMealIds.split(",").forEach(
        id => mealMap.set(id, new Rng(`Meal${id}`)
                          .getValues()
                          .map(row => [row[0], row[2]]))
      );
      this.dayRepository.copyMeals(mealMap, copyMealToRows.split(",").map(Number));
      new Rng(RNG_COPY_MEAL_FROM).clear();
      new Rng(RNG_COPY_MEAL_TO).clear();
    }
  }

  profileAutoCycle(){
    if(new Rng(RNG_GENERAL_SETTINGS).getValue(4)){
      let numberOfProfiles = new Rng(RNG_NUMBER_OF_PROFILES).getValue();
      if(numberOfProfiles > 1){
        let profileIndex = new Rng(`${YESTERDAY}!${RNG_SELECTED_PROFILE_INDEX}`).getValue();
        if(profileIndex > numberOfProfiles){
          profileIndex = 1;
        } else {
          profileIndex = profileIndex + 2;
        }
        let nextProfile = new Rng(RNG_MACRO_PROFILES).getValue(1, profileIndex);
        new Rng(`${TODAY}!${RNG_SELECTED_PROFILE}`).setValue(nextProfile);
      }
    }
  }

  showSaveButtons(){
    var spr = new Spr(YESTERDAY);
    for (var i = 1; i <= 6; i++) {
      spr.moveButton(i, 3+i, 8);
    }
  }

  hideSaveButtons(){
    var spr = new Spr(DAY_BASE);
    for (var i = 1; i <= 6; i++) {
      spr.hideButton(i);
    }
  }
}

// SERVICE SINGLETON
var dayServiceSingleton;

/** 
 * Returns the day service
 * @returns {DayService} day service singleton
 */
var dayService = () => dayServiceSingleton = dayServiceSingleton || new DayService();
