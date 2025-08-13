class NewItemServiceTest extends TestBase {
    beforeAll(){
        super.beforeAll();
        this.newItemNameAndOldPosRng = mockRng(RNG.NEW_ITEM_NAME_AND_OLD_POS);
        this.newItemFieldsToSaveRng = mockRng(RNG.NEW_ITEM_FIELDS_TO_SAVE);
        this.newItemPriceRng = mockRng(RNG.NEW_ITEM_PRICE);
        this.newItemNoomColourRng = mockRng(RNG.NEW_ITEM_NOOM_COLOUR);
        this.newItemNoomCategoryRng = mockRng(RNG.NEW_ITEM_NOOM_CATEGORY);
        this.newItemFieldsRng = mockRng(RNG.NEW_ITEM_FIELDS);
        this.newItemAutoDeleteRng = mockRng(RNG.NEW_ITEM_AUTO_DELETE);
        this.itemRepository = mock(ItemRepository);
        
        this.newItemService = new NewItemService();
    }

    shouldAddNewItemCollectDataCallIRepositoryAddOrUpdateAndResetForm(){
        // GIVEN
        when(this.newItemNameAndOldPosRng).getValue(1,1).thenReturn('Name');
        when(this.newItemNameAndOldPosRng).getValue(1,4).thenReturn(1);
        when(this.newItemFieldsToSaveRng).getColAsArray().thenReturn([100, 'g', 100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        when(this.newItemPriceRng).getRowAsArray().thenReturn([11, 0.11]);
        when(this.newItemNoomColourRng).getDisplayValue().thenReturn('Red');
        when(this.newItemAutoDeleteRng).getValue().thenReturn('1 Week');
        // WHEN
        this.newItemService.addNewItem();
        // THEN
        verify(this.itemRepository).addOrUpdate(new Item('Name', [100, 'g', 100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 11, '0.11', 'Red', '1 Week'),1).calledOnce();
        verify(this.newItemFieldsRng).clearContent().calledOnce();
        verify(this.newItemNoomCategoryRng).setValue('Solid').calledOnce();
        verify(this.newItemNoomColourRng).setValue('=F24').calledOnce();
    }

    shouldLoadItemLoadItemToForm(){
        // GIVEN
        when(this.newItemNameAndOldPosRng).getValue(1,4).thenReturn(1);
        when(this.itemRepository).load(1).thenReturn(new Item('Name', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 11, '0.11'));
        // WHEN
        this.newItemService.loadItem();
        // THEN
        verify(this.newItemFieldsRng).setValuesWithResize([["Name"], [1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12], [13]]).calledOnce();
        verify(this.newItemPriceRng).setValue(11, 1, 1);
        verify(this.newItemPriceRng).setValue(0.11, 2, 1);
        verify(this.newItemAutoDeleteRng).setValue('Never').calledOnce();
    }

    shouldLoadItemDoNothingIfIndexIsZero(){
        // GIVEN
        when(this.newItemNameAndOldPosRng).getValue(1,4).thenReturn(0);
        // WHEN
        this.newItemService.loadItem();
        // THEN
        verify(this.newItemFieldsRng).setValuesWithResize(any()).neverCalled();
        verify(this.newItemAutoDeleteRng).setValue(any()).neverCalled();
    }

    shouldDeleteItemsCallsRepositoryDeleteWithTheProvidedIndexes(){
        // GIVEN
        let input = mock(BtnF);
        when(input).getData().thenReturn('1,5,8,15');
        // WHEN
        this.newItemService.deleteItems(input.mockObj);
        // THEN
        verify(this.itemRepository).delete([1,5,8,15]).calledOnce();
    }

    shouldDeleteItemsDoNothingIfIndexesAreNull(){
        // GIVEN
        let input = mock(BtnF);
        when(input).getData().thenReturn(null);
        // WHEN
        this.newItemService.deleteItems(input.mockObj);
        // THEN
        verify(this.itemRepository).delete(any()).neverCalled();
    }

    shouldDeleteItemsDoNothingIfIndexesAreEmpty(){
        // GIVEN
        let input = mock(BtnF);
        when(input).getData().thenReturn('');
        // WHEN
        this.newItemService.deleteItems(input.mockObj);
        // THEN
        verify(this.itemRepository).delete(any()).neverCalled();
    }
}

var runNewItemServiceTests = () => new NewItemServiceTest().runAllTests();