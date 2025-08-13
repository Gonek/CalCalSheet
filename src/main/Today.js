function finishDay(){
  deleteYesterday();
  saveToHistory();
  renameTodayToYesterday();
  nextDay();
  showSaveButtons();
}

function deleteYesterday(){
  SpreadsheetApp.getActive().deleteSheet(getSprByName("Yesterday"));
}

function saveToHistory(){
  var spr = getSprByName("History");
  var summaryRng = getRangeByName("Today!Summary");
  var calDensity = getRangeByName("Today!CalDensity");
  var checklistRng = getRangeByName("Today!Checklist");
  var calorieOutput = getRangeByName("Today!CalorieOutput");
  const lr = spr.getLastRow()+1;
  spr.appendRow(["", getToday(), 
    getValue(summaryRng,1,1),
    calorieOutput.getValue(),
    `=IFERROR(D${lr}-C${lr})`,
    getValue(summaryRng,1,2),
    getValue(summaryRng,1,3),
    getValue(summaryRng,1,4),
    calDensity.getValue(),
    getDValue(checklistRng,1,1),
    getDValue(checklistRng,2,1),
    getDValue(checklistRng,3,1),
    getDValue(checklistRng,4,1)])
}

function renameTodayToYesterday(){
  var todaySpr = getSprByName("Today");
  setValueS(todaySpr, "C1", "Yesterday");
  todaySpr.setName("Yesterday");
  todaySpr.getDrawings()[0].remove();
}

function nextDay(){
  var ss = SpreadsheetApp.getActive();
  var generatedDaysRng = getRangeByName("GeneratedDays"); 
  if(generatedDaysRng.isBlank()){
    copyDayBaseToToday(ss);
  } else {
    renameGeneratedDayToToday(generatedDaysRng);
  }
}

function copyDayBaseToToday(ss){
  ss.getSheetByName("Day Base").copyTo(ss).setName("Today");
  var spr = getSprByName("Today");
  spr.activate();
  showFinishDayButton(spr);
  ss.moveActiveSheet(2);
  setFormulaToValue(getRangeByName("Today!CalorieOutput"));
  spr.setActiveSelection("C17");
}

function renameGeneratedDayToToday(generatedDaysRng){
  var spr = getSprByName(getValue(generatedDaysRng, 1, 1));
  spr.setName("Today")
  spr.activate();
  setValueS(spr, "C1", "Today")
  showFinishDayButton(spr);
  setFormulaToValue(getRangeByName("Today!CalorieOutput"));
  spr.setActiveSelection("C17");
  getSprByName('Profile').getRange("N4").deleteCells(SpreadsheetApp.Dimension.ROWS)
}

function showFinishDayButton(spr){
  spr.getDrawings()[0].setPosition(1,10,-2,10);
}

function showSaveButtons(){
  var spr = getSprByName("Yesterday");
  for (var i = 0; i <= 4; i++) {
    spr.getDrawings()[i].setPosition(4+i,8,-2,-2);
  }
}

function copyBreakfast(){
  copyMeal("Breakfast");
}

function copySnack1(){
  copyMeal("Snack1");
}

function copyLunch(){
  copyMeal("Lunch");
}

function copySnack2(){
  copyMeal("Snack2");
}

function copyDinner(){
  copyMeal("Dinner");
}

function copyMeal(name){
  var yRng = getRangeByName("Yesterday!" + name);
  var tRng = getRangeByName("Today!" + name);
  tRng.setValues(yRng.getValues());
}

// helper methods
function hideSaveButtons(){
  var todaySpr = getSprByName("Day Base");
  for (var i = 1; i <= 5; i++) {
    todaySpr.getDrawings()[i].setPosition(1,1,0,-150);
  }
}

function hideFinisDayButton(){
  var todaySpr = getSprByName("Day Base");
  todaySpr.getDrawings()[0].setPosition(1,1,0,-150);
}