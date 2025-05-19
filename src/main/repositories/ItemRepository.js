class ItemRepository{

  constructor(){
     this.spr = getSpr(SPR.ITEMS);
  }

  addOrUpdate(item, originalPos){
    if(originalPos != 0){
      this.update(item, originalPos);
    } else {
      this.add(item);
    }
  }

  add(item){
    let row = this.spr.getLastRow()+1;
    let rowData = ['', item.name].concat(this.fieldsToRow(item, row));

    this.spr.appendRow(rowData);
    this.spr.sort(2);
  }

  update(item, originalPos){
    this.spr.setAreaValue(originalPos + 3, 3, 1, 25, [this.fieldsToRow(item, originalPos + 3)]);
  }

  isExist(name){
    return this.spr.find(name) != null;
  }

  fieldsToRow(item, row){
    return [item.amount, item.unit, item.weight, 
      item.calories,`=IFERROR(F${row}/C${row})`, 
      item.totalFat, `=IFERROR(H${row}/C${row})`, 
      item.saturatedFat, `=IFERROR(J${row}/C${row})`, 
      item.transFat, `=IFERROR(L${row}/C${row})`, 
      item.carbohydrate, `=IFERROR(N${row}/C${row})`, 
      item.fiber, `=IFERROR(P${row}/C${row})`, 
      item.sugar, `=IFERROR(R${row}/C${row})`, 
      item.sugarAlcohol, `=IFERROR(T${row}/C${row})`, 
      item.protein, `=IFERROR(V${row}/C${row})`, 
      item.salt, `=IFERROR(X${row}/C${row})`,
      item.noomColour, `=IFERROR(F${row}/(E${row}*C${row}))`];
  }
}
