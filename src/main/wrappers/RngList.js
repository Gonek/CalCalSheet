class RngList{

  constructor(rangeList){
    this.rngList = rangeList; 
    this.name = 'RngList';
  }

  setValue(format){
    return this.rngList.setValue(format);
  }

  setNumberFormat(format){
    return this.rngList.setNumberFormat(format);
  }

}