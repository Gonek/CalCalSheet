function onEdit(e) {
  if(isCellInPositionInSheet(e, "Profile", "D16")){
    profileCaloriesChanged(e);
  } else if (isCellInPositionsInDaySheets(e, ["C" + BREAKFAST_START_ROW, "C" + SNACK1_START_ROW, "C" + LUNCH_START_ROW, "C" + SNACK2_START_ROW, "C" + DINNER_START_ROW])){
    mealLoaderFieldChanged(e);
  } else if (isCellInRangeInSheet(e, "Today!ItemNames", "Today") || 
      isCellInRangeInSheet(e, "RecipeItemNames", "Recipe calculator")) {
    var name = e.range.getValue();
    if(!isItemExist(name)) {
      newItemPopUp(e.range);
    }
  }
}