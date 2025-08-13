function copyCalLoss(){
  copyCalories("CalLoss");
}

function copyCalMain(){
  copyCalories("CalMaintain");
}

function copyCalGain(){
  copyCalories("CalGain");
}

function copyCalCustom(){
  copyCalories("CalCustom");
}

function copyCalories(name){
  var inputRng = getRangeByName(name); 
  var min = getValue(inputRng,1,1);
  var max = getValue(inputRng,2,1);
  setCalories(getRangeByName("Today!SummaryValues"), min, max);
  setCalories(getRangeByName("Day Base!SummaryValues"), min, max);
}

function copyMacro(){
  var macroRng = getRangeByName("Macros");
  var pMin = getValue(macroRng,1,1);
  var pMax = getValue(macroRng,1,2);
  var fMin = getValue(macroRng,2,1);
  var fMax = getValue(macroRng,2,2);
  var cMin = getValue(macroRng,3,1);
  var cMax = getValue(macroRng,3,2);
  setMacro(getRangeByName("Today!SummaryValues"), pMin, pMax, fMin, fMax, cMin, cMax);
  setMacro(getRangeByName("Day Base!SummaryValues"), pMin, pMax, fMin, fMax, cMin, cMax);
}

function setCalories(rng, min, max){
  rng.getCell(1,1).setValue(min);
  rng.getCell(2,1).setValue(max);
}

function setMacro(rng, pMin, pMax, fMin, fMax, cMin, cMax){
  rng.getCell(1,2).setValue(pMin);
  rng.getCell(1,4).setValue(fMin);
  rng.getCell(1,6).setValue(cMin);
  rng.getCell(2,2).setValue(pMax);
  rng.getCell(2,4).setValue(fMax);
  rng.getCell(2,6).setValue(cMax);
}