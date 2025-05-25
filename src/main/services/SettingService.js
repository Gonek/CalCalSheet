class SettingsService{

  constructor(){
    this.daySpr = getSpr(SPR.DAY);
    this.newItemSpr = getSpr(SPR.NEW_ITEM);
    this.recipeCalculatorSpr = getSpr(SPR.RECIPE_CALCULATOR);
    this.itemsSpr = getSpr(SPR.ITEMS);
    this.profileSpr = getSpr(SPR.PROFILE);
    this.historySpr = getSpr(SPR.HISTORY);
  }

  applySettings(){
    var nutritionFields = getRng(RNG.NUTRITION_FIELDS).getColAsArray();
    var generalSettings = getRng(RNG.GENERAL_SETTINGS).getColAsArray()
    var meals = getRng(RNG.MEALS).getValues();

    this.applyGeneralSettings(generalSettings);
    this.changeFields(nutritionFields, generalSettings);
    this.changeMeals(meals);
  }

  applyGeneralSettings(generalSettings){
    let profileRngList = this.profileSpr.getRngList(['C5:P5', 'C8:P8', 'C12:P12']);
    if(generalSettings[6]){
      profileRngList.setNumberFormat('0" %"');
    } else {
      profileRngList.setNumberFormat('0" g"');
    }
    let dayRepository = getObj(DayRepository);
    dayRepository.deletePastDays();
    dayRepository.deleteFutureDays();
    dayRepository.copyDefaultForFutureDays();
    getRng(RNG.DAY_PREV_DAY_INDEX).setValue(getRng(RNG.DAY_INDEX).getValue());
  }

  changeFields(nutritionFields, generalSettings){
    this.changeNutritonFields(nutritionFields);
    this.changeCheckBox(generalSettings);
    this.changeNoom(generalSettings);
  }

  changeNutritonFields(nutritionFields){
    nutritionFields.forEach((field, i) => {
      this.daySpr.switchCols(field, i + 9);
      this.newItemSpr.switchRows(field, i + 8);
      this.recipeCalculatorSpr.switchCols(field, i + 8);
      this.itemsSpr.switchCols(field, (i*2) + 8, 2);
      this.profileSpr.switchRows(field, i + 5);
      this.historySpr.switchCols(field, i + 6);
    })
  }

  changeCheckBox(generalSettings){
    var consumedCbx = generalSettings[3];
    this.daySpr.switchCols(consumedCbx, 2);
  }

  changeNoom(generalSettings){
    var noom = generalSettings[4];
    this.daySpr.switchCols(noom, 18, 3);
    this.daySpr.setValue('V4', noom ? 'Noom' : '');
    this.newItemSpr.switchRows(noom, 20, 2);
    this.recipeCalculatorSpr.switchRows(noom, 36, 2);
    this.itemsSpr.switchCols(noom, 26);
    this.historySpr.switchCols(noom, 19);
  }

  changeMeals(meals){
    meals.forEach((meal, i) => {
      var startPos = ((i + 1) * ROWS_PER_MEAL);
      if (meal[0] != ''){
        var colShow = meal[1];
        var colHide = ROWS_PER_MEAL - colShow; 
        this.daySpr.showRows(startPos, colShow);
        if(colHide > 0) {
          this.daySpr.hideRows(startPos + colShow, colHide);
        }
      }else{
        this.daySpr.hideRows(startPos, ROWS_PER_MEAL);
      }
      this.daySpr.setPosValue(startPos, 1, meal[0]);
      this.daySpr.setPosValue(4 + i, 7, meal[0]);
    })
  }
}
