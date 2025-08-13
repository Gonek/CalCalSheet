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