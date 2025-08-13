function addMealToItemAndRecipe(){
  var calcSpr = SpreadsheetApp.getActiveSheet();
  if(getValueS(calcSpr, 'B36')){
    saveRecipeFromMealCalculator(calcSpr);
  }
  addMealAsItem();
}

function addMealAsItem(){
  var calcSpr = SpreadsheetApp.getActiveSheet();
  var itemName = getValueS(calcSpr,'C5');
  var calories = getValueS(calcSpr,'G32');
  var protein = getValueS(calcSpr,'H32');
  var fat = getValueS(calcSpr,'I32');
  var carb = getValueS(calcSpr,'J32');
  var noomCat = getDValueS(calcSpr,'D34');
  var gramPerUnit = getValueS(calcSpr,'B32');
  var amounth = getValueS(calcSpr,'C31');
  var unit = getValueS(calcSpr,'C32');
  var originalPos = getValueS(calcSpr, 'K5');

  addToOrUpdateList(itemName, amounth, unit, gramPerUnit, calories, protein, fat, carb, noomCat, originalPos);
  clearCalculator();
}

function clearCalculator() {
  var sheet = getActiveSpr();
  sheet.getRange('D3').clearContent();
  sheet.getRange('C5').clearContent();
  sheet.getRange('B6:E30').clearContent();
  sheet.getRange('I33:J34').clearContent();
  sheet.getRange('D33').setValue('Solid');
  sheet.getRange('B36').setValue('True');
}