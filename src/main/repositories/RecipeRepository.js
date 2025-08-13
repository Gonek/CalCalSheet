class RecipeRepository extends GroupRepository{

  constructor(){
    super(SHT.RECIPES);
  }

  saveRecipe(recipe) {
    this.save(recipe);
  }
}
