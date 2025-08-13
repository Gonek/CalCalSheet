/**
 * Abstract Model Class for Group.
 *
 * @class Group
 */

class Group{
    constructor(name, items){
      this.name = name;
      this.items = items;
    }

    isEqual(other){
      return this.name === other.name && arraysEqual(this.items, other.items);
    }
  }