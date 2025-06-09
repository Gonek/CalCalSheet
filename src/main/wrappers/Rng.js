class Rng{

  constructor(name, range = undefined, test = false){
    this.name = name;
    if(!test){
      this.rng = range ? range : getSpSh(SPSH.ACTIVE).getRangeByName(name);
    }
  }

  getName(){
    return this.name;
  }

  copyTo(rng){
    this.rng.copyTo(rng.rng);
  }

  getValue(row = 1, col = 1){
    return this.rng.getCell(row, col).getValue();
  }

  getValues(){
    return this.rng.getValues();
  }

  getClearValues(){
    return clear(this.rng.getValues());
  }

  getDisplayValue(row = 1, col = 1){
    return this.rng.getCell(row, col).getDisplayValue();
  }

  getDisplayValues(){
    return this.rng.getDisplayValues();
  }

  getClearDisplayValues(){
    return clear(this.rng.getDisplayValues());
  } 

  getFormula(){
    return this.rng.getFormula();
  }

  getFormulas(){
    return this.rng.getFormulas();
  }

  getNumberFormat(){
    return this.rng.getNumberFormat();
  }

  setValue(value, row = 1, col = 1){
    this.rng.getCell(row, col).setValue(value);
  }

  setValueAndFlush(value, row = 1, col = 1){
    this.setValue(value, row, col);
    SpreadsheetApp.flush();
  }

  setValues(values){
    this.rng.setValues(values);
  }

  setValuesWithResize(values){
    this.setValues(resizeMatrix(values, this.rng.getWidth(), this.rng.getHeight()));
  }

  setNumberFormat(format){
    return this.rng.setNumberFormat(format);
  }

  setFormulaToValue(){
    this.rng.setValue(this.rng.getValue());
  }

  getRowAsArray(row = 1){
    return this.rng.getValues()[row - 1];
  }

  getColAsArray(col = 1){
    return this.rng.getValues().map(row => row[col -1]);
  }

  getRow(){
    return this.rng.getRow();
  }

  getColumn(){
    return this.rng.getColumn();
  }

  getHeight(){
    return this.rng.getHeight();
  }

  getWidth(){
    return this.rng.getWidth();
  }

  getValidationCriteriaValues(row = 1, col = 1){
    let dataValidation = this.rng.getCell(row, col).getDataValidation();
    if(dataValidation?.getCriteriaType() == SpreadsheetApp.DataValidationCriteria.VALUE_IN_LIST){
      return dataValidation?.getCriteriaValues().slice(0, -1);
    } else {
      return dataValidation?.getCriteriaValues();
    }
    
  }

  getValidationCriteriaRangeValues(row = 1, col = 1){
    return uniq(clearAll(this.getValidationCriteriaValues(row, col)[0].getValues()));
  }

  getA1Pos(){
    return this.rng.getA1Notation();
  }

  isBlank(){
    return this.rng.isBlank();
  }

  clear(){
    this.rng.clearContent();
  }

  clearAndSetValues(values){
    this.clear();
    this.setValues(values);
  }
}
