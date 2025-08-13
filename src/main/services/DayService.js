class DayService{

  finishDay(){
    this.deleteYesterday();
    this.saveToHistory();
    this.renameTodayToYesterday();
    this.nextDay();
    this.showSaveButtons();
  }

  copyMeal(name){
    let yRng = new Rng(`${YESTERDAY}!${name}`);
    let tRng = new Rng(`${TODAY}!${name}`);
    tRng.setValues(yRng.getValues());
  }

  loadMeal(sheetName, meal, startrow){
    let spr = new Spr(sheetName);
    let targetRng = new Rng(`${sheetName}!${meal}`);
    spr.setValue(`V${startrow + 2}`, targetRng.getValue().substring(2));
    let sourceData = new Rng(`${sheetName}!${RNG_SELECTED_MEAL_ITEMS}`)
                        .getValues()
                        .map(row => [row[0], '', row[1]]);
    targetRng.setValues(sourceData);
  }

  saveMeal(dayMeal){
    var name = mealNamePopup();
    var items = new Rng(`${getActiveSheetName()}!${dayMeal}`)
                      .getValues()
                      .filter(row => row[0] != '');
    if(name != null){
      let meal = new Meal(name, items);
      mealRepository().saveMeal(meal);
    }
  }

  saveToHistory(){
    let summary = new Rng(`${TODAY}!${RNG_SUMMARY}`).getRowAsArray();
    let calDensity = new Rng(`${TODAY}!${RNG_CALORIE_DENSITY}`).getValue();
    let checklist = new Rng(`${TODAY}!${RNG_CHECKLIST}`).getColAsArray();
    let calorieOutput = new Rng(`${TODAY}!${RNG_CALORIE_OUTPUT}`).getValue();
    
    let history = new History(summary, calorieOutput, calDensity, checklist);

    historyRepository().add(history);
  }

  deleteYesterday(){
    var yesterdaySpr = new Spr(YESTERDAY);
    if(yesterdaySpr.spr) yesterdaySpr.deleteSpr();
  }

  renameTodayToYesterday(){
    let todaySpr = new Spr(TODAY);
    todaySpr.setValue(DAY_TITLE_POSITION, YESTERDAY);
    todaySpr.setName(YESTERDAY);
    this.hideFinishDayButton(todaySpr);
  }

  nextDay(){
    var generatedDaysRng = new Rng(RNG_GENERATED_DAYS); 
    if(generatedDaysRng.isBlank()){
      this.copyDayBaseToToday();
    } else {
      this.renameGeneratedDayToToday(generatedDaysRng);
    }
  }

  copyDayBaseToToday(){
    ACTIVE.getSheetByName(DAY_BASE).copyTo(ACTIVE).setName(TODAY);
    let spr = new Spr(TODAY);
    spr.activate();
    this.showFinishDayButton(spr);
    ACTIVE.moveActiveSheet(2);
    new Rng(`${TODAY}!${RNG_CALORIE_OUTPUT}`).setFormulaToValue();
    this.profileAutoCycle();
    spr.setActiveSelection('C15');
  }

  renameGeneratedDayToToday(generatedDaysRng){
    let spr = new Spr(generatedDaysRng.getValue());
    spr.setName(TODAY);
    spr.activate();
    spr.setValue(DAY_TITLE_POSITION, TODAY);
    this.showFinishDayButton(spr);
    new Rng(`${TODAY}!${RNG_CALORIE_OUTPUT}`).setFormulaToValue();
    this.profileAutoCycle();
    spr.setActiveSelection('C15');
    new Spr(PROFILE).deleteCells('N4');
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

  showFinishDayButton(spr){
    spr.moveButton(FINISH_BUTTON_INDEX, 1, 2, -2, 10);
  }

  hideFinishDayButton(spr){ 
    spr.hideButton(FINISH_BUTTON_INDEX); 
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
