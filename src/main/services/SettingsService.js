class SettingsService extends AbstractSettingsService{

  constructor(){
    super();
  }

  process(){
    var nutritionFields = new Rng(RNG_NUTRITION_FIELDS).getValues();
    var generalSettings = new Rng(RNG_GENERAL_SETTINGS).getColAsArray();
    var meals = new Rng(MEALS).getValues();
    var daySprs = [new Spr(TODAY), new Spr(YESTERDAY), new Spr(DAY_BASE)];

    this.applyGeneralSettings(generalSettings);
    this.changeFields(daySprs, nutritionFields, generalSettings);
    this.changeMeals(daySprs, meals);
    this.relocateMealSaveButtons(daySprs);
  }

  applyGeneralSettings(generalSettings){
    let profileSpr = new Spr(PROFILE);
    let profileRngList = profileSpr.getRngList(['C5:P5', 'C8:P8', 'C12:P12']);
    if(generalSettings[4]){
      profileRngList.setNumberFormat('0" %"');
    } else {
      profileRngList.setNumberFormat('0" g"');
    } 
  }

  changeFields(daySprs, nutritionFields, generalSettings){
    var newItemSpr = new Spr(NEW_ITEM);
    var recipeCalculatorSpr = new Spr(RECIPE_CALCULATOR);
    var itemsSpr = new Spr(ITEMS);
    var profileSpr = new Spr(PROFILE);
    var historySpr = new Spr(HISTORY);

    // Nutrition fields
    nutritionFields.forEach((nutritionField, i) => {
      var field = nutritionField[0];
      daySprs.forEach(spr => spr.switchCols(field, i + 9));
      newItemSpr.switchRows(field, i + 8);
      recipeCalculatorSpr.switchCols(field, i + 8);
      itemsSpr.switchCols(field, (i*2) + 8, 2);
      profileSpr.switchRows(field, i + 5);
      historySpr.switchCols(field, i + 6);
    })

    // Consumed Checkbox
    var consumedCbx = generalSettings[1];
    daySprs.forEach(spr => spr.switchCols(consumedCbx, 2));

    // Noom
    var noom = generalSettings[2];
    daySprs.forEach(spr => {
      spr.switchCols(noom, 18, 3);
      spr.setValue('V4', noom ? 'Noom' : '');
    });
    newItemSpr.switchRows(noom, 20, 2);
    recipeCalculatorSpr.switchRows(noom, 35, 2);
    itemsSpr.switchCols(noom, 26);
    historySpr.switchCols(noom, 19);
  }

  relocateMealSaveButtons(daySprs){
    daySprs.forEach(spr => {
      for (var i = 0; i < 6; i++) {
        spr.moveButton(i + 7, ROWS_PER_MEAL + (i*ROWS_PER_MEAL), 22, -2, -2);
      }
    });
  }

  changeMeals(daySprs, meals){
    daySprs.forEach(spr => {
      meals.forEach((meal, i) => {
        var startPos = ((i + 1) * ROWS_PER_MEAL);
        if (meal[0] != ''){
          var colShow = meal[1];
          var colHide = ROWS_PER_MEAL - colShow; 
          spr.showRows(startPos, colShow);
          if(colHide > 0) {
            spr.hideRows(startPos + colShow, colHide);
          }
          spr.setPosValue(startPos, 1, meal[0]);
        }else{
          spr.hideRows(startPos, ROWS_PER_MEAL);
        }
        spr.setPosValue(4 + i, 7, meal[0]);
      })
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
