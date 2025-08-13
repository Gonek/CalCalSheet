function getSprByName(name) {
  return SpreadsheetApp.getActive().getSheetByName(name);
}

function getActiveSpr(){
  return SpreadsheetApp.getActiveSheet();
}

function getValueS(spr, range){
  return spr.getRange(range).getValue();
}

function getValue(rng, row, col){
  return rng.getCell(row, col).getValue();
}

function getDValueS(spr, range){
  return spr.getRange(range).getDisplayValue();
}

function getDValue(rng, row, col){
  return rng.getCell(row, col).getDisplayValue();
}

function getRangeByName(name){
  return SpreadsheetApp.getActiveSpreadsheet().getRangeByName(name);
}

function getToday(){
  var date = new Date();
  date.setHours(0,0,0,0);
  return date;
}