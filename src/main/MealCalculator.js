function addMealAsItem(){
  var calcSpr = SpreadsheetApp.getActiveSheet();
  var itemName = getValueS(calcSpr,'C3');
  var calories = getValueS(calcSpr,'G25');
  var protein = getValueS(calcSpr,'H25');
  var fat = getValueS(calcSpr,'I25');
  var carb = getValueS(calcSpr,'J25');
  var noomCat = getDValueS(calcSpr,'D27');
  var gramPerUnit = getValueS(calcSpr,'B25');
  var amounth = getValueS(calcSpr,'C24');
  var unit = getValueS(calcSpr,'C25');

  addToList(itemName, amounth, unit, gramPerUnit, calories, protein, fat, carb, noomCat);
  clearCalculator();
}

function clearCalculator() {
  var sheet = getActiveSpr();
  sheet.getRange('C3').clearContent();
  sheet.getRange('B4:E23').clearContent();
  sheet.getRange('I26:J27').clearContent();
  sheet.getRange('D26').setValue("Solid");
}