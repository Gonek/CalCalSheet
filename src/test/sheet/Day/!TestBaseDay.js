class TestBaseDay extends TestBase  {

  constructor(){
    super();
    this.itemsSpr = getSpr(SPR.ITEMS);
    this.daySpr = getSpr(SPR.DAY);
  }

  beforeAll(){
    super.beforeAll();
    this.utils.addTestIems();
  }

  afterAll(){
    super.afterAll();
    this.utils.clearItems();
  }

  clearData(){
    this.daySpr.clear(`C15:E104`);
  }

  // UTILITIES

  item(name, amount){
    return [name, '', amount];
  }

  addItemDaySheet(items, startRow = 15){
    this.daySpr.setAreaValue(startRow, 3, 1, 3, [items]);
  }

  addItemsDaySheet(items, startRow = 15){
    this.daySpr.setAreaValue(startRow, 3, items.length, 3, items);
  }
}
