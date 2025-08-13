function onEdit(e) {
  if (isCellInRangeInSheet(e, "Today!ItemNames", "Today") || 
      isCellInRangeInSheet(e, "MealItemNames", "Meal calculator")) {
    var name = e.range.getValue();
    if(!isItemExit(name)) {
      newItemPopUp(e.range);
    }
  }
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

function isItemExit(name){
  var spr = getSprByName("Items");
  return spr.createTextFinder(name).findNext() != null;
}

function newItemPopUp(rng) {
  var result = SpreadsheetApp.getUi().alert("Item not found", "Item not found, whould you like to add it?", SpreadsheetApp.getUi().ButtonSet.YES_NO);
  if(result === SpreadsheetApp.getUi().Button.YES) {
    var spr = getSprByName("New Item");
    spr.activate();
    spr.getRange("C3").setValue(rng.getValue());
    spr.setActiveSelection("C4");
    spr.getDrawings()[0].setOnAction("addNewItemReturn");
  }else{
    rng.setValue("");
  }
}