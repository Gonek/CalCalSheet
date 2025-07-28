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
    if (this.baseVersion !== V1_4 && this.baseVersion !== V1_5 && this.baseVersion !== V1_6){
      throw new Error("Sorry, you can only import version 1.4, 1.5, 1.6 sheets");
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
      data = fromSht.getValues('B4:AB');
    } else {
      data = fromSht.getValues('B4:AA');
    }
    if(this.importRng.getValue(2, 2) == IMPORT_OPTIONS.CLEAR_CONTENT) {
      toSht.clearContent('B4:AB');
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
    var fromWeightHistory = fromSht.getValues('I16:L112');
    var fromDetails;
    var fromMacro = fromSht.getValues('C3:P13');
    var toWeightHistoryRng = toSht.getRng('I16:L112');
    var toDetailsRng = toSht.getRng('D16:D21');
    var toMacroRng = toSht.getRng('C3:P13');
    if(this.baseVersion == V1_4){
      fromDetails = fromSht.getValues('D19:D24'); 
    } else {
      fromDetails = fromSht.getValues('D16:D21');
    }
    fromDetails[1] = ['=DATEDIF(D16, NOW(), "Y")'];
    toWeightHistoryRng.clearAndSetValues(fromWeightHistory);
    toDetailsRng.clearAndSetValues(fromDetails);
    toMacroRng.clearAndSetValues(fromMacro);
  }

  importSettings(fromSht, toSht){
    var fromGeneral;
    var fromNutrition;
    var fromMeals;
    var toGeneralRng;
    if(this.baseVersion == V1_4){
      fromGeneral = fromSht.getValues('E4:G8');
      fromNutrition = fromSht.getValues('D10:D18');
      fromMeals = fromSht.getValues('F11:G16');
      toGeneralRng = toSht.getRng('E6:G10');
    } else {
      fromGeneral = fromSht.getValues('E4:G10');
      fromNutrition = fromSht.getValues('D12:D20');
      fromMeals = fromSht.getValues('F13:G18');
      toGeneralRng = toSht.getRng('E4:G10');
    } 
    var toNutritionRng = toSht.getRng('D12:D20');
    var toMealsRng = toSht.getRng('F13:G18');
    toGeneralRng.clearAndSetValues(fromGeneral);
    toNutritionRng.clearAndSetValues(fromNutrition);
    toMealsRng.clearAndSetValues(fromMeals);

    getObj(SettingsService).applySettings();
  }

  importHistory(fromSht, toSht){
    var data = fromSht.getValues('B10:R');
    toSht.clearContent('B10:R');
    toSht.putDataAtEnd(data);
    toSht.sort(2);
  }

  importDays(fromSht, toSht){
    var fromDays = fromSht.getRng('A4:N');
    var toDays = toSht.getRng('A4:N');
    toDays.setValuesWithResize(fromDays.getValues());
    if(this.baseVersion == V1_5){
      let numberOfDays = getRng(RNG.NUMBER_OF_DAYS).getValue();
      let defaultCalorieOutput = getRng(RNG.DEFAULT_CALORIE_OUTPUT).getValue();
      let nextProfile = getRng(RNG.NEXT_PROFILE).getValue();
      for(var i=0; i<=numberOfDays; i++){
        toSht.setPosValue(4 + (i*15), 14, defaultCalorieOutput);
        toSht.setPosValue(5 + (i*15), 14, nextProfile);
      }
    }
  }
}