// INTERFACE

var applySettings = () => settingsService().apply();

// CLASS

class SettingsService{

  constructor(){}

  apply(){
    var nutritionFields = new Rng(RNG_NUTRITION_FIELDS).getValues();
    var generalSettings = new Rng(RNG_GENERAL_SETTINGS).getColAsArray();
    var meals = new Rng(MEALS).getValues();
    var daySpr = new Spr(DAY);

    this.applyGeneralSettings(generalSettings);
    this.changeFields(daySpr, nutritionFields, generalSettings);
    this.changeMeals(daySpr, meals);
  }

  applyGeneralSettings(generalSettings){
    let profileSpr = new Spr(PROFILE);
    let profileRngList = profileSpr.getRngList(['C5:P5', 'C8:P8', 'C12:P12']);
    if(generalSettings[6]){
      profileRngList.setNumberFormat('0" %"');
    } else {
      profileRngList.setNumberFormat('0" g"');
    }
    dayRepository().deletePastDays();
    dayRepository().deleteFutureDays();
    dayRepository().copyDefaultForFutureDays();
    new Rng(RNG_DAY_PREV_DAY_INDEX).setValue(new Rng(RNG_DAY_INDEX).getValue());
  }

  changeFields(daySpr, nutritionFields, generalSettings){
    var newItemSpr = new Spr(NEW_ITEM);
    var recipeCalculatorSpr = new Spr(RECIPE_CALCULATOR);
    var itemsSpr = new Spr(ITEMS);
    var profileSpr = new Spr(PROFILE);
    var historySpr = new Spr(HISTORY);

    // Nutrition fields
    nutritionFields.forEach((nutritionField, i) => {
      var field = nutritionField[0];
      daySpr.switchCols(field, i + 9);
      newItemSpr.switchRows(field, i + 8);
      recipeCalculatorSpr.switchCols(field, i + 8);
      itemsSpr.switchCols(field, (i*2) + 8, 2);
      profileSpr.switchRows(field, i + 5);
      historySpr.switchCols(field, i + 6);
    })

    // Consumed Checkbox
    var consumedCbx = generalSettings[3];
    daySpr.switchCols(consumedCbx, 2);

    // Noom
    var noom = generalSettings[4];
    daySpr.switchCols(noom, 18, 3);
    daySpr.setValue('V4', noom ? 'Noom' : '');
    newItemSpr.switchRows(noom, 20, 2);
    recipeCalculatorSpr.switchRows(noom, 36, 2);
    itemsSpr.switchCols(noom, 26);
    historySpr.switchCols(noom, 19);
  }

  changeMeals(daySpr, meals){
    meals.forEach((meal, i) => {
      var startPos = ((i + 1) * ROWS_PER_MEAL);
      if (meal[0] != ''){
        var colShow = meal[1];
        var colHide = ROWS_PER_MEAL - colShow; 
        daySpr.showRows(startPos, colShow);
        if(colHide > 0) {
          daySpr.hideRows(startPos + colShow, colHide);
        }
        daySpr.setPosValue(startPos, 1, meal[0]);
      }else{
        daySpr.hideRows(startPos, ROWS_PER_MEAL);
      }
      daySpr.setPosValue(4 + i, 7, meal[0]);
    })
  }
}

// SERVICE SINGLETON
var settingsServiceSingleton;
/** 
 * Returns the settings service
 * @returns {SettingsService} settings service singleton
 */
var settingsService = () => settingsServiceSingleton = settingsServiceSingleton || new SettingsService();
