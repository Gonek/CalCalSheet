class Sht{
  /**
   * @param {String} id Id of the sheet
   */
  constructor(id, test = false){
    this.id = id;
    if(!test){
      if(typeof id === "string" && id.includes('.')){
        let s = id.split('.');
        this.sht = getSpSh(s[0]).getSheetById(s[1]);
      }else{
        this.sht = getSpSh(SPSH.ACTIVE).getSheetById(id);
      }
    }
  }

  getId(){
    return this.id;
  }

  getValue(range) {
    return this.sht.getRange(range).getValue();
  }

  getValues(range) {
    return this.sht.getRange(range).getValues();
  }

  getClearValues(range) {
    return clear(this.sht.getRange(range).getValues());
  }

  getPosValue(row, col){
    return this.sht.getRange(row, col).getValue();
  }

  getAreaValue(row, col, numRows, numCols){
    return this.sht.getRange(row, col, numRows, numCols).getValues();
  }

  getDisplayValue(range) {
    return this.sht.getRange(range).getDisplayValue();
  }

  getDisplayValues(range) {
    return this.sht.getRange(range).getDisplayValues();
  }

  getClearDisplayValues(range) {
    return clear(this.sht.getRange(range).getDisplayValues());
  }

  getFormula(range){
    return this.sht.getRange(range).getFormula();
  }

  getFormulas(range){
    return this.sht.getRange(range).getFormulas();
  }

  getClearFormulas(range){
    return clear(this.sht.getRange(range).getFormulas());
  }

  getRng(range){
    return new Rng(undefined, this.sht.getRange(range));
  }

  getRngList(ranges){
    return new RngList(this.sht.getRangeList(ranges));
  }

  getValidationCriteriaRangeValues(range){
    return this.getRng(range).getValidationCriteriaRangeValues();
  }

  getValidationCriteriaValues(range){
    return this.getRng(range).getValidationCriteriaValues();
  }

  insertRows(rowIndex, numRows){
    this.sht.insertRows(rowIndex, numRows);
  }

  setValue(range, value){
    this.sht.getRange(range).setValue(value);
  }

  setValues(range, values){
    this.sht.getRange(range).setValues(values);
  }

  setPosValue(row, col, value){
    this.sht.getRange(row, col).setValue(value);
  }

  setAreaValue(row, col, numRows, numCols, values){
    this.sht.getRange(row, col, numRows, numCols).setValues(values);
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
    this.sht.setName(name);
  }

  getLastRow(){
    return this.sht.getLastRow();
  }

  appendRow(rowOfData){
    this.sht.appendRow(rowOfData);
  }

  switchCols(condition, pos, size = 1){
    condition ? this.showCols(pos, size) : this.hideCols(pos, size);
  }

  switchRows(condition, pos, size = 1){
    condition ? this.showRows(pos, size) : this.hideRows(pos, size);
  }

  showCols(pos, size = 1){
    this.sht.showColumns(pos, size);
  }

  hideCols(pos, size = 1){
    this.sht.hideColumns(pos, size);
  }

  showRows(pos, size = 1){
    this.sht.showRows(pos, size);
  }

  hideRows(pos, size = 1){
    this.sht.hideRows(pos, size);
  }

  isColHidden(col){
    return this.sht.isColumnHiddenByUser(col);
  }

  isRowHidden(row){
    return this.sht.isRowHiddenByUser(row);
  }

  hideSheet(){
    this.sht.hideSheet();
  }

  activate(){
    this.sht.activate();
  }

  setActiveSelectionRng(rng){
    this.sht.setActiveSelection(rng.rng);
  }

  setActiveSelection(range){
    this.sht.setActiveSelection(range);
  }

  sort(column){
    this.sht.getFilter().sort(column, true);
  }

  clear(range){
    this.sht.getRange(range).clearContent();
  }

  deleteCells(range, shiftDimmension = SpreadsheetApp.Dimension.ROWS){
    this.sht.getRange(range).deleteCells(shiftDimmension)
  }

  deleteRow(deleteIndex){
    this.sht.deleteRow(deleteIndex);
  }

  deleteRows(deleteFrom, deleteTo){
    this.sht.deleteRows(deleteFrom, deleteTo - deleteFrom);
  }

  deleteSpr(){
    ACTIVE.deleteSheet(this.sht);
  }

}
