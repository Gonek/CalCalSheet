class RecipeCalculatorServiceTest extends TestBase {

  constructor(){
    super();
    this.recipeNameRng = mockRng(RNG.RECIPE_NAME, this);
    this.recipeItemsRng = mockRng(RNG.RECIPE_ITEMS, this);
    this.recipeOldPosRng = mockRng(RNG.RECIPE_OLD_POS, this);
    this.recipeFieldsToSaveRng = mockRng(RNG.RECIPE_FIELDS_TO_SAVE, this);
    this.recipeNoomColourRng = mockRng(RNG.RECIPE_NOOM_COLOUR, this);
    this.loadRecipeNameRng = mockRng(RNG.LOAD_RECIPE_NAME, this);
    this.selectedRecipeItemsRng = mockRng(RNG.SELECTED_RECIPE_ITEMS, this);
    this.recipeServingRng = mockRng(RNG.RECIPE_SERVING, this);
    this.recipeNoomCategoryRng = mockRng(RNG.RECIPE_NOOM_CATEGORY, this);
    this.recipeSaveAsRecipeRng = mockRng(RNG.RECIPE_SAVE_AS_RECIPE, this);
    this.recipeAutoDeleteRng = mockRng(RNG.RECIPE_AUTO_DELETE, this);
    this.itemRepository = mock(ItemRepository, this);
    this.recipeRepository = mock(RecipeRepository, this);

    this.recipeCalculatorService = new RecipeCalculatorService();
  }

  shouldAddRecipeToItemAndRecipesAddToRecipeAndItemIfSaveAsRecipeSelected(){
    // GIVEN
    when(this.recipeSaveAsRecipeRng).getValue().thenReturn(true);
    when(this.recipeNameRng).getValue().thenReturn('Test');
    when(this.recipeItemsRng).getValues().thenReturn([['A', 100], ['B', 200], ['C', 300], ['D', 400], ['E', 500]]);
    when(this.recipeOldPosRng).getValue().thenReturn(1);
    when(this.recipeFieldsToSaveRng).getRowAsArray().thenReturn([100, '', 'g', 100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    when(this.recipeNoomColourRng).getValue().thenReturn('Yellow');
    when(this.recipeAutoDeleteRng).getValue().thenReturn('Never');

    // WHEN
    this.recipeCalculatorService.addRecipeToItemAndRecipes();
    // THEN
    verify(this.recipeRepository).saveRecipe(new Recipe('Test', [['A', 100], ['B', 200], ['C', 300], ['D', 400], ['E', 500]])).calledOnce();
    verify(this.itemRepository).addOrUpdate(new Item('Test', [100, 'g', 100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'Yellow', 'Never'), 1).calledOnce();
    verify(this.recipeNameRng).clear().calledOnce();
    verify(this.recipeItemsRng).clear().calledOnce();
    verify(this.recipeServingRng).clear().calledOnce();
    verify(this.recipeNoomCategoryRng).setValue('Solid').calledOnce();
    verify(this.recipeSaveAsRecipeRng).setValue('True').calledOnce();
  }

  shouldAddRecipeToItemAndRecipesAddToItemButNotToRecipeIfSaveAsRecipeNotSelected(){
    // GIVEN
    when(this.recipeSaveAsRecipeRng).getValue().thenReturn(false);
    when(this.recipeNameRng).getValue().thenReturn('Test');
    when(this.recipeItemsRng).getValues().thenReturn([['A', 100], ['B', 200], ['C', 300], ['D', 400], ['E', 500]]);
    when(this.recipeOldPosRng).getValue().thenReturn(1);
    when(this.recipeFieldsToSaveRng).getRowAsArray().thenReturn([100, '', 'g', 100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    when(this.recipeNoomColourRng).getValue().thenReturn('Yellow');
       when(this.recipeAutoDeleteRng).getValue().thenReturn('1 Day');
    // WHEN
    this.recipeCalculatorService.addRecipeToItemAndRecipes();
    // THEN
    verify(this.recipeRepository).saveRecipe(new Recipe('Test', [['A', 100], ['B', 200], ['C', 300], ['D', 400], ['E', 500]])).neverCalled();
    verify(this.itemRepository).addOrUpdate(new Item('Test', [100, 'g', 100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'Yellow', '1 Day'), 1).calledOnce();
    verify(this.recipeNameRng).clear().calledOnce();
    verify(this.recipeItemsRng).clear().calledOnce();
    verify(this.recipeServingRng).clear().calledOnce();
    verify(this.recipeNoomCategoryRng).setValue('Solid').calledOnce();
    verify(this.recipeSaveAsRecipeRng).setValue('True').calledOnce();
  }

  shouldLoadRecipeLoadNameAndItemsOfSelectedRecipeToRecipeCalculatorForm(){
    // GIVEN
    when(this.selectedRecipeItemsRng).isBlank().thenReturn(false);
    when(this.selectedRecipeItemsRng).getValues().thenReturn([['A', 100], ['B', 200], ['C', 300], ['D', 400], ['E', 500]]);
    // WHEN
    this.recipeCalculatorService.loadRecipe();
    // THEN
    verify(this.recipeItemsRng).setValues([['A', 100], ['B', 200], ['C', 300], ['D', 400], ['E', 500]]).calledOnce();
  }

  shouldLoadRecipeNotLoadItemsToRecipeCalculatorFormIfSelectedItemsAreEmpty(){
    // GIVEN
    when(this.selectedRecipeItemsRng).isBlank().thenReturn(true);
    // WHEN
    this.recipeCalculatorService.loadRecipe();
    // THEN
    verify(this.recipeItemsRng).setValues(any()).neverCalled();
  }
}

var runRecipeCalculatorServiceTests = () => new RecipeCalculatorServiceTest().runAllTests();
