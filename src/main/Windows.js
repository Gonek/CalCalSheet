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


function alert(message){
  SpreadsheetApp.getUi().alert(message);
}