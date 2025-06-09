class NewItemServiceTest extends TestBase {

  constructor(){
    super();
    this.newItemNameAndOldPosRng = mockRng(RNG.NEW_ITEM_NAME_AND_OLD_POS, this);
    this.newItemFieldsToSaveRng = mockRng(RNG.NEW_ITEM_FIELDS_TO_SAVE, this);
    this.newItemNoomColourRng = mockRng(RNG.NEW_ITEM_NOOM_COLOUR, this);
    this.newItemNoomCategoryRng = mockRng(RNG.NEW_ITEM_NOOM_CATEGORY, this);
    this.newItemFieldsRng = mockRng(RNG.NEW_ITEM_FIELDS, this);
    this.itemRepository = mock(ItemRepository, this);
    
    this.newItemService = new NewItemService();
  }

  shouldAddNewItemCollectDataCallIRepositoryAddOrUpdateAndResetForm(){
    // GIVEN
    when(this.newItemNameAndOldPosRng).getValue(1,1).thenReturn('Name');
    when(this.newItemNameAndOldPosRng).getValue(1,4).thenReturn(1);
    when(this.newItemFieldsToSaveRng).getColAsArray().thenReturn([100, 'g', 100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    when(this.newItemNoomColourRng).getDisplayValue().thenReturn('Red');
    // WHEN
    this.newItemService.addNewItem();
    // THEN
    verify(this.itemRepository).addOrUpdate(new Item('Name', [100, 'g', 100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'Red'),1).calledOnce();
    verify(this.newItemFieldsRng).clear().calledOnce();
    verify(this.newItemNoomCategoryRng).setValue('Solid').calledOnce();
    verify(this.newItemNoomColourRng).setValue('=F21').calledOnce();
  }
}

var runNewItemServiceTests = () => new NewItemServiceTest().runAllTests();