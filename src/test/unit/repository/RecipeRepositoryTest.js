class RecipeRepositoryTest extends TestBase {
    beforeAll(){
        super.beforeAll();
        this.recipesSht = mockSht(SHT.RECIPES);
        this.recipeRepository = new RecipeRepository();
    }

    shouldSaveRecipeDeleteExistingRecipeAndSaveNew(){
        // GIVEN
        var recipe = new Recipe('Recipe', [['Item 1', 10],['Item 2', 20],['Item 3', 30]]); 
        when(this.recipesSht).getValues('B4:B').thenReturn([['First'], ['Secound'], ['Recipe'], ['Recipe']]);
        // WHEN
        this.recipeRepository.saveRecipe(recipe);
        // THEN
        verify(this.recipesSht).deleteRows(6,8).calledOnce();
        verify(this.recipesSht).putDataAtEnd([['Recipe', 'Item 1', 10],['Recipe', 'Item 2', 20],['Recipe', 'Item 3', 30]]).calledOnce();
        verify(this.recipesSht).sort(2).calledOnce();
    }

    shouldSaveRecipeNotDeleteRecipesJustAndSaveNewIfRecipeNotExistYet(){
        // GIVEN
        var recipe = new Recipe('Recipe', [['Item 1', 10],['Item 2', 20],['Item 3', 30]]); 
        when(this.recipesSht).getValues('B4:B').thenReturn([['First'],['Secound']]);
        // WHEN
        this.recipeRepository.saveRecipe(recipe);
        // THEN
        verify(this.recipesSht).deleteRows(any).neverCalled();
        verify(this.recipesSht).putDataAtEnd([['Recipe', 'Item 1', 10],['Recipe', 'Item 2', 20],['Recipe', 'Item 3', 30]]).calledOnce();
        verify(this.recipesSht).sort(2).calledOnce();
    }

    shouldSaveRecipeDoNothingIfNoRecipeGiven(){
        // GIVEN
        var recipe = null; 
        // WHEN
        this.recipeRepository.saveRecipe(recipe);
        // THEN
        verify(this.recipesSht).deleteRows(any(), any()).neverCalled();
        verify(this.recipesSht).putDataAtEnd(any()).neverCalled();
        verify(this.recipesSht).sort(any()).neverCalled();
    }

    shouldSaveRecipeDoNothingIfNoRecipeNameGiven(){
        // GIVEN
        var recipe = new Recipe('', [['Item 1', 10],['Item 2', 20],['Item 3', 30]]); 
        // WHEN
        this.recipeRepository.saveRecipe(recipe);
        // THEN
        verify(this.recipesSht).deleteRows(any(), any()).neverCalled();
        verify(this.recipesSht).putDataAtEnd(any()).neverCalled();
        verify(this.recipesSht).sort(any()).neverCalled();
    }

    shouldSaveRecipeDoNothingIfNoRecipeItemsGiven(){
        // GIVEN
        var recipe = new Recipe('Recipe', []); 
        // WHEN
        this.recipeRepository.saveRecipe(recipe);
        // THEN
        verify(this.recipesSht).deleteRows(any(), any()).neverCalled();
        verify(this.recipesSht).putDataAtEnd(any()).neverCalled();
        verify(this.recipesSht).sort(any()).neverCalled();
    }

    shouldDeleteRemoveAllRecipesWithGivenNameInDescOrder(){
        // GIVEN
        let names = ['recipe1', 'recipe4'];
        when(this.recipesSht).getValues(REPOSITORY_AREA).thenReturn([['recipe1'], ['recipe1'], ['recipe2'], ['recipe3'], ['recipe3'], ['recipe3'], ['recipe4']]);
        // WHEN
        this.recipeRepository.delete(names);
        // THEN
        verify(this.recipesSht).deleteRows(10, 11).calledInOrder(2);
        verify(this.recipesSht).deleteRows(4, 6).calledInOrder(3);
    }

    shouldDeleteDoNothingIfGivenNamesAreNotFound(){
        // GIVEN
        let names = ['RecipeX', 'RecipeY'];
        when(this.recipesSht).getValues(REPOSITORY_AREA).thenReturn([['Recipe1'], ['Recipe1'], ['Recipe2'], ['Recipe3'], ['Recipe3'], ['Recipe3'], ['Recipe4']]);
        // WHEN
        this.recipeRepository.delete(names);
        // THEN
        verify(this.recipesSht).deleteRows(any(), any()).neverCalled();
    }

    shouldDeleteDoNothingIfNoNamesWereGiven(){
        // GIVEN
        let names = [];
        // WHEN
        this.recipeRepository.delete(names);
        // THEN
        verify(this.recipesSht).deleteRows(any(), any()).neverCalled();
    }

    shouldDeleteDoNothingIfNamesAreNull(){
        // GIVEN
        let names = null;
        // WHEN
        this.recipeRepository.delete(names);
        // THEN
        verify(this.recipesSht).deleteRows(any(), any()).neverCalled();
    }
}

var runRecipeRepositoryTests = () => new RecipeRepositoryTest().runAllTests();