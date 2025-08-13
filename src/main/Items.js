function addToOrUpdateList(itemName, amounth, unit, weight, calories, protein, fat, carb, noomCat, originalPos){
  if(originalPos != 0){
    updateItemInList(amounth, unit, weight, calories, protein, fat, carb, noomCat, originalPos + 3);
  } else {
    addToList(itemName, amounth, unit, weight, calories, protein, fat, carb, noomCat);
  }
}


function addToList(itemName, amounth, unit, weight, calories, protein, fat, carb, noomCat){
  var itemSpr = getSprByName("Items");
  const lr = itemSpr.getLastRow()+1;
  itemSpr.appendRow(["",itemName, amounth, unit, weight, 
    calories,`=IFERROR(F${lr}/C${lr})`, 
    protein, `=IFERROR(H${lr}/C${lr})`, 
    fat, `=IFERROR(J${lr}/C${lr})`,
    carb, `=IFERROR(L${lr}/C${lr})`,
    noomCat, `=IFERROR(F${lr}/(E${lr}*C${lr}))`])

  itemSpr.getFilter().sort(2, true);
}

function updateItemInList(amounth, unit, weight, calories, protein, fat, carb, noomCat, originalPos){
  var itemSpr = getSprByName("Items");
  itemSpr.getRange(originalPos, 3, 1, 13).setValues([[amounth, unit, weight, 
    calories,`=IFERROR(F${originalPos}/C${originalPos})`, 
    protein, `=IFERROR(H${originalPos}/C${originalPos})`, 
    fat, `=IFERROR(J${originalPos}/C${originalPos})`,
    carb, `=IFERROR(L${originalPos}/C${originalPos})`,
    noomCat, `=IFERROR(F${originalPos}/(E${originalPos}*C${originalPos}))`]]);
  }