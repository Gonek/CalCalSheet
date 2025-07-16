class NewItemServiceTest extends TestBase {
    beforeAll(){
        super.beforeAll();
        this.newItemNameAndOldPosRng = mockRng(RNG.NEW_ITEM_NAME_AND_OLD_POS);
        this.newItemFieldsToSaveRng = mockRng(RNG.NEW_ITEM_FIELDS_TO_SAVE);
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
        when(this.newItemNoomColourRng).getDisplayValue().thenReturn('Red');
        when(this.newItemAutoDeleteRng).getValue().thenReturn('1 Week');
        // WHEN
        this.newItemService.addNewItem();
        // THEN
        verify(this.itemRepository).addOrUpdate(new Item('Name', [100, 'g', 100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'Red', '1 Week'),1).calledOnce();
        verify(this.newItemFieldsRng).clear().calledOnce();
        verify(this.newItemNoomCategoryRng).setValue('Solid').calledOnce();
        verify(this.newItemNoomColourRng).setValue('=F22').calledOnce();
    }

    shouldLoadItemLoadItemToForm(){
        // GIVEN
        when(this.newItemNameAndOldPosRng).getValue(1,4).thenReturn(1);
        when(this.itemRepository).load().thenReturn(new Item('Name', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]));
        // WHEN
        this.newItemService.loadItem();
        // THEN
        verify(this.newItemFieldsRng).setValuesWithResize([[1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12], [13]]).calledOnce();
        verify(this.newItemAutoDeleteRng).setValue('Never').calledOnce();
    }

    shouldLoadItemLoadItemToForm(){
        // GIVEN
        when(this.newItemNameAndOldPosRng).getValue(1,4).thenReturn(0);
        // WHEN
        this.newItemService.loadItem();
        // THEN
        verify(this.newItemFieldsRng).setValuesWithResize(any()).neverCalled();
        verify(this.newItemAutoDeleteRng).setValue(any()).neverCalled();
    }
}

var runNewItemServiceTests = () => new NewItemServiceTest().runAllTests();