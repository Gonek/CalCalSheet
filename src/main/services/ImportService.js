class ImportService{

  constructor(){
    this.importRng = getRng(RNG.IMPORT);
  }

  startImport(){
    this.importId = this.importRng.getValue(1, 2);
    this.validateImport();
    for (var i = 2; i <= 8; i++) {
      if (this.importRng.getValue(i, 3)) 
        this.importData(this.importRng.getValue(i, 1))
    }
  }

  validateImport(){
    if(!getSpSh(this.importId).isExist()){
      throw new Error("Loading import sheet failed! Please check the sheet Id");
    } 
    this.baseVersion = getSpr(`${this.importId}.${SPR.SUPPORT}`).getValue(VERSION_POSITION);
    if (this.baseVersion !== V1_4 && this.baseVersion !== V1_5 && this.baseVersion !== V1_6){
      throw new Error("Sorry, you can only import version 1.4, 1.5, 1.6 sheets");
    } 
  }

  importData(sheetName){
    var fromSpr = getSpr(`${this.importId}.${sheetName}`);
    var toSpr = getSpr(sheetName);
    if(fromSpr.spr){
      switch(sheetName){
        case 'Items': this.importItems(fromSpr, toSpr); break;
        case 'Recipes': this.importRecipes(fromSpr, toSpr); break;
        case 'Meals': this.importMeals(fromSpr, toSpr); break;
        case 'Profile': this.importProfile(fromSpr, toSpr); break;
        case 'Settings': this.importSettings(fromSpr, toSpr); break;
        case 'History': this.importHistory(fromSpr, toSpr); break;
        case 'Days': this.importDays(fromSpr, toSpr); break;
      }
    }
  }

  importItems(fromSpr, toSpr){
    var data = fromSpr.getValues('B4:AA');
    if(this.importRng.getValue(2, 2) == IMPORT_OPTIONS.CLEAR_CONTENT) {
      toSpr.clear('B4:AA');
    }
    toSpr.putDataAtEnd(data);
    toSpr.sort(2);
  }

  importRecipes(fromSpr, toSpr){
    var data = fromSpr.getClearValues('B4:D');
    if(this.importRng.getValue(3, 2) == IMPORT_OPTIONS.CLEAR_CONTENT) {
      toSpr.clear('B4:D');
    }
    toSpr.putDataAtEnd(data);
    toSpr.sort(2);
  }

  importMeals(fromSpr, toSpr){
    var data = fromSpr.getClearValues('B4:D');
    if(this.importRng.getValue(4, 2) == IMPORT_OPTIONS.CLEAR_CONTENT) {
      toSpr.clear('B4:D');
    }
    toSpr.putDataAtEnd(data);
    toSpr.sort(2);
  }

  importProfile(fromSpr, toSpr){
    var fromWeightHistory = fromSpr.getValues('I16:L112');
    var fromDetails;
    var fromMacro = fromSpr.getValues('C3:P13');
    var toWeightHistoryRng = toSpr.getRng('I16:L112');
    var toDetailsRng = toSpr.getRng('D16:D21');
    var toMacroRng = toSpr.getRng('C3:P13');
    if(this.baseVersion == V1_4){
      fromDetails = fromSpr.getValues('D19:D24'); 
    } else {
      fromDetails = fromSpr.getValues('D16:D21');
    }
    toWeightHistoryRng.clearAndSetValues(fromWeightHistory);
    toDetailsRng.clearAndSetValues(fromDetails);
    toMacroRng.clearAndSetValues(fromMacro);
  }

  importSettings(fromSpr, toSpr){
    var fromGeneral;
    var fromNutrition;
    var fromMeals;
    var toGeneralRng;
    if(this.baseVersion == V1_4){
      fromGeneral = fromSpr.getValues('E4:G8');
      fromNutrition = fromSpr.getValues('D10:D18');
      fromMeals = fromSpr.getValues('F11:G16');
      toGeneralRng = toSpr.getRng('E6:G10');
    } else {
      fromGeneral = fromSpr.getValues('E4:G10');
      fromNutrition = fromSpr.getValues('D12:D20');
      fromMeals = fromSpr.getValues('F13:G18');
      toGeneralRng = toSpr.getRng('E4:G10');
    } 
    var toNutritionRng = toSpr.getRng('D12:D20');
    var toMealsRng = toSpr.getRng('F13:G18');
    toGeneralRng.clearAndSetValues(fromGeneral);
    toNutritionRng.clearAndSetValues(fromNutrition);
    toMealsRng.clearAndSetValues(fromMeals);

    getObj(SettingsService).applySettings();
  }

  importHistory(fromSpr, toSpr){
    var data = fromSpr.getValues('B10:S');
    toSpr.clear('B10:S');
    toSpr.putDataAtEnd(data);
    toSpr.sort(2);
  }

  importDays(fromSpr, toSpr){
    var fromDays = fromSpr.getRng('A4:N');
    var toDays = toSpr.getRng('A4:N');
    toDays.setValuesWithResize(fromDays.getValues());
    if(this.baseVersion == V1_5){
      let numberOfDays = getRng(RNG.NUMBER_OF_DAYS).getValue();
      let defaultCalorieOutput = getRng(RNG.DEFAULT_CALORIE_OUTPUT).getValue();
      let nextProfile = getRng(RNG.NEXT_PROFILE).getValue();
      for(var i=0; i<=numberOfDays; i++){
        toSpr.setPosValue(4 + (i*15), 14, defaultCalorieOutput);
        toSpr.setPosValue(5 + (i*15), 14, nextProfile);
      }
    }
  }
}