var isCellInRangeInSheet = (e, rngName, name) => {
  var rng = new Rng(rngName);
  var row = e.range.getRow();
  var col = e.range.getColumn();
  return e.source.getSheetName() == name && 
      col >= rng.getColumn() && 
      col <= rng.getLastColumn() && 
      row >= rng.getRow() && 
      row <= rng.getLastRow();
}

var isCellIsRangeCell = (e, rngName) => {
  var rng = new Rng(rngName);
  var row = e.range.getRow();
  var col = e.range.getColumn();
  return col == rng.getColumn() && row == rng.getRow();
}

var getToday = () => {
  var date = new Date();
  date.setHours(0,0,0,0);
  return date;
}

var resizeMatrix =(arr, width, height, val = null) => {
  const newRow = row => Array.from({ length: width }, (_, i) => {
    return i < row.length ? row[i] : val
  });
  return Array.from({ length: height }, (_, i) => {
    return i < arr.length ? newRow(arr[i]) : Array.from({ length: width }, () => val);
  });
}

function uniq(a) {
  return Array.from(new Set(a));
}

function clear(a){
  return a.filter(n => n.some(Boolean));
}

function clearAll(a){
  return a.flat().filter(n => n);
}