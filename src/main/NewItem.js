function addNewItem(){
  var rng = getRangeByName("NewItem");
  var itemName = getValue(rng, 1, 1);
  var amounth = getValue(rng, 2, 2);
  var unit = getValue(rng, 3, 2);
  var weight = getValue(rng, 4, 2);
  var calories = getValue(rng, 5, 2);
  var fat = getValue(rng, 6, 2);
  var carb = getValue(rng, 7, 2);
  var protein = getValue(rng, 8, 2);
  var noomCat = getDValue(rng, 13, 1);

  addToList(itemName, amounth, unit, weight, calories, protein, fat, carb, noomCat);
  clearNewItem();
}

function addNewItemReturn(){
  addNewItem();
  getActiveSpr().getDrawings()[0].setOnAction("addNewItem");
  getSprByName("Today").activate();
}

function clearNewItem() {
  var spr = getActiveSpr();
  spr.getRange('C3:C13').clearContent();
  spr.getRange('C14').setValue('Solid');
  spr.getRange('C15').setValue('=E15');
}

