/**
 * Abstract Class GroupRepository.
 *
 * @class GroupRepository
 */
class GroupRepository{

  constructor(name){
    this.sht = getSht(name);
  }

  /**
   * Save or replace item to repository
   * @param {Group} item to save
   */
  save(group){
    this.delete([group.name]);
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
   * Delete items from repository
   * @param {Array} names of items
   */
  delete(names){
    var allItems = this.sht.getValues(REPOSITORY_AREA).flat();
    var posToDelete = [];
    names.forEach(name => posToDelete.unshift([
                                      allItems.findIndex(aName => aName === name), 
                                      allItems.findLastIndex(aName => aName === name)]));
    posToDelete.filter(pos => pos[0] >= 0)
               .forEach(pos =>  this.sht.deleteRows(pos[0] + 4, pos[1] + 5));
  }
}
