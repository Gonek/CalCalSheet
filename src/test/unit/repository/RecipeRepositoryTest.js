class RecipeRepositoryTest extends TestBase {
    beforeAll(){
        super.beforeAll();
        this.recipesSht = mockSht(SHT.RECIPES);
        this.recipeRepository = new RecipeRepository();
    }

    shouldSaveMealDeleteExistingMealAndSaveNew(){
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

    shouldSaveMealNotDeleteMealsJustAndSaveNewIfMealNotExistYet(){
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
}

var runRecipeRepositoryTests = () => new RecipeRepositoryTest().runAllTests();