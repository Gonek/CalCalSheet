class RecipeRepository extends GroupRepository{

  constructor(){
    super(SPR.RECIPES);
  }

  saveRecipe(recipe) {
    this.save(recipe);
  }
}
