function onEdit(e) {
  if (isCellInPositionsInDaySheets(e, [`C${MEAL1_START_ROW}`, `C${MEAL2_START_ROW}`, `C${MEAL3_START_ROW}`, `C${MEAL4_START_ROW}`, `C${MEAL5_START_ROW}`, `C${MEAL6_START_ROW}`])){
    mealLoaderFieldChanged(e);
  } else if (isCellInRangeInSheet(e, RNG_TODAY_ITEM_NAMES, TODAY) || 
      isCellInRangeInSheet(e, RNG_RECIPE_ITEM_NAMES, RECIPE_CALCULATOR)) {
    var name = e.range.getValue();
    if(!itemRepository.isExist(name)) {
      newItemPopUp(e.range);
    }
  }
}

function mealLoaderFieldChanged(e) {
  if(String(e.range.getValue()).indexOf(MEAL_ICON) == 0){
    var sheetName = e.source.getSheetName();
    var startRow = e.range.getRow();
    switch(startRow){
      case MEAL1_START_ROW: loadMeal(sheetName, MEAL1, startRow); break;
      case MEAL2_START_ROW: loadMeal(sheetName, MEAL2, startRow); break;
      case MEAL3_START_ROW: loadMeal(sheetName, MEAL3, startRow); break;
      case MEAL4_START_ROW: loadMeal(sheetName, MEAL4, startRow); break;
      case MEAL5_START_ROW: loadMeal(sheetName, MEAL5, startRow); break;
      case MEAL6_START_ROW: loadMeal(sheetName, MEAL6, startRow); break;
    }
  }
}