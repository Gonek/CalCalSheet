/**
 * Abstract Class GroupRepository.
 *
 * @class GroupRepository
 */
class GroupRepository{

  constructor(name){
    this.spr = getSpr(name);
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
    this.spr.putDataAtEnd(data);
    this.spr.sort(2);
  }

  /**
   * Delete item from repository
   * @param {String} name of item
   */
  deleteIfExist(name){
    var allItems = this.spr.getValues(REPOSITORY_AREA).flat();
    var deleteFrom = allItems.findIndex(aName => aName === name);
    if (deleteFrom > -1) { 
      var deleteTo = allItems.findLastIndex(aName => aName === name);
      this.spr.deleteRows(deleteFrom + 4, deleteTo + 5);
    }
  }
}
