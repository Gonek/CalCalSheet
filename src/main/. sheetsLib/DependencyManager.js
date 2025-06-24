/**
 * Get object from the dependency manager
 * @param {String} name of object
 * @returns {type}  object
 */
var getObj = (type) => dependencyManager.getObj(type);
/**
 * Get SpSh object from the dependency manager
 * @param {String} name of spsh
 * @returns {SpSh} spsh object
 */
var getSpSh = (id) => dependencyManager.getSpSh(id);
/**
 * Get sht object from the dependency manager
 * @param {Integer} id of sht
 * @returns {Sht} sht object
 */
var getSht = (name) => dependencyManager.getSht(name);
/**
 * Get rng object from the dependency manager
 * @param {String} name of rng
 * @returns {Rng} rng object
 */
var getRng = (name) => dependencyManager.getRng(name);

var addObj = (name, obj) => dependencyManager.addObj(name, obj);
var addSpSh = (id, spsh) => dependencyManager.addSpSh(id, spsh);
var addSpr = (name, sht) => dependencyManager.addSpr(name, sht);
var addRng = (name, rng) => dependencyManager.addRng(name, rng);

var clearDm = () => dependencyManager.clear();

class DependencyManager {

  constructor(){
    this.dependencies = new Map();
    this.spshs = new Map();
    this.sprs = new Map();
    this.rngs = new Map();
  }

  getObj(type){
    let obj = this.dependencies.get(type.name);
    if(!obj){
      obj = new type();
      this.dependencies.set(type.name, obj);
    }
    return obj;
  }

  addObj(name, obj){
    this.dependencies.set(name, obj);
  }

  getSpSh(id){
    let spsh = this.spshs.get(id);
    if(!spsh){
      spsh = new SpSh(id);
      this.spshs.set(id, spsh);
    }
    return spsh;
  }

  getSht(id){
    let sht = this.sprs.get(id);
    if(!sht){
      sht = new Sht(id);
      this.sprs.set(id, sht);
    }
    return sht;
  }

  addSpSh(id, spsh){
    this.spshs.set(id, spsh);
  }

  addSpr(name, sht){
    this.sprs.set(name, sht);
  }

  getRng(name){
    let rng = this.rngs.get(name);
    if(!rng){
      rng = new Rng(name);
      this.rngs.set(name, rng);
    }
    return rng;
  }

  addRng(name, rng){
    this.rngs.set(name, rng);
  }

  clear(){
    this.dependencies.clear();
    this.spshs.clear();
    this.sprs.clear();
    this.rngs.clear();
  }
}

var dependencyManager = new DependencyManager();