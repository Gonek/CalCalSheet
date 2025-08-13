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
    if(!group || !group.name || !group.items || group.name == '🥣 ' || group.items.length == 0) return;
    this.delete([group.name]);
    this.saveToRepository(group);
  }

  /**
   * Delete items from repository
   * @param {Array} names of items
   */
  delete(names){
    if(!names || names.length == 0) return;
    var allItems = this.sht.getValues(REPOSITORY_AREA).flat();
    var posToDelete = [];
    names.forEach(name => posToDelete.push([
                                      allItems.findIndex(aName => aName === name), 
                                      allItems.findLastIndex(aName => aName === name)]));
    posToDelete.filter(pos => pos[0] >= 0)
               .sort((a, b) => b[0] - a[0])
               .forEach(pos =>  this.sht.deleteRows(pos[0] + 4, pos[1] + 5));
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
}
