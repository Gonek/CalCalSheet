function finishDay(){
  deleteYesterday();
  saveToHistory();
  renameTodayToYesterday();
  copyDayBaseToToday();
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
  spr.appendRow(["", getToday(), 
    getValue(summaryRng,1,1),
    getValue(summaryRng,1,2),
    getValue(summaryRng,1,4),
    getValue(summaryRng,1,6),
    calDensity.getValue(),
    getDValue(checklistRng,1,1),
    getDValue(checklistRng,2,1),
    getDValue(checklistRng,3,1),
    getDValue(checklistRng,4,1)])
}

function renameTodayToYesterday(){
  var todaySpr = getSprByName("Today");
  todaySpr.getRange("B1").setValue("Yesterday");
  todaySpr.setName("Yesterday");
  todaySpr.getDrawings()[0].remove();
}

function copyDayBaseToToday(){
  var ss = SpreadsheetApp.getActive();
  ss.getSheetByName("Day Base").copyTo(ss).setName("Today");
  ss.getSheetByName("Today").activate();
  ss.moveActiveSheet(2);
  getActiveSpr().setActiveSelection("B17");
}

function showSaveButtons(){
  var spr = getSprByName("Yesterday");
  for (var i = 0; i <= 4; i++) {
    spr.getDrawings()[i].setPosition(4+i,10,-2,-2);
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