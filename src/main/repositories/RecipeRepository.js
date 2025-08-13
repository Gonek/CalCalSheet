// DATA MODEL

class Recipe extends Group{
  constructor(name, items){
    super(name, items);
  }
}

// REPOSITORY

class RecipeRepository extends GroupRepository{

  constructor(){
    super(RECIPES);
  }

  saveRecipe(recipe) {
    this.save(recipe);
  }
}

// REPOSITORY SINGLETON
var recipeRepositorySingleton;

/** 
 * Returns the recipe repository sigleton
 * @returns {RecipeRepository} recipe repository singleton
 */
var recipeRepository = () => recipeRepositorySingleton = recipeRepositorySingleton || new RecipeRepository();
