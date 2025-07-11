class ItemRepositoryTest extends TestBase {
    beforeAll(){
        super.beforeAll();
        this.itemsSht = mockSht(SHT.ITEMS);
        this.itemRepository = new ItemRepository();
    }

    shouldAddOfUpdateCallAddIfOriginalPosZero(){
        // GIVEN
        var item = new Item('name',[100, 'g', 100, 500, 10, 11, 12, 13, 14, 15, 16, 17, 18], 'Red', 'Never');
        when(this.itemsSht).getLastRow().thenReturn(99);
        // WHEN
        this.itemRepository.addOrUpdate(item, 0);
        // THEN
        verify(this.itemsSht).appendRow(['', 'name', 100,'g',1,500,'=IFERROR(F100/C100)', 10, '=IFERROR(H100/C100)', 11, '=IFERROR(J100/C100)', 12, '=IFERROR(L100/C100)', 13,
                                        '=IFERROR(N100/C100)', 14, '=IFERROR(P100/C100)', 15, '=IFERROR(R100/C100)', 16, '=IFERROR(T100/C100)', 17, '=IFERROR(V100/C100)', 18,
                                        '=IFERROR(X100/C100)', 'Red', '=IFERROR(F100/(E100*C100))', null]).calledOnce();
        verify(this.itemsSht).sort(2).calledOnce();
    }

    shouldAddOrUpdateCallUpdateIfOriginalPosNotZero(){
        // GIVEN
        var item = new Item('name', [100, 'g', 100, 500, 10, 11, 12, 13, 14, 15, 16, 17, 18], 'Red', '1 Day');
        // WHEN
        this.itemRepository.addOrUpdate(item, 97);
        // THEN
        verify(this.itemsSht).setAreaValue(100, 3, 1, 26, [[100, 'g', 1, 500, '=IFERROR(F100/C100)', 10, '=IFERROR(H100/C100)', 11, '=IFERROR(J100/C100)', 12, '=IFERROR(L100/C100)', 
                                           13, '=IFERROR(N100/C100)', 14, '=IFERROR(P100/C100)', 15, '=IFERROR(R100/C100)', 16, '=IFERROR(T100/C100)', 17, '=IFERROR(V100/C100)', 
                                           18, '=IFERROR(X100/C100)', 'Red', '=IFERROR(F100/(E100*C100))', getRelativeDay(+1)]]).calledOnce();
    }

    shouldAddAddItemToTheLastRowOfTheSheet(){
        // GIVEN
        var item = new Item('name', [100, 'g', 100, 500, 10, 11, 12, 13, 14, 15, 16, 17, 18], 'Red', '1 Week');
        when(this.itemsSht).getLastRow().thenReturn(99);
        // WHEN
        this.itemRepository.add(item);
        // THEN
        verify(this.itemsSht).appendRow(['', 'name', 100, 'g', 1, 500, '=IFERROR(F100/C100)', 10, '=IFERROR(H100/C100)', 11, '=IFERROR(J100/C100)', 12, '=IFERROR(L100/C100)', 13, 
                                        '=IFERROR(N100/C100)', 14, '=IFERROR(P100/C100)', 15, '=IFERROR(R100/C100)', 16, '=IFERROR(T100/C100)', 17, '=IFERROR(V100/C100)', 18, 
                                        '=IFERROR(X100/C100)', 'Red', '=IFERROR(F100/(E100*C100))', getRelativeDay(+7)]).calledOnce();
        verify(this.itemsSht).sort(2).calledOnce();
    }

    shouldUpdateUpdateOriginalRowWithNewItemData(){
        // GIVEN
        var item = new Item('name', [100, 'g', 100, 500, 10, 11, 12, 13, 14, 15, 16, 17, 18], 'Red', 'Never');
        // WHEN
        this.itemRepository.update(item, 97);
        // THEN
        verify(this.itemsSht).setAreaValue(100, 3, 1, 26, [[100, 'g', 1, 500, '=IFERROR(F100/C100)', 10, '=IFERROR(H100/C100)', 11, '=IFERROR(J100/C100)', 12, '=IFERROR(L100/C100)',
                                           13, '=IFERROR(N100/C100)', 14, '=IFERROR(P100/C100)', 15, '=IFERROR(R100/C100)', 16, '=IFERROR(T100/C100)', 17, '=IFERROR(V100/C100)', 
                                           18, '=IFERROR(X100/C100)', 'Red', '=IFERROR(F100/(E100*C100))', null]]).calledOnce();
    }

    shouldIsExitCallFindOnSheetAndReturnTrueIfItemFound(){
        // GIVEN
        when(this.itemsSht).find('name').thenReturn(new Object());
        // WHEN
        let result = this.itemRepository.isExist('name');
        // THEN
        assertEquals(result, true);
    }

    shouldIsExitCallFindOnSheetAndReturnFalseIfItemNotFound(){
        // GIVEN
        when(this.itemsSht).find('name').thenReturn(null);
        // WHEN
        let result = this.itemRepository.isExist('name');
        // THEN
        assertEquals(result, false);
    }

    shouldLoadByIndexReturnTheItemAtIndex(){
        // GIVEN
        let index = 10;
        when(this.itemsSht).getPosValue(13, 2).thenReturn('Name');
        when(this.itemsSht).getAreaValue(13, 2, 1, 27).thenReturn([[0, 10, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 
                                                                    14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]]);
        // WHEN
        let result = this.itemRepository.loadByIndex(index);
        // THEN
        assertEquals(result, new Item('Name', [10, 2, 30, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]));
    }

    shouldAutoDeleteItemsDeleteAllExpiredItems(){
        // GIVEN
        when(this.itemsSht).getValues('AB4:AB').thenReturn(['', getRelativeDay(+5), getToday(), getYesterday(), getRelativeDay(-10)]);
        // WHEN
        this.itemRepository.autoDeleteItems();
        // THEN
        verify(this.itemsSht).deleteRow(6).calledOnce();
        verify(this.itemsSht).deleteRow(7).calledOnce();
        verify(this.itemsSht).deleteRow(8).calledOnce();
    }
}

var runItemRepositoryTests = () => new ItemRepositoryTest().runAllTests();