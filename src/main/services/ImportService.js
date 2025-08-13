class ImportService{

  constructor(){
    this.importRng = getRng(RNG.IMPORT);
  }

  startImport(){
    this.importId = this.importRng.getValue(1, 2);
    this.validateImport();
    for (var i = 2; i <= 8; i++) {
      if (this.importRng.getValue(i, 3))
        this.importData(this.getSheetIdByPos(i));
    }
  }

  getSheetIdByPos(pos){
    switch(pos){
      case 2: return SHT.ITEMS;
      case 3: return SHT.RECIPES;
      case 4: return SHT.MEALS;
      case 5: return SHT.PROFILE;
      case 6: return SHT.SETTINGS;
      case 7: return SHT.HISTORY;
      case 8: return SHT.DAYS;
    }
  }

  validateImport(){
    if(!getSpSh(this.importId).isExist()){
      throw new Error("Loading import sheet failed! Please check the sheet Id");
    } 
    this.baseVersion = getSht(`${this.importId}.${SHT.SUPPORT}`).getValue(VERSION_POSITION);
    if (this.baseVersion !== V1_5 && this.baseVersion !== V1_6){
      throw new Error("Sorry, you can only import version 1.5, 1.6 sheets");
    } 
  }

  importData(sheetId){
    var fromSht = getSht(`${this.importId}.${sheetId}`);
    var toSht = getSht(sheetId);
    if(fromSht.sht){
      switch(sheetId){
        case SHT.ITEMS: this.importItems(fromSht, toSht); break;
        case SHT.RECIPES: this.importRecipes(fromSht, toSht); break;
        case SHT.MEALS: this.importMeals(fromSht, toSht); break;
        case SHT.PROFILE: this.importProfile(fromSht, toSht); break;
        case SHT.SETTINGS: this.importSettings(fromSht, toSht); break;
        case SHT.HISTORY: this.importHistory(fromSht, toSht); break;
        case SHT.DAYS: this.importDays(fromSht, toSht); break;
      }
    }
  }

  importItems(fromSht, toSht){
    var data;
    if(this.baseVersion == V1_6){
      data = fromSht.getValues('B4:AD');
    } else {
      data = fromSht.getValues('B4:AA').map(i => [i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], 
                                                  i[10], i[11], i[12], i[13], i[14], i[15], i[16], i[17], i[18], i[19],
                                                  i[20], i[21], i[22], i[23], '', '', i[24], i[25], i[26], '']);
    }
    if(this.importRng.getValue(2, 2) == IMPORT_OPTIONS.CLEAR_CONTENT) {
      toSht.clearContent('B4:AD');
    }
    toSht.putDataAtEnd(data);
    toSht.sort(2);
  }

  importRecipes(fromSht, toSht){
    var data = fromSht.getClearValues('B4:D');
    if(this.importRng.getValue(3, 2) == IMPORT_OPTIONS.CLEAR_CONTENT) {
      toSht.clearContent('B4:D');
    }
    toSht.putDataAtEnd(data);
    toSht.sort(2);
  }

  importMeals(fromSht, toSht){
    var data = fromSht.getClearValues('B4:D');
    if(this.importRng.getValue(4, 2) == IMPORT_OPTIONS.CLEAR_CONTENT) {
      toSht.clearContent('B4:D');
    }
    toSht.putDataAtEnd(data);
    toSht.sort(2);
  }

  importProfile(fromSht, toSht){
    var fromWeightHistory;
    var fromMacro;
    var fromDetails;
    if(this.baseVersion == V1_6){
      fromWeightHistory = fromSht.getValues('I17:L113');
      fromMacro = fromSht.getValues('C3:P14');
      fromDetails = fromSht.getValues('D17:D22');
    } else {
      fromWeightHistory = fromSht.getValues('I16:L112');
      fromMacro = fromSht.getValues('C3:P13');
      fromDetails = fromSht.getValues('D16:D21');
    }

    var toWeightHistoryRng = toSht.getRng('I17:L113');
    var toMacroRng = toSht.getRng('C3:P14');
    var toDetailsRng = toSht.getRng('D17:D22');
    
    fromDetails[1] = ['=DATEDIF(D17, NOW(), "Y")'];
    toWeightHistoryRng.clearAndSetValues(fromWeightHistory);
    toDetailsRng.clearAndSetValues(fromDetails);
    toMacroRng.setValuesWithResize(fromMacro);
  }

  importSettings(fromSht, toSht){
    var fromGeneral;
    var fromNutrition;
    var fromMeals;
    if(this.baseVersion == V1_6){
      fromGeneral = fromSht.getValues('E4:E11');
      fromNutrition = fromSht.getValues('D13:D21');
      fromMeals = fromSht.getValues('F14:G19');
      toSht.setValues('E23:E27', fromSht.getValues('E23:E27'));
    } else {
      fromGeneral = fromSht.getValues('E4:E10');
      fromGeneral.splice(2, 0, ['FALSE']);
      fromNutrition = fromSht.getValues('D12:D20');
      fromMeals = fromSht.getValues('F13:G18');
    }
    var toGeneralRng = toSht.getRng('E4:E11');
    var toNutritionRng = toSht.getRng('D13:D21');
    var toMealsRng = toSht.getRng('F14:G19');
    toGeneralRng.clearAndSetValues(fromGeneral);
    toNutritionRng.clearAndSetValues(fromNutrition);
    toMealsRng.clearAndSetValues(fromMeals);

    getObj(SettingsService).applySettings();
  }

  importHistory(fromSht, toSht){
    var data;
    if(this.baseVersion == V1_6){
      data = fromSht.getValues('B10:S');
    } else {
      data = fromSht.getValues('B10:R').map(h => [h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7], h[8], h[9], 
                                                  h[10], h[11], h[12], h[13], '', h[14], h[15], h[16], h[17]]);
    }
    toSht.clearContent('B10:S');
    toSht.putDataAtEnd(data);
    toSht.sort(2);
  }

  importDays(fromSht, toSht){
    var fromDays;
    var defaultCalorieOutput = getRng(RNG.DEFAULT_CALORIE_OUTPUT).getValue();
    var nextProfile = getRng(RNG.NEXT_PROFILE).getValue();
    getRng(RNG.SELECTED_PROFILE).setValue(nextProfile);
    if(this.baseVersion == V1_6){
      fromDays = fromSht.getRng('A6:N456');
      toSht.getRng('P6:AC').setValuesWithResize(fromSht.getValues('P6:AC'));
    } else {
      fromDays = fromSht.getRng('A19:N469');
      toSht.setValues('Q6:AB20', fromSht.getValues('B4:M18'));
      toSht.setValue('AC6', defaultCalorieOutput);
      toSht.setValue('AC7', nextProfile);
    }
    toSht.getRng('A6:N456').setValues(fromDays.getValues());
    if(this.baseVersion == V1_5){
      var numberOfDays = getRng(RNG.NUMBER_OF_DAYS).getValue();

      for(var i=0; i<numberOfDays; i++){
        toSht.setPosValue(6 + (i*15), 14, defaultCalorieOutput);
        toSht.setPosValue(7 + (i*15), 14, nextProfile);
      }
    }
  }
}