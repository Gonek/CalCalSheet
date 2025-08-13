function newItemPopUp(rng) {
  var result = SpreadsheetApp.getUi().alert('Item not found', 'Item not found, whould you like to add it?', SpreadsheetApp.getUi().ButtonSet.YES_NO);
  if(result === SpreadsheetApp.getUi().Button.YES) {
    var spr = getSprByName(NEW_ITEM);
    spr.activate();
    spr.getRange('C3').setValue(rng.getValue());
    spr.setActiveSelection('C4');
    spr.getDrawings()[0].setOnAction('addNewItemReturn');
  }else{
    rng.setValue('');
  }
}

function mealNamePopup() {
  let ui = SpreadsheetApp.getUi();
  var result = ui.prompt('Save meal','Please enter a name for your meal', ui.ButtonSet.OK_CANCEL);

  var button = result.getSelectedButton();
  
  if (button === ui.Button.OK) {
    return result.getResponseText()
  } else if (button === ui.Button.CLOSE) {
    return null;
  }
}

function alert(message){
  SpreadsheetApp.getUi().alert(message);
}