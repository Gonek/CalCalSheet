class NewItemService {

  addNewItem(){
    let nameAndPosRng = getRng(RNG.NEW_ITEM_NAME_AND_OLD_POS);
    let itemName = nameAndPosRng.getValue(1, 1);
    let oldPos = nameAndPosRng.getValue(1, 4);
    let fields = getRng(RNG.NEW_ITEM_FIELDS_TO_SAVE).getColAsArray();
    let noomColourRng = getRng(RNG.NEW_ITEM_NOOM_COLOUR);
    let autoDeleteRng = getRng(RNG.NEW_ITEM_AUTO_DELETE);

    getObj(ItemRepository).addOrUpdate(new Item(itemName, fields, noomColourRng.getDisplayValue(), autoDeleteRng.getValue()), oldPos);

    getRng(RNG.NEW_ITEM_FIELDS).clear();
    getRng(RNG.NEW_ITEM_NOOM_CATEGORY).setValue('Solid');
    autoDeleteRng.setValue('Never');
    noomColourRng.setValue('=F22');
  }

  loadItem(){
    let loadIndex = getRng(RNG.NEW_ITEM_NAME_AND_OLD_POS).getValue(1, 4);
    if(loadIndex > 0){
      let fieldIndexes = [0,1,2,3,4,6,8,10,12,14,16,18,20,22];
      let loaded = getSpr(SPR.ITEMS).getAreaValue(loadIndex + 3, 2, 1, 27)[0]
                                    .filter((v, index) => index in fieldIndexes)
                                    .map(v => [v]);
      loaded[3][0] = loaded[3][0] * loaded[1][0];
      let newItemFields = getRng(RNG.NEW_ITEM_FIELDS);
      newItemFields.setValuesWithResize(loaded);
      getRng(RNG.NEW_ITEM_AUTO_DELETE).setValue('Never');
    }
  }
}