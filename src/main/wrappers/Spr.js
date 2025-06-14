class Spr{
  /**
   * @param {string} name Name of the sheet
   */
  constructor(name, test = false){
    this.name = name;
    if(!test){
      if(name.includes('.')){
        let s = name.split('.');
        this.spr = getSpSh(s[0]).getSheetByName(s[1]);
      }else{
        this.spr = getSpSh(SPSH.ACTIVE).getSheetByName(name);
      }
    }
  }

  getName(){
    return this.name;
  }

  getValue(range) {
    return this.spr.getRange(range).getValue();
  }

  getValues(range) {
    return this.spr.getRange(range).getValues();
  }

  getClearValues(range) {
    return clear(this.spr.getRange(range).getValues());
  }

  getPosValue(row, col){
    return this.spr.getRange(row, col).getValue();
  }

  getAreaValue(row, col, numRows, numCols){
    return this.spr.getRange(row, col, numRows, numCols).getValues();
  }

  getDisplayValue(range) {
    return this.spr.getRange(range).getDisplayValue();
  }

  getDisplayValues(range) {
    return this.spr.getRange(range).getDisplayValues();
  }

  getClearDisplayValues(range) {
    return clear(this.spr.getRange(range).getDisplayValues());
  }

  getFormula(range){
    return this.spr.getRange(range).getFormula();
  }

  getFormulas(range){
    return this.spr.getRange(range).getFormulas();
  }

  getClearFormulas(range){
    return clear(this.spr.getRange(range).getFormulas());
  }

  getRng(range){
    return new Rng(undefined, this.spr.getRange(range));
  }

  getRngList(ranges){
    return new RngList(this.spr.getRangeList(ranges));
  }

  getValidationCriteriaRangeValues(range){
    return this.getRng(range).getValidationCriteriaRangeValues();
  }

  getValidationCriteriaValues(range){
    return this.getRng(range).getValidationCriteriaValues();
  }

  setValue(range, value){
    this.spr.getRange(range).setValue(value);
  }

  setValues(range, values){
    this.spr.getRange(range).setValues(values);
  }

  setPosValue(row, col, value){
    this.spr.getRange(row, col).setValue(value);
  }

  setAreaValue(row, col, numRows, numCols, values){
    this.spr.getRange(row, col, numRows, numCols).setValues(values);
  }

  setAreaValueAtPos(row, col, values){
    if(Array.isArray(values) && values.length){
      this.setAreaValue(row, col, values.length, values[0].length, values);
    }
  }

  putDataAtEnd(data){
    this.setAreaValueAtPos(this.getLastRow()+1, 2, data);
  }

  setName(name){
    this.spr.setName(name);
  }

  getLastRow(){
    return this.spr.getLastRow();
  }

  appendRow(rowOfData){
    this.spr.appendRow(rowOfData);
  }

  switchCols(condition, pos, size = 1){
    condition ? this.showCols(pos, size) : this.hideCols(pos, size);
  }

  switchRows(condition, pos, size = 1){
    condition ? this.showRows(pos, size) : this.hideRows(pos, size);
  }

  showCols(pos, size = 1){
    this.spr.showColumns(pos, size);
  }

  hideCols(pos, size = 1){
    this.spr.hideColumns(pos, size);
  }

  showRows(pos, size = 1){
    this.spr.showRows(pos, size);
  }

  hideRows(pos, size = 1){
    this.spr.hideRows(pos, size);
  }

  isColHidden(col){
    return this.spr.isColumnHiddenByUser(col);
  }

  isRowHidden(row){
    return this.spr.isRowHiddenByUser(row);
  }

  hideSheet(){
    this.spr.hideSheet();
  }

  activate(){
    this.spr.activate();
  }

  setActiveSelectionRng(rng){
    this.spr.setActiveSelection(rng.rng);
  }

  setActiveSelection(range){
    this.spr.setActiveSelection(range);
  }

  sort(column){
    this.spr.getFilter().sort(column, true);
  }

  clear(range){
    this.spr.getRange(range).clearContent();
  }

  deleteCells(range, shiftDimmension = SpreadsheetApp.Dimension.ROWS){
    this.spr.getRange(range).deleteCells(shiftDimmension)
  }

  deleteRow(deleteIndex){
    this.spr.deleteRow(deleteIndex);
  }

  deleteRows(deleteFrom, deleteTo){
    this.spr.deleteRows(deleteFrom, deleteTo - deleteFrom);
  }

  deleteSpr(){
    ACTIVE.deleteSheet(this.spr);
  }

}
