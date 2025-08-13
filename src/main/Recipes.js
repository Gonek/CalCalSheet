function loadRecipeToMealCalculator() {
  var selectedRecipeNamesRng = getRangeByName('SelectedRecipeItems');
  var selectedRecipeAmountsRng = getRangeByName('SelectedRecipeAmounts');
  var mealItemNamesRng = getRangeByName('MealItemNames');
  var mealItemAmountsRng = getRangeByName('MealItemAmounts');
  var mealCalcSpr = getSprByName('Meal calculator');
  setValueS(mealCalcSpr, 'C5', getValueS(mealCalcSpr, 'D3'))
  mealItemNamesRng.setValues(selectedRecipeNamesRng.getValues());
  mealItemAmountsRng.setValues(selectedRecipeAmountsRng.getValues());
}

function saveRecipeFromMealCalculator(mealCalcSpr) {
  var recipesSpr = getSprByName('Recipes');
  deleteRecipe(recipesSpr, mealCalcSpr);

  var mealItemNamesRng = getRangeByName('MealItemNames');
  var mealItemAmountsRng = getRangeByName('MealItemAmounts');
  var lenght = mealItemNamesRng.getNumRows();

  const lr = recipesSpr.getLastRow()+1;
  
  recipesSpr.getRange(lr, 3, lenght, 1).setValues(mealItemNamesRng.getValues());
  recipesSpr.getRange(lr, 4, lenght, 1).setValues(mealItemAmountsRng.getValues());

  const nlr = recipesSpr.getLastRow()+1;
  recipesSpr.getRange(lr, 2, nlr - lr, 1).setValue(getValueS(getSprByName('Meal calculator'), 'C5'));
}

function deleteRecipe(recipesSpr, mealCalcSpr){
  var row = getValueS(mealCalcSpr, 'K3');
  while(row != 0){
    recipesSpr.deleteRow(row + 3);
    row = getValueS(mealCalcSpr, 'K3');
  }
}