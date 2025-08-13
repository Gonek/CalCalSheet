function loadRecipeToRecipeCalculator() {
  var selectedRecipeItems = getRangeByName('SelectedRecipeItems').getValues()
                                                                    .map(row => [row[0], "",  "", row[1]]);
  var recipeItemsRng = getRangeByName('RecipeItems');
  var recipeCalcSpr = getSprByName('Recipe calculator');
  setValueS(recipeCalcSpr, 'C5', getValueS(recipeCalcSpr, 'D3'));
  recipeItemsRng.setValues(selectedRecipeItems);
}

function saveRecipeFromRecipeCalculator() {
  var recipesSpr = getSprByName('Recipes');
  var recipeName = getValueS(getSprByName('Recipe calculator'), 'C5');
  deleteRecipe(recipesSpr, recipeName);
  var recipeItems = getRangeByName('RecipeItems').getValues()
                                                    .filter(row => row[0] != "")
                                                    .map(row => [recipeName, row[0], row[3]]);
  var lenght = recipeItems.length;
  const lr = recipesSpr.getLastRow()+1;
  recipesSpr.getRange(lr, 2, lenght, 3).setValues(recipeItems);
  recipesSpr.getFilter().sort(2, true);
}

function deleteRecipe(recipesSpr, recipeName){
  var recipes = recipesSpr.getRange("B4:B").getValues().flat();
  var deleteFrom = recipes.findIndex(name => name === recipeName);
  if (deleteFrom > -1) { 
    var deleteTo = recipes.findLastIndex(name => name === recipeName);
    recipesSpr.deleteRows(deleteFrom + 4, deleteTo - deleteFrom + 1);
  }
}