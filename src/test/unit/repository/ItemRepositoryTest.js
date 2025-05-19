class ItemRepositoryTest extends TestBase {
    constructor(){
        super();

        this.itemsSpr = mockSpr(SPR.ITEMS, this);
        this.itemRepository = new ItemRepository();
    }

    shouldAddOfUpdateCallAddIfOriginalPosZero(){
        // GIVEN
        var item = new Item('name',[100, 'g', 100, 500, 10, 11, 12, 13, 14, 15, 16, 17, 18], 'Red');
        when(this.itemsSpr).getLastRow().thenReturn(99);
        // WHEN
        this.itemRepository.addOrUpdate(item, 0);
        // THEN
        verify(this.itemsSpr).appendRow(['', 'name', 100,'g',1,500,'=IFERROR(F100/C100)', 10, '=IFERROR(H100/C100)', 11, '=IFERROR(J100/C100)', 12, '=IFERROR(L100/C100)', 13,
                                        '=IFERROR(N100/C100)', 14, '=IFERROR(P100/C100)', 15, '=IFERROR(R100/C100)', 16, '=IFERROR(T100/C100)', 17, '=IFERROR(V100/C100)', 18,
                                        '=IFERROR(X100/C100)', 'Red', '=IFERROR(F100/(E100*C100))']).calledOnce();
        verify(this.itemsSpr).sort(2).calledOnce();
    }

    shouldAddOfUpdateCallUpdateIfOriginalPosNotZero(){
        // GIVEN
        var item = new Item('name', [100, 'g', 100, 500, 10, 11, 12, 13, 14, 15, 16, 17, 18], 'Red');
        // WHEN
        this.itemRepository.addOrUpdate(item, 97);
        // THEN
        verify(this.itemsSpr).setAreaValue(100, 3, 1, 25, [100, 'g', 1, 500, '=IFERROR(F100/C100)', 10, '=IFERROR(H100/C100)', 11, '=IFERROR(J100/C100)', 12, '=IFERROR(L100/C100)', 
                                           13, '=IFERROR(N100/C100)', 14, '=IFERROR(P100/C100)', 15, '=IFERROR(R100/C100)', 16, '=IFERROR(T100/C100)', 17, '=IFERROR(V100/C100)', 
                                           18, '=IFERROR(X100/C100)', 'Red', '=IFERROR(F100/(E100*C100))']).calledOnce();
    }

    shouldAddAddItemToTheLastRowOfTheSheet(){
        // GIVEN
        var item = new Item('name', [100, 'g', 100, 500, 10, 11, 12, 13, 14, 15, 16, 17, 18], 'Red');
        when(this.itemsSpr).getLastRow().thenReturn(99);
        // WHEN
        this.itemRepository.add(item);
        // THEN
        verify(this.itemsSpr).appendRow(['', 'name', 100, 'g', 1, 500, '=IFERROR(F100/C100)', 10, '=IFERROR(H100/C100)', 11, '=IFERROR(J100/C100)', 12, '=IFERROR(L100/C100)', 13, 
                                        '=IFERROR(N100/C100)', 14, '=IFERROR(P100/C100)', 15, '=IFERROR(R100/C100)', 16, '=IFERROR(T100/C100)', 17, '=IFERROR(V100/C100)', 18, 
                                        '=IFERROR(X100/C100)', 'Red', '=IFERROR(F100/(E100*C100))']).calledOnce();
        verify(this.itemsSpr).sort(2).calledOnce();
    }

    shouldUpdateUpdateOriginalRowWithNewItemData(){
        // GIVEN
        var item = new Item('name', [100, 'g', 100, 500, 10, 11, 12, 13, 14, 15, 16, 17, 18], 'Red');
        // WHEN
        this.itemRepository.update(item, 97);
        // THEN
        verify(this.itemsSpr).setAreaValue(100, 3, 1, 25, [100, 'g', 1, 500, '=IFERROR(F100/C100)', 10, '=IFERROR(H100/C100)', 11, '=IFERROR(J100/C100)', 12, '=IFERROR(L100/C100)',
                                           13, '=IFERROR(N100/C100)', 14, '=IFERROR(P100/C100)', 15, '=IFERROR(R100/C100)', 16, '=IFERROR(T100/C100)', 17, '=IFERROR(V100/C100)', 
                                           18, '=IFERROR(X100/C100)', 'Red', '=IFERROR(F100/(E100*C100))']).calledOnce();
    }

    shouldIsExitCallFindOnSheetAndReturnTrueIfItemFound(){
        // GIVEN
        when(this.itemsSpr).find('name').thenReturn(new Object());
        // WHEN
        let result = this.itemRepository.isExist('name');
        // THEN
        this.assertEquals(result, true);
    }

    shouldIsExitCallFindOnSheetAndReturnFalseIfItemNotFound(){
        // GIVEN
        when(this.itemsSpr).find('name').thenReturn(null);
        // WHEN
        let result = this.itemRepository.isExist('name');
        // THEN
        this.assertEquals(result, false);
    }
}

var runItemRepositoryTests = () => new ItemRepositoryTest().runAllTests();