class ItemRepository{

  constructor(){
     this.sht = getSht(SHT.ITEMS);
  }

  addOrUpdate(item, originalPos){
    if(originalPos != 0){
      this.update(item, originalPos);
    } else {
      this.add(item);
    }
  }

  add(item){
    let row = this.sht.getLastRow()+1;
    let rowData = ['', item.name].concat(this.fieldsToRow(item, row));

    this.sht.appendRow(rowData);
    this.sht.sort(2);
  }

  update(item, originalPos){
    this.sht.setAreaValue(originalPos + 3, 3, 1, 28, [this.fieldsToRow(item, originalPos + 3)]);
  }

  isExist(name){
    return this.sht.find(name) != null;
  }

  load(index){
      if(!index || index <= 0) return;
      let fieldIndexes = [1,2,3,4,6,8,10,12,14,16,18,20,22,24,25];
      let name = this.sht.getPosValue(index + 3, 2);
      let fields = this.sht.getAreaValues(index + 3, 2, 1, 29)[0].filter((v, i) => fieldIndexes.includes(i));
      fields[2] = fields[2] * fields[0];
      return new Item(name, fields, fields[13], fields[14]);
  }

  delete(indexes){
    if(indexes){
      indexes
        .sort((a, b) => b - a)
        .forEach(index => this.sht.deleteRow(index + 3));
    }
  }

  autoDeleteItems(){
    let today = getToday();
    let indexes = this.sht.getValues('AD4:AD')
            .flat()
            .map((v, i) => [i, v])
            .filter(e => (e[1] && e[1] <= today))
            .map(e => e[0]+1);
    this.delete(indexes);
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
      item.price, item.pricePerUnit, 
      item.noomColour, `=IFERROR(F${row}/(E${row}*C${row}))`,
      this.calculateAutoDeleteDate(item.autoDelete)];
  }
}
