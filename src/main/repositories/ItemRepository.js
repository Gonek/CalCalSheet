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
    this.spr.setAreaValue(originalPos + 3, 3, 1, 26, [this.fieldsToRow(item, originalPos + 3)]);
  }

  isExist(name){
    return this.spr.find(name) != null;
  }

  loadByIndex(index){
      let fieldIndexes = [1,2,3,4,6,8,10,12,14,16,18,20,22];
      let name = this.spr.getPosValue(index + 3, 2);
      let fields = this.spr.getAreaValue(index + 3, 2, 1, 27)[0].filter((v, i) => fieldIndexes.includes(i));
      fields[2] = fields[2] * fields[0];
      return new Item(name, fields);
  }

  autoDeleteItems(){
    let today = getToday();
    this.spr.getValues('AB4:AB')
            .flat()
            .map((v, i) => [i, v])
            .filter(e => (e[1] && e[1] <= today))
            .reverse()
            .forEach(e => this.spr.deleteRow(e[0]+4));
  }

  calculateAutoDeleteDate(autoDelete){
    switch(autoDelete){
      case 'Never': return null;
      case '1 Day': return getRelativeDay(+1);
      case '2 Day': return getRelativeDay(+2);
      case '3 Day': return getRelativeDay(+3);
      case '4 Day': return getRelativeDay(+4);
      case '5 Day': return getRelativeDay(+5);
      case '6 Day': return getRelativeDay(+6);
      case '1 Week': return getRelativeDay(+7);
      case '2 Week': return getRelativeDay(+14);
      case '3 Week': return getRelativeDay(+21);
      case '4 Week': return getRelativeDay(+28);
    }
  }

  fieldsToRow(item, row){
    return [item.amount, item.unit, item.weight / item.amount, 
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
      item.noomColour, `=IFERROR(F${row}/(E${row}*C${row}))`,
      this.calculateAutoDeleteDate(item.autoDelete)];
  }
}
