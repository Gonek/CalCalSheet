class ItemRepositoryTest extends TestBase {
    beforeAll(){
        super.beforeAll();
        this.itemsSht = mockSht(SHT.ITEMS);
        this.itemRepository = new ItemRepository();
    }

    shouldAddOfUpdateCallAddIfOriginalPosZero(){
        // GIVEN
        var item = new Item('name',[100, 'g', 100, 500, 10, 11, 12, 13, 14, 15, 16, 17, 18], 19, 20, 'Red', 'Never');
        when(this.itemsSht).getLastRow().thenReturn(99);
        // WHEN
        this.itemRepository.addOrUpdate(item, 0);
        // THEN
        verify(this.itemsSht).appendRow(['', 'name', 100,'g',1,500,'=IFERROR(F100/C100)', 10, '=IFERROR(H100/C100)', 11, '=IFERROR(J100/C100)', 12, '=IFERROR(L100/C100)', 13,
                                        '=IFERROR(N100/C100)', 14, '=IFERROR(P100/C100)', 15, '=IFERROR(R100/C100)', 16, '=IFERROR(T100/C100)', 17, '=IFERROR(V100/C100)', 18,
                                        '=IFERROR(X100/C100)', 19, 20, 'Red', '=IFERROR(F100/(E100*C100))', null]).calledOnce();
        verify(this.itemsSht).sort(2).calledOnce();
    }

    shouldAddOrUpdateCallUpdateIfOriginalPosNotZero(){
        // GIVEN
        var item = new Item('name', [100, 'g', 100, 500, 10, 11, 12, 13, 14, 15, 16, 17, 18], 19, 20, 'Red', '1 Day');
        // WHEN
        this.itemRepository.addOrUpdate(item, 97);
        // THEN
        verify(this.itemsSht).setAreaValue(100, 3, 1, 28, [[100, 'g', 1, 500, '=IFERROR(F100/C100)', 10, '=IFERROR(H100/C100)', 11, '=IFERROR(J100/C100)', 12, '=IFERROR(L100/C100)', 
                                           13, '=IFERROR(N100/C100)', 14, '=IFERROR(P100/C100)', 15, '=IFERROR(R100/C100)', 16, '=IFERROR(T100/C100)', 17, '=IFERROR(V100/C100)', 
                                           18, '=IFERROR(X100/C100)', 19, 20, 'Red', '=IFERROR(F100/(E100*C100))', getRelativeDay(+1)]]).calledOnce();
    }

    shouldAddAddItemToTheLastRowOfTheSheet(){
        // GIVEN
        var item = new Item('name', [100, 'g', 100, 500, 10, 11, 12, 13, 14, 15, 16, 17, 18], 19, 20, 'Red', '1 Week');
        when(this.itemsSht).getLastRow().thenReturn(99);
        // WHEN
        this.itemRepository.add(item);
        // THEN
        verify(this.itemsSht).appendRow(['', 'name', 100, 'g', 1, 500, '=IFERROR(F100/C100)', 10, '=IFERROR(H100/C100)', 11, '=IFERROR(J100/C100)', 12, '=IFERROR(L100/C100)', 13, 
                                        '=IFERROR(N100/C100)', 14, '=IFERROR(P100/C100)', 15, '=IFERROR(R100/C100)', 16, '=IFERROR(T100/C100)', 17, '=IFERROR(V100/C100)', 18, 
                                        '=IFERROR(X100/C100)', 19, 20, 'Red', '=IFERROR(F100/(E100*C100))', getRelativeDay(+7)]).calledOnce();
        verify(this.itemsSht).sort(2).calledOnce();
    }

    shouldUpdateUpdateOriginalRowWithNewItemData(){
        // GIVEN
        var item = new Item('name', [100, 'g', 100, 500, 10, 11, 12, 13, 14, 15, 16, 17, 18], 19, 20, 'Red', 'Never');
        // WHEN
        this.itemRepository.update(item, 97);
        // THEN
        verify(this.itemsSht).setAreaValue(100, 3, 1, 28, [[100, 'g', 1, 500, '=IFERROR(F100/C100)', 10, '=IFERROR(H100/C100)', 11, '=IFERROR(J100/C100)', 12, '=IFERROR(L100/C100)',
                                           13, '=IFERROR(N100/C100)', 14, '=IFERROR(P100/C100)', 15, '=IFERROR(R100/C100)', 16, '=IFERROR(T100/C100)', 17, '=IFERROR(V100/C100)', 
                                           18, '=IFERROR(X100/C100)', 19, 20, 'Red', '=IFERROR(F100/(E100*C100))', null]]).calledOnce();
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

    shouldLoadReturnTheItemAtIndex(){
        // GIVEN
        let index = 10;
        when(this.itemsSht).getPosValue(13, 2).thenReturn('Name');
        when(this.itemsSht).getAreaValues(13, 2, 1, 29).thenReturn([[0, 10, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 
                                                                    14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]]);
        // WHEN
        let result = this.itemRepository.load(index);
        // THEN
        assertEquals(result, new Item('Name', [10, 2, 30, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22], 24, 25));
    }

    shouldLoadReturnNothingIfIndexIncorrect(){
        // GIVEN
        let index = -1;
        // WHEN
        let result = this.itemRepository.load(index);
        // THEN
        assertNull(result);
    }

    shouldLoadReturnNothingIfIndexisNull(){
        // GIVEN
        let index = null;
        // WHEN
        let result = this.itemRepository.load(index);
        // THEN
        assertNull(result);
    }

    shouldDeleteRemoveAllItemsWithProvidedIndexesInDescOrder(){
        // GIVEN 
        let indexes = [10,4,6,9];
        // WHEN
        this.itemRepository.delete(indexes);
        // THEN
        verify(this.itemsSht).deleteRow(13).calledInOrder(1);
        verify(this.itemsSht).deleteRow(12).calledInOrder(2);
        verify(this.itemsSht).deleteRow(9).calledInOrder(3);
        verify(this.itemsSht).deleteRow(7).calledInOrder(4);
    }

    shouldDeleteDoNothingIfNoIndexProvided(){
        // GIVEN 
        let indexes = [];
        // WHEN
        this.itemRepository.delete(indexes);
        // THEN
        verify(this.itemsSht).deleteRow(any()).neverCalled();
    }

    shouldDeleteDoNothingIfIndexesAreNull(){
        // GIVEN 
        let indexes = null;
        // WHEN
        this.itemRepository.delete(indexes);
        // THEN
        verify(this.itemsSht).deleteRow(any()).neverCalled();
    }

    shouldAutoDeleteItemsDeleteAllExpiredItems(){
        // GIVEN
        when(this.itemsSht).getValues('AD4:AD').thenReturn(['', getRelativeDay(+5), getToday(), getYesterday(), getRelativeDay(-10)]);
        // WHEN
        this.itemRepository.autoDeleteItems();
        // THEN
        verify(this.itemsSht).deleteRow(8).calledInOrder(2);
        verify(this.itemsSht).deleteRow(7).calledInOrder(3);
        verify(this.itemsSht).deleteRow(6).calledInOrder(4);   
    }
}

var runItemRepositoryTests = () => new ItemRepositoryTest().runAllTests();