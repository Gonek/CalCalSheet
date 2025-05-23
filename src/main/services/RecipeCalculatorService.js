class RecipeCalculatorService { 

  constructor(){
    this.nameRng = getRng(RNG.RECIPE_NAME);
    this.itemsRng = getRng(RNG.RECIPE_ITEMS);
  }

  addRecipeToItemAndRecipes(){
    if(getRng(RNG.RECIPE_SAVE_AS_RECIPE).getValue()){
      this.addToRecipes();
    }
    this.addToItems();
  this.clearCalculator();
  }

  loadRecipe() {
    let selectedRecipeNameRng = getRng(RNG.LOAD_RECIPE_NAME);
    let selectedRecipeItems = getRng(RNG.SELECTED_RECIPE_ITEMS).getValues();
    this.nameRng.setValue(selectedRecipeNameRng.getValue());
    this.itemsRng.setValues(selectedRecipeItems);
    selectedRecipeNameRng.clear();
  }

  addToRecipes(){
    let recipeName = this.nameRng.getValue();
    let recipeItems = this.itemsRng.getValues().filter(row => row[0] != "");
    getObj(RecipeRepository).saveRecipe(new Recipe(recipeName, recipeItems));
  }

  addToItems(){
    let itemName = this.nameRng.getValue();
    let oldPos = getRng(RNG.RECIPE_OLD_POS).getValue();
    let fields = getRng(RNG.RECIPE_FIELDS_TO_SAVE).getRowAsArray();
    fields.splice(1, 1);
    let noomColour = getRng(RNG.RECIPE_NOOM_COLOUR).getValue();
    
    getObj(ItemRepository).addOrUpdate(new Item(itemName, fields, noomColour), oldPos);
  }

  clearCalculator() {
    this.nameRng.clear();
    this.itemsRng.clear();
    getRng(RNG.RECIPE_SERVING).clear();
    getRng(RNG.RECIPE_NOOM_CATEGORY).setValue('Solid');
    getRng(RNG.RECIPE_SAVE_AS_RECIPE).setValue('True');
  }
}