class TestBaseToday extends TestBase  {

  constructor(){
    super();
    this.itemsSpr = new Spr(ITEMS);
    this.daySpr = new Spr(TODAY);
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

  addItemTodaySheet(items, startRow = 15){
    this.daySpr.setAreaValue(startRow, 3, 1, 3, [items]);
  }

  addItemsTodaySheet(items, startRow = 15){
    this.daySpr.setAreaValue(startRow, 3, items.length, 3, items);
  }
}
