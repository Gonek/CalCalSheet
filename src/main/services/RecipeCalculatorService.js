class RecipeCalculatorService { 

  addRecipeToItemAndRecipes(){
    if(new Rng(RNG_RECIPE_SAVE_AS_RECIPE).getValue()){
      this.addToRecipes();
    }
    this.addToItems();
  }

  addToRecipes(){
    let recipeName = new Rng(RNG_RECIPE_NAME).getValue();
    let recipeItems = new Rng(RNG_RECIPE_ITEMS).getValues()
                                               .filter(row => row[0] != "");
    recipeRepository().saveRecipe(new Recipe(recipeName, recipeItems));
  }

  addToItems(){
    let nameAndPosRng = new Rng(RNG_RECIPE_NAME_OLD_POS);
    let itemName = nameAndPosRng.getValue(1, 2);
    let oldPos = nameAndPosRng.getValue(1, 1);
    let fields = new Rng(RNG_RECIPE_FIELDS_TO_SAVE).getRowAsArray();
    fields.splice(1, 1);
    let noomColour = new Rng(RNG_RECIPE_NOOM_COLOUR).getValue();
    
    itemRepository().addOrUpdate(new Item(itemName, fields, noomColour), oldPos);
    this.clearCalculator();
  }

  loadRecipe() {
    let selectedRecipeName = new Rng(RNG_LOAD_RECIPE_NAME).getValue();
    let selectedRecipeItems = new Rng(RNG_SELECTED_RECIPE_ITEMS).getValues();
    let recipeItemsRng = new Rng(RNG_RECIPE_ITEMS);
    let recipeNameRng = new Rng(RNG_RECIPE_NAME); 
    recipeNameRng.setValue(selectedRecipeName);
    recipeItemsRng.setValues(selectedRecipeItems);
  }

  clearCalculator() {
    new Rng(RNG_RECIPE_NAME).clear();
    new Rng(RNG_RECIPE_ITEMS).clear();
    new Rng(RNG_RECIPE_SERVING).clear();
    new Rng(RNG_RECIPE_NOOM_CATEGORY).setValue('Solid');
    new Rng(RNG_RECIPE_SAVE_AS_RECIPE).setValue('True');
  }
}

// SERVICE SINGLETON
var recipeCalculatorServiceSingleton;

/** 
 * Returns the recipe calculator service
 * @returns {RecipeCalculatorService} recipe calculator service singleton
 */
var recipeCalculatorService = () => recipeCalculatorServiceSingleton = recipeCalculatorServiceSingleton || new RecipeCalculatorService();