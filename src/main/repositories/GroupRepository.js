/**
 * Abstract Class GroupRepository.
 *
 * @class GroupRepository
 */
class GroupRepository{

  constructor(name){
    this.sht = getSpr(name);
  }

  /**
   * Save or replace item to repository
   * @param {Group} item to save
   */
  save(group){
    this.deleteIfExist(group.name);
    this.saveToRepository(group);
  }

  /**
   * Save item to repository
   * @param {Group} item to save
   */
  saveToRepository(group){
    let data = group.items.map(row => [group.name, row[0], row[1]]);
    this.sht.putDataAtEnd(data);
    this.sht.sort(2);
  }

  /**
   * Delete item from repository
   * @param {String} name of item
   */
  deleteIfExist(name){
    var allItems = this.sht.getValues(REPOSITORY_AREA).flat();
    var deleteFrom = allItems.findIndex(aName => aName === name);
    if (deleteFrom > -1) { 
      var deleteTo = allItems.findLastIndex(aName => aName === name);
      this.sht.deleteRows(deleteFrom + 4, deleteTo + 5);
    }
  }
}
