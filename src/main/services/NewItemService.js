class NewItemService {

  constructor(){
    this.itemRepository = getObj(ItemRepository);
  }

  addNewItem(){
    let nameAndPosRng = getRng(RNG.NEW_ITEM_NAME_AND_OLD_POS);
    let itemName = nameAndPosRng.getValue(1, 1);
    let oldPos = nameAndPosRng.getValue(1, 4);
    let fields = getRng(RNG.NEW_ITEM_FIELDS_TO_SAVE).getColAsArray();
    let noomColourRng = getRng(RNG.NEW_ITEM_NOOM_COLOUR);
    let autoDeleteRng = getRng(RNG.NEW_ITEM_AUTO_DELETE);

    this.itemRepository.addOrUpdate(new Item(itemName, fields, noomColourRng.getDisplayValue(), autoDeleteRng.getValue()), oldPos);

    getRng(RNG.NEW_ITEM_FIELDS).clear();
    getRng(RNG.NEW_ITEM_NOOM_CATEGORY).setValue('Solid');
    autoDeleteRng.setValue('Never');
    noomColourRng.setValue('=F22');
  }

  loadItem(){
    let loadIndex = getRng(RNG.NEW_ITEM_NAME_AND_OLD_POS).getValue(1, 4);
    if(loadIndex > 0){
      let item = this.itemRepository.loadByIndex(loadIndex);
      let newItemFields = getRng(RNG.NEW_ITEM_FIELDS);
      newItemFields.setValuesWithResize([[item.name], [item.amount], [item.unit], [item.weight], [item.calories],
                                         [item.totalFat], [item.saturatedFat], [item.transFat], [item.carbohydrate],
                                         [item.fiber], [item.sugar], [item.sugarAlcohol], [item.protein], [item.salt]]);
      getRng(RNG.NEW_ITEM_AUTO_DELETE).setValue('Never');
    }
  }
}