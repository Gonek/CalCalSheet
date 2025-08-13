class ImportService extends AbstractSettingsService{

  constructor(){
    super();
    this.importRng = new Rng(RNG_IMPORT);
    this.baseSS = SpreadsheetApp.openById(this.importRng.getValue(1, 2));
    this.baseVersion = new Spr(SUPPORT, this.baseSS).getValue(VERSION_POSITION);
  }

  process(){
    for (var i = 2; i <= 10; i++) {
      if (this.importRng.getValue(i, 3)) 
        this.importData(this.importRng.getValue(i, 1))
    }
  }

  importData(sheetName){
    var fromSpr = new Spr(sheetName, this.baseSS);
    var toSpr = new Spr(sheetName);
    if(fromSpr.spr){
      switch(sheetName){
        case 'Items': this.importItems(fromSpr, toSpr); break;
        case 'Recipes': this.importRecipes(fromSpr, toSpr); break;
        case 'Meals': this.importMeals(fromSpr, toSpr); break;
        case 'Profile': this.importProfile(fromSpr, toSpr); break;
        case 'Settings': this.importSettings(fromSpr, toSpr); break;
        case 'History': this.importHistory(fromSpr, toSpr); break;
        case 'Today': this.importDay(fromSpr, toSpr); break;
        case 'Yesterday': this.importDay(fromSpr, toSpr); break;
        case 'Day Base': this.importDay(fromSpr, toSpr); break;
      }
    }
  }

  importItems(fromSpr, toSpr){
    var fromItems;
    if(this.baseVersion == V1_4){
      fromItems = fromSpr.getValues('B4:AA');
    } else {
      fromItems = fromSpr.getValues('B4:P').map(row => [row[0], row[1], row[2], row[3], row[4], row[5], row[8], row[9], '', '', '', '', row[10], row[11], '', '', '', '', '', '', row[6], row[7], '', '', row[12], row[13]]);
    }
    if(this.importRng.getValue(2, 2) == CLEAR_CONTENT) {
      toSpr.clear('B4:AA');
    }
    toSpr.putDataAtEnd(fromItems);
    toSpr.sort(2);
  }

  importRecipes(fromSpr, toSpr){
    var data = fromSpr.getClearValues('B4:D');
    if(this.importRng.getValue(3, 2) == CLEAR_CONTENT) {
      toSpr.clear('B4:D');
    }
    toSpr.putDataAtEnd(data);
    toSpr.sort(2);
  }

  importMeals(fromSpr, toSpr){
    var data = fromSpr.getClearValues('B4:D');
    if(this.importRng.getValue(4, 2) == CLEAR_CONTENT) {
      toSpr.clear('B4:D');
    }
    toSpr.putDataAtEnd(data);
    toSpr.sort(2);
  }

  importProfile(fromSpr, toSpr){
    var fromWeightHistory;
    var fromDetails;
    var fromMacro;
    var toWeightHistoryRng = toSpr.getRng('I16:L112');
    var toDetailsRng = toSpr.getRng('D19:D24');
    var toMacroRng = toSpr.getRng('C3:P12');
    if(this.baseVersion == V1_4){
      fromWeightHistory = fromSpr.getValues('I16:L112');
      fromDetails = fromSpr.getValues('D19:D24');
      fromMacro = fromSpr.getValues('C3:P12');
    } else if(this.baseVersion == V1_3 || this.baseVersion == V1_3_1 || this.baseVersion == V1_3_2){
      fromWeightHistory = fromSpr.getValues('I4:J100').map(row => [row[0], '', row[1], '']);
      fromDetails = fromSpr.getValues('D7:D12');
    } else {
      fromWeightHistory = fromSpr.getValues('G4:H100').map(row => [row[0], '', row[1], '']);
      fromDetails = fromSpr.getValues('C4:C9');
    }
    toWeightHistoryRng.clearAndSetValues(fromWeightHistory);
    toDetailsRng.clearAndSetValues(fromDetails);
    if(fromMacro){
      toMacroRng.clearAndSetValues(fromMacro);
    }
  }

  importSettings(fromSpr, toSpr){
    var fromGeneral = fromSpr.getValues('E4:G8');
    var fromNutrition = fromSpr.getValues('D10:D18');
    var fromMeals = fromSpr.getValues('F11:G16');
    var toGeneralRng = toSpr.getRng('E4:G8');
    var toNutritionRng = toSpr.getRng('D10:D18');
    var toMealsRng = toSpr.getRng('F11:G16');
    toGeneralRng.clearAndSetValues(fromGeneral);
    toNutritionRng.clearAndSetValues(fromNutrition);
    toMealsRng.clearAndSetValues(fromMeals);

    settingsService().apply();
  }

  importHistory(fromSpr, toSpr){
    var fromHistory; 
    if(this.baseVersion == V1_4) {
      fromHistory = fromSpr.getValues('B10:S');
    } else if(this.baseVersion == V1_3 || this.baseVersion == V1_3_1 || this.baseVersion == V1_3_2){
      fromHistory = fromSpr.getValues('B10:M').map(row => [row[0], row[1], row[2], row[3], row[5], '', '', row[6], '', '', '', row[4], '', row[7], row[8], row[9], row[10], row[11]]);
    } else {
      fromHistory = fromSpr.getValues('B7:K').map(row => [row[0], row[1], '', '', row[3], '', '', row[4], '', '', '', row[2], '', row[5], row[6], row[7], row[8], row[9]]);
    }
    toSpr.clear('B10:S');
    toSpr.putDataAtEnd(fromHistory);
  }

  importDay(fromSpr, toSpr){
    var fromItems;
    var toItemRng = toSpr.getRng('B15:E104');
    if(this.baseVersion == V1_4){
      fromItems = fromSpr.getValues('B15:E104');
    } else {
      if(this.baseVersion == V1_0 || this.baseVersion == V1_1 || this.baseVersion == V1_1_1){
        fromItems = fromSpr.getValues('B17:E65').map(row => ['FALSE', row[0], row[1], row[2]]);
      } else if (this.baseVersion == V1_2 || this.baseVersion == V1_2_1){
        fromItems = fromSpr.getValues('B17:F65').map(row => [row[0], row[1], row[2], row[4]]);
      } else if(this.baseVersion == V1_3 || this.baseVersion == V1_3_1 || this.baseVersion == V1_3_2){
        fromItems = fromSpr.getValues('B17:E65');
      }
      fromItems.splice(48, 0, ...Array(17).fill(['FALSE', '', '', '']));
      fromItems.splice(35, 0, ...Array(10).fill(['FALSE', '', '', '']));
      fromItems.splice(15, 0, ...Array(10).fill(['FALSE', '', '', '']));
      fromItems.splice(10, 0, ...Array(4).fill(['FALSE', '', '', '']));
    } 
    toItemRng.clearAndSetValues(fromItems);
  }
}

// SERVICE SINGLETON
var importServiceSingleton;

/** 
 * Returns the import service
 * @returns {ImportService} import service singleton
 */
var importService = () => importServiceSingleton = importServiceSingleton || new ImportService();
