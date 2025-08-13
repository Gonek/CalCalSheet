// DATA MODEL

class Item{
  constructor(name, fields, noomColour){
    this.name = name;
    this.amount = fields[0];
    this.unit = fields[1];
    this.weight = fields[2] / fields[0];
    this.calories = fields[3];
    this.totalFat = fields[4];
    this.saturatedFat = fields[5];
    this.transFat = fields[6];
    this.carbohydrate = fields[7];
    this.fiber = fields[8];
    this.sugar = fields[9];
    this.sugarAlcohol = fields[10];
    this.protein = fields[11];
    this.salt = fields[12];
    this.noomColour = noomColour;
  }
}

// REPOSITORY

class ItemRepository{

  constructor(){
     this.spr = new Spr(ITEMS);
  }

  addOrUpdate(item, originalPos){
    if(originalPos != 0){
      this.update(item, originalPos + ITEM_TABLE_OFFSET);
    } else {
      this.add(item);
    }
  }

  add(item){
    let row = this.spr.getLastRow()+1;
    let rowData = ["",item.name].concat(this.fieldsToRow(item, row));

    this.spr.appendRow(rowData);
    this.spr.sort(2);
  }

  update(item, originalPos){
    this.spr.setAreaValue(originalPos, 3, 1, 25, [this.fieldsToRow(item, originalPos)]);
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

// REPOSITORY SINGLETON
var itemRepositorySingleton;

/** 
 * Returns the item repository sigleton
 * @returns {ItemRepository} item repository singleton
 */
var itemRepository = () => itemRepositorySingleton = itemRepositorySingleton || new ItemRepository();
