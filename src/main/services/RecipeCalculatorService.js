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
    let selectedRecipeItemsRng = getRng(RNG.SELECTED_RECIPE_ITEMS);
    if(!selectedRecipeItemsRng.isBlank()){
      this.itemsRng.setValues(selectedRecipeItemsRng.getValues());
    }
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
    let autoDelete = getRng(RNG.RECIPE_AUTO_DELETE).getValue();
    
    getObj(ItemRepository).addOrUpdate(new Item(itemName, fields, fields[13], (fields[13] / fields[2]), noomColour, autoDelete), oldPos);
  }

  clearCalculator(){
    this.nameRng.clearContent();
    this.itemsRng.clearContent();
    getRng(RNG.RECIPE_SERVING).clearContent();
    getRng(RNG.RECIPE_NOOM_CATEGORY).setValue('Solid');
    getRng(RNG.RECIPE_SAVE_AS_RECIPE).setValue('True');
    getRng(RNG.RECIPE_AUTO_DELETE).setValue('Never');
  }

  deleteRecipes(input){
    let names = input.getValue();
    if(names && names != ''){
      getObj(RecipeRepository).delete(names.split(", "));
    }
  }
}