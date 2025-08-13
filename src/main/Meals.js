const MEAL_ICON="🥣";
const BREAKFAST_START_ROW = 17; 
const SNACK1_START_ROW = 28; 
const LUNCH_START_ROW = 33; 
const SNACK2_START_ROW = 48; 
const DINNER_START_ROW = 53; 

const BREAKFAST = "Breakfast";
const SNACK1 = "Snack1";
const LUNCH = "Lunch";
const SNACK2 = "Snack2";
const DINNER = "Dinner";

function mealLoaderFieldChanged(e) {
  if(String(e.range.getValue()).indexOf(MEAL_ICON) == 0){
    var sheetName = e.source.getSheetName();
    switch(e.range.getRow()){
      case BREAKFAST_START_ROW: loadMeal(sheetName, BREAKFAST); break;
      case SNACK1_START_ROW: loadMeal(sheetName, SNACK1); break;
      case LUNCH_START_ROW: loadMeal(sheetName, LUNCH); break;
      case SNACK2_START_ROW: loadMeal(sheetName, SNACK2); break;
      case DINNER_START_ROW: loadMeal(sheetName, DINNER); break;
    }
  }
}

function loadMeal(sheetName, meal){
  //SpreadsheetApp.getActiveSpreadsheet().toast('Task started', 'Status', 3);
  var spr = getSprByName(sheetName);
  var targetRng = getRangeByName(sheetName + "!" + meal);
  var sourceRng = spr.getRange(19, 15, targetRng.getHeight(), 2);
  var sourceData = sourceRng.getValues().map(row => [row[0], "", row[1]]);
  targetRng.setValues(sourceData);
}

function saveBreakfast(){
  saveMeal(BREAKFAST);
}

function saveSnack1(){
  saveMeal(SNACK1);
}

function saveLunch(){
  saveMeal(LUNCH);
}

function saveSnack2(){
  saveMeal(SNACK2);
}

function saveDinner(){
  saveMeal(DINNER);
}

function saveMeal(meal){
  var name = MEAL_ICON + " " + mealNamePopup();
  if(name != null){
    var mealsSpr = getSprByName('Meals');

    deleteMeal(mealsSpr, name);

    var sprName = getActiveSpr().getSheetName();
    var mealItems = getRangeByName(sprName + "!" + meal).getValues();

    saveMealToMeals(mealsSpr, mealItems, name);
  }
}

function mealNamePopup() {
  var ui = SpreadsheetApp.getUi();
  var result = ui.prompt("Save meal","Please enter a name for your meal", ui.ButtonSet.OK_CANCEL);

  var button = result.getSelectedButton();
  
  if (button === ui.Button.OK) {
    return result.getResponseText()
  } else if (button === ui.Button.CLOSE) {
    return null;
  }
}

function saveMealToMeals(mealsSpr, mealItems, mealName){
  var sourceData = mealItems
                    .filter(row => row[0] != "")
                    .map(row => [mealName, row[0], row[2]]);
  var lenght = sourceData.length;
  const lr = mealsSpr.getLastRow()+1;

  mealsSpr.getRange(lr, 2, lenght, 3).setValues(sourceData);
  mealsSpr.getFilter().sort(2, true);
}

function deleteMeal(mealsSpr, mealName){
  var meals = mealsSpr.getRange("B4:B").getValues().flat();
  var deleteFrom = meals.findIndex(name => name === mealName);
  if (deleteFrom > -1) { 
    var deleteTo = meals.findLastIndex(name => name === mealName);
    mealsSpr.deleteRows(deleteFrom + 4, deleteTo - deleteFrom + 1);
  }
}