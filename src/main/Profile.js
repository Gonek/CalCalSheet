function generateDays(){
  var ss = SpreadsheetApp.getActive();
  var generatedDaysRng = getRangeByName("GeneratedDays"); 
  var profileSpr = getSprByName("Profile");
  var days = getValueS(profileSpr, "E3");
  var tempsheet = getSprByName("Day Base");
  var date = getToday();
  date.setDate(date.getDate() + 1);
  generatedDaysRng.clearContent();
  for(var i = 1; i <= days; i++){
    date.setDate(date.getDate() + 1);
    var dateName = Utilities.formatDate(date, "GMT", "yyyy-MM-dd");
    ss.insertSheet(dateName, 1, {template: tempsheet});
    var spr = getSprByName(dateName);
    spr.getRange("C1").setValue(dateName);
    setValue(generatedDaysRng, i, 1, dateName);
  }
}

function profileCaloriesChanged(e){
    profileCaloriesRng = getRangeByName("ProfileCalories");
    if (e.range.getValue() != ("Custom")){
      setValue(profileCaloriesRng, 1, 1, "=G17");
      setValue(profileCaloriesRng, 2, 1, "=G18");
    }else{
      setFormulaToValue(profileCaloriesRng);
    }
}

function startImport(){
  var importRng = getRangeByName('Import');
  var baseSS = SpreadsheetApp.openById(getValue(importRng,1,2));
  var baseVersion = getValueS(baseSS.getSheetByName("Support"), "E24");
  for (var i = 2; i <= 9; i++) {
    if (getValue(importRng,i,4)) 
      importData(baseSS, getValue(importRng,i,1), importRng, baseVersion)
  }
}

function importData(baseSS, sheetName, importRng, baseVersion){
  var fromSpr = baseSS.getSheetByName(sheetName);
  var toSpr = getSprByName(sheetName);
  if(fromSpr){
    switch(sheetName){
      case 'Items': importItems(fromSpr, toSpr, importRng, baseVersion); break;
      case 'Recipes': importRecipes(fromSpr, toSpr, importRng, baseVersion); break;
      case 'Meals': importMeals(fromSpr, toSpr, importRng, baseVersion); break;
      case 'Profile': importProfile(fromSpr, toSpr, baseVersion); break;
      case 'History': importHistory(fromSpr, toSpr, baseVersion); break;
      case 'Today': importDay(fromSpr, toSpr, baseVersion); break;
      case 'Yesterday': importDay(fromSpr, toSpr, baseVersion); break;
      case 'Day Base': importDay(fromSpr, toSpr, baseVersion); break;
    }
  }
}

function importItems(fromSpr, toSpr, checksRng, baseVersion){
  var items = fromSpr.getRange("B4:P").getValues();
  if(getValue(checksRng, 2, 2) == "Clear") {
    toSpr.getRange("B4:P").clearContent();
  }
  toSpr.getRange(toSpr.getLastRow()+1, 2, items.length, items[0].length).setValues(items);
}

function importRecipes(fromSpr, toSpr, checksRng, baseVersion){
  var recipes = fromSpr.getRange("B4:D").getValues();
  if(getValue(checksRng, 3, 2) == "Clear") {
    toSpr.getRange("B4:D").clearContent();
  }
  toSpr.getRange(toSpr.getLastRow()+1, 2, recipes.length, recipes[0].length).setValues(recipes);
}

function importMeals(fromSpr, toSpr, checksRng, baseVersion){
  var meals = fromSpr.getRange("B4:D").getValues();
  if(getValue(checksRng, 4, 2) == "Clear") {
    toSpr.getRange("B4:D").clearContent();
  }
  toSpr.getRange(toSpr.getLastRow()+1, 2, meals.length, meals[0].length).setValues(meals);
  toSpr.getFilter().sort(2, true);
}

function importProfile(fromSpr, toSpr, baseVersion){
  var fromWeightHistory;
  var fromDetails;
  var fromMacro;
  var toWeightHistoryRng = toSpr.getRange("I4:J100");
  var toDetailsRng = toSpr.getRange("D7:D12");
  var toMacroRng = toSpr.getRange("D20:E22");
  if(baseVersion == "v1.3" || baseVersion == "v1.3.1"){
    fromWeightHistory = fromSpr.getRange("I4:J100").getValues();
    fromDetails = fromSpr.getRange("D7:D12").getValues();
    fromMacro = fromSpr.getRange("D20:E22").getValues();
  }else{
    fromWeightHistory = fromSpr.getRange("G4:H100").getValues();
    fromDetails = fromSpr.getRange("C4:C9").getValues();
    fromMacro = fromSpr.getRange("C22:D24").getValues().map(row => [row[0] * 100, row[1] * 100]);
  }
  toWeightHistoryRng.clearContent();
  toWeightHistoryRng.setValues(fromWeightHistory);
  toDetailsRng.clearContent();
  toDetailsRng.setValues(fromDetails);
  toMacroRng.clearContent();
  toMacroRng.setValues(fromMacro);
}

function importHistory(fromSpr, toSpr, baseVersion){
  var fromHistory; 
  if(baseVersion == "v1.3" || baseVersion == "v1.3.1"){
    fromHistory = fromSpr.getRange("B10:M").getValues();
  } else {
    fromHistory = fromSpr.getRange("B7:K").getValues()
                                          .map(row => [row[0], row[1], "", "", row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9]]);
  }
  toSpr.getRange("B10:M").clearContent();
  toSpr.getRange(toSpr.getLastRow()+1, 2, fromHistory.length, fromHistory[0].length).setValues(fromHistory);
}

function importDay(fromSpr, toSpr, baseVersion){
  var fromItems;
  var toItemRng;
  if(baseVersion == "v1.0" || baseVersion == "v1.1" || baseVersion == "v1.1.1"){
    fromItems = fromSpr.getRange("B17:E65").getValues();
    toItemRng = toSpr.getRange("C17:E65");
  } if (baseVersion == "v1.2" || baseVersion == "v1.2.1"){
    fromItems = fromSpr.getRange("B17:F65").getValues().map(row => [row[0], row[1], row[2], row[4]]);
    toItemRng = toSpr.getRange("B17:E65");
  }else{
    fromItems = fromSpr.getRange("B17:E65").getValues();
    toItemRng = toSpr.getRange("B17:E65");
  }
  toItemRng.clearContent();
  toItemRng.setValues(fromItems);
}
