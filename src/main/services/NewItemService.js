// INTERFACE

var addNewItem = () => newItemService().addNewItem();
var addNewItemReturn = () => newItemService().addNewItemReturn();

//CLASS

class NewItemService {

  addNewItem(){
    let nameAndPosRng = new Rng(RNG_NEW_ITEM_NAME_AND_OLD_POS);
    let itemName = nameAndPosRng.getValue(1, 1);
    let oldPos = nameAndPosRng.getValue(1, 3);
    let fields = new Rng(RNG_NEW_ITEM_FIELDS_TO_SAVE).getColAsArray();
    let noomColour = new Rng(RNG_NEW_ITEM_NOOM_COLOUR).getDisplayValue();

    itemRepository().addOrUpdate(new Item(itemName, fields, noomColour), oldPos);
    this.clearNewItem();
  }

  addNewItemReturn(){
    addNewItem();
    new Spr(NEW_ITEM).getButton(0).setOnAction('addNewItem');
    new Spr(TODAY).activate();
  }

  clearNewItem() {
    new Rng(RNG_NEW_ITEM_FIELDS).clear();
    new Rng(RNG_NEW_ITEM_NOOM_CATEGORY).setValue('Solid');
    new Rng(RNG_NEW_ITEM_NOOM_COLOUR).setValue('=F21');
  }
}

// SERVICE SINGLETON
var newItemServiceSingleton;

/** 
 * Returns the new item service
 * @returns {NewItemService} new item service singleton
 */
var newItemService = () => newItemServiceSingleton = newItemServiceSingleton || new NewItemService();