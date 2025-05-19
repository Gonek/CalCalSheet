class NewItemService {

  addNewItem(){
    let nameAndPosRng = getRng(RNG.NEW_ITEM_NAME_AND_OLD_POS);
    let itemName = nameAndPosRng.getValue(1, 1);
    let oldPos = nameAndPosRng.getValue(1, 4);
    let fields = getRng(RNG.NEW_ITEM_FIELDS_TO_SAVE).getColAsArray();
    let noomColourRng = getRng(RNG.NEW_ITEM_NOOM_COLOUR);

    getObj(ItemRepository).addOrUpdate(new Item(itemName, fields, noomColourRng.getDisplayValue()), oldPos);

    getRng(RNG.NEW_ITEM_FIELDS).clear();
    getRng(RNG.NEW_ITEM_NOOM_CATEGORY).setValue('Solid');
    noomColourRng.setValue('=F21');
  }
}