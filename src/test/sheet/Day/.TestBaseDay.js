class TestBaseDay extends TestBase  {
  
    beforeAll(){
        super.beforeAll();
        this.itemsSht = getSht(SHT.ITEMS);
        this.daySht = getSht(SHT.DAY);
        testData.addTestItems();
    }

    afterAll(){
        super.afterAll();
        testData.clearItems();
    }

    clearData(){
        this.daySht.clear(`C15:E104`);
    }

    // UTILITIES

    item(name, amount){
        return [name, '', amount];
    }

    addItemDaySheet(items, startRow = 15){
        this.daySht.setAreaValue(startRow, 3, 1, 3, [items]);
    }

    addItemsDaySheet(items, startRow = 15){
        this.daySht.setAreaValue(startRow, 3, items.length, 3, items);
    }
}
