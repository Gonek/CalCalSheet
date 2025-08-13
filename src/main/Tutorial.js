const TUTORIAL_PAGES=9;
const VERSION="v1.2"
 
 // TUTORIAL FUNCTIONS

function tutorialAllow(){
  SpreadsheetApp.getActiveSpreadsheet().rename("Calorie Calculator Sheet "+VERSION);
  var spr = getActiveSpr();
  var statusField = spr.getRange('B75');
  statusField.setValue("Success!")
  spr.setCurrentCell(statusField);
}

function tutorialNext(){
  var spr = getActiveSpr();
  var topCell = spr.getRange('A1');
  var step = topCell.getValue();
  if(step == 0) spr.getDrawings()[0].setPosition(1,1,0,-150);
  if(step < TUTORIAL_PAGES){
    tutorialStep(spr, step+1, topCell); 
  }else {
    resetTutorial(spr, topCell);
  }
}

function skipTutorial(){
  var spr = getActiveSpr();
  var topCell = spr.getRange('A1');
  resetTutorial(spr, topCell);
}

function tutorialStep(spr, nextStep, topCell){
  var showFrom = spr.createTextFinder(nextStep + "S").findNext().getRow();
  var showTo = spr.createTextFinder(nextStep + "E").findNext().getRow();

  spr.getDrawings()[1].setPosition(showTo,10,0,0);
  spr.getDrawings()[2].setPosition(showTo,2,0,0); 
  spr.hideRows(2, showFrom-1);
  spr.showRows(showFrom, showTo - showFrom);
  topCell.setValue(nextStep);
  spr.setCurrentCell(topCell);
}

function resetTutorial(spr, topCell){
  spr.setCurrentCell(topCell);
  spr.hideSheet();
  spr.getDrawings()[0].setPosition(20,7,-40,0);
  var showFrom = spr.createTextFinder("0S").findNext().getRow();
  var showTo = spr.createTextFinder("0E").findNext().getRow();
  spr.showRows(showFrom, showTo - showFrom);
  spr.hideRows(showTo +1,500);
  spr.getDrawings()[1].setPosition(showTo,10,0,0);
  spr.getDrawings()[2].setPosition(showTo,2,0,0); 
  topCell.setValue(0);
}
