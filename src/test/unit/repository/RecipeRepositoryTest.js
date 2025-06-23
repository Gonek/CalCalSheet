class RecipeRepositoryTest extends TestBase {
    beforeAll(){
        super.beforeAll();
        this.recipesSpr = mockSpr(SHT.RECIPES);
        this.recipeRepository = new RecipeRepository();
    }

    shouldSaveMealDeleteExistingMealAndSaveNew(){
        // GIVEN
        var recipe = new Recipe('Recipe', [['Item 1', 10],['Item 2', 20],['Item 3', 30]]); 
        when(this.recipesSpr).getValues('B4:B').thenReturn([['First'], ['Secound'], ['Recipe'], ['Recipe']]);
        // WHEN
        this.recipeRepository.saveRecipe(recipe);
        // THEN
        verify(this.recipesSpr).deleteRows(6,8).calledOnce();
        verify(this.recipesSpr).putDataAtEnd([['Recipe', 'Item 1', 10],['Recipe', 'Item 2', 20],['Recipe', 'Item 3', 30]]).calledOnce();
        verify(this.recipesSpr).sort(2).calledOnce();
    }

    shouldSaveMealNotDeleteMealsJustAndSaveNewIfMealNotExistYet(){
        // GIVEN
        var recipe = new Recipe('Recipe', [['Item 1', 10],['Item 2', 20],['Item 3', 30]]); 
        when(this.recipesSpr).getValues('B4:B').thenReturn([['First'],['Secound']]);
        // WHEN
        this.recipeRepository.saveRecipe(recipe);
        // THEN
        verify(this.recipesSpr).deleteRows(any).neverCalled();
        verify(this.recipesSpr).putDataAtEnd([['Recipe', 'Item 1', 10],['Recipe', 'Item 2', 20],['Recipe', 'Item 3', 30]]).calledOnce();
        verify(this.recipesSpr).sort(2).calledOnce();
    }
}

var runRecipeRepositoryTests = () => new RecipeRepositoryTest().runAllTests();