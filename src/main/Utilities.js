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

function setValueS(spr, range, value){
  return spr.getRange(range).setValue(value);
}

function getRangeByName(name){
  return SpreadsheetApp.getActiveSpreadsheet().getRangeByName(name);
}

function isCellInRangeInSheet(e, rngName, name){
  var rng = getRangeByName(rngName);

  var row = e.range.getRow();
  var col = e.range.getColumn();

  return e.source.getSheetName() == name && 
      col >= rng.getColumn() && 
      col <= rng.getLastColumn() && 
      row >= rng.getRow() && 
      row <= rng.getLastRow();
}

function isCellInCellInSheet(e, trow, tcol, name){
  var row = e.range.getRow();
  var col = e.range.getColumn();

  return e.source.getSheetName() == name && 
      col == tcol && 
      row == trow;
}

function getToday(){
  var date = new Date();
  date.setHours(0,0,0,0);
  return date;
}