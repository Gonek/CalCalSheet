class TestBaseDay extends TestBase  {
  
    beforeAll(){
        super.beforeAll();
        this.itemsSpr = getSpr(SHT.ITEMS);
        this.daySpr = getSpr(SHT.DAY);
        this.utils.addTestItems();
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
