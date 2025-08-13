class RecipeCalculatorServiceTest extends TestBase {
    beforeAll(){
        super.beforeAll();
        this.recipeNameRng = mockRng(RNG.RECIPE_NAME);
        this.recipeItemsRng = mockRng(RNG.RECIPE_ITEMS);
        this.recipeOldPosRng = mockRng(RNG.RECIPE_OLD_POS);
        this.recipeFieldsToSaveRng = mockRng(RNG.RECIPE_FIELDS_TO_SAVE);
        this.recipeNoomColourRng = mockRng(RNG.RECIPE_NOOM_COLOUR);
        this.loadRecipeNameRng = mockRng(RNG.LOAD_RECIPE_NAME);
        this.selectedRecipeItemsRng = mockRng(RNG.SELECTED_RECIPE_ITEMS);
        this.recipeServingRng = mockRng(RNG.RECIPE_SERVING);
        this.recipeNoomCategoryRng = mockRng(RNG.RECIPE_NOOM_CATEGORY);
        this.recipeSaveAsRecipeRng = mockRng(RNG.RECIPE_SAVE_AS_RECIPE);
        this.recipeAutoDeleteRng = mockRng(RNG.RECIPE_AUTO_DELETE);
        this.itemRepository = mock(ItemRepository);
        this.recipeRepository = mock(RecipeRepository);

        this.recipeCalculatorService = new RecipeCalculatorService();
    }

    shouldAddRecipeToItemAndRecipesAddToRecipeAndItemIfSaveAsRecipeSelected(){
        // GIVEN
        when(this.recipeSaveAsRecipeRng).getValue().thenReturn(true);
        when(this.recipeNameRng).getValue().thenReturn('Test');
        when(this.recipeItemsRng).getValues().thenReturn([['A', 100], ['B', 200], ['C', 300], ['D', 400], ['E', 500]]);
        when(this.recipeOldPosRng).getValue().thenReturn(1);
        when(this.recipeFieldsToSaveRng).getRowAsArray().thenReturn([100, '', 'g', 100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
        when(this.recipeNoomColourRng).getValue().thenReturn('Yellow');
        when(this.recipeAutoDeleteRng).getValue().thenReturn('Never');

        // WHEN
        this.recipeCalculatorService.addRecipeToItemAndRecipes();
        // THEN
        verify(this.recipeRepository).saveRecipe(new Recipe('Test', [['A', 100], ['B', 200], ['C', 300], ['D', 400], ['E', 500]])).calledOnce();
        verify(this.itemRepository).addOrUpdate(new Item('Test', [100, 'g', 100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 11, '0.11', 'Yellow', 'Never'), 1).calledOnce();
        verify(this.recipeNameRng).clearContent().calledOnce();
        verify(this.recipeItemsRng).clearContent().calledOnce();
        verify(this.recipeServingRng).clearContent().calledOnce();
        verify(this.recipeNoomCategoryRng).setValue('Solid').calledOnce();
        verify(this.recipeSaveAsRecipeRng).setValue('True').calledOnce();
    }

    shouldAddRecipeToItemAndRecipesAddToItemButNotToRecipeIfSaveAsRecipeNotSelected(){
        // GIVEN
        when(this.recipeSaveAsRecipeRng).getValue().thenReturn(false);
        when(this.recipeNameRng).getValue().thenReturn('Test');
        when(this.recipeItemsRng).getValues().thenReturn([['A', 100], ['B', 200], ['C', 300], ['D', 400], ['E', 500]]);
        when(this.recipeOldPosRng).getValue().thenReturn(1);
        when(this.recipeFieldsToSaveRng).getRowAsArray().thenReturn([100, '', 'g', 100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
        when(this.recipeNoomColourRng).getValue().thenReturn('Yellow');
          when(this.recipeAutoDeleteRng).getValue().thenReturn('1 Day');
        // WHEN
        this.recipeCalculatorService.addRecipeToItemAndRecipes();
        // THEN
        verify(this.recipeRepository).saveRecipe(new Recipe('Test', [['A', 100], ['B', 200], ['C', 300], ['D', 400], ['E', 500]])).neverCalled();
        verify(this.itemRepository).addOrUpdate(new Item('Test', [100, 'g', 100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 11, '0.11', 'Yellow', '1 Day'), 1).calledOnce();
        verify(this.recipeNameRng).clearContent().calledOnce();
        verify(this.recipeItemsRng).clearContent().calledOnce();
        verify(this.recipeServingRng).clearContent().calledOnce();
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


    shouldDeleteItemsCallsRepositoryDeleteWithTheProvidedIndexes(){
        // GIVEN
        let input = mock(BtnF);
        when(input).getValue().thenReturn('Recipe44, Recipe33');
        // WHEN
        this.recipeCalculatorService.deleteRecipes(input.mockObj);
        // THEN
        verify(this.recipeRepository).delete(['Recipe44', 'Recipe33']).calledOnce();
    }

    shouldDeleteItemsDoNothingIfIndexesAreNull(){
        // GIVEN
        let input = mock(BtnF);
        when(input).getValue().thenReturn(null);
        // WHEN
        this.recipeCalculatorService.deleteRecipes(input.mockObj);
        // THEN
        verify(this.recipeRepository).delete(any()).neverCalled();
    }

    shouldDeleteItemsDoNothingIfIndexesAreEmpty(){
        // GIVEN
        let input = mock(BtnF);
        when(input).getValue().thenReturn('');
        // WHEN
        this.recipeCalculatorService.deleteRecipes(input.mockObj);
        // THEN
        verify(this.recipeRepository).delete(any()).neverCalled();
    }
}

var runRecipeCalculatorServiceTests = () => new RecipeCalculatorServiceTest().runAllTests();
